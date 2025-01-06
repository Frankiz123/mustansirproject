import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../store';

const getAuth = (state: RootState) => state.auth;

export const selectAuth = createSelector(getAuth, auth => auth);
