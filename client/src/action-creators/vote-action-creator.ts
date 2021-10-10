import { ThunkAction } from 'redux-thunk';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { RootState } from 'reducers';
import { CandidateInterface, UserInterface, VoteInterface } from 'interfaces';
import {
  VoteCreateAction,
  VoteCreateActionFail,
  VoteCreateActionRequest,
  VoteCreateActionSuccess,
} from 'actions/vote';
import * as ActionTypes from 'action-types';
import { SnackBarActionOpen, UserAuthActionSuccess } from 'actions';

export const voteCreate =
  (voteData: {
    candidate: CandidateInterface['_id'];
  }): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    VoteCreateAction | SnackBarActionOpen | UserAuthActionSuccess
  > =>
  async (dispatch, getState) => {
    const token = localStorage.getItem('token');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch<VoteCreateActionRequest>({
        type: ActionTypes.VOTE_CREATE_REQUEST,
      });

      const { data } = await axios.post<
        typeof voteData,
        AxiosResponse<VoteInterface>
      >('/api/votes', voteData, config);

      dispatch<VoteCreateActionSuccess>({
        type: ActionTypes.VOTE_CREATE_SUCCESS,
        payload: data,
      });

      dispatch<UserAuthActionSuccess>({
        type: ActionTypes.USER_AUTH_SUCCESS,
        payload: { ...(getState().userAuth.user as UserInterface), vote: data },
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: 'Your vote is successfully submitted',
        severity: 'success',
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<VoteCreateActionFail>({
        type: ActionTypes.VOTE_CREATE_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };
