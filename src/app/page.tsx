// =============================================================================
// FlowCart — Landing Page
// =============================================================================
// PURPOSE:
//   The main landing page that composes all feature sections in order.
//   This is a Server Component by default — only the individual feature
//   sections that need interactivity are Client Components.
//
// SECTION ORDER (designed for conversion):
//   1. Hero — Hook the visitor with brand statement
//   2. Products — Show what you're selling (with filtering)
//   3. Promo — Create urgency with a special offer
//   4. Testimonials — Social proof builds trust
//   5. FAQ — Remove objections
//   6. Footer — Close with newsletter + links
//
// INTERVIEW QUESTION:
//   Q: "Why is page.tsx a Server Component but the sections are Client?"
//   A: Server Components stream HTML immediately — the user sees the page
//      structure before JS loads. Each section opts into client-side interactivity
//      individually. This is the "islands of interactivity" pattern that
//      Next.js App Router is designed for.
// =============================================================================

import { Navbar } from '@/components/layout/Navbar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Hero } from '@/features/hero/Hero';
import { ProductGrid } from '@/features/products/ProductGrid';
import { ProductQuickView } from '@/features/products/ProductQuickView';
import { PromoBanner } from '@/features/promo/PromoBanner';
import { Testimonials } from '@/features/testimonials/Testimonials';
import { FaqAccordion } from '@/features/faq/FaqAccordion';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      {/* Persistent layout components */}
      <Navbar />
      <MobileMenu />
      <CartDrawer />
      <ProductQuickView />

      {/* Page sections */}
      <main>
        <Hero />
        <ProductGrid />
        <PromoBanner />
        <Testimonials />
        <FaqAccordion />
      </main>

      <Footer />
    </>
  );
}
