import { ThunkAction } from 'redux-thunk';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { RootState } from 'reducers';
import {
  CandidateCreateAction,
  CandidateCreateActionFail,
  CandidateCreateActionRequest,
  CandidateCreateActionReset,
  CandidateCreateActionSuccess,
  CandidateDeleteAction,
  CandidateDeleteActionFail,
  CandidateDeleteActionRequest,
  CandidateDeleteActionReset,
  CandidateDeleteActionSuccess,
  CandidateDetailsAction,
  CandidateDetailsActionFail,
  CandidateDetailsActionRequest,
  CandidateDetailsActionReset,
  CandidateDetailsActionSuccess,
  CandidateListAction,
  CandidateListActionFail,
  CandidateListActionRequest,
  CandidateListActionReset,
  CandidateListActionSuccess,
  CandidateUpdateAction,
  CandidateUpdateActionFail,
  CandidateUpdateActionRequest,
  CandidateUpdateActionReset,
  CandidateUpdateActionSuccess,
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

export const candidateUpdate =
  (
    id: CandidateInterface['_id'],
    candidateData: Pick<
      CandidateInterface,
      'firstName' | 'lastName' | 'shortName'
    >
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    CandidateUpdateAction | CandidateListActionSuccess | SnackBarActionOpen
  > =>
  async (dispatch, getState) => {
    const token = localStorage.getItem('token');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch<CandidateUpdateActionRequest>({
        type: ActionTypes.CANDIDATE_UPDATE_REQUEST,
      });

      const { data } = await axios.put<
        typeof candidateData,
        AxiosResponse<CandidateInterface>
      >(`/api/candidates/${id}`, candidateData, config);

      dispatch<CandidateUpdateActionSuccess>({
        type: ActionTypes.CANDIDATE_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: 'Candidate successfully updated',
        severity: 'success',
      });

      dispatch<CandidateListActionSuccess>({
        type: ActionTypes.CANDIDATE_LIST_SUCCESS,
        payload: getState().candidateList.candidates.map((candidate) =>
          candidate._id === id ? data : candidate
        ),
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<CandidateUpdateActionFail>({
        type: ActionTypes.CANDIDATE_UPDATE_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const candidateUpdateReset = (): CandidateUpdateActionReset => ({
  type: ActionTypes.CANDIDATE_UPDATE_RESET,
});

export const candidateDetails =
  (
    id: CandidateInterface['_id']
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    CandidateDetailsAction | SnackBarActionOpen
  > =>
  async (dispatch) => {
    const token = localStorage.getItem('token');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch<CandidateDetailsActionRequest>({
        type: ActionTypes.CANDIDATE_DETAILS_REQUEST,
      });

      const { data } = await axios.get<CandidateInterface>(
        `/api/candidates/${id}`,
        config
      );

      dispatch<CandidateDetailsActionSuccess>({
        type: ActionTypes.CANDIDATE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<CandidateDetailsActionFail>({
        type: ActionTypes.CANDIDATE_DETAILS_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const candidateDetailsReset = (): CandidateDetailsActionReset => ({
  type: ActionTypes.CANDIDATE_DETAILS_RESET,
});

export const candidateDelete =
  (
    id: CandidateInterface['_id']
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    CandidateDeleteAction | SnackBarActionOpen | CandidateListActionSuccess
  > =>
  async (dispatch, getState) => {
    const token = localStorage.getItem('token');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch<CandidateDeleteActionRequest>({
        type: ActionTypes.CANDIDATE_DELETE_REQUEST,
      });

      const { data } = await axios.delete<CandidateInterface>(
        `/api/candidates/${id}`,
        config
      );

      dispatch<CandidateDeleteActionSuccess>({
        type: ActionTypes.CANDIDATE_DELETE_SUCCESS,
        payload: data,
      });

      dispatch<CandidateListActionSuccess>({
        type: ActionTypes.CANDIDATE_LIST_SUCCESS,
        payload: getState().candidateList.candidates.filter(
          (candidate) => candidate._id !== data._id
        ),
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: 'Candidate successfully delete',
        severity: 'success',
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      dispatch<CandidateDeleteActionFail>({
        type: ActionTypes.CANDIDATE_DELETE_FAIL,
        payload: error.response?.data.message || error.message,
      });

      dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  };

export const candidateDeleteReset = (): CandidateDeleteActionReset => ({
  type: ActionTypes.CANDIDATE_DELETE_RESET,
});
