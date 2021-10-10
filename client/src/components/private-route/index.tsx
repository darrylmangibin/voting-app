import { FC, ElementType } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { typedUseSelector } from 'hooks/redux-hooks';
import { authUserSelector } from 'selectors';
import * as routes from 'routes';

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: ElementType;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { auth, loading } = typedUseSelector(authUserSelector);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth && loading) {
          return <Redirect to={routes.LOGIN_ROUTE} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
