import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { QueryProvider } from '@/providers/QueryProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'FlowCart — Curated Everyday Luxury',
  description:
    'Discover thoughtfully designed bags, watches, eyewear, and accessories. FlowCart brings you modern essentials crafted to last.',
  keywords: [
    'luxury lifestyle',
    'modern accessories',
    'premium bags',
    'designer watches',
    'eyewear',
    'e-commerce',
  ],
  openGraph: {
    title: 'FlowCart — Curated Everyday Luxury',
    description:
      'Discover thoughtfully designed bags, watches, eyewear, and accessories.',
    type: 'website',
    locale: 'en_US',
    siteName: 'FlowCart',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
