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

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # Mock REST endpoints (products, FAQs)
│   ├── dashboard/         # Admin dashboard page
│   ├── globals.css        # Design system tokens + resets
│   ├── layout.tsx         # Root layout (fonts, metadata, providers)
│   └── page.tsx           # Landing page (composes all sections)
├── components/layout/     # Persistent layout components
│   ├── Navbar             # Sticky nav with cart badge + frosted glass
│   ├── Footer             # Newsletter, social links, link columns
│   ├── MobileMenu         # Full-screen mobile nav overlay
│   └── CartDrawer         # Slide-in cart sidebar
├── features/              # Feature-based modules (domain logic + UI)
│   ├── hero/              # Hero section with GSAP entrance animation
│   ├── products/          # ProductGrid, ProductCard, CategoryFilter, QuickView
│   ├── faq/               # Accordion with GSAP height animation
│   ├── promo/             # Promotional banner
│   └── testimonials/      # Customer review cards
├── stores/                # Zustand stores (client-side state)
│   ├── useCartStore       # Cart items, quantities, drawer toggle
│   ├── useWishlistStore   # Wishlist product IDs
│   ├── useQuickViewStore  # Quick view modal state
│   └── useNavigationStore # Mobile menu state
├── hooks/                 # Custom React hooks
│   ├── useScrollAnimation # Reusable GSAP ScrollTrigger hook
│   └── useMediaQuery      # Responsive JS breakpoint detection
├── data/                  # Mock data (products, FAQs, testimonials, dashboard)
├── lib/                   # Pure utilities (no React dependency)
│   ├── constants.ts       # Breakpoints, animation config, navigation data
│   ├── utils.ts           # formatPrice, cn(), calculateDiscount, etc.
│   └── queryClient.ts     # TanStack Query configuration
├── providers/             # React context providers
│   └── QueryProvider.tsx  # TanStack Query provider (client boundary)
└── types/                 # TypeScript type definitions
    └── index.ts           # All domain models (Product, CartItem, FAQ, etc.)
```

### Key Principles

1. **Feature-based organization** — Each feature (products, FAQ, etc.) owns its data hook, components, and styles. No cross-feature imports.

2. **Server Components by default** — Only components that need interactivity (stores, animations, event handlers) are marked `'use client'`. The page itself is a Server Component.

3. **State separation** — Server state (product catalog, FAQs) flows through TanStack Query. Client state (cart, wishlist, UI toggles) lives in Zustand. They never mix.

4. **Prices in cents** — All prices are stored as integers (cents) to avoid floating-point precision issues. Formatted only at the display layer via `formatPrice()`.

---

## Design System

The design system lives entirely in `globals.css` as CSS custom properties:

- **Color palette**: HSL-based warm neutrals (not blue-grays) + deep obsidian primary + warm amber accent
- **Typography**: "Instrument Serif" for headings + "Inter" for body text
- **Spacing**: 4px base grid (`--space-1` through `--space-32`)
- **Type scale**: Fluid `clamp()` values for responsive sizing without breakpoints
- **Shadows**: 4-level elevation system (sm → xl)
- **Transitions**: 3 speed tiers (fast 150ms, normal 250ms, slow 400ms)

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
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## Design Decisions & Trade-offs

### Why CSS Modules over Tailwind?
CSS Modules provide genuine CSS encapsulation without runtime overhead. The design system tokens in `globals.css` give us consistency without utility class verbosity. This also demonstrates deeper CSS understanding.

### Why Zustand over Context API?
Context causes re-renders in all consumers when any value changes. Zustand's selector pattern (`state => state.items.length`) only re-renders when the selected value changes. This matters for the cart badge — it shouldn't re-render the entire navbar when item quantities change.

### Why mock API routes instead of direct imports?
TanStack Query needs an async data source. By creating real API routes, we get: realistic loading states, error handling, caching behavior, and network tab visibility. It also demonstrates the ability to work with REST APIs.

### Why no `React.memo` on ProductCard?
Premature optimization. Zustand's selective subscriptions already prevent most unnecessary re-renders. We'd add memo only after profiling shows a problem — not before.

---

## License

Built for the Yatri Motorcycles Frontend Engineering assessment.
