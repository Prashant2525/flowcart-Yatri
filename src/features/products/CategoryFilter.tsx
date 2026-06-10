'use client';

// =============================================================================
// FlowCart — CategoryFilter Component
// =============================================================================
// PURPOSE:
//   Horizontal filter bar that lets users filter products by category.
//   Pill-shaped buttons with active state indication.
//
// DATA FLOW:
//   CategoryFilter doesn't fetch data — it just calls the onChange callback
//   with the selected category. The parent (ProductGrid) passes this to
//   useProducts(category), which triggers a TanStack Query refetch.
// =============================================================================

import { ProductCategory } from '@/types';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onChange: (category: ProductCategory) => void;
}

export function CategoryFilter({
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div
      className={styles.filterBar}
      role="tablist"
      aria-label="Filter products by category"
    >
      {PRODUCT_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          className={cn(
            styles.filterButton,
            activeCategory === cat.value && styles.active
          )}
          onClick={() => onChange(cat.value as ProductCategory)}
          role="tab"
          aria-selected={activeCategory === cat.value}
          id={`filter-${cat.value}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
