"use client";

/**
 * CountUp.tsx
 * Animates a number from 0 to its target value when it enters the viewport.
 * Uses easeOutExpo curve — fast start, graceful deceleration.
 * Respects prefers-reduced-motion (renders final value immediately).
 */

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;      // ms before animation starts after intersection
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function CountUp({
  to,
  duration = 1400,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  delay = 0,
}: CountUpProps) {
  const [value, setValue]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();

          const startAnimation = () => {
            const startTime = performance.now();
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased    = easeOutExpo(progress);
              setValue(parseFloat((eased * to).toFixed(decimals)));
              if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
              } else {
                setValue(to);
              }
            };
            rafRef.current = requestAnimationFrame(tick);
          };

          if (delay > 0) {
            setTimeout(startAnimation, delay);
          } else {
            startAnimation();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration, decimals, started]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`}>
      {prefix}
      {decimals > 0
        ? value.toFixed(decimals)
        : Math.floor(value).toLocaleString()}
      {suffix}
    </span>
  );
}
