'use client';

// =============================================================================
// FlowCart — TanStack Query Provider
// =============================================================================
// PURPOSE:
//   Wraps the app with QueryClientProvider so any client component
//   can call useQuery, useMutation, etc.
//
// WHY 'use client'?
//   QueryClientProvider uses React Context, which only works in Client Components.
//   This is the standard pattern recommended by TanStack Query docs for Next.js
//   App Router. The provider is a thin wrapper — the actual pages can still be
//   Server Components.
//
// WHY useRef for the QueryClient?
//   We need exactly one QueryClient instance per browser tab. If we created it
//   at module level, it would be shared across requests in SSR (data leak).
//   useRef ensures one instance per component lifecycle without re-creation
//   on re-renders.
//
// INTERVIEW QUESTION:
//   Q: "Why not useState for the QueryClient?"
//   A: Both work, but useRef is semantically more correct — the QueryClient
//      is not "state" that drives re-renders. It's a stable reference.
//      TanStack Query's official Next.js example uses this pattern.
// =============================================================================

import { useRef } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { makeQueryClient } from '@/lib/queryClient';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // useRef persists the value across re-renders without causing them
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = makeQueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
    </QueryClientProvider>
  );
}
