'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth.service';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuthFromResponse = useCallback((userData, accessToken) => {
    authService.setAuth(userData, accessToken);
    setUser(userData);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const token = authService.getToken();
        const storedUser = authService.getStoredUser();
        if (token && storedUser) {
          try {
            const res = await authService.getMe();
            if (res.success && res.user) {
              setUser(res.user);
              authService.setAuth(res.user, token);
            } else {
              setUser(storedUser);
            }
          } catch {
            setUser(storedUser);
          }
        } else if (token && !storedUser) {
          try {
            const res = await authService.getMe();
            if (res.success && res.user) {
              setUser(res.user);
              authService.setAuth(res.user, token);
            } else {
              authService.clearAuth();
              setUser(null);
            }
          } catch {
            authService.clearAuth();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error('Auth init failed:', e);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      if (res.success && res.user && res.accessToken) {
        setAuthFromResponse(res.user, res.accessToken);
        return { success: true };
      }
      return { success: false, error: res.message || 'Sign in failed.' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.data?.message || err.message || 'Sign in failed.',
      };
    }
  }, [setAuthFromResponse]);

  const signUp = useCallback(async (name, email, phone, password) => {
    try {
      const res = await authService.register({ name, email, phone: phone || undefined, password });
      if (res.success) {
        return {
          success: true,
          message: res.message,
          email: res.email,
          devOtp: res.devOtp,
        };
      }
      return { success: false, error: res.message || 'Sign up failed.' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.data?.message || err.message || 'Sign up failed.',
      };
    }
  }, []);

  const verifyOtp = useCallback(async (email, otp) => {
    try {
      const res = await authService.verifyOtp({ email, otp });
      if (res.success && res.user && res.accessToken) {
        setAuthFromResponse(res.user, res.accessToken);
        return { success: true };
      }
      return { success: false, error: res.message || 'Verification failed.' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.data?.message || err.message || 'Invalid or expired OTP.',
      };
    }
  }, [setAuthFromResponse]);

  const resendOtp = useCallback(async (email) => {
    try {
      const res = await authService.sendOtp({ email });
      if (res.success) {
        return { success: true, message: res.message, devOtp: res.devOtp };
      }
      return { success: false, error: res.message || 'Failed to resend OTP.' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.data?.message || err.message || 'Failed to resend OTP.',
      };
    }
  }, []);

  const signOut = useCallback(() => {
    authService.clearAuth();
    setUser(null);
  }, []);

  const signInWithGoogle = useCallback(async (token) => {
    if (!token) {
      return { success: false, error: 'Google token is required.' };
    }
    try {
      const res = await authService.googleAuth({ token });
      if (res.success && res.user && res.accessToken) {
        setAuthFromResponse(res.user, res.accessToken);
        return { success: true };
      }
      return { success: false, error: res.message || 'Google sign-in failed.' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.data?.message || err.message || 'Google sign-in failed.',
      };
    }
  }, [setAuthFromResponse]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    verifyOtp,
    resendOtp,
    signOut,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
