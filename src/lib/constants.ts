// =============================================================================
// FlowCart — Application Constants
// =============================================================================
// All magic numbers, breakpoints, and configuration values live here.
// This file has ZERO dependencies — it's pure data. Easy to test, easy to find.
// =============================================================================

/** Responsive breakpoints in pixels. Used by useMediaQuery hook and referenced
 *  in CSS via custom properties. Keeping them in one place ensures CSS and JS
 *  agree on when layouts shift. */
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const;

/** GSAP animation configuration. Centralized so all animations feel cohesive.
 *  Changing a value here updates every animation that uses it. */
export const ANIMATION = {
  /** Default duration for UI transitions (modals, drawers). */
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    reveal: 0.8,
  },
  /** Default easing curves. Using GSAP's named easings for readability. */
  ease: {
    /** Smooth deceleration — feels natural for entrances. */
    out: 'power3.out',
    /** Subtle acceleration + deceleration — for transitions. */
    inOut: 'power2.inOut',
    /** Snappy exit — for things leaving the screen. */
    in: 'power2.in',
  },
  /** Stagger delay between items in lists/grids (seconds). */
  stagger: 0.08,
  /** ScrollTrigger defaults. */
  scrollTrigger: {
    /** Start revealing when element's top reaches 85% of viewport. */
    start: 'top 85%',
    /** End point for scrub-based animations. */
    end: 'top 20%',
  },
} as const;

/** Navigation links shown in the navbar. */
export const NAV_LINKS = [
  { label: 'Shop', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#footer' },
] as const;

/** Social media links for the footer. */
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
] as const;

/** Footer link groups. */
export const FOOTER_LINKS = {
  shop: [
    { label: 'New Arrivals', href: '#' },
    { label: 'Best Sellers', href: '#' },
    { label: 'Sale', href: '#' },
    { label: 'Collections', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Sustainability', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Shipping', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Size Guide', href: '#' },
  ],
} as const;

/** TanStack Query stale times. Products don't change often in a mock app,
 *  so a long stale time prevents unnecessary refetches. */
export const QUERY_CONFIG = {
  /** 5 minutes — products are relatively static. */
  staleTime: 5 * 60 * 1000,
  /** Keep unused queries in cache for 10 minutes. */
  gcTime: 10 * 60 * 1000,
} as const;

/** Simulated network delay for mock API routes (milliseconds).
 *  Realistic enough to show loading states without being annoying. */
export const MOCK_API_DELAY = 800;

/** Product categories for the filter bar. */
export const PRODUCT_CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'bags', label: 'Bags' },
  { value: 'watches', label: 'Watches' },
  { value: 'eyewear', label: 'Eyewear' },
  { value: 'footwear', label: 'Footwear' },
  { value: 'accessories', label: 'Accessories' },
] as const;
