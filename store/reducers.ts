import { combineReducers } from 'redux';
import {
  reducer as appReducer,
  sliceKey as sliceKeyApp,
} from '@containers/Home/slice';

const combinedReducer = combineReducers({
  [sliceKeyApp]: appReducer,
});

export const reducers = (state, action) => {
  return combinedReducer(state, action);
};
