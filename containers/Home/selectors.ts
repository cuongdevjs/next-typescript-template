/* eslint-disable no-nested-ternary */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@type/index';

import { initialState } from './slice';

const selectDomain = (state: RootState) => state.app || initialState;

export const selectHome = createSelector(
  [selectDomain],
  state => state.home || undefined,
);
