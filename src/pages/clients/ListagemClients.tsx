import { useMemo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Paper, Pagination,
  TableContainer,
  Table, TableHead, TableBody, TableFooter,
  TableRow, TableCell,
  IconButton, Icon
} from '@mui/material';

import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { ClientesService, IListagemCliente } from '../../shared/services/api/clientes/ClientesService';
import { useDebounce } from '../../shared/hooks';
import LinearProgress from '@mui/material/LinearProgress';
import { Enviroment } from '../../shared/environment';



export const ListagemClients: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemCliente[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  //Para realizar consultas na aplicação
  useEffect(() => {

    setIsLoading(true);
    debounce(() => {

      ClientesService.getAll(pagina, busca).then((result) => {
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

  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja Excluir?')) {
      ClientesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id)
            ]);
            alert('Registro Excluído com sucesso!');
          }
        });
    }
  };

  return (
    <LayoutBasePage
      titulo=" Listagem de Clientes "
      barraFerramentas={
        <FerramentasDeListagem
          mostrarInputBusca
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoClicarEmNovo={() => navigate('/clients/detail/new')}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
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
                <TableCell size='small' width='75px'>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/clients/detail/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.veiculo}</TableCell>
                <TableCell>{row.placa}</TableCell>
                <TableCell>{row.checkin.toLocaleString()}</TableCell>
                <TableCell>{row.checkout.toLocaleString()}</TableCell>
                <TableCell>{row.payments}</TableCell>
              </TableRow>
            ))}

          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Enviroment.LISTAGEM_VAZIA}</caption>)
          }

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}

            {(totalCount > 0 && totalCount > Enviroment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={8}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>

        </Table>
      </TableContainer>

    </LayoutBasePage >
  );
};