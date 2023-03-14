import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

  onCliqueNovo?: () => void;
  onCliqueVoltar?: () => void;
  onCliqueApagar?: () => void;
  onCliqueSalvar?: () => void;
  onCliqueSalvarEFechar?: () => void;

}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

  onCliqueNovo,
  onCliqueVoltar,
  onCliqueApagar,
  onCliqueSalvar,
  onCliqueSalvarEFechar,

}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      alignItems='center'
      height={theme.spacing(5)}
      component={Paper}
    >
      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onCliqueSalvar}
          startIcon={<Icon>save</Icon>}
        >Salvar</Button>
      )}
      {mostrarBotaoSalvarCarregando && (<Skeleton width={110} height={60} />)}

      {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onCliqueSalvarEFechar}
          startIcon={<Icon>save</Icon>}
        >Salvar e Voltar</Button>
      )}
      {mostrarBotaoSalvarEFecharCarregando && (<Skeleton width={180} height={60} />)}

      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onCliqueApagar}
          startIcon={<Icon>delete</Icon>}
        >Apagar</Button>
      )}
      {mostrarBotaoApagarCarregando && (<Skeleton width={110} height={60} />)}

      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onCliqueNovo}
          startIcon={<Icon>add</Icon>}
        >{textoBotaoNovo}</Button>
      )}
      {mostrarBotaoNovoCarregando && (<Skeleton width={110} height={60} />)}


      <Divider variant='middle' orientation='vertical' />

      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onCliqueVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >Voltar</Button>
      )}
      {mostrarBotaoVoltarCarregando && (<Skeleton width={110} height={60} />)}

    </Box>
  );
}