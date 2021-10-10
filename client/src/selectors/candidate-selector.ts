import { RootState } from 'reducers';
import { createSelector } from 'reselect';

export const candidateListSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.candidateList
);

export const candidateCreateSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.candidateCreate
);

export const candidateUpdateSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.candidateUpdate
);

export const candidateDetailsSelector = createSelector(
  [(state: RootState) => state],
  (state) => state.candidateDetails
);
