import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { MOCK_API_DELAY } from '@/lib/constants';
import { ProductCategory } from '@/types';

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as ProductCategory | null;

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
