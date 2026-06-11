export type ProductCategory =
  | 'all'
  | 'bags'
  | 'watches'
  | 'eyewear'
  | 'footwear'
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  originalPrice?: number;
}

export type ProductBadge = 'new' | 'sale' | 'bestseller' | 'limited';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: 'revenue' | 'orders' | 'customers' | 'products';
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface DashboardProduct {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
}

export interface RecentOrder {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: 'completed' | 'processing' | 'shipped' | 'cancelled';
  date: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ToastType = 'success' | 'error' | 'info';
