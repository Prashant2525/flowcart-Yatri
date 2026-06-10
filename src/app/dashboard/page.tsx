'use client';

// =============================================================================
// FlowCart — Admin Dashboard Page
// =============================================================================
// PURPOSE:
//   Bonus feature — a clean admin dashboard with mock analytics.
//   Shows stats cards, an order chart, recent orders, and a product table.
//   Demonstrates full-stack thinking and ability to build data-dense UIs.
//
// DESIGN DECISION: CSS/SVG chart instead of Recharts
//   Using pure CSS bars for the chart instead of a library because:
//   1. Keeps bundle size minimal (Recharts adds ~200KB)
//   2. Shows deeper CSS skill
//   3. The chart is simple enough that a library is overkill
//   For a real dashboard, Recharts or D3 would be appropriate.
// =============================================================================

import Link from 'next/link';
import {
  dashboardStats,
  orderChartData,
  dashboardProducts,
  recentOrders,
} from '@/data/dashboard';
import { formatPrice, cn } from '@/lib/utils';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const maxChartValue = Math.max(...orderChartData.map((d) => d.value));

  return (
    <div className={styles.dashboard}>
      {/* Sidebar / Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.backLink}>
            ← Back to Store
          </Link>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back. Here&apos;s your overview.</p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {dashboardStats.map((stat) => (
          <div key={stat.id} className={styles.statCard}>
            <div className={styles.statIcon}>
              <StatIcon type={stat.icon} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
              <p
                className={cn(
                  styles.statChange,
                  stat.change > 0 ? styles.positive : styles.negative
                )}
              >
                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                <span className={styles.changePeriod}>vs last month</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className={styles.contentGrid}>
        {/* Orders Chart */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Orders Overview</h2>
            <span className={styles.cardBadge}>2025</span>
          </div>
          <div className={styles.chart}>
            {orderChartData.map((point) => (
              <div key={point.label} className={styles.chartBar}>
                <div className={styles.barWrapper}>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${(point.value / maxChartValue) * 100}%`,
                    }}
                  >
                    <span className={styles.barTooltip}>{point.value}</span>
                  </div>
                </div>
                <span className={styles.barLabel}>{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className={styles.ordersCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Orders</h2>
          </div>
          <div className={styles.ordersList}>
            {recentOrders.map((order) => (
              <div key={order.id} className={styles.orderItem}>
                <div className={styles.orderInfo}>
                  <p className={styles.orderCustomer}>{order.customer}</p>
                  <p className={styles.orderProduct}>{order.product}</p>
                </div>
                <div className={styles.orderMeta}>
                  <p className={styles.orderAmount}>
                    {formatPrice(order.amount)}
                  </p>
                  <span
                    className={cn(
                      styles.orderStatus,
                      styles[`status--${order.status}`]
                    )}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Products</h2>
          <span className={styles.tableCount}>
            {dashboardProducts.length} items
          </span>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardProducts.map((product) => (
                <tr key={product.id}>
                  <td className={styles.productName}>{product.name}</td>
                  <td>
                    <span className={styles.categoryTag}>
                      {product.category}
                    </span>
                  </td>
                  <td>{formatPrice(product.price)}</td>
                  <td>
                    <span
                      className={cn(
                        styles.stock,
                        product.stock === 0 && styles.outOfStock
                      )}
                    >
                      {product.stock === 0 ? 'Out of stock' : product.stock}
                    </span>
                  </td>
                  <td>
                    <span
                      className={cn(
                        styles.statusBadge,
                        styles[`statusBadge--${product.status}`]
                      )}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Stat icon component
function StatIcon({ type }: { type: string }) {
  switch (type) {
    case 'revenue':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'orders':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case 'customers':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'products':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    default:
      return null;
  }
}
