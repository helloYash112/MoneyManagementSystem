import axios from "axios";

const url = "http://localhost:8080";

export const api = axios.create({
  baseURL: url,
  timeout: 5000
});

// Interceptor to inject token dynamically
api.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));
