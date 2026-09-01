
"use client";

/**
 * ThreeD.tsx — Global 3D Effects Engine
 *
 * Implements 5 distinct 3D systems:
 *
 * 1. PARALLAX CURSOR — ambient orbs in Hero follow mouse with depth offset
 * 2. CARD TILT — all section cards rotate on mouse proximity (GPU-accelerated)
 * 3. MAGNETIC BUTTONS — CTA buttons attract toward cursor like a magnet
 * 4. SPOTLIGHT — radial light that follows cursor across the whole page
 * 5. FLOATING PARTICLES — subtle depth-layered particles that drift in 3D space
 *
 * All effects:
 *  - Are CSS transform / will-change based (GPU composited, no layout thrash)
 *  - Respect prefers-reduced-motion (fully disabled when set)
 *  - Are disabled on touch devices (detected via pointer media query)
 *  - Clean up all listeners on unmount
 */

import { useEffect, useRef } from "react";

// ─── Utility: lerp ───────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ─── 1. PARALLAX CURSOR ──────────────────────────────────────────────────────
// Hero ambient blobs move at different speeds based on data-depth attribute.
// data-depth="0.3" = slow (far away), data-depth="0.8" = fast (close up).
function useParallaxCursor() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (prefersReduced || isTouch) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-depth]");
    if (!elements.length) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const currentX: number[] = Array.from(elements).map(() => 0);
    const currentY: number[] = Array.from(elements).map(() => 0);
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const cx = mouseX - window.innerWidth / 2;
      const cy = mouseY - window.innerHeight / 2;

      elements.forEach((el, i) => {
        const depth = parseFloat(el.dataset.depth || "0.3");
        const targetX = cx * depth * 0.04;
        const targetY = cy * depth * 0.04;
        currentX[i] = lerp(currentX[i], targetX, 0.06);
        currentY[i] = lerp(currentY[i], targetY, 0.06);
        el.style.transform = `translate3d(${currentX[i]}px, ${currentY[i]}px, 0)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

// ─── 2. CARD TILT ────────────────────────────────────────────────────────────
// Any element with [data-tilt] gets 3D tilt on hover.
// data-tilt-strength="12" controls max rotation degrees (default 8).
// data-tilt-glare="true" adds a moving light reflection.
function useCardTilt() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (prefersReduced || isTouch) return;

    const cards = document.querySelectorAll<HTMLElement>("[data-tilt]");
    if (!cards.length) return;

    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const strength = parseFloat(card.dataset.tiltStrength || "8");
      const hasGlare = card.dataset.tiltGlare === "true";

      // Inject glare element
      let glare: HTMLElement | null = null;
      if (hasGlare) {
        glare = document.createElement("div");
        glare.style.cssText = `
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 60%);
          opacity: 0; pointer-events: none; z-index: 10;
          transition: opacity 0.3s ease;
        `;
        const pos = card.style.position;
        if (!pos || pos === "static") card.style.position = "relative";
        card.appendChild(glare);
      }

      let currentRotX = 0;
      let currentRotY = 0;
      let targetRotX = 0;
      let targetRotY = 0;
      let rafId: number;
      let isHovered = false;

      const animate = () => {
        currentRotX = lerp(currentRotX, targetRotX, 0.12);
        currentRotY = lerp(currentRotY, targetRotY, 0.12);

        const scale = isHovered ? 1.015 : 1;
        card.style.transform = `
          perspective(800px)
          rotateX(${currentRotX}deg)
          rotateY(${currentRotY}deg)
          scale(${scale})
        `;

        if (glare) {
          const x = 50 + (targetRotY / strength) * 30;
          const y = 50 - (targetRotX / strength) * 30;
          glare.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.10), transparent 65%)`;
        }

        if (
          isHovered ||
          Math.abs(currentRotX) > 0.01 ||
          Math.abs(currentRotY) > 0.01
        ) {
          rafId = requestAnimationFrame(animate);
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const nx = (cx / rect.width - 0.5) * 2;
        const ny = (cy / rect.height - 0.5) * 2;
        targetRotX = -ny * strength;
        targetRotY = nx * strength;
        if (glare) glare.style.opacity = "1";
      };

      const onMouseEnter = () => {
        isHovered = true;
        card.style.transition = "box-shadow 0.3s ease";
        card.style.willChange = "transform";
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
      };

      const onMouseLeave = () => {
        isHovered = false;
        targetRotX = 0;
        targetRotY = 0;
        if (glare) glare.style.opacity = "0";
        card.style.willChange = "auto";
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);

      cleanups.push(() => {
        cancelAnimationFrame(rafId);
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mouseleave", onMouseLeave);
        if (glare && card.contains(glare)) card.removeChild(glare);
        card.style.transform = "";
        card.style.willChange = "";
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}

// ─── 3. MAGNETIC BUTTONS ─────────────────────────────────────────────────────
// Elements with [data-magnetic] attract toward cursor within a radius.
// data-magnetic-strength="0.4" controls attraction (0–1, default 0.35).
function useMagneticButtons() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (prefersReduced || isTouch) return;

    const buttons = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    if (!buttons.length) return;

    const cleanups: (() => void)[] = [];

    buttons.forEach((btn) => {
      const strength = parseFloat(btn.dataset.magneticStrength || "0.35");
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;
      let rafId: number;
      let isActive = false;

      const animate = () => {
        currentX = lerp(currentX, targetX, 0.14);
        currentY = lerp(currentY, targetY, 0.14);
        btn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

        if (isActive || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
          rafId = requestAnimationFrame(animate);
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = Math.max(rect.width, rect.height) * 1.5;

        if (dist < radius) {
          isActive = true;
          targetX = dx * strength;
          targetY = dy * strength;
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(animate);
        } else if (isActive) {
          isActive = false;
          targetX = 0;
          targetY = 0;
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(animate);
        }
      };

      const onMouseLeave = () => {
        isActive = false;
        targetX = 0;
        targetY = 0;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      btn.addEventListener("mouseleave", onMouseLeave);

      cleanups.push(() => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
        btn.style.transform = "";
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}

// ─── 4. SPOTLIGHT ────────────────────────────────────────────────────────────
// A radial spotlight follows the cursor across the entire page.
// Very subtle — just enough to give the page a sense of depth and lighting.
function useSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (prefersReduced || isTouch) return;

    const spot = spotRef.current;
    if (!spot) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.08);
      currentY = lerp(currentY, mouseY, 0.08);
      spot.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return spotRef;
}

// ─── 5. FLOATING PARTICLES ───────────────────────────────────────────────────
// 20 tiny particles float in 3D space — different sizes, speeds, and z-depths.
// They drift upward and reset, creating a sense of depth and atmosphere.
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (prefersReduced || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    // Particle definition — varying depth (z) creates parallax feel
    type Particle = {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      hue: number;
      pulse: number;
      pulseSpeed: number;
    };

    const PARTICLE_COUNT = 22;

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(), // 0 = far, 1 = close
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(Math.random() * 0.25 + 0.08), // drift upward
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.35 + 0.08,
        hue: Math.random() > 0.65 ? 160 : 240, // emerald or indigo
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.012 + 0.006,
      }),
    );

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const pulseFactor = 0.75 + Math.sin(p.pulse) * 0.25;
        const displaySize = p.size * (0.5 + p.z * 0.5) * pulseFactor;
        const displayAlpha = p.alpha * (0.4 + p.z * 0.6) * pulseFactor;

        // Draw glow
        const grd = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          displaySize * 4,
        );
        grd.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${displayAlpha})`);
        grd.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, displaySize * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Draw core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, displaySize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${displayAlpha * 1.8})`;
        ctx.fill();

        // Update position — closer particles move faster (z-parallax)
        p.x += p.vx * (0.4 + p.z * 0.6);
        p.y += p.vy * (0.4 + p.z * 0.6);

        // Wrap around edges
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) {
          p.x = w + 10;
        }
        if (p.x > w + 10) {
          p.x = -10;
        }
      });

      rafId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener("resize", onResize, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}

