'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/stores/useCartStore';
import { formatPrice } from '@/lib/utils';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  // C3 fix: Ref for the drawer panel to trap focus within it
  const drawerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(drawerRef, isCartOpen);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isCartOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setCartOpen(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCartOpen, setCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Shopping cart">
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className={styles.drawer} ref={drawerRef}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <button
            className={styles.closeButton}
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Cart content */}
        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className={styles.emptyIcon}
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p className={styles.emptyText}>Your cart is empty</p>
            <p className={styles.emptySubtext}>
              Add something beautiful to get started.
            </p>
          </div>
        ) : (
          <>
            {/* Item list */}
            <ul className={styles.itemList} role="list">
              {items.map((item) => (
                <li key={item.product.id} className={styles.item}>
                  {/* Product image */}
                  <div className={styles.itemImage}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={80}
                      height={100}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Product details */}
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.product.name}</h3>
                    <p className={styles.itemPrice}>
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.quantityButton}
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        aria-label={`Decrease quantity of ${item.product.name}`}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.product.id)}
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer with total and checkout */}
            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Subtotal</span>
                <span className={styles.totalValue}>
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              <p className={styles.shippingNote}>
                Shipping calculated at checkout
              </p>
              <button className={`btn btn--primary ${styles.checkoutButton}`}>
                Checkout
              </button>
              <button
                className={`btn btn--ghost ${styles.clearButton}`}
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
