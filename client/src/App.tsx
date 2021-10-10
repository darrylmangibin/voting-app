import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from 'pages/login-page';
import RegisterPage from 'pages/register-page';
import CandidatesPage from 'pages/candidates-page';
import VotersPage from 'pages/voters-page';
import ProfilePage from 'pages/profile-page';
import CandidateDetailsPage from 'pages/candidate-details-page';
import Layout from 'components/layout';
import PrivateRoute from 'components/private-route';
import * as routes from 'routes';
import SnackbarNotification from 'components/snackbar-notification';

import { RootState } from 'reducers';
import { typedUseDispatch } from 'hooks/redux-hooks';

const App: FC = () => {
  const { open, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  const { authUser } = typedUseDispatch();

  useEffect(() => {
    authUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Switch>
        <Route path={routes.LOGIN_ROUTE} component={LoginPage} exact />
        <Route path={routes.REGISTER_ROUTE} component={RegisterPage} exact />
        <Layout>
          <PrivateRoute
            path={routes.CANDIDATES_ROUTE}
            component={CandidatesPage}
            exact
          />
          <PrivateRoute
            path={routes.CANDIDATE_DETAILS_ROUTE}
            component={CandidateDetailsPage}
            exact
          />
          <PrivateRoute path={routes.VOTERS_ROUTE} component={VotersPage} exact />
          <PrivateRoute path={routes.PROFILE_ROUTE} component={ProfilePage} exact />
        </Layout>
      </Switch>
      <SnackbarNotification
        message={message ?? ''}
        open={open}
        severity={severity}
      />
    </Router>
  );
};

export default App;
