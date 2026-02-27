'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollNavigation from '@/components/layout/ScrollNavigation';

const AUTH_ROUTES = ['/signin', '/signup', '/forgot-password', '/reset-password'];

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAuthRoute = AUTH_ROUTES.includes(pathname || '');

  if (isAdminRoute) {
    return <main className="flex-grow">{children}</main>;
  }

  if (isAuthRoute) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollNavigation />
    </div>
  );
}
