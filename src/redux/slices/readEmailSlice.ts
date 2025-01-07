import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ReadEmailState} from '../reduxTypes';
import {
  readEmailApiHandler,
  readEmailAuthorizeApiHandler,
  readEmailReadInboxApiHandler,
} from '../actions';

const initialState: ReadEmailState = {
  read_auth_url: null,
  isAuthorize: false,
  isAuthorizeLoading: false,
  readEmailLoading: false,
  readInboxLoading: false,
  readInbox: false,
};

const readEmailSlice = createSlice({
  name: 'readEmail',
  initialState,
  reducers: {
    resetReadEmail(state) {
      state.read_auth_url = null;
      state.isAuthorize = false;
      state.isAuthorizeLoading = false;
      state.readEmailLoading = false;
      state.readInboxLoading = false;
      state.readInbox = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(readEmailApiHandler.pending, state => {
        state.readEmailLoading = true;
      })
      .addCase(
        readEmailApiHandler.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('readEmailApiHandler', action.payload);
          state.readEmailLoading = false;
          state.read_auth_url = action.payload;
        },
      )
      .addCase(
        readEmailApiHandler.rejected,
        (state, _action: PayloadAction<any>) => {
          state.readEmailLoading = false;
        },
      );

    builder
      .addCase(readEmailAuthorizeApiHandler.pending, state => {
        state.isAuthorizeLoading = true;
      })
      .addCase(
        readEmailAuthorizeApiHandler.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isAuthorizeLoading = false;
          state.isAuthorize = action.payload;
        },
      )
      .addCase(
        readEmailAuthorizeApiHandler.rejected,
        (state, _action: PayloadAction<any>) => {
          state.isAuthorizeLoading = false;
        },
      );

    builder
      .addCase(readEmailReadInboxApiHandler.pending, state => {
        state.readInboxLoading = true;
      })
      .addCase(
        readEmailReadInboxApiHandler.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.readInboxLoading = false;
          state.readInbox = action.payload;
        },
      )
      .addCase(
        readEmailReadInboxApiHandler.rejected,
        (state, _action: PayloadAction<any>) => {
          state.readInboxLoading = false;
        },
      );
  },
});

export const {resetReadEmail} = readEmailSlice.actions;

export default readEmailSlice.reducer;
