import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const ListagemParking: React.FC = () => {

  return (

    <LayoutBasePage
      titulo=" Vagas Disponíveis "
      barraFerramentas={
        <FerramentasDeListagem mostrarInputBusca textoBotaoNovo="Nova" />
      }
    >

    </LayoutBasePage>

  );
};