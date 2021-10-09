import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from 'App';

import theme from 'theme';
import 'stylesheets/main.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);
