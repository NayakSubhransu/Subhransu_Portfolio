"use client";

/**
 * TextScramble.tsx
 * Scrambles through random characters before resolving to the real text
 * when the element enters the viewport.
 * Creates a hacker/terminal aesthetic matching the portfolio identity.
 *
 * Usage:
 *   <TextScramble text="COMPETITIVE PROGRAMMING" className="section-eyebrow" />
 *
 * The component fires once on intersection, never repeats.
 */

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./\\[]{}#@!%^*";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;   // ms before scramble starts (default 0)
  speed?: number;   // ms between frames (default 38)
  children?: React.ReactNode; // icon children rendered before text
}

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 38,
  children,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const [done, setDone]       = useState(false);
  const ref   = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf   = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          observer.disconnect();

          timer.current = setTimeout(() => {
            let iteration = 0;
            const totalFrames = text.length * 3; // scramble 3 frames per char

            raf.current = setInterval(() => {
              const resolved = Math.floor(iteration / 3);

              setDisplay(
                text
                  .split("")
                  .map((char, idx) => {
                    if (char === " ") return " ";
                    if (idx < resolved) return char; // resolved chars
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                  })
                  .join("")
              );

              iteration++;

              if (iteration >= totalFrames) {
                clearInterval(raf.current!);
                setDisplay(text);
                setDone(true);
              }
            }, speed);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (timer.current) clearTimeout(timer.current);
      if (raf.current)   clearInterval(raf.current);
    };
  }, [text, delay, speed, done]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {children}
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
