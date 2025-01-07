import axios from 'axios';

import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {baseUrl} from '../../../utils/Network';

interface AuthUrlResponse {
  auth_url: string;
}

export const readEmailApiHandler = createAsyncThunk(
  'protected/auth_url',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        const response = await axios.get<AuthUrlResponse>(
          `${baseUrl}/auth_url`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          },
        );
        return response.data.auth_url;
      }
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

export const readEmailAuthorizeApiHandler = createAsyncThunk(
  'protected/authorize',
  async ({code}: {code: string}, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        const response = await axios.post(
          `${baseUrl}/authorize`,
          {code: code},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          },
        );
        return response.status === 200 ? true : false;
      }
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

export const readEmailReadInboxApiHandler = createAsyncThunk(
  'protected/read_inbox',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        const response = await axios.get(`${baseUrl}/read_inbox`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        return response.status === 200 ? true : false;
      }
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);
