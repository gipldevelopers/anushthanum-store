'use client';

import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

const queryClient = new QueryClient();

export default function RootLayoutClient({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <Toaster richColors position="top-center" />
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <CartSidebar />
              <WhatsAppButton />
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
