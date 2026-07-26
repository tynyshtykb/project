import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Fraction of the element that must be visible before it counts as shown. */
  threshold?: number;
  /** Shrinks the viewport so elements reveal slightly before they hit the edge. */
  rootMargin?: string;
  /** Reveal once and stop observing (default) or re-trigger on every entry. */
  once?: boolean;
};

/**
 * Reveal-on-scroll primitive. Anything already in the viewport on mount is
 * shown immediately, so the first screen never flashes empty.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0,
  rootMargin = '0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    // Anything already on screen at mount is shown straight away. Waiting for
    // the observer's first callback would race with any scroll that happens in
    // the same frame, which can leave above-the-fold content stuck hidden.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);

    // Safety net for anything the observer's rootMargin excludes or coalesces
    // away — fast flick-scrolls, anchor jumps, restored scroll positions.
    // A single getBoundingClientRect is cheap, and the listener removes itself
    // the moment the element is shown, so the steady state carries none.
    // Note the deliberately loose test: anything whose top has reached the
    // bottom of the viewport counts, including elements already scrolled past.
    // Requiring the element to still be on screen would leave content that a
    // fast flick-scroll skipped over permanently invisible.
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        setInView(true);
        if (once) detach();
      }
    };
    const detach = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer.disconnect();
      detach();
    };
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
