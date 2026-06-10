// =============================================================================
// FlowCart — Utility Functions
// =============================================================================
// Pure helper functions with no side effects and no React dependency.
// Every function here is independently testable.
// =============================================================================

/**
 * Formats a price from cents to a display string.
 *
 * WHY CENTS?
 * Storing prices as integers (cents) avoids floating-point precision issues.
 * Example: 0.1 + 0.2 = 0.30000000000000004 in JavaScript.
 * With cents: 10 + 20 = 30, then format at display time. No rounding bugs.
 *
 * @param cents - Price in cents (e.g., 4999 = $49.99)
 * @returns Formatted price string (e.g., "$49.99")
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

/**
 * Conditionally joins CSS class names, filtering out falsy values.
 *
 * WHY NOT clsx/classnames?
 * The implementation is 3 lines. Adding a dependency for 3 lines of code
 * is unnecessary and would raise eyebrows in a code review. This shows
 * you understand what utility libraries do under the hood.
 *
 * @example
 * cn('base', isActive && 'active', isPrimary && 'primary')
 * // => "base active" (if isActive=true, isPrimary=false)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generates a unique ID. Used for accessibility (aria-labelledby) and
 * React keys where no natural key exists.
 *
 * WHY NOT uuid?
 * We don't need cryptographic uniqueness for UI element IDs.
 * This is sufficient for DOM IDs and React keys in a mock app.
 */
export function generateId(prefix: string = 'fc'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Truncates text to a maximum length with ellipsis.
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum character count before truncation
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Calculates the discount percentage between original and current price.
 *
 * @param originalPrice - Original price in cents
 * @param currentPrice - Current/sale price in cents
 * @returns Discount percentage rounded to nearest integer (e.g., 25)
 */
export function calculateDiscount(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Formats a number with appropriate suffix (K, M) for dashboard display.
 *
 * @example
 * formatCompactNumber(1234) // => "1.2K"
 * formatCompactNumber(1234567) // => "1.2M"
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Pluralizes a word based on count. Simple English-only implementation.
 *
 * @example
 * pluralize(1, 'item') // => "1 item"
 * pluralize(5, 'item') // => "5 items"
 */
export function pluralize(count: number, singular: string): string {
  return `${count} ${singular}${count === 1 ? '' : 's'}`;
}

/**
 * Creates an array of star ratings (filled/empty) for display.
 *
 * @param rating - Number from 1-5
 * @returns Array of booleans (true = filled star)
 *
 * @example
 * getStarArray(3) // => [true, true, true, false, false]
 */
export function getStarArray(rating: number): boolean[] {
  return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
}
