import { Inter, Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/providers/Providers';
import { Toaster } from 'sonner';
import ScrollNavigation from '@/components/layout/ScrollNavigation';
import CartSidebar from '@/components/layout/CartSidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Anushthanum | Authentic Spiritual Products & Guidance',
  description: 'Discover lab-certified Rudraksha, energized Yantras, and healing crystals with complete practice guidance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${outfit.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ScrollNavigation />
          </div>
          <CartSidebar />
          <Toaster position="bottom-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
