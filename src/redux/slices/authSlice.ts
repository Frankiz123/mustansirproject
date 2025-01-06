import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthState} from '../reduxTypes';
import {loginApiHandler, registerApiHandler} from '../actions';

const initialState: AuthState = {
  token: null,
  loading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
      AsyncStorage.setItem('jwtToken', action.payload);
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('jwtToken');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerApiHandler.pending, state => {
        state.loading = true;
      })
      .addCase(
        registerApiHandler.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      )

      .addCase(
        registerApiHandler.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      );

    builder
      .addCase(loginApiHandler.pending, state => {
        state.loading = true;
      })
      // .addCase(
      //   loginApiHandler.fulfilled,
      //   (state, action: PayloadAction<any>) => {
      //     state.loading = false;
      //   },
      // )
      .addCase(
        loginApiHandler.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
          AsyncStorage.setItem('jwtToken', action.payload);
        },
      )
      .addCase(
        loginApiHandler.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      );
  },
});

export const {setToken, clearToken} = authSlice.actions;

export default authSlice.reducer;
