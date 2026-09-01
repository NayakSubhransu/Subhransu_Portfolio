"use client";

/**
 * CursorTrail.tsx
 * 14 trailing dots that follow the cursor with decreasing opacity and scale.
 * Each dot is delayed by i * 18ms giving a snake/comet tail effect.
 * Colors cycle through emerald → indigo → emerald matching the palette.
 * Zero DOM reads per frame — pure canvas rAF.
 */

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 14;
const DOT_RADIUS   = 4;

// Emerald → indigo gradient stops
const COLORS = [
  { r: 16,  g: 185, b: 129 }, // emerald
  { r: 52,  g: 211, b: 153 }, // emerald-light
  { r: 99,  g: 102, b: 241 }, // indigo
  { r: 129, g: 140, b: 248 }, // indigo-light
  { r: 16,  g: 185, b: 129 }, // back to emerald
];

function getColor(t: number) {
  const scaled = t * (COLORS.length - 1);
  const i      = Math.floor(scaled);
  const f      = scaled - i;
  const a      = COLORS[Math.min(i, COLORS.length - 1)];
  const b      = COLORS[Math.min(i + 1, COLORS.length - 1)];
  return {
    r: Math.round(a.r + (b.r - a.r) * f),
    g: Math.round(a.g + (b.g - a.g) * f),
    b: Math.round(a.b + (b.b - a.b) * f),
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    if (prefersReduced || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // Circular buffer of trail positions
    const trail: { x: number; y: number }[] = Array.from(
      { length: TRAIL_LENGTH },
      () => ({ x: -100, y: -100 })
    );

    let mouseX = -100;
    let mouseY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update trail — each dot chases the one in front
      trail[0].x = lerp(trail[0].x, mouseX, 0.38);
      trail[0].y = lerp(trail[0].y, mouseY, 0.38);

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail[i].x = lerp(trail[i].x, trail[i - 1].x, 0.55);
        trail[i].y = lerp(trail[i].y, trail[i - 1].y, 0.55);
      }

      // Draw dots — from tail to head so head renders on top
      for (let i = TRAIL_LENGTH - 1; i >= 0; i--) {
        const t       = 1 - i / TRAIL_LENGTH;     // 0=tail, 1=head
        const alpha   = t * t * 0.65;              // quadratic fade
        const radius  = DOT_RADIUS * (0.3 + t * 0.7);
        const color   = getColor(t);

        // Glow
        const grd = ctx.createRadialGradient(
          trail[i].x, trail[i].y, 0,
          trail[i].x, trail[i].y, radius * 4
        );
        grd.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${(alpha * 0.5).toFixed(3)})`);
        grd.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999, mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
