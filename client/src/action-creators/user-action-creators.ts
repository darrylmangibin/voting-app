import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { Dispatch } from 'redux';

import * as ActionTypes from 'action-types';
import { RootState } from 'reducers';
import {
  UserRegisterAction,
  UserRegisterActionFail,
  UserRegisterActionRequest,
  UserRegisterActionSuccess,
  UserRegisterActionReset,
  SnackbarAction,
  SnackBarActionOpen,
  UserAuthAction,
  UserAuthActionRequest,
  UserAuthActionSuccess,
  UserAuthActionFail,
  UserLoginAction,
  UserLoginActionRequest,
  UserLoginActionSuccess,
  UserLoginActionFail,
  UserProfileAction,
  UserProfileActionRequest,
  UserProfileActionSuccess,
  UserProfileActionFail,
  UserProfileActionReset,
  UserProfileUpdateAction,
  UserProfileUpdateActionRequest,
  UserProfileUpdateActionSuccess,
  UserProfileUpdateActionFail,
  UserProfileUpdateActionReset,
  UserListAction,
  UserListActionRequest,
  UserListActionSuccess,
  UserListActionFail,
  UserListActionReset,
} from 'actions';
import { UserInterface } from 'interfaces';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const userAuth =
  (): ThunkAction<Promise<void>, RootState, undefined, UserAuthAction> =>
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
      dispatch<UserAuthActionRequest>({
        type: ActionTypes.USER_AUTH_REQUEST,
      });

      const { data } = await axios.get<UserInterface>('/api/profile', config);

      dispatch<UserAuthActionSuccess>({
        type: ActionTypes.USER_AUTH_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<UserAuthActionFail>({
        type: ActionTypes.USER_AUTH_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

type UserRegisterData = Pick<UserInterface, 'firstName' | 'lastName' | 'email'>;

export const userRegister =
  (
    userData: UserRegisterData
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    UserRegisterAction | SnackbarAction
  > =>
  async (dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch<UserRegisterActionRequest>({
        type: ActionTypes.USER_REGISTER_REQUEST,
      });

      const { data } = await axios.post<
        UserRegisterData,
        AxiosResponse<{ token: string }>
      >('/api/users', userData, config);

      dispatch<UserRegisterActionSuccess>({
        type: ActionTypes.USER_REGISTER_SUCCESS,
        payload: data.token,
      });

      dispatch(userAuth());

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: 'Register success',
        severity: 'success',
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<UserRegisterActionFail>({
        type: ActionTypes.USER_REGISTER_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const userRegisterReset = (): UserRegisterActionReset => ({
  type: ActionTypes.USER_REGISTER_RESET,
});

export const userLogin =
  (
    userData: Pick<UserInterface, 'email'> & { password: string }
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    UserLoginAction | SnackBarActionOpen
  > =>
  async (dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch<UserLoginActionRequest>({
        type: ActionTypes.USER_LOGIN_REQUEST,
      });

      const { data } = await axios.post<
        typeof userData,
        AxiosResponse<{ token: string }>
      >('/api/users/login', userData, config);

      dispatch<UserLoginActionSuccess>({
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload: data.token,
      });

      dispatch(userAuth());
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<UserLoginActionFail>({
        type: ActionTypes.USER_LOGIN_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const userProfile =
  (): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    UserProfileAction | SnackBarActionOpen
  > =>
  async (dispatch) => {
    const token = localStorage.getItem('token');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch<UserProfileActionRequest>({
        type: ActionTypes.USER_PROFILE_REQUEST,
      });

      const { data } = await axios.get<UserInterface>('/api/profile', config);

      dispatch<UserProfileActionSuccess>({
        type: ActionTypes.USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<UserProfileActionFail>({
        type: ActionTypes.USER_PROFILE_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const userProfileReset = (): UserProfileActionReset => ({
  type: ActionTypes.USER_PROFILE_RESET,
});

export const userProfileUpdate =
  (
    userData: Pick<UserInterface, 'firstName' | 'lastName' | 'email'> & {
      password: string;
    }
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    UserProfileUpdateAction | UserAuthActionSuccess | SnackBarActionOpen
  > =>
  async (dispatch) => {
    const token = localStorage.getItem('token');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch<UserProfileUpdateActionRequest>({
        type: ActionTypes.USER_PROFILE_UPDATE_REQUEST,
      });

      const { data } = await axios.put<
        typeof userData,
        AxiosResponse<UserInterface>
      >('/api/profile', userData, config);

      dispatch<UserProfileUpdateActionSuccess>({
        type: ActionTypes.USER_PROFILE_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch<UserAuthActionSuccess>({
        type: ActionTypes.USER_AUTH_SUCCESS,
        payload: data,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: 'Profile successfuly updated',
        severity: 'success',
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<UserProfileUpdateActionFail>({
        type: ActionTypes.USER_PROFILE_UPDATE_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const userProfileUpdateReset = (): UserProfileUpdateActionReset => ({
  type: ActionTypes.USER_PROFILE_UPDATE_RESET,
});

export const userList =
  (): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    UserListAction | SnackBarActionOpen
  > =>
  async (dispatch) => {
    const token = localStorage.getItem('token');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch<UserListActionRequest>({
        type: ActionTypes.USER_LIST_REQUEST,
      });

      const { data } = await axios.get<UserInterface[]>('/api/users', config);

      dispatch<UserListActionSuccess>({
        type: ActionTypes.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<UserListActionFail>({
        type: ActionTypes.USER_LIST_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const userListReset = (): UserListActionReset => ({
  type: ActionTypes.USER_LIST_RESET,
});

export const logoutUser = () => (dispatch: Dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: ActionTypes.USER_LOGOUT });
  dispatch({ type: ActionTypes.USER_REGISTER_RESET });
};
