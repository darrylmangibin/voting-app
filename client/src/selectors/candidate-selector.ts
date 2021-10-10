import { RootState } from 'reducers';
import { createSelector } from 'reselect';

export const candidateListSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.candidateList
);
