"use client";

import { useEffect, useRef } from "react";
import { animateFadeInOnScroll } from "@/lib/gsap-animations";

interface UseScrollAnimationOptions {
  start?: string;
  end?: string;
  scrub?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    animateFadeInOnScroll(element, options);

    // Cleanup is handled by GSAP ScrollTrigger
  }, [options]);

  return elementRef;
};