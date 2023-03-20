import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { ClientesService, IListagemCliente } from '../../shared/services/api/clientes/ClientesService';
import { useDebounce } from '../../shared/hooks';

export const ListagemClients: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemCliente[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);


  //Para realizar consultas na aplicação
  useEffect(() => {

    setIsLoading(true);
    debounce(() => {

      ClientesService.getAll(1, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        else {
          console.log(result);
          setRows(result.data);
          setTotalCount(result.totalCount);
        }
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

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Veículo</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Check-in</TableCell>
              <TableCell>Check-out</TableCell>
              <TableCell>Pagamento</TableCell>
            </TableRow>

          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.veiculo}</TableCell>
                <TableCell>{row.placa}</TableCell>
                <TableCell>{row.checkin}</TableCell>
                <TableCell>{row.checkout}</TableCell>
                <TableCell>{row.payments}</TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>

    </LayoutBasePage >
  );
};