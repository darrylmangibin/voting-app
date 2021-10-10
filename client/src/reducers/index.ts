import { combineReducers } from 'redux';

import {
  userRegisterReducer,
  userAuthReducer,
  userLoginReducer,
  userProfileReducer,
} from './user-reducers';
import { snackbarReducer } from './snackbar-reducer';

const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userAuth: userAuthReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  snackbar: snackbarReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
