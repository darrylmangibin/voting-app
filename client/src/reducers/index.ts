import { combineReducers } from 'redux';

const reducers = combineReducers({
  test: () => 'test',
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
