'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';

const AdminAuthContext = createContext(undefined);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = authService.getAdminToken();
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('admin_user') : null;
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        authService.clearAdminAuth();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await authService.adminLogin({ email, password });
      const admin = data.admin;
      const accessToken = data.accessToken;
      if (admin && accessToken) {
        authService.setAdminAuth(admin, accessToken);
        setUser(admin);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      const message = err.response?.data?.message || err.data?.message || err.message || 'Login failed';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.clearAdminAuth();
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
