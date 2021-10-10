import { Action } from 'redux';

import * as ActionTypes from 'action-types';

export interface RegisterUserActionRequest
  extends Action<typeof ActionTypes.REGISTER_USER_REQUEST> {}

export interface RegisterUserActionSuccess
  extends Action<typeof ActionTypes.REGISTER_USER_SUCCESS> {
  payload: string;
}

export interface RegisterUserActionFail
  extends Action<typeof ActionTypes.REGISTER_USER_FAIL> {
  payload?: string;
}

export interface RegisterUserActionReset
  extends Action<typeof ActionTypes.REGISTER_USER_RESET> {}

export type RegisterUserAction =
  | RegisterUserActionRequest
  | RegisterUserActionSuccess
  | RegisterUserActionFail
  | RegisterUserActionReset;
