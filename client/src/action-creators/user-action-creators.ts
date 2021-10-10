import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

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
} from 'actions';
import { UserInterface } from 'interfaces';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

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
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<RegisterUserActionFail>({
        type: ActionTypes.REGISTER_USER_FAIL,
        payload: error.response?.data.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || 'Server Error',
        severity: 'error',
      });
    }
  };

export const registerUserReset = (): RegisterUserActionReset => ({
  type: ActionTypes.REGISTER_USER_RESET,
});
