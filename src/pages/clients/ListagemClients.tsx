import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { ClientesService } from '../../shared/services/api/clientes/ClientesService';
import { useDebounce } from '../../shared/hooks';

export const ListagemClients: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);


  //Para realizar consultas na aplicação
  useEffect(() => {

    debounce(() => {

      ClientesService.getAll(1, busca).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        else
          console.log(result);
      });

    });

  }, [busca]);

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