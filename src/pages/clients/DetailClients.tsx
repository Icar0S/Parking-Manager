import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { ClientesService } from '../../shared/services/api/clientes/ClientesService';


export const DetailClients: React.FC = () => {

  const { id = 'new' } = useParams<'id'>(); //useParams recebe tipos de parametro, caso tivesse mais parametros <id | outro>
  const navigate = useNavigate();

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
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleSave = () => {
    console.log('save');
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
          onCliqueSalvar={handleSave}
          onCliqueSalvarEFechar={handleSave}
          onCliqueApagar={() => handleDelete(Number(id))}

        />
      }
    >
      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}

      <h1>Detalhes do Cliente {id}</h1>

    </LayoutBasePage>

  );
};