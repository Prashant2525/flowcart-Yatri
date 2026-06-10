'use client';

// =============================================================================
// FlowCart — useProducts Hook (TanStack Query)
// =============================================================================
// PURPOSE:
//   Encapsulates all product-fetching logic. Components call useProducts()
//   and get { products, isLoading, isError, error } — they never worry about
//   fetch calls, caching, or error handling.
//
// WHY a custom hook wrapping useQuery?
//   1. Encapsulation — the fetch URL, query key, and transform logic are
//      hidden from components. If the API changes, only this file updates.
//   2. Type safety — the hook returns typed Product[], not unknown JSON.
//   3. Reusability — any component can call useProducts('bags') without
//      knowing the API contract.
//
// QUERY KEY DESIGN:
//   ['products', category] — TanStack Query uses this as a cache key.
//   Different categories have different cache entries, so switching from
//   "bags" to "watches" triggers a new fetch, but switching back to "bags"
//   serves from cache instantly.
//
// INTERVIEW QUESTION:
//   Q: "What happens if two components call useProducts('bags') simultaneously?"
//   A: TanStack Query deduplicates — only one network request is made.
//      Both components receive the same data from the shared cache.
// =============================================================================

import { useQuery } from '@tanstack/react-query';
import { Product, ProductCategory } from '@/types';

interface ProductsResponse {
  products: Product[];
  total: number;
}

async function fetchProducts(category: ProductCategory): Promise<Product[]> {
  const params = category !== 'all' ? `?category=${category}` : '';
  const response = await fetch(`/api/products${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data: ProductsResponse = await response.json();
  return data.products;
}

export function useProducts(category: ProductCategory = 'all') {
  return useQuery<Product[], Error>({
    // Query key includes category — each category is cached separately
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  });
}
