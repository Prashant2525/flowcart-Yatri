// =============================================================================
// FlowCart — Shared Type Definitions
// =============================================================================
// All domain types live here. Components, hooks, and stores import from this
// single source of truth. This prevents type duplication and makes refactoring
// safe — change a type here, and TypeScript catches every consumer.
// =============================================================================

// -----------------------------------------------------------------------------
// Product Types
// -----------------------------------------------------------------------------

/** Product category used for filtering. Defined as a union (not enum) for
 *  better tree-shaking and simpler serialization in API routes. */
export type ProductCategory =
  | 'all'
  | 'bags'
  | 'watches'
  | 'eyewear'
  | 'footwear'
  | 'accessories';

/** A single product in the catalog. */
export interface Product {
  /** Unique identifier — matches the image filename for simplicity. */
  id: string;
  name: string;
  description: string;
  /** Price in USD cents to avoid floating-point issues (e.g., 4999 = $49.99). */
  price: number;
  category: ProductCategory;
  /** URL path to the product image in /public/images/products/. */
  image: string;
  /** Optional badge text shown on the card (e.g., "NEW", "SALE"). */
  badge?: ProductBadge;
  /** Star rating from 1-5. */
  rating: number;
  /** Number of customer reviews. */
  reviewCount: number;
  /** Whether the product is currently in stock. */
  inStock: boolean;
  /** Optional original price (before discount) in cents. */
  originalPrice?: number;
}

/** Badge types that can appear on product cards. Using a union instead of
 *  free-form string ensures consistency across the UI. */
export type ProductBadge = 'new' | 'sale' | 'bestseller' | 'limited';

// -----------------------------------------------------------------------------
// Cart Types
// -----------------------------------------------------------------------------

/** An item in the shopping cart. Extends Product with quantity. We store the
 *  full product (not just ID) to avoid lookups when rendering the cart drawer. */
export interface CartItem {
  product: Product;
  quantity: number;
}

// -----------------------------------------------------------------------------
// FAQ Types
// -----------------------------------------------------------------------------

/** A single FAQ entry. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// -----------------------------------------------------------------------------
// Testimonial Types
// -----------------------------------------------------------------------------

/** A customer testimonial/review. */
export interface Testimonial {
  id: string;
  name: string;
  /** Role or location — adds credibility (e.g., "Designer, NYC"). */
  role: string;
  content: string;
  /** Avatar image URL. */
  avatar: string;
  rating: number;
}

// -----------------------------------------------------------------------------
// Dashboard Types (Bonus Feature)
// -----------------------------------------------------------------------------

/** A single stat card on the admin dashboard. */
export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  /** Percentage change from previous period. Positive = growth. */
  change: number;
  /** Icon identifier — mapped to SVG in the component. */
  icon: 'revenue' | 'orders' | 'customers' | 'products';
}

/** A data point for the orders chart. */
export interface ChartDataPoint {
  label: string;
  value: number;
}

/** A row in the product management table. */
export interface DashboardProduct {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
}

/** A recent order for the dashboard. */
export interface RecentOrder {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: 'completed' | 'processing' | 'shipped' | 'cancelled';
  date: string;
}

// -----------------------------------------------------------------------------
// UI Types
// -----------------------------------------------------------------------------

/** Button variants — controls visual style. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/** Button sizes — controls padding and font size. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Toast notification types. */
export type ToastType = 'success' | 'error' | 'info';
