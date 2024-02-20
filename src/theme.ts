// import { red } from '@mui/material/colors';
import { alpha, createTheme, getContrastRatio } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    gold: Palette['primary'];
  }

  interface PaletteOptions {
    gold?: PaletteOptions['primary'];
  }
}

const goldBase = '#f0c14b';
const goldMain = alpha(goldBase, 0.7);

// Create a theme instance.
const theme = createTheme({
  palette: {
    gold: {
      main: goldMain,
      light: alpha(goldBase, 0.5),
      dark: alpha(goldBase, 0.9),
      contrastText: getContrastRatio(goldMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

export default theme;
