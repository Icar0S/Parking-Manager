import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

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
      {mostrarBotaoSalvar && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onCliqueSalvar}
          startIcon={<Icon>save</Icon>}
        >Salvar</Button>
      )}

      {mostrarBotaoSalvarEFechar && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onCliqueSalvarEFechar}
          startIcon={<Icon>save</Icon>}
        >Salvar e Voltar</Button>
      )}

      {mostrarBotaoApagar && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onCliqueApagar}
          startIcon={<Icon>delete</Icon>}
        >Apagar</Button>
      )}

      {mostrarBotaoNovo && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onCliqueNovo}
          startIcon={<Icon>add</Icon>}
        >{textoBotaoNovo}</Button>
      )}


      <Divider variant='middle' orientation='vertical' />

      {mostrarBotaoVoltar && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onCliqueVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >Voltar</Button>
      )}

    </Box>
  );
}