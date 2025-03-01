// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Define API endpoint
// const VOICE_SEARCH_URL = 'https://corto-dev.axcelerateai.com/voice_search?response_type=File&include_discount_info=true';

// interface IVoiceSearchResponse {
//   data: any; // Update the type according to API response
// }

// export const voiceSearchApiHandler = createAsyncThunk(
//   'voice/search',
//   async (fileUri: string, { rejectWithValue }) => {
//     try {
//       // Prepare FormData
//       const formData = new FormData();
//       formData.append('file', {
//         uri: fileUri,
//         name: 'audio.mp3',
//         type: 'audio/mpeg',
//       });

//       // API call
//       const response = await axios.post<IVoiceSearchResponse>(VOICE_SEARCH_URL, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Accept: 'application/json',
//         },
//       });

//       console.log('Voice Search API Response:', response.data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Voice search failed');
//     }
//   }
// );
