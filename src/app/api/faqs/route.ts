// =============================================================================
// FlowCart — FAQs API Route
// =============================================================================
// PURPOSE:
//   Mock API endpoint for FAQ data. Same pattern as the products route.
//   Demonstrates that TanStack Query is used for multiple data sources.
// =============================================================================

import { NextResponse } from 'next/server';
import { faqs } from '@/data/faqs';
import { MOCK_API_DELAY } from '@/lib/constants';

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

  return NextResponse.json({ faqs });
}
