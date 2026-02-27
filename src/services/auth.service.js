/**
 * Auth API service – user (register, OTP, login, me) and admin (login, me).
 * Uses shared axios instance (lib/axios) which attaches the correct token by route.
 */
import api from '@/lib/axios';

const AUTH_STORAGE_KEY = 'anushthanum_auth';
const ADMIN_STORAGE_KEY_TOKEN = 'admin_token';
const ADMIN_STORAGE_KEY_USER = 'admin_user';

function getStored() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStored(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
}

function clearStored() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function getToken() {
  const data = getStored();
  return data?.accessToken || null;
}

export const authService = {
  getToken,
  getStoredUser: () => getStored()?.user ?? null,
  setAuth(user, accessToken) {
    setStored({ user, accessToken });
  },
  clearAuth: clearStored,

  // ----- User auth -----
  register: (body) => api.post('/auth/register', body).then((res) => res.data),
  sendOtp: (body) => api.post('/auth/send-otp', body).then((res) => res.data),
  verifyOtp: (body) => api.post('/auth/verify-otp', body).then((res) => res.data),
  login: (body) => api.post('/auth/login', body).then((res) => res.data),
  googleAuth: (body) => api.post('/auth/google', body).then((res) => res.data),
  forgotPassword: (body) => api.post('/auth/forgot-password', body).then((res) => res.data),
  resetPassword: (body) => api.post('/auth/reset-password', body).then((res) => res.data),
  getMe: () => api.get('/auth/me').then((res) => res.data),

  // ----- Admin auth -----
  adminLogin: (body) => api.post('/auth/admin/login', body).then((res) => res.data),
  getAdminMe: () => api.get('/auth/admin/me').then((res) => res.data),
  getAdminToken: () => (typeof window !== 'undefined' ? localStorage.getItem(ADMIN_STORAGE_KEY_TOKEN) : null),
  setAdminAuth: (admin, accessToken) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ADMIN_STORAGE_KEY_TOKEN, accessToken);
    localStorage.setItem(ADMIN_STORAGE_KEY_USER, JSON.stringify(admin));
  },
  clearAdminAuth: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ADMIN_STORAGE_KEY_TOKEN);
    localStorage.removeItem(ADMIN_STORAGE_KEY_USER);
  },
};
