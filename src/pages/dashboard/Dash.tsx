import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dash = () => {

  return (
    <LayoutBasePage
      titulo='HOME'
      barraFerramentas={
        <FerramentasDeListagem mostrarInputBusca
          textoBotaoNovo='Nova' />
      }>

    </LayoutBasePage>
  );
};