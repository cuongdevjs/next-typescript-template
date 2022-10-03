import { createSlice } from '@reduxjs/toolkit';
import { ContainerState } from './typesIndex';

// The initial state of the App container
export const initialState: ContainerState = {
  home: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const { actions, reducer, name: sliceKey } = appSlice;

export default reducer;
