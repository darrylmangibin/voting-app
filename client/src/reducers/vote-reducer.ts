import { Reducer } from 'redux';

import * as ActionTypes from 'action-types';
import { VoteInterface } from 'interfaces';
import { VoteCreateAction } from 'actions/vote';

interface VoteInitialState {
  loading?: boolean;
  success?: boolean;
  error?: string;
}

interface VoteCreateState extends VoteInitialState {
  vote?: VoteInterface;
}

export const voteCreateReducer: Reducer<VoteCreateState, VoteCreateAction> = (
  state = {},
  action
) => {
  switch (action.type) {
    case ActionTypes.VOTE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ActionTypes.VOTE_CREATE_SUCCESS:
      return {
        loading: false,
        vote: action.payload,
        success: true,
      };
    case ActionTypes.VOTE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ActionTypes.VOTE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
