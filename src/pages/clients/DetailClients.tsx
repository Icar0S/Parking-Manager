import { LinearProgress } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//utilizando unform-rocketseat.app
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { ClientesService } from '../../shared/services/api/clientes/ClientesService';
import { VTextField } from '../../shared/forms';


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

  const formRef = useRef<FormHandles>(null);

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
            navigate(`/clients/detail/${result}`);
          }
        });
    } else {
      ClientesService
        .updateById(Number(id), { id: Number(id), ...dados })
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
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
          onCliqueSalvar={() => formRef.current?.submitForm()}
          onCliqueSalvarEFechar={() => formRef.current?.submitForm()}
          onCliqueApagar={() => handleDelete(Number(id))}

        />
      }
    >
      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}

      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder='Nome' name='nome' />
        <VTextField placeholder='Principal email' name='email' />
        <VTextField placeholder='Veículo Marca-Modelo' name='veiculo' />
        <VTextField placeholder='Placa' name='placa' />
        <VTextField placeholder='Data-Hora Checkin' name='checkin' />
        <VTextField placeholder='Data-Hora Checkout' name='checkout' />
        <VTextField placeholder='Valor Pago' name='payments' />


      </Form>

    </LayoutBasePage>

  );
};