import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';


export const DetailClients: React.FC = () => {

  const { id = 'new' } = useParams<'id'>(); //useParams recebe tipos de parametro, caso tivesse mais parametros <id | outro>
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('save');
  };
  // const handleDelete = () => {
  //   console.log('Delete');
  // }

  return (
    <LayoutBasePage
      titulo="Detalhe do Cliente"
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

        />
      }
    >
      <h1>Detalhes do Cliente {id}</h1>

    </LayoutBasePage>


  );
};