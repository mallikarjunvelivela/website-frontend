import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
});

let activeRequests = 0;

const updateLoader = () => {
  const isLoading = activeRequests > 0;
  window.dispatchEvent(new CustomEvent('global-loader', { detail: { isLoading } }));
};

api.interceptors.request.use(
  (config) => {
    activeRequests++;
    updateLoader();
    return config;
  },
  (error) => {
    activeRequests--;
    updateLoader();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    activeRequests--;
    updateLoader();
    return response;
  },
  (error) => {
    activeRequests--;
    updateLoader();
    return Promise.reject(error);
  }
);

export default api;