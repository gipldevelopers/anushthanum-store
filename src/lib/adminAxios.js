/**
 * Axios instance for Anushthanum Admin API.
 * Uses admin_token for all requests. Use for admin-only endpoints (dashboard, categories, products, etc.).
 */
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const ADMIN_TOKEN_KEY = 'admin_token';

function getAdminToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

adminApi.interceptors.request.use(
  (config) => {
    const token = getAdminToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        localStorage.removeItem('admin_user');
      } catch {}
    }
    return Promise.reject(error);
  }
);

export default adminApi;
