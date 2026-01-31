import { Inter } from 'next/font/google';
import RootLayoutClient from '@/components/layout/RootLayoutClient';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#b45309',
};

export const metadata = {
  title: 'Anushthanum – Authentic Rudraksha, Yantras & Crystals',
  description:
    'Your trusted source for lab-certified Rudraksha, sacred Yantras, and healing crystals. Temple-energized by Vedic experts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={
          inter.className +
          ' min-h-screen flex flex-col overflow-x-hidden antialiased'
        }
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
