import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the base URL as needed
  timeout: 10000, // Timeout of 10 seconds
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Only set Content-Type for JSON requests, let FormData set it automatically
    if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
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
export const createStudent = (data) => API.post('/teachers/students', data, {
  headers: {
    'Content-Type': 'multipart/form-data' // Only needed for file uploads
  }
});
export const sendEmail = (data) => API.post('/email/send-email', data);
export const getStudentDiagnoses = (studentId) => API.get(`/diagnosis/student/${studentId}`);
export const getStudents = (teacherEmail) => API.get(`/teachers/${teacherEmail}/students`);
export const delStudent = (studentId) => API.delete(`/students/${studentId}`);
export const deleteDiagnosis = (diagnosisId) => API.delete(`/diagnosis/${diagnosisId}`);
export const postDiagnosis = (diagnosis, studentId) => API.post(`/students/${studentId}/diagnosis`, diagnosis);
