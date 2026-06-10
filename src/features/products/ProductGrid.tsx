'use client';

// =============================================================================
// FlowCart — ProductGrid Component
// =============================================================================
// PURPOSE:
//   Container component that orchestrates product display:
//   1. Section heading
//   2. Category filter bar
//   3. Product grid with loading/error/empty states
//   4. Scroll-triggered reveal animation via GSAP
//
// DATA FLOW:
//   CategoryFilter → selectedCategory (local state)
//   selectedCategory → useProducts(category) → TanStack Query
//   TanStack Query → products data | loading | error
//   products → ProductCard[] → rendered grid
//
// INTERVIEW QUESTION:
//   Q: "Why is category state local instead of in Zustand?"
//   A: Category filtering is local to this section — no other component
//      cares about which category is selected. Zustand is for cross-cutting
//      state (cart, wishlist). Lifting everything to global state is an
//      anti-pattern — it makes the store bloated and hard to reason about.
// =============================================================================

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCategory } from '@/types';
import { useProducts } from '@/features/products/useProducts';
import { ProductCard } from '@/features/products/ProductCard';
import { CategoryFilter } from '@/features/products/CategoryFilter';
import { ANIMATION } from '@/lib/constants';
import styles from './ProductGrid.module.css';

gsap.registerPlugin(ScrollTrigger);

export function ProductGrid() {
  const [category, setCategory] = useState<ProductCategory>('all');
  const { data: products, isLoading, isError, error } = useProducts(category);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // GSAP scroll-triggered reveal for product cards
  useEffect(() => {
    if (!products || products.length === 0 || !gridRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Get all product card elements in the grid
    const cards = gridRef.current.querySelectorAll('.product-card');
    if (cards.length === 0) return;

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    // Animate cards in with stagger
    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: ANIMATION.duration.slow,
      stagger: ANIMATION.stagger,
      ease: ANIMATION.ease.out,
      scrollTrigger: {
        trigger: gridRef.current,
        start: ANIMATION.scrollTrigger.start,
        toggleActions: 'play none none none',
      },
    });

    hasAnimated.current = true;

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === gridRef.current)
        .forEach((st) => st.kill());
    };
  }, [products]);

  return (
    <section className="section" id="products" aria-label="Featured Products">
      <div className="container">
        {/* Section heading */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Featured Collection</h2>
            <p className={styles.subtitle}>
              Thoughtfully designed, responsibly made, built to last.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className={styles.filterWrapper}>
          <CategoryFilter activeCategory={category} onChange={setCategory} />
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className={styles.grid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={`${styles.skeletonImage} skeleton`} />
                <div className={styles.skeletonInfo}>
                  <div
                    className={`${styles.skeletonLine} ${styles.skeletonShort} skeleton`}
                  />
                  <div className={`${styles.skeletonLine} skeleton`} />
                  <div
                    className={`${styles.skeletonLine} ${styles.skeletonMedium} skeleton`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>Something went wrong</p>
            <p className={styles.emptyText}>
              {error?.message || 'Failed to load products. Please try again.'}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && products && products.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No products found</p>
            <p className={styles.emptyText}>
              Try selecting a different category.
            </p>
          </div>
        )}

        {/* Product grid */}
        {!isLoading && !isError && products && products.length > 0 && (
          <div className={styles.grid} ref={gridRef}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
