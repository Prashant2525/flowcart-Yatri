'use client';

// =============================================================================
// FlowCart — useMediaQuery Hook
// =============================================================================
// PURPOSE:
//   Returns whether a CSS media query currently matches. Used to conditionally
//   render components or disable animations on mobile.
//
// WHY not just use CSS?
//   Sometimes you need JS-level branching:
//   - Disable GSAP animations on mobile (performance)
//   - Render different component trees (not just CSS visibility)
//   - Conditionally load heavy components via dynamic imports
//
// INTERVIEW QUESTION:
//   Q: "Why do you listen for changes instead of checking once?"
//   A: Users can resize their browser, rotate their device, or connect an
//      external monitor. A one-time check would show stale layout.
// =============================================================================

import { useState, useEffect } from 'react';

/**
 * Tracks whether a CSS media query matches.
 *
 * @param query - A CSS media query string (e.g., '(min-width: 640px)')
 * @returns Whether the query currently matches
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 * if (isDesktop) { ... }
 */
export function useMediaQuery(query: string): boolean {
  // Default to false during SSR (no window object)
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
