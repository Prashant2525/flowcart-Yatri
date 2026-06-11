import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '@/lib/constants';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_CONFIG.staleTime,
        gcTime: QUERY_CONFIG.gcTime,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
