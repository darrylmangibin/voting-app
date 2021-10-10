import { RootState } from 'reducers';
import { createSelector } from 'reselect';

export const userRegisterSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.userRegister
);

export const userAuthSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.userAuth
);

export const userLoginSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.userLogin
);

export const userProfileSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.userProfile
);

export const userProfileUpdateSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.userProfileUpdate
);
