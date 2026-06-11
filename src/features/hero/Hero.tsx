'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ANIMATION } from '@/lib/constants';
import styles from './Hero.module.css';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          headlineRef.current,
          subtextRef.current,
          ctaRef.current,
          imageRef.current,
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const tl = gsap.timeline({
      defaults: {
        ease: ANIMATION.ease.out,
        duration: ANIMATION.duration.reveal,
      },
    });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0 }
    )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        '-=0.4'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.6'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef} aria-label="Hero">
      <div className={`${styles.inner} container`}>
        {/* Text content */}
        <div className={styles.content}>
          <h1 className={styles.headline} ref={headlineRef}>
            Less, but{' '}
            <span className={styles.accentText}>better.</span>
          </h1>

          <p className={styles.subtext} ref={subtextRef}>
            Curated essentials designed to elevate your everyday. From
            thoughtfully crafted bags to precision timepieces — things worth
            keeping.
          </p>

          <div className={styles.ctaGroup} ref={ctaRef}>
            <a href="#products" className="btn btn--primary btn--lg">
              Explore Collection
            </a>
            <a href="#about" className="btn btn--ghost">
              Our Story →
            </a>
          </div>

          {/* Trust indicators */}
          <div className={styles.trust}>
            <span className={styles.trustItem}>✦ Free shipping over $150</span>
            <span className={styles.trustDivider}>·</span>
            <span className={styles.trustItem}>✦ 30-day returns</span>
            <span className={styles.trustDivider}>·</span>
            <span className={styles.trustItem}>✦ 2-year warranty</span>
          </div>
        </div>

        {/* Hero image */}
        <div className={styles.imageWrapper} ref={imageRef}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/brand/hero-product.png"
              alt="Curated collection of premium lifestyle accessories"
              width={600}
              height={600}
              priority
              className={styles.image}
            />
          </div>
          <div className={styles.accentCircle} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
