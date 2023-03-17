import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { FerramentasDeListagem } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";


export const ListagemCities: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  return (
    <LayoutBasePage
      titulo=" Listagem de Cidades "
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