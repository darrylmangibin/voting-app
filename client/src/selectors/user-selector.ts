import { RootState } from 'reducers';
import { createSelector } from 'reselect';

export const registerUserSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.registerUser
);

export const authUserSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.authUser
);

export const loginUserSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.loginUser
);