// ─── 6. PROFILE PHOTO 3D MOUSE TRACK ─────────────────────────────────────────
// The profile photo container [data-photo-3d] rotates ±15deg following cursor.
// The status badge inside [data-photo-badge] translateZ forward for depth.
function usePhotoTilt() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (prefersReduced || isTouch) return;

    const photo = document.querySelector<HTMLElement>("[data-photo-3d]");
    if (!photo) return;

    let currentRotX = 0;
    let currentRotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rafId: number;

    const STRENGTH = 15;

    const onMouseMove = (e: MouseEvent) => {
      const rect = photo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      targetRotX = -dy * STRENGTH;
      targetRotY = dx * STRENGTH;
    };

    const animate = () => {
      currentRotX = lerp(currentRotX, targetRotX, 0.08);
      currentRotY = lerp(currentRotY, targetRotY, 0.08);
      photo.style.transform = `perspective(600px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    photo.style.transformStyle = "preserve-3d";
    photo.style.willChange = "transform";

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      photo.style.transform = "";
      photo.style.willChange = "";
    };
  }, []);
}

// ─── 7. PERSPECTIVE SCROLL ON SECTION H2 HEADINGS ────────────────────────────
// Section h2 headings enter from rotateX(20deg) → rotateX(0).
// Works by patching the existing [data-animate] system — adds a
// perspective wrapper class when .in-view is toggled by ScrollAnimations.tsx.
function usePerspectiveScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const init = () => {
      const headings = document.querySelectorAll<HTMLElement>("section h2");
      headings.forEach((h2) => {
        const parent = h2.closest("[data-animate]") as HTMLElement | null;
        h2.style.transition =
          "transform 0.75s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease";
        h2.style.transformStyle = "preserve-3d";

        const applyStyles = (inView: boolean) => {
          if (inView) {
            h2.style.transform =
              "perspective(900px) rotateX(0deg) translateY(0)";
            h2.style.opacity = "1";
          } else {
            h2.style.transform =
              "perspective(900px) rotateX(22deg) translateY(14px)";
            h2.style.opacity = "0";
          }
        };

        applyStyles(false);

        if (parent) {
          const mo = new MutationObserver(() => {
            applyStyles(parent.classList.contains("in-view"));
          });
          mo.observe(parent, { attributes: true, attributeFilter: ["class"] });
        } else {
          const obs = new IntersectionObserver(
            ([entry]) => applyStyles(entry.isIntersecting),
            { threshold: 0.2 },
          );
          obs.observe(h2);
        }
      });
    };

    const t = setTimeout(init, 100);
    return () => clearTimeout(t);
  }, []);
}

// ─── Root component ───────────────────────────────────────────────────────────
export default function ThreeD() {
  useParallaxCursor();
  useCardTilt();
  useMagneticButtons();
  usePhotoTilt();
  usePerspectiveScroll();
  const spotRef = useSpotlight();

  return (
    <>
      <FloatingParticles />
      <div
        ref={spotRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.028) 0%, rgba(99,102,241,0.012) 40%, transparent 70%)",
          filter: "blur(2px)",
        }}
        aria-hidden="true"
      />
    </>
  );
}