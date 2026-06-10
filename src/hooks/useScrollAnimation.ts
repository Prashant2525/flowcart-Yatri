'use client';

// =============================================================================
// FlowCart — useScrollAnimation Hook
// =============================================================================
// PURPOSE:
//   A reusable hook that applies GSAP ScrollTrigger animations to elements.
//   Components pass a ref and configuration, and this hook handles the
//   animation lifecycle (setup + cleanup).
//
// WHY a custom hook instead of inline GSAP in each component?
//   1. DRY — Multiple sections use scroll-triggered reveals
//   2. Cleanup — Properly kills ScrollTrigger instances to prevent memory leaks
//   3. Reduced motion — Centralized handling of prefers-reduced-motion
//   4. Consistency — All scroll animations share the same timing/easing
//
// INTERVIEW QUESTION:
//   Q: "Why do you kill ScrollTrigger instances in cleanup?"
//   A: ScrollTrigger attaches scroll event listeners and IntersectionObservers.
//      If the component unmounts (e.g., route change), those listeners become
//      orphaned — they reference detached DOM nodes and waste CPU on scroll.
//      This is a common GSAP memory leak that many developers miss.
// =============================================================================

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION } from '@/lib/constants';

// Register ScrollTrigger plugin — must be done once at module level
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  /** Starting transform (default: translateY 30px, opacity 0). */
  from?: gsap.TweenVars;
  /** Ending transform (default: translateY 0, opacity 1). */
  to?: gsap.TweenVars;
  /** ScrollTrigger start position (default: 'top 85%'). */
  start?: string;
  /** Animation duration in seconds. */
  duration?: number;
  /** Stagger delay between child elements (seconds). Set to 0 to disable. */
  stagger?: number;
  /** CSS selector for child elements to stagger. If not set, animates the container. */
  childSelector?: string;
}

/**
 * Applies a GSAP scroll-triggered animation to a container or its children.
 *
 * @param options - Animation configuration
 * @returns A ref to attach to the animated container element
 *
 * @example
 * // Stagger-reveal child elements as user scrolls to the section
 * const sectionRef = useScrollAnimation({
 *   childSelector: '.product-card',
 *   stagger: 0.1,
 * });
 * return <div ref={sectionRef}>...</div>;
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
): RefObject<T | null> {
  const containerRef = useRef<T>(null);

  const {
    from = { y: 30, opacity: 0 },
    to = { y: 0, opacity: 1 },
    start = ANIMATION.scrollTrigger.start,
    duration = ANIMATION.duration.reveal,
    stagger = ANIMATION.stagger,
    childSelector,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // If user prefers reduced motion, just make elements visible immediately
      const targets = childSelector
        ? container.querySelectorAll(childSelector)
        : [container];

      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    // Determine animation targets
    const targets = childSelector
      ? container.querySelectorAll(childSelector)
      : [container];

    if (targets.length === 0) return;

    // Create the scroll-triggered animation
    const tween = gsap.fromTo(targets, from, {
      ...to,
      duration,
      stagger: childSelector ? stagger : 0,
      ease: ANIMATION.ease.out,
      scrollTrigger: {
        trigger: container,
        start,
        // 'once' means the animation plays once and the trigger is removed
        toggleActions: 'play none none none',
      },
    });

    // Cleanup: kill the tween and its ScrollTrigger when component unmounts
    return () => {
      tween.kill();
      // Also kill any ScrollTrigger instances attached to this container
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === container)
        .forEach((st) => st.kill());
    };
  }, [from, to, start, duration, stagger, childSelector]);

  return containerRef;
}
