'use client';

// =============================================================================
// FlowCart — ProductCard Component
// =============================================================================
// PURPOSE:
//   Displays a single product with image, name, price, badge, rating,
//   wishlist toggle, add-to-cart, and quick-view buttons.
//
// ARCHITECTURE:
//   - Receives a Product object as prop (not ID — avoids store lookup)
//   - Reads wishlist state from Zustand to show filled/outline heart
//   - Dispatches cart and quick-view actions to Zustand stores
//   - Hover animations via CSS (not GSAP — more performant for per-card)
//   - Image uses next/image for automatic optimization
//
// INTERVIEW QUESTION:
//   Q: "Should ProductCard be wrapped in React.memo?"
//   A: Not yet — premature optimization. We'd only memo it if profiling
//      showed unnecessary re-renders (e.g., when a different card's wishlist
//      toggled). Currently, Zustand's selective subscription keeps re-renders
//      minimal. If we had 100+ cards, memo + stable callbacks would help.
// =============================================================================

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useQuickViewStore } from '@/stores/useQuickViewStore';
import { formatPrice, calculateDiscount, getStarArray, cn } from '@/lib/utils';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) =>
    state.items.includes(product.id)
  );
  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  // Local state for "Added to cart" feedback animation
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

  function handleAddToCart() {
    addItem(product);
    setShowAddedFeedback(true);

    // Show feedback for 1.5 seconds, then open cart drawer
    setTimeout(() => {
      setShowAddedFeedback(false);
      setCartOpen(true);
    }, 800);
  }

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? calculateDiscount(product.originalPrice, product.price)
      : null;

  return (
    <article className={cn(styles.card, 'product-card')} id={`product-${product.id}`}>
      {/* Image container with overlay actions */}
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          className={styles.image}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badge (NEW, SALE, etc.) */}
        {product.badge && (
          <span className={cn(styles.badge, styles[`badge--${product.badge}`])}>
            {product.badge}
            {discountPercent && ` -${discountPercent}%`}
          </span>
        )}

        {/* Wishlist toggle (always visible) */}
        <button
          className={cn(styles.wishlistButton, isWishlisted && styles.wishlisted)}
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Hover overlay with actions */}
        <div className={styles.overlay}>
          <button
            className={styles.overlayButton}
            onClick={() => openQuickView(product)}
            aria-label={`Quick view ${product.name}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Quick View
          </button>

          <button
            className={cn(
              styles.overlayButton,
              styles.addToCartButton,
              showAddedFeedback && styles.addedFeedback
            )}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            disabled={showAddedFeedback}
          >
            {showAddedFeedback ? (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>

        {/* Rating */}
        <div className={styles.rating} aria-label={`Rated ${product.rating} out of 5`}>
          <div className={styles.stars}>
            {getStarArray(product.rating).map((filled, i) => (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={filled ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
                className={cn(styles.star, filled && styles.starFilled)}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className={styles.reviewCount}>({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
