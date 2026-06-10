// =============================================================================
// FlowCart — Wishlist Store (Zustand)
// =============================================================================
// PURPOSE:
//   Manages the user's wishlist. Stores only product IDs (not full products)
//   because the wishlist only needs to know IF a product is wishlisted,
//   not its details. Product details are already available from the catalog.
//
// DESIGN DECISION: Set<string> vs string[]
//   We use a Set internally for O(1) lookups (isWishlisted), but Zustand
//   serializes state, and Sets don't serialize cleanly. So we store as
//   an array and use .includes() — with <100 products, the performance
//   difference is negligible, and it's much simpler to debug.
//
// INTERVIEW QUESTION:
//   Q: "When would you switch from array to Set?"
//   A: When the list exceeds ~1000 items and isWishlisted is called frequently
//      (e.g., in a virtualized list). For 10-50 products, array is fine.
// =============================================================================

import { create } from 'zustand';

interface WishlistState {
  /** Array of product IDs that are wishlisted. */
  items: string[];

  /** Toggles a product in/out of the wishlist. */
  toggleItem: (productId: string) => void;
  /** Checks if a product is in the wishlist. */
  isWishlisted: (productId: string) => boolean;
  /** Clears the entire wishlist. */
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  toggleItem: (productId) => {
    set((state) => {
      const isAlreadyWishlisted = state.items.includes(productId);

      if (isAlreadyWishlisted) {
        return { items: state.items.filter((id) => id !== productId) };
      }

      return { items: [...state.items, productId] };
    });
  },

  isWishlisted: (productId) => {
    return get().items.includes(productId);
  },

  clearWishlist: () => set({ items: [] }),
}));
