// =============================================================================
// FlowCart — Navigation Store (Zustand)
// =============================================================================
// PURPOSE:
//   Manages mobile menu open/close state. Intentionally simple — this
//   store exists because the mobile menu toggle is in the Navbar but the
//   menu overlay is a separate component. A store keeps them in sync.
// =============================================================================

import { create } from 'zustand';

interface NavigationState {
  /** Whether the mobile menu overlay is visible. */
  isMobileMenuOpen: boolean;

  /** Toggles the mobile menu. */
  toggleMobileMenu: () => void;
  /** Explicitly closes the mobile menu (e.g., after clicking a link). */
  closeMobileMenu: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isMobileMenuOpen: false,

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
