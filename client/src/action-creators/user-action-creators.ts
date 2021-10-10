import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { Dispatch } from 'redux';

import * as ActionTypes from 'action-types';
import { RootState } from 'reducers';
import {
  RegisterUserAction,
  RegisterUserActionFail,
  RegisterUserActionRequest,
  RegisterUserActionSuccess,
  RegisterUserActionReset,
  SnackbarAction,
  SnackBarActionOpen,
  AuthUserAction,
  AuthUserActionRequest,
  AuthUserActionSuccess,
  AuthUserActionFail,
  LoginUserAction,
  LoginUserActionRequest,
  LoginUserActionSuccess,
  LoginUserActionFail,
} from 'actions';
import { UserInterface } from 'interfaces';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const authUser =
  (): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    AuthUserAction
  > =>
  async (dispatch) => {
    const token: string | null = localStorage.getItem('token');

    let config: AxiosRequestConfig | undefined;

    if (token) {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    try {
      dispatch<AuthUserActionRequest>({
        type: ActionTypes.AUTH_USER_REQUEST,
      });

      const { data } = await axios.get<UserInterface>('/api/profile', config);

      dispatch<AuthUserActionSuccess>({
        type: ActionTypes.AUTH_USER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<AuthUserActionFail>({
        type: ActionTypes.AUTH_USER_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

type RegisterUserData = Pick<UserInterface, 'firstName' | 'lastName' | 'email'>;

export const registerUser =
  (
    userData: RegisterUserData
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    RegisterUserAction | SnackbarAction
  > =>
  async (dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch<RegisterUserActionRequest>({
        type: ActionTypes.REGISTER_USER_REQUEST,
      });

      const { data } = await axios.post<
        RegisterUserData,
        AxiosResponse<{ token: string }>
      >('/api/users', userData, config);

      dispatch<RegisterUserActionSuccess>({
        type: ActionTypes.REGISTER_USER_SUCCESS,
        payload: data.token,
      });

      dispatch(authUser());

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: 'Register success',
        severity: 'success',
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<RegisterUserActionFail>({
        type: ActionTypes.REGISTER_USER_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const registerUserReset = (): RegisterUserActionReset => ({
  type: ActionTypes.REGISTER_USER_RESET,
});

export const loginUser =
  (
    userData: Pick<UserInterface, 'email'> & { password: string }
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    LoginUserAction | SnackBarActionOpen
  > =>
  async (dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      dispatch<LoginUserActionRequest>({
        type: ActionTypes.LOGIN_USER_REQUEST,
      });

      const { data } = await axios.post<
        typeof userData,
        AxiosResponse<{ token: string }>
      >('/api/users/login', userData, config);

      dispatch<LoginUserActionSuccess>({
        type: ActionTypes.LOGIN_USER_SUCCESS,
        payload: data.token,
      });

      dispatch(authUser());
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<LoginUserActionFail>({
        type: ActionTypes.LOGIN_USER_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const logoutUser = () => (dispatch: Dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: ActionTypes.LOGOUT_USER });
  dispatch({ type: ActionTypes.REGISTER_USER_RESET });
};
