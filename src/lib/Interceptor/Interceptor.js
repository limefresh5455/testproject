// src/lib/axios.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    let token;  
    if (typeof window !== 'undefined') {
      const userData  = localStorage.getItem('authData');  
      const parsedUserData = JSON.parse(userData);
      token = parsedUserData?.tokens?.access?.token;
    }
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // alert(error.response?.data?.message);
      alert(error.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
