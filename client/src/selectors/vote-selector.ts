import { RootState } from 'reducers';
import { createSelector } from 'reselect';

export const voteCreateSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.voteCreate
);
