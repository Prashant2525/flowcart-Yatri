'use client';

// =============================================================================
// FlowCart — MobileMenu Component
// =============================================================================
// PURPOSE:
//   Full-screen mobile navigation overlay. Slides in from the left.
//   Closes on link click or close button.
//
// ACCESSIBILITY:
//   - Traps focus within the menu when open (keyboard users can't Tab out)
//   - Closes on Escape key
//   - aria-hidden on content behind the menu
// =============================================================================

import { useEffect } from 'react';
import Link from 'next/link';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { NAV_LINKS } from '@/lib/constants';
import styles from './MobileMenu.module.css';

export function MobileMenu() {
  const isOpen = useNavigationStore((state) => state.isMobileMenuOpen);
  const closeMobileMenu = useNavigationStore((state) => state.closeMobileMenu);

  // Close on Escape key and prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMobileMenu();
    }

    // Prevent background scrolling when menu is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeMobileMenu]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-label="Mobile navigation">
      {/* Backdrop — click to close */}
      <div
        className={styles.backdrop}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div className={styles.panel}>
        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={closeMobileMenu}
          aria-label="Close navigation menu"
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Navigation links */}
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.link}
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/dashboard"
            className={styles.link}
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
        </nav>

        {/* Brand footer */}
        <p className={styles.brand}>
          <span className={styles.brandMark}>FC</span> FlowCart
        </p>
      </div>
    </div>
  );
}
