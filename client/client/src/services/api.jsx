import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the base URL as needed
  timeout: 10000, // Timeout of 10 seconds
  withCredentials: true
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (data) => API.post('/login', data);
export const signup = (data) => API.post('/signup', data);
export const generateVerificationCode = (data) => API.post('/signup/generate-code', data);
export const completeSignup = (data) => API.post('/signup/complete-signup', data);
export const requestPasswordReset = (data) => API.post('/password/requestPasswordReset', data);
export const resetPassword = (data) => API.post('/password/resetPassword', data);
