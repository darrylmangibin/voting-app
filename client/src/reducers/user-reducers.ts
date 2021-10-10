import { Reducer } from 'redux';

import { AuthUserAction, RegisterUserAction } from 'actions';
import * as ActionTypes from 'action-types';
import { UserInterface } from 'interfaces';

interface UserInitialState {
  loading?: boolean;
  success?: boolean;
  error?: string;
}

interface AuthUserState extends UserInitialState {
  user?: UserInterface;
  auth?: boolean;
}

export const authUserReducer: Reducer<AuthUserState, AuthUserAction> = (
  state = {},
  action
) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER_REQUEST:
      return {
        loading: true,
      };
    case ActionTypes.AUTH_USER_SUCCESS:
      return {
        loading: true,
        user: action.payload,
        auth: true,
      };
    case ActionTypes.AUTH_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

interface RegisterUserState extends UserInitialState {
  token: string | null;
}

export const registerUserReducer: Reducer<
  RegisterUserState,
  RegisterUserAction
> = (state = { token: null }, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.REGISTER_USER_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case ActionTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};
