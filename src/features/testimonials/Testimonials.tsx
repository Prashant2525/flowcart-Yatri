'use client';

import Image from 'next/image';
import { testimonials } from '@/data/testimonials';
import { getStarArray, cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './Testimonials.module.css';

export function Testimonials() {
  const sectionRef = useScrollAnimation<HTMLElement>({
    childSelector: `.${styles.card}`,
    stagger: 0.12,
  });

  return (
    <section className="section" ref={sectionRef} aria-label="Customer Testimonials">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>What people are saying</h2>
          <p className={styles.subtitle}>
            Real reviews from real customers.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className={styles.card}
            >
              {/* Stars */}
              <div className={styles.stars}>
                {getStarArray(testimonial.rating).map((filled, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={filled ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={cn(styles.star, filled && styles.starFilled)}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className={styles.quote}>
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    className={styles.avatarImage}
                  />
                </div>
                <div>
                  <p className={styles.name}>{testimonial.name}</p>
                  <p className={styles.role}>{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
