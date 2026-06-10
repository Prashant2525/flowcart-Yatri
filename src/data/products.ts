// =============================================================================
// FlowCart — Product Mock Data
// =============================================================================
// Realistic product catalog for a modern lifestyle e-commerce brand.
// Prices are in CENTS (see lib/utils.ts formatPrice for explanation).
//
// Design decision: 10 products across 5 categories gives enough variety
// to demonstrate filtering while keeping the grid manageable.
// =============================================================================

import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'heritage-weekender',
    name: 'Heritage Weekender',
    description:
      'Hand-stitched full-grain leather weekender bag with brass hardware. The perfect companion for spontaneous getaways.',
    price: 28900,
    category: 'bags',
    image: '/images/products/heritage-weekender.png',
    badge: 'bestseller',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
  },
  {
    id: 'minimalist-chrono',
    name: 'Minimalist Chrono',
    description:
      'Swiss-movement chronograph with sapphire crystal and Italian leather strap. Understated elegance for everyday wear.',
    price: 34900,
    category: 'watches',
    image: '/images/products/minimalist-chrono.png',
    badge: 'new',
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: 'coastal-aviators',
    name: 'Coastal Aviators',
    description:
      'Titanium-frame aviator sunglasses with polarized lenses. UV400 protection meets timeless style.',
    price: 18900,
    category: 'eyewear',
    image: '/images/products/coastal-aviators.png',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: 'stride-runners',
    name: 'Stride Runners',
    description:
      'Engineered mesh upper with responsive cushioning. From morning runs to evening commutes.',
    price: 15900,
    category: 'footwear',
    image: '/images/products/stride-runners.png',
    badge: 'new',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
  },
  {
    id: 'canvas-tote',
    name: 'Canvas Tote',
    description:
      'Organic cotton canvas tote with reinforced leather handles. Carries everything, weighs nothing.',
    price: 7900,
    category: 'bags',
    image: '/images/products/canvas-tote.png',
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
  },
  {
    id: 'field-watch',
    name: 'Field Watch',
    description:
      'Military-inspired field watch with tritium lume and NATO strap. Built for adventure, styled for the city.',
    price: 22900,
    category: 'watches',
    image: '/images/products/field-watch.png',
    badge: 'sale',
    rating: 4.8,
    reviewCount: 91,
    inStock: true,
    originalPrice: 29900,
  },
  {
    id: 'retro-wayfarers',
    name: 'Retro Wayfarers',
    description:
      'Acetate-frame wayfarers with gradient lenses. A modern take on the icon that started it all.',
    price: 14900,
    category: 'eyewear',
    image: '/images/products/retro-wayfarers.png',
    rating: 4.4,
    reviewCount: 178,
    inStock: true,
  },
  {
    id: 'urban-sneakers',
    name: 'Urban Sneakers',
    description:
      'Premium leather sneakers with hand-painted sole detail. Minimal design, maximum statement.',
    price: 19900,
    category: 'footwear',
    image: '/images/products/urban-sneakers.png',
    badge: 'bestseller',
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
  },
  {
    id: 'leather-card-holder',
    name: 'Leather Card Holder',
    description:
      'Slim vegetable-tanned leather card holder. Ages beautifully — yours gets better with time.',
    price: 4900,
    category: 'accessories',
    image: '/images/products/leather-card-holder.png',
    rating: 4.7,
    reviewCount: 245,
    inStock: true,
  },
  {
    id: 'silk-scarf',
    name: 'Silk Scarf',
    description:
      'Hand-rolled silk twill scarf with original geometric print. A finishing touch that elevates everything.',
    price: 12900,
    category: 'accessories',
    image: '/images/products/silk-scarf.png',
    badge: 'limited',
    rating: 4.6,
    reviewCount: 53,
    inStock: true,
  },
];
