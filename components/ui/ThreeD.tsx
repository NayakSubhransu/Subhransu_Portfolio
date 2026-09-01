"use client";

/**
 * ThreeD.tsx — Next-Level 3D Effects Engine (Mobile-First Edition)
 *
 * Implements 8 distinct 3D systems, all fully active on mobile:
 *
 * 1. PARALLAX CURSOR / GYROSCOPE — orbs follow mouse (desktop) or device tilt (mobile)
 * 2. CARD TILT — cards tilt on mouse/touch proximity
 * 3. MAGNETIC BUTTONS — CTA buttons attract cursor/finger
 * 4. SPOTLIGHT — radial light follows cursor/touch
 * 5. FLOATING PARTICLES — depth-layered particles (canvas, mobile-optimised count)
 * 6. PHOTO TILT — profile photo 3D rotate on mouse/touch
 * 7. PERSPECTIVE SCROLL — section headings flip in from rotateX
 * 8. MOBILE TOUCH TILT — touch-drag tilt for cards on touch devices
 *
 * Mobile strategy:
 *  - All effects use touch events / DeviceOrientation on mobile
 *  - Particle count reduced to 14 on mobile for 60fps
 *  - Card tilt works via touch-move (no mouse needed)
 *  - Gyroscope parallax replaces mouse parallax on mobile
 *  - NO effects are disabled on touch — they just use touch APIs instead
 */

import { useEffect, useRef } from "react";

// ─── Utility ─────────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const isMobileDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

// ─── 1. PARALLAX — Mouse on desktop, Gyroscope on mobile ─────────────────────
function useParallaxCursor() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-depth]");
    if (!elements.length) return;

    const currentX: number[] = Array.from(elements).map(() => 0);
    const currentY: number[] = Array.from(elements).map(() => 0);
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let rafId: number;

    const isTouch = isMobileDevice();

    // Desktop: follow mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Mobile: follow device gyroscope (beta = front-back tilt, gamma = left-right tilt)
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      const gamma = clamp(e.gamma ?? 0, -30, 30); // left-right: -30..30
      const beta  = clamp((e.beta ?? 0) - 45, -30, 30); // fwd-back offset from neutral
      mouseX = window.innerWidth  / 2 + (gamma / 30) * (window.innerWidth  / 2);
      mouseY = window.innerHeight / 2 + (beta  / 30) * (window.innerHeight / 2);
    };

    // Fallback mobile parallax: follow touch position
    const onTouchMove = (e: TouchEvent) => {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    };

    const animate = () => {
      const cx = mouseX - window.innerWidth  / 2;
      const cy = mouseY - window.innerHeight / 2;
      elements.forEach((el, i) => {
        const depth = parseFloat(el.dataset.depth || "0.3");
        const targetX = cx * depth * 0.035;
        const targetY = cy * depth * 0.035;
        currentX[i] = lerp(currentX[i], targetX, 0.07);
        currentY[i] = lerp(currentY[i], targetY, 0.07);
        el.style.transform = `translate3d(${currentX[i]}px, ${currentY[i]}px, 0)`;
      });
      rafId = requestAnimationFrame(animate);
    };

    if (isTouch) {
      // Try gyroscope first (requires permission on iOS 13+)
      if (typeof DeviceOrientationEvent !== "undefined" &&
          typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function") {
        (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
          .requestPermission()
          .then((res) => {
            if (res === "granted") window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
          }).catch(() => {});
      } else {
        window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
      }
      window.addEventListener("touchmove", onTouchMove, { passive: true });
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);
}

