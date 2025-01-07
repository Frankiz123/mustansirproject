// import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';

// import {baseUrl} from './Network';

// // Create an instance of axios
// const apiClient = axios.create({
//   baseURL: baseUrl, // Replace with your API base URL
//   timeout: 10000, // Timeout in milliseconds
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     token: '493c42937886cGuTRdvN127360454',
//   },
// });

// // Request interceptor to add authorization headers (if needed)
// // apiClient.interceptors.request.use(
// //   config => {
// //     // Add any custom headers or tokens here, e.g.,
// //     const token = '493c42937886cGuTRdvN127360454';
// //     if (token) {
// //       config.headers.Authorization = token;
// //     }
// //     return config;
// //   },
// //   error => {
// //     return Promise.reject(error);
// //   },
// // );

// // Response interceptor to handle responses and errors
// apiClient.interceptors.response.use(
//   response => response,
//   error => {
//     // Handle errors globally (e.g., log out the user on 401, show error messages)
//     if (error.response) {
//       console.error('API Error:', error.response.data);
//     }
//     return Promise.reject(error);
//   },
// );

// // Define a generic API request function
// export const apiRequest = async <T>(
//   endpoint: string,
//   method: Method,
//   options?: {
//     params?: Record<string, any>;
//     data?: Record<string, any>;
//     config?: AxiosRequestConfig;
//   },
// ): Promise<T> => {
//   const {params, data, config} = options || {};

//   try {
//     const response: AxiosResponse<T> = await apiClient.request<T>({
//       url: endpoint,
//       method,
//       params,
//       data,
//       ...config,
//     });
//     return response.data;
//   } catch (error: any) {
//     throw error;
//   }
// };

// // Export common API functions for convenience
// export const get = <T>(
//   endpoint: string,
//   params?: Record<string, any>,
//   config?: AxiosRequestConfig,
// ) => apiRequest<T>(endpoint, 'GET', {params, config});

// export const post = <T>(
//   endpoint: string,
//   data?: Record<string, any>,
//   config?: AxiosRequestConfig,
// ) => apiRequest<T>(endpoint, 'POST', {data, config});

// export const put = <T>(
//   endpoint: string,
//   data?: Record<string, any>,
//   config?: AxiosRequestConfig,
// ) => apiRequest<T>(endpoint, 'PUT', {data, config});

// export const del = <T>(
//   endpoint: string,
//   data?: Record<string, any>,
//   config?: AxiosRequestConfig,
// ) => apiRequest<T>(endpoint, 'DELETE', {data, config});

// // Example usage
// // const fetchData = async () => {
// //   try {
// //     const data = await get<MyDataType>('/endpoint', { param1: 'value1' });
// //     console.log(data);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // };

// new code

import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';

import {baseUrl} from './Network';

// Create an instance of axios
export const collectBearerTokenHandler = (token: string) => {
  const apiClient = axios.create({
    baseURL: baseUrl, // Replace with your API base URL
    timeout: 10000, // Timeout in milliseconds
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  // Add a request interceptor to attach the token
  apiClient.interceptors.request.use(
    config => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // Response interceptor to handle responses and errors
  apiClient.interceptors.response.use(
    response => response,
    error => {
      // Handle errors globally (e.g., log out the user on 401, show error messages)
      if (error.response) {
        console.error('API Error:', error.response.data);
      }
      return Promise.reject(error);
    },
  );

  return apiClient;
};

// Define a generic API request function
export const apiRequest = async <T>(
  endpoint: string,
  method: Method,
  options?: {
    params?: Record<string, any>;
    data?: Record<string, any>;
    config?: AxiosRequestConfig;
  },
): Promise<T> => {
  const {params, data, config} = options || {};
  const apiClient = collectBearerTokenHandler(config?.headers?.Authorization);

  try {
    const response: AxiosResponse<T> = await apiClient.request<T>({
      url: endpoint,
      method,
      params,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Export common API functions for convenience
export const get = <T>(
  endpoint: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig,
) => apiRequest<T>(endpoint, 'GET', {params, config});

export const post = <T>(
  endpoint: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig,
) => apiRequest<T>(endpoint, 'POST', {data, config});

export const put = <T>(
  endpoint: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig,
) => apiRequest<T>(endpoint, 'PUT', {data, config});

export const del = <T>(
  endpoint: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig,
) => apiRequest<T>(endpoint, 'DELETE', {data, config});

// Example usage
// const fetchData = async () => {
//   try {
//     const data = await get<MyDataType>('/endpoint', { param1: 'value1' });
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };
