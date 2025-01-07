import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthState} from '../reduxTypes';
import {loginApiHandler, registerApiHandler} from '../actions';
import {collectBearerTokenHandler} from '../../utils/apiUtility';

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
        (state, _action: PayloadAction<any>) => {
          state.loading = false;
        },
      )

      .addCase(
        registerApiHandler.rejected,
        (state, _action: PayloadAction<any>) => {
          state.loading = false;
        },
      );

    builder
      .addCase(loginApiHandler.pending, state => {
        state.loading = true;
      })
      .addCase(
        loginApiHandler.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
          collectBearerTokenHandler(action.payload);
          AsyncStorage.setItem('jwtToken', action.payload);
        },
      )
      .addCase(
        loginApiHandler.rejected,
        (state, _action: PayloadAction<any>) => {
          state.loading = false;
        },
      );
  },
});

export const {setToken, clearToken} = authSlice.actions;

export default authSlice.reducer;
