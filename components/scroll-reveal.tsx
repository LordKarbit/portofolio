"use client";

import { useEffect } from "react";

const STAGGER_MS = 70;
const STAGGER_STEPS = 5;

/**
 * Drives the `.reveal` entrance animation for every browser (the previous
 * approach relied on `animation-timeline: view()`, which Firefox and older
 * Safari simply skip). Mounted once per page; renders nothing.
 */
export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (elements.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    elements.forEach((element, index) => {
      element.classList.add("reveal-armed");
      element.style.transitionDelay = `${(index % STAGGER_STEPS) * STAGGER_MS}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
