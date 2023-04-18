import { createTheme,  } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: '4rem',
      color: '#2E4765',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2.2rem',
      color: '#2E4765',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.8rem',
      color: '#2E4765',
    },
    h4: {
      color: '#2E4765',
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.2rem',
      color: '#2E4765',
    },
    h5AndAHalf: {
      fontSize: '1rem',
      color: '#2E4765',
    },
    h6: {
      fontSize: '0.8rem',
      color: '#2E4765',
      fontWeight: 'bold',
    },
    body1: {
      // color: '#2E4765',
      color: '#e4e8ff',
    },
    body2: {
      fontSize: '0.9rem',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
