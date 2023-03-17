import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';


export const ListagePayments: React.FC = () => {

  return (

    <LayoutBasePage
      titulo=" Pagamentos "
      barraFerramentas={
        <FerramentasDeListagem mostrarInputBusca textoBotaoNovo="Nova" />
      }
    >

    </LayoutBasePage>

  );
};