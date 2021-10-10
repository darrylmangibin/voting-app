import { Reducer } from 'redux';

import { RegisterUserAction } from 'actions';
import * as ActionTypes from 'action-types';

interface UserInitialState {
  loading?: boolean;
  success?: boolean;
  error?: string;
}

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
