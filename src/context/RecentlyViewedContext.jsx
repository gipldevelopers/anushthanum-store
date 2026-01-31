'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext(undefined);

const MAX_ITEMS = 8;

export function RecentlyViewedProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('anushtanum-recently-viewed');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load recently viewed:', e);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('anushtanum-recently-viewed', JSON.stringify(items));
  }, [items]);

  const addToRecentlyViewed = (product) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      const updated = [product, ...filtered];
      return updated.slice(0, MAX_ITEMS);
    });
  };

  const clearRecentlyViewed = () => {
    setItems([]);
    sessionStorage.removeItem('anushtanum-recently-viewed');
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        items,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
