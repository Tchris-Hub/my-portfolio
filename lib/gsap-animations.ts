import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Text reveal animation (split text effect)
export const animateTextReveal = (element: HTMLElement, delay: number = 0) => {
  const text = element.textContent || "";
  const letters = text.split("");
  
  element.innerHTML = letters
    .map((letter) => `<span class="inline-block">${letter === " " ? "&nbsp;" : letter}</span>`)
    .join("");

  const spans = element.querySelectorAll("span");

  gsap.fromTo(
    spans,
    {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.03,
      delay,
      ease: "power3.out",
    }
  );
};

// Fade in on scroll
export const animateFadeInOnScroll = (element: string | HTMLElement, options = {}) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...options,
      },
    }
  );
};

// Stagger animation on scroll
export const animateStaggerOnScroll = (
  container: string | HTMLElement,
  children: string,
  options = {}
) => {
  gsap.fromTo(
    `${container} ${children}`,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
        ...options,
      },
    }
  );
};

// Counter animation (for stats)
export const animateCounter = (element: HTMLElement, target: number, duration: number = 2) => {
  const obj = { value: 0 };

  gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
};

// Parallax effect
export const animateParallax = (element: string | HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Pin section
export const pinSection = (element: string | HTMLElement, endTrigger?: string) => {
  ScrollTrigger.create({
    trigger: element,
    start: "top top",
    end: endTrigger ? `${endTrigger} bottom` : "bottom bottom",
    pin: true,
    pinSpacing: false,
  });
};

// Horizontal scroll section
export const animateHorizontalScroll = (
  container: string | HTMLElement,
  items: string | HTMLElement
) => {
  const element = typeof container === "string" ? document.querySelector(container) : container;
  const itemsElement = typeof items === "string" ? document.querySelector(items) : items;

  if (!element || !itemsElement) return;

  const scrollWidth = (itemsElement as HTMLElement).scrollWidth - window.innerWidth;

  gsap.to(items, {
    x: -scrollWidth,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });
};

// Draw SVG path animation
export const animateSVGDraw = (path: string | SVGPathElement, duration: number = 2) => {
  const element = typeof path === "string" ? document.querySelector(path) : path;
  if (!element) return;

  const length = (element as SVGPathElement).getTotalLength();

  gsap.set(element, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  gsap.to(element, {
    strokeDashoffset: 0,
    duration,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
};

// Scale on scroll
export const animateScaleOnScroll = (element: string | HTMLElement, options = {}) => {
  gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...options,
      },
    }
  );
};

// Rotate on scroll
export const animateRotateOnScroll = (element: string | HTMLElement, rotation: number = 360) => {
  gsap.to(element, {
    rotation,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Smooth scroll to section
export const scrollToSection = (target: string | HTMLElement, offset: number = 0) => {
  gsap.to(window, {
    duration: 1.2,
    scrollTo: {
      y: target,
      offsetY: offset,
    },
    ease: "power3.inOut",
  });
};

// Timeline for hero section
export const createHeroTimeline = () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  return tl;
};

// Cleanup ScrollTriggers
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Refresh ScrollTriggers (call after DOM changes)
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};