'use client';

// =============================================================================
// FlowCart — useFaqs Hook (TanStack Query)
// =============================================================================
// PURPOSE:
//   Fetches FAQ data from the API route. Same pattern as useProducts —
//   consistency across hooks makes the codebase predictable.
// =============================================================================

import { useQuery } from '@tanstack/react-query';
import { FaqItem } from '@/types';

interface FaqsResponse {
  faqs: FaqItem[];
}

async function fetchFaqs(): Promise<FaqItem[]> {
  const response = await fetch('/api/faqs');

  if (!response.ok) {
    throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
  }

  const data: FaqsResponse = await response.json();
  return data.faqs;
}

export function useFaqs() {
  return useQuery<FaqItem[], Error>({
    queryKey: ['faqs'],
    queryFn: fetchFaqs,
  });
}
