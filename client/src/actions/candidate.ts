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

export interface CandidateUpdateActionRequest
  extends Action<typeof ActionTypes.CANDIDATE_UPDATE_REQUEST> {}

export interface CandidateUpdateActionSuccess
  extends Action<typeof ActionTypes.CANDIDATE_UPDATE_SUCCESS> {
  payload: CandidateInterface;
}

export interface CandidateUpdateActionFail
  extends Action<typeof ActionTypes.CANDIDATE_UPDATE_FAIL> {
  payload?: string;
}

export interface CandidateUpdateActionReset
  extends Action<typeof ActionTypes.CANDIDATE_UPDATE_RESET> {}

export type CandidateUpdateAction =
  | CandidateUpdateActionRequest
  | CandidateUpdateActionSuccess
  | CandidateUpdateActionFail
  | CandidateUpdateActionReset;

  export interface CandidateDetailsActionRequest
  extends Action<typeof ActionTypes.CANDIDATE_DETAILS_REQUEST> {}

export interface CandidateDetailsActionSuccess
  extends Action<typeof ActionTypes.CANDIDATE_DETAILS_SUCCESS> {
  payload: CandidateInterface;
}

export interface CandidateDetailsActionFail
  extends Action<typeof ActionTypes.CANDIDATE_DETAILS_FAIL> {
  payload?: string;
}

export interface CandidateDetailsActionReset
  extends Action<typeof ActionTypes.CANDIDATE_DETAILS_RESET> {}

export type CandidateDetailsAction =
  | CandidateDetailsActionRequest
  | CandidateDetailsActionSuccess
  | CandidateDetailsActionFail
  | CandidateDetailsActionReset;

