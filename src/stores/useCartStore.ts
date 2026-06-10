// =============================================================================
// FlowCart — Cart Store (Zustand)
// =============================================================================
// PURPOSE:
//   Manages the shopping cart state: items, quantities, and drawer visibility.
//   This is the most complex store because it handles derived state (totals)
//   and item mutations (add, remove, update quantity).
//
// ARCHITECTURE DECISION: Full Product in CartItem
//   We store the full Product object in each CartItem (not just the product ID).
//   Why? The cart drawer needs to display product name, image, and price.
//   If we only stored IDs, we'd need to look up each product from the catalog
//   every time the drawer renders — unnecessary complexity for a client-side app.
//
//   Alternative: Store only IDs + use a selector that joins with product data.
//   Why ours is better: Simpler, no dependency on products query being loaded,
//   works even if the products API is down.
//
// INTERVIEW QUESTION:
//   Q: "Why not persist the cart to localStorage?"
//   A: You could — Zustand has a 'persist' middleware. For this demo we skip
//      it because the task brief doesn't mention persistence, and adding it
//      would mean handling hydration mismatches with SSR. I'd add it in a
//      production app with proper serialization.
// =============================================================================

import { create } from 'zustand';
import { Product, CartItem } from '@/types';

interface CartState {
  /** All items currently in the cart. */
  items: CartItem[];
  /** Whether the cart drawer/sidebar is open. */
  isCartOpen: boolean;

  // ---- Actions ----
  /** Adds a product to the cart. If it already exists, increments quantity. */
  addItem: (product: Product, quantity?: number) => void;
  /** Removes an item entirely from the cart. */
  removeItem: (productId: string) => void;
  /** Updates the quantity of a specific item. Removes if quantity is 0. */
  updateQuantity: (productId: string, quantity: number) => void;
  /** Empties the entire cart. */
  clearCart: () => void;
  /** Toggles the cart drawer open/closed. */
  toggleCart: () => void;
  /** Explicitly sets cart open state. */
  setCartOpen: (open: boolean) => void;

  // ---- Derived Values ----
  // Zustand doesn't have "computed" properties like Vue, so we use getter
  // functions. Components call these to derive values without storing them.
  /** Total number of items (sum of quantities). */
  getTotalItems: () => number;
  /** Total price in cents. */
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,

  addItem: (product, quantity = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex > -1) {
        // Product already in cart — increment quantity
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return { items: updatedItems };
      }

      // New product — add to cart
      return { items: [...state.items, { product, quantity }] };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      // Quantity 0 or negative = remove item
      get().removeItem(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  setCartOpen: (open) => set({ isCartOpen: open }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));
