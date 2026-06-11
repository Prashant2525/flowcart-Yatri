'use client';

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
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  });
}
