'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { accountApi } from '@/services/accountApi';

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('anushtanum-wishlist');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to load wishlist:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('anushtanum-wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = async (product) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
    toast.success('Added to wishlist', {
      description: product.name,
      duration: 2000,
    });
    try {
      const raw = localStorage.getItem('anushthanum_auth');
      if (raw && JSON.parse(raw)?.accessToken) {
        await accountApi.addWishlistItem(product.id);
      }
    } catch (e) {
      // silently fail if not logged in
    }
  };

  const removeFromWishlist = async (productId) => {
    const product = items.find((item) => item.id === productId);
    setItems((prev) => prev.filter((item) => item.id !== productId));
    if (product) {
      toast.info('Removed from wishlist', {
        description: product.name,
        duration: 2000,
      });
    }
    try {
      const raw = localStorage.getItem('anushthanum_auth');
      if (raw && JSON.parse(raw)?.accessToken) {
        await accountApi.removeWishlistItem(productId);
      }
    } catch (e) {
      // silently fail
    }
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.info('Wishlist cleared');
  };

  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
