import { Action } from 'redux';

import * as ActionTypes from 'action-types';
import { UserInterface } from 'interfaces';

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

export interface AuthUserActionRequest
  extends Action<typeof ActionTypes.AUTH_USER_REQUEST> {}

export interface AuthUserActionSuccess
  extends Action<typeof ActionTypes.AUTH_USER_SUCCESS> {
  payload: UserInterface;
}

export interface AuthUserActionFail
  extends Action<typeof ActionTypes.AUTH_USER_FAIL> {
  payload?: string;
}

export type AuthUserAction =
  | AuthUserActionRequest
  | AuthUserActionSuccess
  | AuthUserActionFail;

  export interface LogoutUserAction
  extends Action<typeof ActionTypes.LOGOUT_USER> {}
