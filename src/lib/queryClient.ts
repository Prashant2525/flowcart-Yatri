// =============================================================================
// FlowCart — TanStack Query Client Configuration
// =============================================================================
// PURPOSE:
//   Creates and exports a QueryClient instance with sensible defaults.
//   Separated from the provider so it can be used in both client and
//   server contexts if needed.
//
// WHY configure staleTime and gcTime?
//   Defaults are staleTime: 0 (always refetch) and gcTime: 5 minutes.
//   For a mock e-commerce app, products don't change often, so we increase
//   staleTime to reduce unnecessary network requests.
// =============================================================================

import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '@/lib/constants';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_CONFIG.staleTime,
        gcTime: QUERY_CONFIG.gcTime,
        // Don't refetch on window focus in development — it's distracting
        refetchOnWindowFocus: false,
        // Retry once on failure, then show error state
        retry: 1,
      },
    },
  });
}
