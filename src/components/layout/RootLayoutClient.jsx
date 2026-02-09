'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/layout/CartSidebar';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

const queryClient = new QueryClient();

const AUTH_ROUTES = ['/signin', '/signup', '/forgot-password'];

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname || '');
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <Toaster richColors position="top-center" />
                {isAdminRoute ? (
                  <div className="min-h-screen">
                    {children}
                  </div>
                ) : isAuthRoute ? (
                  <div className="auth-page-shell relative z-10" role="main" aria-label="Sign in or sign up">
                    {children}
                  </div>
                ) : (
                  <>
                    <Navbar />
                    <main className="flex-1">
                      {children}
                    </main>
                    <Footer />
                    <CartSidebar />
                    <WhatsAppButton />
                  </>
                )}
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
