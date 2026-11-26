'use client';

import { useState, useEffect } from 'react';

export interface ScrollSpyResult {
  /** The id of the section currently in the viewport */
  activeSection: string;
  /** Programmatic setter to manually override the active section */
  setActiveSection: (id: string) => void;
  /** Document vertical scroll progress percentage (0 to 100) */
  scrollProgress: number;
}

/**
 * Custom React hook that tracks scroll position, determines the currently active
 * viewport section based on element offsets, and calculates total document scroll percentage.
 *
 * Uses passive event listeners to maintain high framerate scrolling performance.
 *
 * @param sectionIds - Ordered array of DOM element IDs corresponding to target sections.
 * @param offset - Vertical pixel offset threshold to trigger section activation (default: 180px).
 * @returns Object containing `activeSection`, `setActiveSection`, and `scrollProgress`.
 */
export function useScrollSpy(
  sectionIds: string[],
  offset = 180
): ScrollSpyResult {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'about');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        if (!sectionId) continue;
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return { activeSection, setActiveSection, scrollProgress };
}
