import * as React from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

type RevealState = {
  visible: boolean;
  ref: React.RefCallback<HTMLElement>;
};

export function useScrollReveal(options: UseScrollRevealOptions = {}): RevealState {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -8% 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const [visible, setVisible] = React.useState(false);
  const [node, setNode] = React.useState<HTMLElement | null>(null);

  const ref = React.useCallback((element: HTMLElement | null) => {
    setNode(element);
  }, []);

  React.useEffect(() => {
    if (!node) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          const apply = () => setVisible(true);
          if (delay > 0) {
            timeoutId = setTimeout(apply, delay);
          } else {
            apply();
          }
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [node, threshold, rootMargin, triggerOnce, delay]);

  return { visible, ref };
}

export default useScrollReveal;
