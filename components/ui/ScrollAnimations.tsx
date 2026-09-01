"use client";

import { useEffect } from "react";

// ── Mounts an IntersectionObserver that adds .in-view to any element
// that has [data-animate] or [data-animate-children] once it enters
// the viewport. No external library required.

export default function ScrollAnimations() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      "[data-animate], [data-animate-children]"
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            // Unobserve after animation fires — play once only
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null; // purely behavioral — renders nothing
}
