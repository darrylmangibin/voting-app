import { Reducer } from 'redux';

import * as ActionTypes from 'action-types';
import { CandidateInterface } from 'interfaces';
import {
  CandidateCreateAction,
  CandidateDetailsAction,
  CandidateListAction,
  CandidateUpdateAction,
} from 'actions/candidate';

interface CandidateInitialState {
  loading?: boolean;
  success?: boolean;
  error?: string;
}

interface CandidateListState extends CandidateInitialState {
  candidates: CandidateInterface[];
}

export const candidateListReducer: Reducer<
  CandidateListState,
  CandidateListAction
> = (state = { candidates: [] }, action) => {
  switch (action.type) {
    case ActionTypes.CANDIDATE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CANDIDATE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        candidates: action.payload,
      };
    case ActionTypes.CANDIDATE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.CANDIDATE_LIST_RESET:
      return { candidates: [] };
    default:
      return state;
  }
};

interface CandidateCreateState extends CandidateInitialState {
  candidate?: CandidateInterface;
}

export const candidateCreateReducer: Reducer<
  CandidateCreateState,
  CandidateCreateAction
> = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.CANDIDATE_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CANDIDATE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        candidate: action.payload,
        success: true,
      };
    case ActionTypes.CANDIDATE_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.CANDIDATE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

interface CandidateUpdateState extends CandidateInitialState {
  candidate?: CandidateInterface;
}

export const candidateUpdateReducer: Reducer<
  CandidateUpdateState,
  CandidateUpdateAction
> = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.CANDIDATE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CANDIDATE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        candidate: action.payload,
        success: true,
      };
    case ActionTypes.CANDIDATE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.CANDIDATE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

interface CandidateDetailsState extends CandidateInitialState {
  candidate?: CandidateInterface;
}

export const candidateDetailsReducer: Reducer<
  CandidateDetailsState,
  CandidateDetailsAction
> = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.CANDIDATE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CANDIDATE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        candidate: action.payload,
        success: true,
      };
    case ActionTypes.CANDIDATE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.CANDIDATE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
