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
      <Navbar />
      <MobileMenu />
      <CartDrawer />
      <ProductQuickView />

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
