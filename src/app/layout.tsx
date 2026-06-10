// =============================================================================
// FlowCart — Root Layout
// =============================================================================
// PURPOSE:
//   The root layout wraps every page. It's responsible for:
//   1. Loading fonts (Inter + Instrument Serif) via next/font
//   2. Setting global metadata (title, description, OG tags)
//   3. Wrapping children with providers (QueryProvider)
//   4. Rendering persistent layout elements (Navbar, Footer)
//
// WHY next/font?
//   next/font self-hosts fonts — no external Google Fonts request.
//   This improves privacy, performance (no FOUT), and Lighthouse scores.
//   The font files are inlined at build time.
//
// INTERVIEW QUESTION:
//   Q: "Why not just use a <link> tag to Google Fonts?"
//   A: next/font is zero-layout-shift because it generates CSS @font-face
//      at build time with size-adjust and fallback metrics. A <link> to
//      Google Fonts causes a flash of unstyled text and an external request.
// =============================================================================

import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { QueryProvider } from '@/providers/QueryProvider';
import './globals.css';

// Configure Inter (sans-serif) for body text and UI
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Show fallback font immediately, swap when loaded
  variable: '--font-inter', // CSS variable for the font-family
});

// Configure Instrument Serif for editorial headings
const instrumentSerif = Instrument_Serif({
  weight: '400', // Instrument Serif only has regular weight
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

// Metadata — used by Next.js to generate <head> tags for SEO
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
      // Apply font CSS variables to the html element so all descendants
      // can reference them via var(--font-inter) and var(--font-instrument-serif)
      className={`${inter.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        {/* QueryProvider must be a Client Component (see providers/QueryProvider.tsx).
            It wraps the entire app so any component can use TanStack Query hooks. */}
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