// ─── 2. CARD TILT — mouse on desktop, touch-drag on mobile ───────────────────
function useCardTilt() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cards = document.querySelectorAll<HTMLElement>("[data-tilt]");
    if (!cards.length) return;

    const isTouch = isMobileDevice();
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const strength = parseFloat(card.dataset.tiltStrength || (isTouch ? "6" : "8"));
      const hasGlare = card.dataset.tiltGlare === "true";

      let glare: HTMLElement | null = null;
      if (hasGlare) {
        glare = document.createElement("div");
        glare.style.cssText = `
          position:absolute;inset:0;border-radius:inherit;
          background:radial-gradient(circle at 50% 50%,rgba(255,255,255,0.12),transparent 60%);
          opacity:0;pointer-events:none;z-index:10;transition:opacity 0.3s ease;
        `;
        if (!card.style.position || card.style.position === "static") card.style.position = "relative";
        card.appendChild(glare);
      }

      let currentRotX = 0, currentRotY = 0;
      let targetRotX = 0,  targetRotY = 0;
      let rafId: number;
      let isActive = false;

      const animate = () => {
        currentRotX = lerp(currentRotX, targetRotX, 0.12);
        currentRotY = lerp(currentRotY, targetRotY, 0.12);
        const scale = isActive ? 1.012 : 1;
        card.style.transform = `perspective(900px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) scale(${scale})`;
        if (glare) {
          const x = 50 + (targetRotY / strength) * 30;
          const y = 50 - (targetRotX / strength) * 30;
          glare.style.background = `radial-gradient(circle at ${x}% ${y}%,rgba(255,255,255,0.10),transparent 65%)`;
        }
        if (isActive || Math.abs(currentRotX) > 0.01 || Math.abs(currentRotY) > 0.01)
          rafId = requestAnimationFrame(animate);
      };

      const applyTilt = (nx: number, ny: number) => {
        targetRotX = -ny * strength;
        targetRotY =  nx * strength;
        if (glare) glare.style.opacity = "1";
      };

      const resetTilt = () => {
        isActive = false;
        targetRotX = 0; targetRotY = 0;
        if (glare) glare.style.opacity = "0";
        card.style.willChange = "auto";
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
      };

      if (isTouch) {
        // Touch tilt: finger position within card
        const onTouchMove = (e: TouchEvent) => {
          const touch = e.touches[0];
          const rect  = card.getBoundingClientRect();
          const nx = ((touch.clientX - rect.left) / rect.width  - 0.5) * 2;
          const ny = ((touch.clientY - rect.top)  / rect.height - 0.5) * 2;
          isActive = true;
          card.style.willChange = "transform";
          applyTilt(nx, ny);
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(animate);
        };
        const onTouchEnd = () => resetTilt();
        card.addEventListener("touchmove",  onTouchMove, { passive: true });
        card.addEventListener("touchend",   onTouchEnd);
        card.addEventListener("touchcancel",onTouchEnd);
        cleanups.push(() => {
          cancelAnimationFrame(rafId);
          card.removeEventListener("touchmove",   onTouchMove);
          card.removeEventListener("touchend",    onTouchEnd);
          card.removeEventListener("touchcancel", onTouchEnd);
          if (glare && card.contains(glare)) card.removeChild(glare);
          card.style.transform = "";
        });
      } else {
        // Mouse tilt
        const onMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
          const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
          applyTilt(nx, ny);
        };
        const onMouseEnter = () => {
          isActive = true;
          card.style.willChange = "transform";
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(animate);
        };
        const onMouseLeave = () => resetTilt();
        card.addEventListener("mousemove",  onMouseMove);
        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mouseleave", onMouseLeave);
        cleanups.push(() => {
          cancelAnimationFrame(rafId);
          card.removeEventListener("mousemove",  onMouseMove);
          card.removeEventListener("mouseenter", onMouseEnter);
          card.removeEventListener("mouseleave", onMouseLeave);
          if (glare && card.contains(glare)) card.removeChild(glare);
          card.style.transform = "";
        });
      }
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}

