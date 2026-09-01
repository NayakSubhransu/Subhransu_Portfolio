"use client";

/**
 * HeroNetwork.tsx — Interactive Distributed Node-Edge Network (Mobile-First)
 *
 * Now fully active on ALL devices — touch events replace mouse events on mobile.
 * Touch interaction: tap = repel, hold = attract (same as mouse click).
 */

import { useEffect, useRef, useCallback } from "react";

// ─── Adaptive constants by screen size ───────────────────────────────────────
const getMobileConstants = () => {
  if (typeof window === "undefined") return { isMobile: true };
  return { isMobile: window.innerWidth < 768 };
};

const NODE_COUNT_MOBILE   = 42;   // richer than before, still fast
const NODE_COUNT_DESKTOP  = 100;
const CONNECTION_RADIUS_M = 120;
const CONNECTION_RADIUS_D = 155;
const NODE_RADIUS_MIN = 1.2;
const NODE_RADIUS_MAX = 3.2;
const BASE_SPEED = 0.22;
const FRICTION   = 0.968;
const MOUSE_REPEL_RADIUS_M = 110;
const MOUSE_REPEL_RADIUS_D = 190;
const REPEL_STRENGTH   = 13500;
const ATTRACT_STRENGTH = 0.022;

const EMERALD = { r: 16,  g: 185, b: 129 }; // #10b981
const INDIGO  = { r: 99,  g: 102, b: 241 }; // #6366f1
const CYAN    = { r: 34,  g: 211, b: 238 }; // #22d3ee

// ─── Types ────────────────────────────────────────────────────────────────────
interface Node {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  colorT: number;
  isPulse: boolean;
  pulsePhase: number;
  pulseSpeed: number;
}

function lerpColor(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number
) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

function rgba(c: { r: number; g: number; b: number }, a: number) {
  return `rgba(${c.r},${c.g},${c.b},${a.toFixed(3)})`;
}

