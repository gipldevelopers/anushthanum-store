'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <WishlistProvider>
                <CartProvider>
                    <RecentlyViewedProvider>
                        {children}
                    </RecentlyViewedProvider>
                </CartProvider>
            </WishlistProvider>
        </AuthProvider>
    );
}
