import { Reducer } from 'redux';

import {
  UserAuthAction,
  UserLoginAction,
  UserLogoutAction,
  UserProfileAction,
  UserRegisterAction,
} from 'actions';
import * as ActionTypes from 'action-types';
import { UserInterface } from 'interfaces';

interface UserInitialState {
  loading?: boolean;
  success?: boolean;
  error?: string;
}

interface UserAuthState extends UserInitialState {
  user?: UserInterface;
  auth?: boolean;
}

export const userAuthReducer: Reducer<
  UserAuthState,
  UserAuthAction | UserLogoutAction
> = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.USER_AUTH_REQUEST:
      return {
        loading: true,
      };
    case ActionTypes.USER_AUTH_SUCCESS:
      return {
        loading: true,
        user: action.payload,
        auth: true,
      };
    case ActionTypes.USER_AUTH_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ActionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

interface UserRegisterState extends UserInitialState {
  token: string | null;
}

export const userRegisterReducer: Reducer<
  UserRegisterState,
  UserRegisterAction
> = (state = { token: null }, action) => {
  switch (action.type) {
    case ActionTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case ActionTypes.USER_REGISTER_FAIL:
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

interface UserLoginState extends UserInitialState {
  token: string | null;
}

export const userLoginReducer: Reducer<UserLoginState, UserLoginAction> = (
  state = { token: null },
  action
) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case ActionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.USER_LOGIN_RESET:
      return { token: null };
    default:
      return state;
  }
};

interface UserProfileState extends UserInitialState {
  user?: UserInterface;
}

export const userProfileReducer: Reducer<UserProfileState, UserProfileAction> =
  (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.USER_PROFILE_REQUEST:
        return {
          loading: true,
        };
      case ActionTypes.USER_PROFILE_SUCCESS:
        return {
          loading: false,
          user: action.payload,
        };
      case ActionTypes.USER_PROFILE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case ActionTypes.USER_PROFILE_RESET:
        return {};
      default:
        return state;
    }
  };
