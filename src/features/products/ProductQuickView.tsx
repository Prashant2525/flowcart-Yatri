'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useQuickViewStore } from '@/stores/useQuickViewStore';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { formatPrice, calculateDiscount, getStarArray, cn } from '@/lib/utils';
import { ANIMATION } from '@/lib/constants';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import styles from './ProductQuickView.module.css';

export function ProductQuickView() {
  const product = useQuickViewStore((state) => state.product);
  const isOpen = useQuickViewStore((state) => state.isOpen);
  const closeQuickView = useQuickViewStore((state) => state.closeQuickView);

  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) =>
    product ? state.items.includes(product.id) : false
  );

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !modalRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: ANIMATION.duration.fast }
    );

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: ANIMATION.duration.normal,
        ease: ANIMATION.ease.out,
      }
    );

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !modalRef.current) {
      closeQuickView();
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      closeQuickView();
      return;
    }

    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: ANIMATION.duration.fast,
      ease: ANIMATION.ease.in,
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: ANIMATION.duration.fast,
      onComplete: closeQuickView,
    });
  }, [closeQuickView]);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  if (!isOpen || !product) return null;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? calculateDiscount(product.originalPrice, product.price)
      : null;

  function handleAddToCart() {
    addItem(product!);
    handleClose();
    setTimeout(() => setCartOpen(true), 400);
  }

  return (
    <div className={styles.overlay} ref={overlayRef} role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`}>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={handleClose} aria-hidden="true" />

      {/* Modal */}
      <div className={styles.modal} ref={modalRef}>
        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close quick view"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Product image */}
        <div className={styles.imageSection}>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={625}
            className={styles.image}
          />
          {product.badge && (
            <span className={cn(styles.badge, `badge badge--${product.badge}`)}>
              {product.badge}
              {discountPercent && ` -${discountPercent}%`}
            </span>
          )}
        </div>

        {/* Product details */}
        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h2 className={styles.name}>{product.name}</h2>

          {/* Rating */}
          <div className={styles.rating}>
            <div className={styles.stars}>
              {getStarArray(product.rating).map((filled, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
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
            <span className={styles.reviewCount}>
              {product.reviewCount} reviews
            </span>
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

          {/* Description */}
          <p className={styles.description}>{product.description}</p>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className="btn btn--primary btn--lg"
              onClick={handleAddToCart}
              style={{ flex: 1 }}
            >
              Add to Cart — {formatPrice(product.price)}
            </button>
            <button
              className={cn(styles.wishlistBtn, isWishlisted && styles.wishlisted)}
              onClick={() => toggleWishlist(product.id)}
              aria-label={
                isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
              }
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Shipping info */}
          <div className={styles.shippingInfo}>
            <div className={styles.shippingItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>Free shipping over $150</span>
            </div>
            <div className={styles.shippingItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
