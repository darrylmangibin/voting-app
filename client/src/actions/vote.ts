import { Action } from 'redux';

import * as ActionTypes from 'action-types';

import { VoteInterface } from 'interfaces';

export interface VoteCreateActionRequest
  extends Action<typeof ActionTypes.VOTE_CREATE_REQUEST> {}

export interface VoteCreateActionSuccess
  extends Action<typeof ActionTypes.VOTE_CREATE_SUCCESS> {
  payload: VoteInterface;
}

export interface VoteCreateActionFail extends Action<typeof ActionTypes.VOTE_CREATE_FAIL> {
  payload?: string;
}

export interface VoteCreateActionReset
  extends Action<typeof ActionTypes.VOTE_CREATE_RESET> {}

export type VoteCreateAction =
  | VoteCreateActionRequest
  | VoteCreateActionSuccess
  | VoteCreateActionFail
  | VoteCreateActionReset;