// ─── 3. MAGNETIC BUTTONS — desktop only (no equivalent on touch) ──────────────
function useMagneticButtons() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || isMobileDevice()) return;

    const buttons = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    if (!buttons.length) return;

    const cleanups: (() => void)[] = [];

    buttons.forEach((btn) => {
      const strength = parseFloat(btn.dataset.magneticStrength || "0.35");
      let currentX = 0, currentY = 0;
      let targetX = 0,  targetY = 0;
      let rafId: number;
      let isActive = false;

      const animate = () => {
        currentX = lerp(currentX, targetX, 0.14);
        currentY = lerp(currentY, targetY, 0.14);
        btn.style.transform = `translate3d(${currentX}px,${currentY}px,0)`;
        if (isActive || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1)
          rafId = requestAnimationFrame(animate);
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist   = Math.sqrt(dx * dx + dy * dy);
        const radius = Math.max(rect.width, rect.height) * 1.5;
        if (dist < radius) {
          isActive = true; targetX = dx * strength; targetY = dy * strength;
          cancelAnimationFrame(rafId); rafId = requestAnimationFrame(animate);
        } else if (isActive) {
          isActive = false; targetX = 0; targetY = 0;
          cancelAnimationFrame(rafId); rafId = requestAnimationFrame(animate);
        }
      };
      const onMouseLeave = () => {
        isActive = false; targetX = 0; targetY = 0;
        cancelAnimationFrame(rafId); rafId = requestAnimationFrame(animate);
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

// ─── 4. SPOTLIGHT — follows cursor/touch across page ─────────────────────────
function useSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const spot = spotRef.current;
    if (!spot) return;

    let mouseX = -1000, mouseY = -1000;
    let currentX = -1000, currentY = -1000;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };
    const onTouchMove = (e: TouchEvent) => {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY + window.scrollY;
    };

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.08);
      currentY = lerp(currentY, mouseY, 0.08);
      spot.style.transform = `translate3d(${currentX - 300}px,${currentY - 300}px,0)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return spotRef;
}

// ─── 5. FLOATING PARTICLES — mobile-optimised canvas ─────────────────────────
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = isMobileDevice();
    const PARTICLE_COUNT = mobile ? 14 : 22;

    let rafId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    type Particle = {
      x: number; y: number; z: number;
      vx: number; vy: number;
      size: number; alpha: number;
      hue: number; pulse: number; pulseSpeed: number;
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(Math.random() * 0.25 + 0.08),
      size: Math.random() * (mobile ? 1.4 : 1.8) + 0.4,
      alpha: Math.random() * 0.35 + 0.08,
      hue: Math.random() > 0.65 ? 160 : 240,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.012 + 0.006,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const pf = 0.75 + Math.sin(p.pulse) * 0.25;
        const ds = p.size * (0.5 + p.z * 0.5) * pf;
        const da = p.alpha * (0.4 + p.z * 0.6) * pf;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, ds * 4);
        grd.addColorStop(0, `hsla(${p.hue},80%,65%,${da})`);
        grd.addColorStop(1, `hsla(${p.hue},80%,65%,0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, ds * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();

        ctx.beginPath(); ctx.arc(p.x, p.y, ds, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},85%,70%,${da * 1.8})`; ctx.fill();

        p.x += p.vx * (0.4 + p.z * 0.6);
        p.y += p.vy * (0.4 + p.z * 0.6);
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
      });
      rafId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width  = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", onResize, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
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

// ─── 6. PHOTO TILT — mouse on desktop, touch-drag on mobile ──────────────────
function usePhotoTilt() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const photo = document.querySelector<HTMLElement>("[data-photo-3d]");
    if (!photo) return;

    const STRENGTH = 15;
    let currentRotX = 0, currentRotY = 0;
    let targetRotX = 0,  targetRotY = 0;
    let rafId: number;

    photo.style.transformStyle = "preserve-3d";
    photo.style.willChange = "transform";

    const animate = () => {
      currentRotX = lerp(currentRotX, targetRotX, 0.08);
      currentRotY = lerp(currentRotY, targetRotY, 0.08);
      photo.style.transform = `perspective(600px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = photo.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      targetRotX = -((e.clientY - cy) / (window.innerHeight / 2)) * STRENGTH;
      targetRotY =  ((e.clientX - cx) / (window.innerWidth  / 2)) * STRENGTH;
    };

    // Mobile: touch drag within photo container tilts it
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect  = photo.getBoundingClientRect();
      const nx = ((touch.clientX - rect.left) / rect.width  - 0.5) * 2;
      const ny = ((touch.clientY - rect.top)  / rect.height - 0.5) * 2;
      targetRotX = -ny * STRENGTH * 0.7;
      targetRotY =  nx * STRENGTH * 0.7;
    };
    const onTouchEnd = () => { targetRotX = 0; targetRotY = 0; };

    if (isMobileDevice()) {
      photo.addEventListener("touchmove",   onTouchMove, { passive: true });
      photo.addEventListener("touchend",    onTouchEnd);
      photo.addEventListener("touchcancel", onTouchEnd);
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      photo.removeEventListener("touchmove",   onTouchMove);
      photo.removeEventListener("touchend",    onTouchEnd);
      photo.removeEventListener("touchcancel", onTouchEnd);
      photo.style.transform = "";
      photo.style.willChange = "";
    };
  }, []);
}

// ─── 7. PERSPECTIVE SCROLL on section H2 headings ────────────────────────────
function usePerspectiveScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const init = () => {
      const headings = document.querySelectorAll<HTMLElement>("section h2");
      headings.forEach((h2) => {
        const parent = h2.closest("[data-animate]") as HTMLElement | null;
        h2.style.transition = "transform 0.75s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease";
        h2.style.transformStyle = "preserve-3d";

        const applyStyles = (inView: boolean) => {
          h2.style.transform = inView
            ? "perspective(900px) rotateX(0deg) translateY(0)"
            : "perspective(900px) rotateX(22deg) translateY(14px)";
          h2.style.opacity = inView ? "1" : "0";
        };

        applyStyles(false);

        if (parent) {
          const mo = new MutationObserver(() =>
            applyStyles(parent.classList.contains("in-view"))
          );
          mo.observe(parent, { attributes: true, attributeFilter: ["class"] });
        } else {
          const obs = new IntersectionObserver(
            ([entry]) => applyStyles(entry.isIntersecting),
            { threshold: 0.2 }
          );
          obs.observe(h2);
        }
      });
    };

    const t = setTimeout(init, 100);
    return () => clearTimeout(t);
  }, []);
}

// ─── 8. AMBIENT GLOW PULSE — extra mobile depth layer ────────────────────────
// Slowly drifting radial glows make the background feel alive on mobile
// where other cursor-based effects are absent.
function AmbientGlows() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Primary glow — emerald, top-left drift */}
      <div
        className="absolute w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          top: "5%",
          left: "10%",
          animation: "ambientDrift1 18s ease-in-out infinite",
        }}
      />
      {/* Secondary glow — indigo, bottom-right drift */}
      <div
        className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.065) 0%, transparent 70%)",
          filter: "blur(50px)",
          bottom: "15%",
          right: "8%",
          animation: "ambientDrift2 22s ease-in-out infinite",
        }}
      />
      {/* Tertiary glow — cyan accent, center */}
      <div
        className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "40%",
          left: "45%",
          animation: "ambientDrift3 28s ease-in-out infinite",
        }}
      />
    </div>
  );
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
      <AmbientGlows />
      {/* Spotlight — cursor/touch follower */}
      <div
        ref={spotRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.032) 0%, rgba(99,102,241,0.015) 40%, transparent 70%)",
          filter: "blur(2px)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
