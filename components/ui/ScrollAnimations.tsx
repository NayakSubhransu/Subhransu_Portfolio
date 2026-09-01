"use client";

import { useEffect } from "react";

/**
 * ScrollAnimations — fires .in-view on [data-animate] / [data-animate-children]
 * Uses a lower threshold on mobile for earlier trigger (content enters viewport faster).
 */
export default function ScrollAnimations() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      "[data-animate], [data-animate-children]"
    );
    if (!targets.length) return;

    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: isMobile ? 0.04 : 0.08,
        rootMargin: isMobile ? "0px 0px -20px 0px" : "0px 0px -40px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
