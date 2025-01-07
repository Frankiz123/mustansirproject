import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../store';

const getReadEmail = (state: RootState) => state.readEmail;

export const selectReadEmail = createSelector(
  getReadEmail,
  readEmail => readEmail,
);
