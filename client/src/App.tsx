import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from 'pages/login-page';
import RegisterPage from 'pages/register-page';
import * as routes from 'routes';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.LOGIN_ROUTE} component={LoginPage} exact />
        <Route path={routes.REGISTER_ROUTE} component={RegisterPage} exact />
      </Switch>
    </Router>
  );
};

export default App;
