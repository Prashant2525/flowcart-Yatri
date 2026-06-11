'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './PromoBanner.module.css';

export function PromoBanner() {
  const sectionRef = useScrollAnimation<HTMLElement>({
    from: { y: 0, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
  });

  return (
    <section className={styles.banner} ref={sectionRef} aria-label="Promotional offer">
      <div className={`${styles.inner} container`}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Limited Time</span>
          <h2 className={styles.headline}>
            Summer Edit — 20% off select styles
          </h2>
          <p className={styles.subtext}>
            Our most-wanted pieces, now more accessible. Use code{' '}
            <strong>FLOW20</strong> at checkout.
          </p>
          <a href="#products" className={`btn btn--accent btn--lg ${styles.cta}`}>
            Shop the Edit
          </a>
        </div>

        {/* Decorative elements */}
        <div className={styles.decoration} aria-hidden="true">
          <div className={styles.circle1} />
          <div className={styles.circle2} />
        </div>
      </div>
    </section>
  );
}
