# FlowCart

**A modern lifestyle e-commerce landing page** built as a technical assessment for Yatri Motorcycles.

> *"Curated everyday luxury — thoughtfully designed, built to last."*

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

The dev server starts on `localhost:3000`. The dashboard is at `/dashboard`.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Server Components + client islands for optimal performance |
| **Language** | TypeScript | Type safety across components, stores, and API layer |
| **Styling** | CSS Modules + Custom Properties | Scoped styles, zero runtime, full design system via tokens |
| **State (Client)** | Zustand | Lightweight, selector-based subscriptions, no boilerplate |
| **State (Server)** | TanStack Query v5 | Caching, deduplication, loading/error states for API calls |
| **Animation** | GSAP + ScrollTrigger | Timeline control, scroll-triggered reveals, reduced-motion support |

---

### Key Principles

1. **Feature-based organization** — Each feature (products, FAQ, etc.) owns its data hook, components, and styles. No cross-feature imports.

2. **Server Components by default** — Only components that need interactivity (stores, animations, event handlers) are marked `'use client'`. The page itself is a Server Component.

3. **State separation** — Server state (product catalog, FAQs) flows through TanStack Query. Client state (cart, wishlist, UI toggles) lives in Zustand. They never mix.

4. **Prices in cents** — All prices are stored as integers (cents) to avoid floating-point precision issues. Formatted only at the display layer via `formatPrice()`.

---

## Key Features

### Landing Page
- **Hero** — GSAP timeline entrance animation (headline → subtext → CTA → image)
- **Product Grid** — Category filtering via TanStack Query, loading skeletons, scroll-triggered stagger reveal
- **Quick View Modal** — GSAP scale/fade entrance + animated exit before unmount
- **FAQ Accordion** — GSAP `height: 'auto'` animation (superior to CSS `max-height` trick)
- **Cart Drawer** — Slide-in sidebar with quantity controls, subtotal calculation
- **Newsletter** — Email validation + inline success/error feedback
- **Wishlist** — Toggle hearts with Zustand, badge count in navbar

### Admin Dashboard (`/dashboard`)
- Stats cards with trend indicators (revenue, orders, customers, products)
- Pure CSS bar chart (no Recharts/D3 — keeps bundle minimal)
- Recent orders list with color-coded status badges
- Product inventory table with stock/status indicators

### Accessibility
- `prefers-reduced-motion` respected in all GSAP animations
- ARIA roles: `dialog` for modals, `tablist` for filters, `region` for FAQ panels
- Keyboard navigation: Escape closes all overlays, focus management in modals
- Screen reader labels on all interactive elements

### Performance
- `priority` on hero image (above the fold)
- `sizes` attribute on product images for responsive loading
- CSS Modules for zero-runtime scoped styles
- Selective Zustand subscriptions to minimize re-renders

---

## GSAP Animations (5 Required)

| # | Animation | Location | Type |
|---|-----------|----------|------|
| 1 | Hero entrance | `Hero.tsx` | Timeline (staggered fade + slide) |
| 2 | Product grid reveal | `ProductGrid.tsx` | ScrollTrigger (stagger) |
| 3 | Quick View modal | `ProductQuickView.tsx` | Scale + fade (enter/exit) |
| 4 | FAQ accordion | `FaqAccordion.tsx` | Height animation (expand/collapse) |
| 5 | Section reveals | `useScrollAnimation.ts` | ScrollTrigger (reusable hook) |

---

## State Management

### Zustand Stores (Client State)

| Store | Purpose | Key Selectors |
|-------|---------|----------------|
| `useCartStore` | Cart items, quantities, drawer | `getTotalItems()`, `getTotalPrice()` |
| `useWishlistStore` | Wishlist product IDs | `items.includes(id)` |
| `useQuickViewStore` | Quick view modal + product | `isOpen`, `product` |
| `useNavigationStore` | Mobile menu toggle | `isMobileMenuOpen` |

### TanStack Query (Server State)

| Hook | Endpoint | Caching |
|------|----------|---------|
| `useProducts(category)` | `/api/products?category=X` | 5 min stale, 10 min GC |
| `useFaqs()` | `/api/faqs` | 5 min stale, 10 min GC |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---


## License

Built for the Yatri Motorcycles Frontend Engineering assessment.
