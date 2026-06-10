'use client';

// =============================================================================
// FlowCart — Hero Section
// =============================================================================
// PURPOSE:
//   The first thing users see. Sets the brand tone with a bold headline,
//   supporting text, CTA button, and product imagery. The hero uses GSAP
//   for a staggered entrance animation.
//
// ANIMATION STRATEGY:
//   1. Headline fades in + slides up (the eye goes here first)
//   2. Subtext fades in (context after the hook)
//   3. CTA button fades in (the action)
//   4. Product image scales up from slightly smaller (visual reward)
//   All staggered with 120ms delay for a cascading "reveal" feel.
//
// INTERVIEW QUESTION:
//   Q: "Why use GSAP timeline instead of CSS animations?"
//   A: GSAP timeline gives precise control over sequencing and stagger.
//      CSS animations can't easily coordinate 4 elements with sequential
//      timing. GSAP also handles will-change and GPU compositing better.
//
//   Q: "Why not animate with Framer Motion?"
//   A: The task brief specifically requires GSAP. Framer Motion is great
//      but adding it alongside GSAP would create two animation systems —
//      unnecessary complexity.
// =============================================================================

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
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Make everything visible without animation
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

    // Build the entrance timeline
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
        '-=0.5' // overlap with previous by 0.5s for fluidity
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
              priority // Load immediately — above the fold
              className={styles.image}
            />
          </div>
          {/* Decorative accent circle behind the image */}
          <div className={styles.accentCircle} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
