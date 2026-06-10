// =============================================================================
// FlowCart — Quick View Store (Zustand)
// =============================================================================
// PURPOSE:
//   Controls the Quick View modal — which product is being previewed and
//   whether the modal is visible.
//
// WHY a separate store?
//   The quick-view modal is triggered from ProductCard but rendered at the
//   page level (to avoid z-index issues with nested modals). A store
//   decouples the trigger (card) from the consumer (modal).
//
//   Alternative: Use React portal + local state in ProductGrid.
//   Why ours is better: Simpler — any component anywhere can trigger the
//   quick view. No prop threading through the product grid.
// =============================================================================

import { create } from 'zustand';
import { Product } from '@/types';

interface QuickViewState {
  /** The product currently being quick-viewed. Null when modal is closed. */
  product: Product | null;
  /** Whether the quick-view modal is visible. */
  isOpen: boolean;

  /** Opens the quick-view modal with the specified product. */
  openQuickView: (product: Product) => void;
  /** Closes the quick-view modal and clears the product. */
  closeQuickView: () => void;
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
  product: null,
  isOpen: false,

  openQuickView: (product) => set({ product, isOpen: true }),

  closeQuickView: () => set({ product: null, isOpen: false }),
}));
