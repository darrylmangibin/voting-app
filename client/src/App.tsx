import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from 'pages/login-page';
import RegisterPage from 'pages/register-page';
import CandidatesPage from 'pages/candidates-page';
import VotersPage from 'pages/voters-page';
import ProfilePage from 'pages/profile-page';
import Layout from 'components/layout';
import * as routes from 'routes';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.LOGIN_ROUTE} component={LoginPage} exact />
        <Route path={routes.REGISTER_ROUTE} component={RegisterPage} exact />
        <Layout>
          <Route path={routes.CANDIDATES_ROUTE} component={CandidatesPage} />
          <Route path={routes.VOTERS_ROUTE} component={VotersPage} />
          <Route path={routes.PROFILE_ROUTE} component={ProfilePage} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
