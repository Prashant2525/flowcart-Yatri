import { create } from 'zustand';

interface WishlistState {
  items: string[];

  toggleItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
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
