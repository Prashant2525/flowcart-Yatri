'use client';

import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useFaqs } from '@/features/faq/useFaqs';
import { FaqItem } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ANIMATION } from '@/lib/constants';
import styles from './FaqAccordion.module.css';

export function FaqAccordion() {
  const { data: faqs, isLoading, isError } = useFaqs();
  const sectionRef = useScrollAnimation<HTMLElement>({
    from: { y: 30, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.6,
  });

  if (isLoading) {
    return (
      <section className="section" id="faq" aria-label="FAQ">
        <div className="container">
          <h2 className={styles.title}>Frequently Asked</h2>
          <div className={styles.list}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.skeletonItem}>
                <div className={`${styles.skeletonLine} skeleton`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !faqs) return null;

  return (
    <section className="section" id="faq" ref={sectionRef} aria-label="Frequently Asked Questions">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked</h2>
          <p className={styles.subtitle}>
            Everything you need to know about FlowCart.
          </p>
        </div>

        <div className={styles.list}>
          {faqs.map((faq) => (
            <FaqItemComponent key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItemComponent({ faq }: { faq: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isOpen) {
      if (prefersReducedMotion) {
        content.style.height = '0px';
      } else {
        gsap.to(content, {
          height: 0,
          duration: ANIMATION.duration.fast,
          ease: ANIMATION.ease.inOut,
        });
      }
    } else {
      if (prefersReducedMotion) {
        content.style.height = `${inner.offsetHeight}px`;
      } else {
        gsap.to(content, {
          height: inner.offsetHeight,
          duration: ANIMATION.duration.normal,
          ease: ANIMATION.ease.out,
        });
      }
    }

    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={styles.item}>
      <button
        className={styles.trigger}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-trigger-${faq.id}`}
      >
        <span className={styles.question}>{faq.question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" className={styles.verticalLine} />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>

      <div
        className={styles.content}
        ref={contentRef}
        id={`faq-answer-${faq.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${faq.id}`}
      >
        <div className={styles.inner} ref={innerRef}>
          <p className={styles.answer}>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}
