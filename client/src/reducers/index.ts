import { combineReducers } from 'redux';

import {
  userRegisterReducer,
  userAuthReducer,
  userLoginReducer,
  userProfileReducer,
  userProfileUpdateReducer,
  userListReducer,
} from './user-reducers';
import {
  candidateListReducer,
  candidateCreateReducer,
  candidateUpdateReducer,
  candidateDetailsReducer,
} from './candidate-reducer';
import { voteCreateReducer } from './vote-reducer'
import { snackbarReducer } from './snackbar-reducer';

const reducers = combineReducers({
  // USER
  userRegister: userRegisterReducer,
  userAuth: userAuthReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userList: userListReducer,
  // CANDIDATE
  candidateList: candidateListReducer,
  candidateCreate: candidateCreateReducer,
  candidateUpdate: candidateUpdateReducer,
  candidateDetails: candidateDetailsReducer,
  // VOTE
  voteCreate: voteCreateReducer,
  // SNACKBAR
  snackbar: snackbarReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
