import { Reducer } from 'redux';

import * as ActionTypes from 'action-types';
import { CandidateInterface } from 'interfaces';
import { CandidateListAction } from 'actions/candidate';

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
