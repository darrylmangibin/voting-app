import { ThunkAction } from 'redux-thunk';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { RootState } from 'reducers';
import {
  CandidateListAction,
  CandidateListActionFail,
  CandidateListActionRequest,
  CandidateListActionSuccess,
} from 'actions/candidate';
import * as ActionTypes from 'action-types';
import { CandidateInterface } from 'interfaces';
import { SnackBarActionOpen } from 'actions';

export const candidteList =
  (): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    CandidateListAction | SnackBarActionOpen
  > =>
  async (dispatch) => {
    const token = localStorage.getItem('token');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch<CandidateListActionRequest>({
        type: ActionTypes.CANDIDATE_LIST_REQUEST,
      });

      const { data } = await axios.get<CandidateInterface[]>(
        '/api/candidates',
        config
      );

      dispatch<CandidateListActionSuccess>({
        type: ActionTypes.CANDIDATE_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<CandidateListActionFail>({
        type: ActionTypes.CANDIDATE_LIST_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };
