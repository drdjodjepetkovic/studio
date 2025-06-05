
import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollAnimationOptions extends IntersectionObserverInit {
  once?: boolean; // Whether to unobserve after first intersection
}

export const useScrollAnimation = <T extends HTMLElement,>(
  options?: ScrollAnimationOptions,
  isPageScrolling?: boolean // New prop
) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const optionsRef = useRef(options); 

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    const [entry] = entries;
    // Only set isVisible if intersecting AND not currently page scrolling
    if (entry.isIntersecting && !isPageScrolling) {
      setIsVisible(true);
      if (optionsRef.current?.once && ref.current) {
        observer.unobserve(ref.current);
      }
    }
    // If 'once' is false (not the typical case for AnimatedText), you might add:
    // else if (!optionsRef.current?.once && !entry.isIntersecting) {
    //   setIsVisible(false); // Reset if no longer intersecting and not 'once'
    // }
  }, [isPageScrolling]); // Add isPageScrolling as a dependency

  useEffect(() => {
    const currentRef = ref.current; 
    if (!currentRef) return;

    const currentObserverOptions = {
      root: optionsRef.current?.root,
      rootMargin: optionsRef.current?.rootMargin || '0px',
      threshold: optionsRef.current?.threshold || 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, currentObserverOptions);

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  // Re-run this effect if handleIntersection changes (due to isPageScrolling change)
  // or if the 'options' object identity itself changes.
  }, [handleIntersection, options, isPageScrolling]); // Added isPageScrolling to ensure observer re-evaluates

  return { ref, isVisible };
};