import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import App from 'App';

import theme from 'theme';
import 'stylesheets/main.css';
import store from 'store';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
  document.querySelector('#root')
);
