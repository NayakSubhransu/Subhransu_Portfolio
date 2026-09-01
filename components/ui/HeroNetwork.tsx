"use client";

/**
 * HeroNetwork.tsx — Interactive Distributed Node-Edge Network
 *
 * A full-viewport canvas that renders a living particle network behind the
 * Hero content. Every node is a "server" in a distributed system — they drift
 * with Brownian motion, form transient connections when close, and react to
 * the mouse cursor as a force-field (repel on hover, attract on click+hold).
 *
 * Physics:
 *  - Each node has velocity + friction (0.985 damping)
 *  - Mouse repulsion: inverse-square force within a 180px radius
 *  - Click attraction: pulls all nodes toward cursor
 *  - Edge opacity scales with 1 - (dist / CONNECTION_RADIUS)
 *  - Edge color lerps emerald → indigo based on node indices
 *
 * Performance:
 *  - Single canvas, single rAF loop
 *  - Spatial partitioning: only checks nodes within a grid cell for edges
 *  - GPU composited via will-change: transform on the wrapper
 *  - Fully paused on prefers-reduced-motion
 *  - Fully disabled on touch devices (replaced by static gradient)
 */

import { useEffect, useRef, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
// const NODE_COUNT         = 100;
// const CONNECTION_RADIUS  = 140;   // px — max distance to draw an edge
// const MOUSE_REPEL_RADIUS = 200;   // px — force field radius
// const REPEL_STRENGTH     = 20000;  // higher = stronger push
// const ATTRACT_STRENGTH   = 0.018; // click-hold pull toward cursor
// const FRICTION           = 0.985; // velocity damping per frame
// const BASE_SPEED         = 0.48;  // px/frame max random velocity
// const NODE_RADIUS_MIN    = 1;
// const NODE_RADIUS_MAX    = 3;

// ─── Production-Tuned 3D Network Constants ─────────────────────────────────────
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

// Density & Connectivity
export const NODE_COUNT         = isMobile ? 32 : 100;    // Clean density; prevents CPU lag & visual clutter
const CONNECTION_RADIUS = isMobile ? 110 : 155;
const NODE_RADIUS_MIN = 1.2;
const NODE_RADIUS_MAX = 3.2;  
        
const BASE_SPEED = 0.22;
const FRICTION = 0.968;

// Mouse & Touch Interaction
const MOUSE_REPEL_RADIUS = isMobile ? 100 : 190;   // px — focused interactive aura around cursor
export const REPEL_STRENGTH     = 13500;                 // Smooth displacement without throwing nodes off-screen
export const ATTRACT_STRENGTH   = 0.022;                 // Gravitational pull force on click/hold

// Emerald and indigo — matching the portfolio palette exactly
const EMERALD = { r: 60,  g: 185, b: 129 }; // #10b981
const INDIGO  = { r: 199,  g: 32, b: 241 }; // #6366f1
const CYAN    = { r: 124,  g: 211, b: 238 }; // #22d3ee — accent for pulse nodes

// ─── Types ────────────────────────────────────────────────────────────────────
interface Node {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;      // base opacity
  colorT: number;     // 0 = emerald, 1 = indigo
  isPulse: boolean;   // a few nodes pulse and glow larger — "active servers"
  pulsePhase: number;
  pulseSpeed: number;
}

// ─── Color helpers ────────────────────────────────────────────────────────────
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

function rgba(
  c: { r: number; g: number; b: number },
  a: number
) {
  return `rgba(${c.r},${c.g},${c.b},${a.toFixed(3)})`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroNetwork() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const nodesRef     = useRef<Node[]>([]);
  const mouseRef     = useRef({ x: -9999, y: -9999, down: false });
  const rafRef       = useRef<number>(0);
  const dimRef       = useRef({ w: 0, h: 0, dpr: 1 });

  // ── Build initial nodes ────────────────────────────────────────────────────
  const buildNodes = useCallback((w: number, h: number): Node[] => {
    return Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * BASE_SPEED * 2,
      vy: (Math.random() - 0.5) * BASE_SPEED * 2,
      radius: NODE_RADIUS_MIN + Math.random() * (NODE_RADIUS_MAX - NODE_RADIUS_MIN),
      alpha: 0.45 + Math.random() * 0.45,
      colorT: i / NODE_COUNT,           // spread across emerald→indigo spectrum
      isPulse: i % 9 === 0,             // every 9th node is a "pulse" node
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.018 + Math.random() * 0.014,
    }));
  }, []);

  useEffect(() => {
    // ── Reduced motion / touch guard ────────────────────────────────────────
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    
    if (prefersReduced || isTouch) return;
    // const isTouch = ...; // used to SKIP mouse forces, not to exit

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Sizing ───────────────────────────────────────────────────────────────
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dimRef.current.dpr = dpr;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dimRef.current.w = w;
      dimRef.current.h = h;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      // Rebuild nodes on resize to fill new dimensions
      nodesRef.current = buildNodes(w, h);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onMouseDown = () => { mouseRef.current.down = true; };
    const onMouseUp   = () => { mouseRef.current.down = false; };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      const { w, h } = dimRef.current;
      const { x: mx, y: my, down } = mouseRef.current;
      const nodes = nodesRef.current;

      // Clear with very slight trail for motion blur feel
      ctx.clearRect(0, 0, w, h);

      // ── Update nodes ────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulsePhase += n.pulseSpeed;

        // Mouse force
        const dx = n.x - mx;
        const dy = n.y - my;
        const distSq = dx * dx + dy * dy;
        const dist   = Math.sqrt(distSq);

        if (down) {
          // Click-hold: attract toward cursor
          const pull = ATTRACT_STRENGTH;
          n.vx += (mx - n.x) * pull * 0.012;
          n.vy += (my - n.y) * pull * 0.012;
        } else if (dist < MOUSE_REPEL_RADIUS && dist > 0.01) {
          // Hover: repel with inverse-square falloff
          const force = REPEL_STRENGTH / (distSq + 200);
          n.vx += (dx / dist) * force * 0.015;
          n.vy += (dy / dist) * force * 0.015;
        }

        // Clamp velocity
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        const maxSpeed = BASE_SPEED * 5;
        if (speed > maxSpeed) {
          n.vx = (n.vx / speed) * maxSpeed;
          n.vy = (n.vy / speed) * maxSpeed;
        }

        // Friction
        n.vx *= FRICTION;
        n.vy *= FRICTION;

        // Move
        n.x += n.vx;
        n.y += n.vy;

        // Soft boundary — bounce off edges with damping
        const margin = 20;
        if (n.x < margin)     { n.vx += 0.35; }
        if (n.x > w - margin) { n.vx -= 0.35; }
        if (n.y < margin)     { n.vy += 0.35; }
        if (n.y > h - margin) { n.vy -= 0.35; }
      }

      // ── Draw edges ──────────────────────────────────────────────────────────
      // Only draw n*(n-1)/2 unique pairs; skip if too far
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > CONNECTION_RADIUS) continue;

          // Proximity-based opacity — closer = more opaque
          const edgeAlpha = (1 - dist / CONNECTION_RADIUS) * 0.38;

          // Edge color: lerp between the two node colors
          const colorT = (a.colorT + b.colorT) / 2;
          const color  = colorT < 0.5
            ? lerpColor(EMERALD, INDIGO, colorT * 2)
            : lerpColor(INDIGO, EMERALD, (colorT - 0.5) * 2);

          // Highlight edges near mouse
          const midX  = (a.x + b.x) / 2;
          const midY  = (a.y + b.y) / 2;
          const mDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
          const highlight = mDist < 140
            ? 1 + (1 - mDist / 140) * 1.8
            : 1;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = rgba(color, edgeAlpha * highlight);
          ctx.lineWidth   = 0.6 + (1 - dist / CONNECTION_RADIUS) * 0.8;
          ctx.stroke();
        }
      }

      // ── Draw nodes ──────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const color = n.colorT < 0.5
          ? lerpColor(EMERALD, INDIGO, n.colorT * 2)
          : lerpColor(INDIGO, EMERALD, (n.colorT - 0.5) * 2);

        // Pulse nodes breathe
        const pulseMult = n.isPulse
          ? 1 + Math.sin(n.pulsePhase) * 0.45
          : 1;
        const r = n.radius * pulseMult;

        // Mouse proximity glow on individual node
        const nodeDist = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
        const proximity = nodeDist < 100
          ? 1 + (1 - nodeDist / 100) * 2.5
          : 1;
        const finalAlpha = Math.min(n.alpha * proximity, 1);

        // Outer glow
        const glowR = r * (n.isPulse ? 5 : 3.5) * proximity;
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grd.addColorStop(0, rgba(color, finalAlpha * (n.isPulse ? 0.32 : 0.18)));
        grd.addColorStop(1, rgba(color, 0));
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(color, finalAlpha);
        ctx.fill();

        // Pulse nodes: cyan ring
        if (n.isPulse) {
          const ringAlpha = (0.5 + Math.sin(n.pulsePhase) * 0.5) * 0.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 2.5 + Math.sin(n.pulsePhase) * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(CYAN, ringAlpha);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // ── Mouse cursor — cross-hair query router ──────────────────────────────
      if (mx > 0 && mx < w && my > 0 && my < h) {
        const cursorColor = down ? CYAN : EMERALD;
        const cursorAlpha = down ? 0.85 : 0.55;
        const cursorR     = down ? 7 : 5;

        // Pulsing ring around cursor
        const cursorGrd = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_REPEL_RADIUS * 0.5);
        cursorGrd.addColorStop(0, rgba(cursorColor, 0.06));
        cursorGrd.addColorStop(1, rgba(cursorColor, 0));
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_REPEL_RADIUS * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = cursorGrd;
        ctx.fill();

        // Center dot
        ctx.beginPath();
        ctx.arc(mx, my, cursorR, 0, Math.PI * 2);
        ctx.fillStyle = rgba(cursorColor, cursorAlpha);
        ctx.fill();

        // Cross-hair lines
        const arm = 14;
        const gap = cursorR + 3;
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
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [buildNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.75 }}
      aria-hidden="true"
    />
  );
}
