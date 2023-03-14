import { FerramentasDeDetalhe, FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dash = () => {

  return (
    <LayoutBasePage
      titulo='HOME'
      barraFerramentas={
        <FerramentasDeDetalhe mostrarBotaoSalvarEFechar />
      }>
    </LayoutBasePage>


  );
};