export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef  = useRef<Node[]>([]);
  const mouseRef  = useRef({ x: -9999, y: -9999, down: false });
  const rafRef    = useRef<number>(0);
  const dimRef    = useRef({ w: 0, h: 0, dpr: 1, isMobile: false });

  const buildNodes = useCallback((w: number, h: number, count: number): Node[] =>
    Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * BASE_SPEED * 2,
      vy: (Math.random() - 0.5) * BASE_SPEED * 2,
      radius: NODE_RADIUS_MIN + Math.random() * (NODE_RADIUS_MAX - NODE_RADIUS_MIN),
      alpha: 0.45 + Math.random() * 0.45,
      colorT: i / count,
      isPulse: i % 9 === 0,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.018 + Math.random() * 0.014,
    }))
  , []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { isMobile } = getMobileConstants();
    dimRef.current.isMobile = isMobile;

    const NODE_COUNT       = isMobile ? NODE_COUNT_MOBILE  : NODE_COUNT_DESKTOP;
    const CONNECTION_RADIUS = isMobile ? CONNECTION_RADIUS_M : CONNECTION_RADIUS_D;
    const REPEL_RADIUS     = isMobile ? MOUSE_REPEL_RADIUS_M : MOUSE_REPEL_RADIUS_D;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dimRef.current.dpr = dpr;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dimRef.current.w = w; dimRef.current.h = h;
      canvas.width  = w * dpr; canvas.height = h * dpr;
      canvas.style.width  = `${w}px`; canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      nodesRef.current = buildNodes(w, h, NODE_COUNT);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Input: Mouse ──
    const onMouseMove  = (e: MouseEvent) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    const onMouseDown  = () => { mouseRef.current.down = true; };
    const onMouseUp    = () => { mouseRef.current.down = false; };

    // ── Input: Touch — maps touch to same mouseRef so draw loop is unified ──
    const onTouchMove  = (e: TouchEvent) => {
      const t = e.touches[0];
      mouseRef.current.x = t.clientX;
      mouseRef.current.y = t.clientY;
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      mouseRef.current.x = t.clientX;
      mouseRef.current.y = t.clientY;
      mouseRef.current.down = true;
    };
    const onTouchEnd   = () => {
      mouseRef.current.down = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    window.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mouseup",    onMouseUp);
    // Touch events on the canvas itself for hero section interaction
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: true });
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchend",   onTouchEnd);

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      const { w, h } = dimRef.current;
      const { x: mx, y: my, down } = mouseRef.current;
      const nodes = nodesRef.current;
      ctx.clearRect(0, 0, w, h);

      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulsePhase += n.pulseSpeed;

        const dx = n.x - mx, dy = n.y - my;
        const distSq = dx * dx + dy * dy;
        const dist   = Math.sqrt(distSq);

        if (down && mx > -9000) {
          n.vx += (mx - n.x) * ATTRACT_STRENGTH * 0.012;
          n.vy += (my - n.y) * ATTRACT_STRENGTH * 0.012;
        } else if (dist < REPEL_RADIUS && dist > 0.01 && mx > -9000) {
          const force = REPEL_STRENGTH / (distSq + 200);
          n.vx += (dx / dist) * force * 0.015;
          n.vy += (dy / dist) * force * 0.015;
        }

        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        const maxS  = BASE_SPEED * 5;
        if (speed > maxS) { n.vx = (n.vx / speed) * maxS; n.vy = (n.vy / speed) * maxS; }
        n.vx *= FRICTION; n.vy *= FRICTION;
        n.x  += n.vx; n.y += n.vy;

        const margin = 20;
        if (n.x < margin)     n.vx += 0.35;
        if (n.x > w - margin) n.vx -= 0.35;
        if (n.y < margin)     n.vy += 0.35;
        if (n.y > h - margin) n.vy -= 0.35;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECTION_RADIUS) continue;

          const edgeAlpha = (1 - dist / CONNECTION_RADIUS) * 0.38;
          const colorT = (a.colorT + b.colorT) / 2;
          const color  = colorT < 0.5
            ? lerpColor(EMERALD, INDIGO, colorT * 2)
            : lerpColor(INDIGO, EMERALD, (colorT - 0.5) * 2);

          const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
          const mDist = mx > -9000 ? Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2) : 9999;
          const highlight = mDist < 140 ? 1 + (1 - mDist / 140) * 1.8 : 1;

          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = rgba(color, edgeAlpha * highlight);
          ctx.lineWidth   = 0.6 + (1 - dist / CONNECTION_RADIUS) * 0.8;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const color = n.colorT < 0.5
          ? lerpColor(EMERALD, INDIGO, n.colorT * 2)
          : lerpColor(INDIGO, EMERALD, (n.colorT - 0.5) * 2);

        const pulseMult = n.isPulse ? 1 + Math.sin(n.pulsePhase) * 0.45 : 1;
        const r = n.radius * pulseMult;
        const nodeDist   = mx > -9000 ? Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2) : 9999;
        const proximity  = nodeDist < 100 ? 1 + (1 - nodeDist / 100) * 2.5 : 1;
        const finalAlpha = Math.min(n.alpha * proximity, 1);

        const glowR = r * (n.isPulse ? 5 : 3.5) * proximity;
        const grd   = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grd.addColorStop(0, rgba(color, finalAlpha * (n.isPulse ? 0.32 : 0.18)));
        grd.addColorStop(1, rgba(color, 0));
        ctx.beginPath(); ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();

        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(color, finalAlpha); ctx.fill();

        if (n.isPulse) {
          const ringAlpha = (0.5 + Math.sin(n.pulsePhase) * 0.5) * 0.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 2.5 + Math.sin(n.pulsePhase) * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(CYAN, ringAlpha);
          ctx.lineWidth   = 0.8; ctx.stroke();
        }
      }

      // Cursor/touch indicator
      if (mx > -9000 && mx > 0 && mx < w && my > 0 && my < h) {
        const cursorColor = down ? CYAN : EMERALD;
        const cursorAlpha = down ? 0.85 : 0.55;
        const cursorR     = down ? 7 : 5;

        const cursorGrd = ctx.createRadialGradient(mx, my, 0, mx, my, REPEL_RADIUS * 0.5);
        cursorGrd.addColorStop(0, rgba(cursorColor, 0.06));
        cursorGrd.addColorStop(1, rgba(cursorColor, 0));
        ctx.beginPath(); ctx.arc(mx, my, REPEL_RADIUS * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = cursorGrd; ctx.fill();

        ctx.beginPath(); ctx.arc(mx, my, cursorR, 0, Math.PI * 2);
        ctx.fillStyle = rgba(cursorColor, cursorAlpha); ctx.fill();

        const arm = 14, gap = cursorR + 3;
        ctx.strokeStyle = rgba(cursorColor, cursorAlpha * 0.7);
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.moveTo(mx - arm, my); ctx.lineTo(mx - gap, my);
        ctx.moveTo(mx + gap, my); ctx.lineTo(mx + arm, my);
        ctx.moveTo(mx, my - arm); ctx.lineTo(mx, my - gap);
        ctx.moveTo(mx, my + gap); ctx.lineTo(mx, my + arm);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mouseup",    onMouseUp);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend",   onTouchEnd);
    };
  }, [buildNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, opacity: 0.75, pointerEvents: "auto", touchAction: "none" }}
      aria-hidden="true"
    />
  );
}
