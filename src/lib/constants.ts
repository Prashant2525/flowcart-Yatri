export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const;


export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    reveal: 0.8,
  },
  ease: {
    out: 'power3.out',
    inOut: 'power2.inOut',
    in: 'power2.in',
  },
  stagger: 0.08,
  scrollTrigger: {
    start: 'top 85%',
    end: 'top 20%',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Shop', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#footer' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
] as const;

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

export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
} as const;

export const MOCK_API_DELAY = 800;

export const PRODUCT_CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'bags', label: 'Bags' },
  { value: 'watches', label: 'Watches' },
  { value: 'eyewear', label: 'Eyewear' },
  { value: 'footwear', label: 'Footwear' },
  { value: 'accessories', label: 'Accessories' },
] as const;
