import { Action } from 'redux';

import * as ActionTypes from 'action-types';
import { UserInterface } from 'interfaces';

export interface UserRegisterActionRequest
  extends Action<typeof ActionTypes.USER_REGISTER_REQUEST> {}

export interface UserRegisterActionSuccess
  extends Action<typeof ActionTypes.USER_REGISTER_SUCCESS> {
  payload: string;
}

export interface UserRegisterActionFail
  extends Action<typeof ActionTypes.USER_REGISTER_FAIL> {
  payload?: string;
}

export interface UserRegisterActionReset
  extends Action<typeof ActionTypes.USER_REGISTER_RESET> {}

export type UserRegisterAction =
  | UserRegisterActionRequest
  | UserRegisterActionSuccess
  | UserRegisterActionFail
  | UserRegisterActionReset;

export interface UserAuthActionRequest
  extends Action<typeof ActionTypes.USER_AUTH_REQUEST> {}

export interface UserAuthActionSuccess
  extends Action<typeof ActionTypes.USER_AUTH_SUCCESS> {
  payload: UserInterface;
}

export interface UserAuthActionFail
  extends Action<typeof ActionTypes.USER_AUTH_FAIL> {
  payload?: string;
}

export type UserAuthAction =
  | UserAuthActionRequest
  | UserAuthActionSuccess
  | UserAuthActionFail;

export interface UserLogoutAction
  extends Action<typeof ActionTypes.USER_LOGOUT> {}

export interface UserLoginActionRequest
  extends Action<typeof ActionTypes.USER_LOGIN_REQUEST> {}

export interface UserLoginActionSuccess
  extends Action<typeof ActionTypes.USER_LOGIN_SUCCESS> {
  payload: string;
}

export interface UserLoginActionFail
  extends Action<typeof ActionTypes.USER_LOGIN_FAIL> {
  payload?: string;
}

export interface UserLoginActionReset
  extends Action<typeof ActionTypes.USER_LOGIN_RESET> {}

export type UserLoginAction =
  | UserLoginActionRequest
  | UserLoginActionSuccess
  | UserLoginActionFail
  | UserLoginActionReset;

export interface UserProfileActionRequest
  extends Action<typeof ActionTypes.USER_PROFILE_REQUEST> {}

export interface UserProfileActionSuccess
  extends Action<typeof ActionTypes.USER_PROFILE_SUCCESS> {
  payload: UserInterface;
}

export interface UserProfileActionFail
  extends Action<typeof ActionTypes.USER_PROFILE_FAIL> {
  payload?: string;
}

export interface UserProfileActionReset
  extends Action<typeof ActionTypes.USER_PROFILE_RESET> {}

export type UserProfileAction =
  | UserProfileActionRequest
  | UserProfileActionSuccess
  | UserProfileActionFail
  | UserProfileActionReset;

export interface UserProfileUpdateActionRequest
  extends Action<typeof ActionTypes.USER_PROFILE_UPDATE_REQUEST> {}

export interface UserProfileUpdateActionSuccess
  extends Action<typeof ActionTypes.USER_PROFILE_UPDATE_SUCCESS> {
  payload: UserInterface;
}

export interface UserProfileUpdateActionFail
  extends Action<typeof ActionTypes.USER_PROFILE_UPDATE_FAIL> {
  payload?: string;
}

export interface UserProfileUpdateActionReset
  extends Action<typeof ActionTypes.USER_PROFILE_UPDATE_RESET> {}

export type UserProfileUpdateAction =
  | UserProfileUpdateActionRequest
  | UserProfileUpdateActionSuccess
  | UserProfileUpdateActionFail
  | UserProfileUpdateActionReset;

export interface UserListActionRequest
  extends Action<typeof ActionTypes.USER_LIST_REQUEST> {}

export interface UserListActionSuccess
  extends Action<typeof ActionTypes.USER_LIST_SUCCESS> {
  payload: UserInterface[];
}

export interface UserListActionFail
  extends Action<typeof ActionTypes.USER_LIST_FAIL> {
  payload?: string;
}

export interface UserListActionReset
  extends Action<typeof ActionTypes.USER_LIST_RESET> {}

export type UserListAction =
  | UserListActionRequest
  | UserListActionSuccess
  | UserListActionFail
  | UserListActionReset;
