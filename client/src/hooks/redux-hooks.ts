/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RootState } from 'reducers';
import * as actionCreators from 'action-creators';

export const typedUseSelector: TypedUseSelectorHook<RootState> = useSelector;

export const typedUseDispatch = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
