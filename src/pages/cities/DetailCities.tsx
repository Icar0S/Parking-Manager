import { LinearProgress, Box, Paper, Grid, Typography } from '@mui/material';
import { useEffect, useState, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';


interface IFormData {
  nome: string;

}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),

});

export const DetailCities: React.FC = () => {
  const { id = 'new' } = useParams<'id'>(); //useParams recebe tipos de parametro, caso tivesse mais parametros <id | outro>
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/cities');
          } else {
            setName(result.nome);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nome: '',
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
          CidadesService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cities');
                } else {
                  navigate(`/cities/detail/${result}`);
                }
              }
            });
        } else {
          CidadesService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cities');
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
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro Excluído com sucesso!');
            navigate('/cities');
          }
        });
    }
  };

  return (
    <LayoutBasePage
      titulo={id === 'new' ? 'Nova Cidade' : name}
      barraFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'new'}
          mostrarBotaoApagar={id !== 'new'}

          onCliqueNovo={() => navigate('/cities/detail/new')}
          onCliqueVoltar={() => navigate('/cities')}
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
                  label='Principal email'
                  disabled={isLoading}
                  name='email'
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={8} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Veículo Marca-Modelo'
                  disabled={isLoading}
                  name='veiculo'
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={8} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Placa'
                  disabled={isLoading}
                  name='placa'
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={8} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Data-Hora Checkin'
                  disabled={isLoading}
                  name='checkin'
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={8} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Data-Hora Checkout'
                  disabled={isLoading}
                  name='checkout'
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={8} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Valor Pago'
                  disabled={isLoading}
                  name='payments'
                />
              </Grid>
            </Grid>
          </Grid>

        </Box>

      </VForm>

    </LayoutBasePage>

  );
};