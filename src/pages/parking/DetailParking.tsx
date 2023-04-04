import { LinearProgress, Box, Paper, Grid, Typography } from '@mui/material';
import { useEffect, useState, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { ParkingsService } from '../../shared/services/api/parkings/ParkingsService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { AutoCompleteCities } from './components/AutoCompleteCities';


interface IFormData {
  nome: string;
  payments: number;
  cidadeId: number;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
  payments: yup.number().required(),
  cidadeId: yup.number().required(),
});

export const DetailParking: React.FC = () => {
  const { id = 'new' } = useParams<'id'>(); //useParams recebe tipos de parametro, caso tivesse mais parametros <id | outro>
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      ParkingsService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/parking');
          } else {
            setName(result.nome);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nome: '',
        payments: '',
        cidadeId: undefined,
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {

    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        setIsLoading(true);

        if (id === 'new') {
          ParkingsService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/parking');
                } else {
                  navigate(`/parking/detail/${result}`);
                }
              }
            });
        } else {
          ParkingsService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/parking');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        //validationErro é um objeto que recebe varios atributos
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja Excluir?')) {
      ParkingsService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro Excluído com sucesso!');
            navigate('/parking');
          }
        });
    }
  };

  return (
    <LayoutBasePage
      titulo={id === 'new' ? 'Novo Estacionamento' : name}
      barraFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'new'}
          mostrarBotaoApagar={id !== 'new'}

          onCliqueNovo={() => navigate('/parking/detail/new')}
          onCliqueVoltar={() => navigate('/parking')}
          onCliqueSalvar={save}
          onCliqueSalvarEFechar={saveAndClose}
          onCliqueApagar={() => handleDelete(Number(id))}

        />
      }
    >

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome'
                  disabled={isLoading}
                  name='nome'
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>


            <Grid container item direction='row'>
              <Grid item xs={8} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Faturamento'
                  disabled={isLoading}
                  name='payments'
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={8} md={6} lg={4} xl={2}>
                <AutoCompleteCities />
              </Grid>
            </Grid>

          </Grid>

        </Box>

      </VForm>

    </LayoutBasePage>

  );
};