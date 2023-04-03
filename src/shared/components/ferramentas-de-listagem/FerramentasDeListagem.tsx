import { Box, Button, TextField, Paper, useTheme, Icon } from '@mui/material';

//import Parking from '../menu-lateral/images/logo-parking-spot.png';

interface IFerramentasDeListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const FerramentasDeListagem: React.FC<IFerramentasDeListagemProps> = ({
  textoDaBusca = '',
  aoMudarTextoDeBusca,
  mostrarInputBusca = false,
  aoClicarEmNovo,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
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
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDaBusca}
          placeholder='Pesquisar...'
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
          >{textoBotaoNovo}</Button>
        )}
      </Box>
    </Box>
  );
};