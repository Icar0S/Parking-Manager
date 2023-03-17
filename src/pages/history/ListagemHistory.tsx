import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';


export const ListagemHistory: React.FC = () => {
  return (

    <LayoutBasePage
      titulo=" Histórico de Transações "
      barraFerramentas={
        <FerramentasDeListagem mostrarInputBusca textoBotaoNovo="Nova" />
      }
    >

    </LayoutBasePage>

  );
};