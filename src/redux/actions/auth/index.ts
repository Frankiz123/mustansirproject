import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import {baseUrl} from '../../../utils/Network';

interface IAuthRegister {
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
  password: string;
  password_confirm: string;
  verified: boolean;
  verification_code: string;
}

interface IAuthLogin {
  email: string;
  password: string;
}

// export const registerApiHandler = createAsyncThunk(
//   'auth/register',
//   async (
//     {
//       email,
//       name,
//       role,
//       created_at,
//       updated_at,
//       password,
//       password_confirm,
//       verification_code,
//       verified,
//     }: IAuthRegister,
//     {rejectWithValue},
//   ) => {
//     try {
//       const response = await axios.post(`${baseUrl}/auth/register`, {
//         email,
//         name,
//         role,
//         created_at,
//         updated_at,
//         password,
//         password_confirm,
//         verification_code,
//         verified,
//       });

//       console.log('auth Register Response ::: ', response);
//       return response.data.verified;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Register failed',
//       );
//     }
//   },
// );

export const registerApiHandler = createAsyncThunk(
  'auth/register',
  async (
    {
      email,
      name,
      role,
      created_at,
      updated_at,
      password,
      password_confirm,
      verification_code,
      verified,
    }: IAuthRegister,
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, {
        email,
        name,
        role,
        created_at,
        updated_at,
        password,
        password_confirm,
        verification_code,
        verified,
      });

      console.log('auth Register Response ::: ', response);
      return response.data.detail;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Register failed');
    }
  },
);

export const loginApiHandler = createAsyncThunk(
  'auth/login',
  async ({email, password}: IAuthLogin, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });

      const {access_token} = response.data;
      return access_token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);
