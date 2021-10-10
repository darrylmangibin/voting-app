import { combineReducers } from 'redux';

import { registerUserReducer, authUserReducer, loginUserReducer } from './user-reducers';
import { snackbarReducer } from './snackbar-reducer';

const reducers = combineReducers({
  registerUser: registerUserReducer,
  authUser: authUserReducer,
  loginUser: loginUserReducer,
  snackbar: snackbarReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
