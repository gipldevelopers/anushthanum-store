/**
 * Axios instance for Anushthanum API (user + public routes).
 * Attaches user token for /auth/me; no token for public auth routes.
 */
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const AUTH_STORAGE_KEY = 'anushthanum_auth';
const ADMIN_TOKEN_KEY = 'admin_token';

function getUserToken() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : null;
    return data?.accessToken || null;
  } catch {
    return null;
  }
}

function getAdminToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add Bearer token by route (user vs admin vs public)
api.interceptors.request.use(
  (config) => {
    const url = config.url || '';

    // Public routes – no token
    const publicRoutes = [
      '/auth/register',
      '/auth/send-otp',
      '/auth/verify-otp',
      '/auth/login',
      '/auth/google',
      '/auth/admin/login',
    ];
    const isPublic = publicRoutes.some((route) => url.includes(route));
    if (isPublic) return config;

    // Admin-only routes (except login)
    if (url.includes('/auth/admin/')) {
      const token = getAdminToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    // User auth (e.g. /auth/me)
    const token = getUserToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – pass through; let callers handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && typeof window !== 'undefined') {
      const url = error.config?.url || '';
      const isAuthRoute = url.includes('/auth/');
      if (!isAuthRoute) {
        // Token expired during normal usage – clear user auth only (admin stays separate)
        if (!url.includes('/auth/admin/')) {
          try {
            localStorage.removeItem(AUTH_STORAGE_KEY);
          } catch {}
        } else {
          try {
            localStorage.removeItem(ADMIN_TOKEN_KEY);
            localStorage.removeItem('admin_user');
          } catch {}
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
