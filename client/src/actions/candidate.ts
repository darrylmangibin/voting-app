import { Action } from 'redux';

import * as ActionTypes from 'action-types';
import { CandidateInterface } from 'interfaces';

export interface CandidateListActionRequest
  extends Action<typeof ActionTypes.CANDIDATE_LIST_REQUEST> {}

export interface CandidateListActionSuccess
  extends Action<typeof ActionTypes.CANDIDATE_LIST_SUCCESS> {
  payload: CandidateInterface[];
}

export interface CandidateListActionFail
  extends Action<typeof ActionTypes.CANDIDATE_LIST_FAIL> {
  payload?: string;
}

export interface CandidateListActionReset
  extends Action<typeof ActionTypes.CANDIDATE_LIST_RESET> {}

export type CandidateListAction =
  | CandidateListActionRequest
  | CandidateListActionSuccess
  | CandidateListActionFail
  | CandidateListActionReset;

export interface CandidateCreateActionRequest
  extends Action<typeof ActionTypes.CANDIDATE_CREATE_REQUEST> {}

export interface CandidateCreateActionSuccess
  extends Action<typeof ActionTypes.CANDIDATE_CREATE_SUCCESS> {
  payload: CandidateInterface;
}

export interface CandidateCreateActionFail
  extends Action<typeof ActionTypes.CANDIDATE_CREATE_FAIL> {
  payload?: string;
}

export interface CandidateCreateActionReset
  extends Action<typeof ActionTypes.CANDIDATE_CREATE_RESET> {}

export type CandidateCreateAction =
  | CandidateCreateActionRequest
  | CandidateCreateActionSuccess
  | CandidateCreateActionFail
  | CandidateCreateActionReset;
