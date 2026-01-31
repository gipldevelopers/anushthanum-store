'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AUTH_STORAGE_KEY = 'anushthanum_auth';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' && localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.user) setUser(parsed.user);
      }
    } catch (e) {
      console.error('Failed to load auth:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistUser = useCallback((userData) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: userData }));
    setUser(userData);
  }, []);

  const signIn = useCallback(
    (email, password) => {
      // Demo: accept any email + non-empty password and create a session
      if (!email?.trim() || !password) {
        return { success: false, error: 'Email and password are required.' };
      }
      const userData = {
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: email.trim().toLowerCase(),
        phone: '',
        memberSince: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      };
      persistUser(userData);
      return { success: true };
    },
    [persistUser]
  );

  const signUp = useCallback(
    (name, email, phone, password) => {
      if (!name?.trim() || !email?.trim() || !password) {
        return { success: false, error: 'Name, email and password are required.' };
      }
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters.' };
      }
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: (phone || '').trim(),
        memberSince: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      };
      persistUser(userData);
      return { success: true };
    },
    [persistUser]
  );

  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  /** Sign in with Google. Replace with real OAuth (NextAuth/Firebase) when backend is ready. */
  const signInWithGoogle = useCallback(() => {
    const userData = {
      name: 'Google User',
      email: 'user@gmail.com',
      phone: '',
      memberSince: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    };
    persistUser(userData);
    return { success: true };
  }, [persistUser]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
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
