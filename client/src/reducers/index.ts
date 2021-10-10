import { combineReducers } from 'redux';

import { registerUserReducer } from './user-reducers';
import { snackbarReducer } from './snackbar-reducer';

const reducers = combineReducers({
  registerUser: registerUserReducer,
  snackbar: snackbarReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
