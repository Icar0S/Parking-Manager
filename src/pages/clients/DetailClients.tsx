import { LinearProgress, Box, Paper, Grid, Typography } from '@mui/material';
import { useEffect, useState, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//utilizando unform-rocketseat.app
//import { Form } from '@unform/web';
//import { FormHandles } from '@unform/core';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { ClientesService } from '../../shared/services/api/clientes/ClientesService';
import { VTextField, VForm, useVForm } from '../../shared/forms';


interface IFormData {
  nome: string;
  email: string;
  veiculo: string;
  placa: string;
  checkin: string;
  checkout: string;
  payments: number;
}

export const DetailClients: React.FC = () => {

  const { id = 'new' } = useParams<'id'>(); //useParams recebe tipos de parametro, caso tivesse mais parametros <id | outro>
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      ClientesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/clients');
          } else {
            setName(result.nome);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nome: '', email: '',
        veiculo: '', placa: '',
        checkin: '', checkout: '',
        payments: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);
    if (id === 'new') {
      ClientesService
        .create(dados)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/clients');
            } else {
              navigate(`/clients/detail/${result}`);
            }
          }
        });
    } else {
      ClientesService
        .updateById(Number(id), { id: Number(id), ...dados })
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/clients');
            }
          }
        });

    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja Excluir?')) {
      ClientesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro Excluído com sucesso!');
            navigate('/clients');
          }
        });
    }
  };

  return (
    <LayoutBasePage
      titulo={id === 'new' ? 'Novo Cliente' : name}
      barraFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'new'}
          mostrarBotaoApagar={id !== 'new'}

          onCliqueNovo={() => navigate('/clients/detail/new')}
          onCliqueVoltar={() => navigate('/clients')}
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