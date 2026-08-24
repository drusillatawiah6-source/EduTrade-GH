// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduTrade GH - Buy & Sell School Items',
  description: 'Production-ready online marketplace for educational items in Ghana',
  keywords: ['marketplace', 'education', 'school items', 'Ghana'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edutrade.com',
    siteName: 'EduTrade GH',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-background">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
