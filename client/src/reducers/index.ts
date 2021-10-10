import { combineReducers } from 'redux';

import { registerUserReducer, authUserReducer } from './user-reducers';
import { snackbarReducer } from './snackbar-reducer';

const reducers = combineReducers({
  registerUser: registerUserReducer,
  authUser: authUserReducer,
  snackbar: snackbarReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
