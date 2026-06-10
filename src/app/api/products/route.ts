// =============================================================================
// FlowCart — Products API Route
// =============================================================================
// PURPOSE:
//   Mock API endpoint that returns product data. TanStack Query fetches from
//   this route just like it would from a real backend.
//
// WHY an API route instead of inline mock data?
//   1. More realistic — demonstrates understanding of client/server boundary
//   2. TanStack Query actually performs a fetch (loading states are real)
//   3. Can simulate network delay to demonstrate loading skeletons
//   4. Supports query parameters (category filtering on the "server")
//
// INTERVIEW QUESTION:
//   Q: "Why filter on the server side via query params instead of client side?"
//   A: In production, you'd always filter server-side to reduce payload size.
//      Doing it here shows awareness of that pattern, even with mock data.
//      Client-side filtering is also implemented as a fallback for UX speed.
// =============================================================================

import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { MOCK_API_DELAY } from '@/lib/constants';
import { ProductCategory } from '@/types';

export async function GET(request: Request) {
  // Simulate network latency so loading states are visible
  await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as ProductCategory | null;

  // Filter products by category if specified
  let filteredProducts = products;

  if (category && category !== 'all') {
    filteredProducts = products.filter(
      (product) => product.category === category
    );
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
  });
}
