import { ThunkAction } from 'redux-thunk';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { RootState } from 'reducers';
import {
  CandidateCreateAction,
  CandidateCreateActionFail,
  CandidateCreateActionRequest,
  CandidateCreateActionReset,
  CandidateCreateActionSuccess,
  CandidateListAction,
  CandidateListActionFail,
  CandidateListActionRequest,
  CandidateListActionReset,
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

export const canidateListReset = (): CandidateListActionReset => ({
  type: ActionTypes.CANDIDATE_LIST_RESET,
});

export const candidateCreate =
  (
    candidateData: Pick<
      CandidateInterface,
      'firstName' | 'lastName' | 'shortName'
    >
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    CandidateCreateAction | CandidateListActionSuccess | SnackBarActionOpen
  > =>
  async (dispatch, getState) => {
    const token = localStorage.getItem('token');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch<CandidateCreateActionRequest>({
        type: ActionTypes.CANDIDATE_CREATE_REQUEST,
      });

      const { data } = await axios.post<
        typeof candidateData,
        AxiosResponse<CandidateInterface>
      >('/api/candidates', candidateData, config);

      dispatch<CandidateCreateActionSuccess>({
        type: ActionTypes.CANDIDATE_CREATE_SUCCESS,
        payload: data,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: 'Candidate successfully created',
        severity: 'success',
      });

      dispatch<CandidateListActionSuccess>({
        type: ActionTypes.CANDIDATE_LIST_SUCCESS,
        payload: [...getState().candidateList.candidates, data],
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<CandidateCreateActionFail>({
        type: ActionTypes.CANDIDATE_CREATE_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const canidateCreateReset = (): CandidateCreateActionReset => ({
  type: ActionTypes.CANDIDATE_CREATE_RESET,
});
