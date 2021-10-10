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
