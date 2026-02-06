'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(undefined);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('admin_user') : null;
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email && password) {
        const mockUser = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin',
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_token', mockToken);
          localStorage.setItem('admin_user', JSON.stringify(mockUser));
        }
        setUser(mockUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
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
