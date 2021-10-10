import { RootState } from 'reducers';
import { createSelector } from 'reselect';

export const registerUserSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.registerUser
);
