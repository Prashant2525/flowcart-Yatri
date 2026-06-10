'use client';

// =============================================================================
// FlowCart — Navbar Component
// =============================================================================
// PURPOSE:
//   The persistent top navigation bar. Contains brand logo, navigation links,
//   cart icon with item count badge, wishlist icon, and mobile menu toggle.
//
// ARCHITECTURE:
//   - Server-agnostic: reads from Zustand stores (client-side only)
//   - Sticky positioning with backdrop blur for modern feel
//   - Mobile: collapses nav links into hamburger menu
//   - Cart badge uses store subscription for live count updates
//
// INTERVIEW QUESTION:
//   Q: "Why is the Navbar a Client Component?"
//   A: It reads from Zustand stores (cart count, mobile menu toggle), which
//      require client-side JavaScript. In a pure server-rendered navbar,
//      we'd lose the live cart badge count and interactive mobile toggle.
//
//   Q: "How do you prevent unnecessary re-renders when cart changes?"
//   A: Zustand's selector pattern — we only subscribe to `getTotalItems`,
//      not the entire cart state. So the navbar re-renders only when the
//      total count changes, not when item quantities change.
// =============================================================================

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import styles from './Navbar.module.css';

export function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const toggleMobileMenu = useNavigationStore(
    (state) => state.toggleMobileMenu
  );

  // Track scroll position for navbar background change
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(styles.navbar, isScrolled && styles.scrolled)}
      role="banner"
    >
      <nav className={`${styles.inner} container`} aria-label="Main navigation">
        {/* Mobile menu toggle */}
        <button
          className={styles.menuToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          id="mobile-menu-toggle"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Brand logo */}
        <Link href="/" className={styles.logo} aria-label="FlowCart Home">
          <span className={styles.logoMark}>FC</span>
          <span className={styles.logoText}>FlowCart</span>
        </Link>

        {/* Desktop navigation links */}
        <ul className={styles.navLinks} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Action icons */}
        <div className={styles.actions}>
          {/* Wishlist */}
          <button
            className={styles.iconButton}
            aria-label={`Wishlist (${wishlistCount} items)`}
            id="wishlist-nav-button"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && (
              <span className={styles.badge}>{wishlistCount}</span>
            )}
          </button>

          {/* Cart */}
          <button
            className={styles.iconButton}
            onClick={toggleCart}
            aria-label={`Shopping cart (${totalItems} items)`}
            id="cart-nav-button"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
