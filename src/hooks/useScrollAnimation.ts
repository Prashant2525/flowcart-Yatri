'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  duration?: number;
  stagger?: number;
  childSelector?: string;
}

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
  
  const fromKey = JSON.stringify(from);
  const toKey = JSON.stringify(to);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      const targets = childSelector
        ? container.querySelectorAll(childSelector)
        : [container];

      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const targets = childSelector
      ? container.querySelectorAll(childSelector)
      : [container];

    if (targets.length === 0) return;

    const parsedFrom = JSON.parse(fromKey);
    const parsedTo = JSON.parse(toKey);

    const tween = gsap.fromTo(targets, parsedFrom, {
      ...parsedTo,
      duration,
      stagger: childSelector ? stagger : 0,
      ease: ANIMATION.ease.out,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === container)
        .forEach((st) => st.kill());
    };
  }, [fromKey, toKey, start, duration, stagger, childSelector]);

  return containerRef;
}
