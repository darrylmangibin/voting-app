import { FC, ElementType } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { typedUseSelector } from 'hooks/redux-hooks';
import { userAuthSelector } from 'selectors';
import * as routes from 'routes';

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: ElementType;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { auth } = typedUseSelector(userAuthSelector);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth) {
          return <Redirect to={routes.LOGIN_ROUTE} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
