import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';


export const ListagemClients: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);


  //Para realizar consultas na aplicação
  useEffect(() => {

  }, []);

  return (
    <LayoutBasePage
      titulo=" Listagem de Clientes "
      barraFerramentas={
        <FerramentasDeListagem
          mostrarInputBusca
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >
    </LayoutBasePage>
  );
};