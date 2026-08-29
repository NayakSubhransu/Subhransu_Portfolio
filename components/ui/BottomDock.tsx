"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Home,
  Briefcase,
  FolderGit2,
  Trophy,
  Layers,
  BookOpen,
  GraduationCap,
  Mail,
} from "lucide-react";

// ─── Config ──────────────────────────────────────────────────────────────────
const DOCK_LINKS = [
  { href: "#home", label: "Home", Icon: Home },
  { href: "#achievements", label: "Coding", Icon: Trophy },
  { href: "#experience", label: "Work", Icon: Briefcase },
  { href: "#projects", label: "Projects", Icon: FolderGit2 },

  { href: "#skills", label: "Skills", Icon: Layers },
  { href: "#papershelf", label: "Papers", Icon: BookOpen },
  { href: "#education", label: "Edu", Icon: GraduationCap },
  { href: "#contact", label: "Contact", Icon: Mail },
] as const;

// ─── Golden-angle accent per item ─────────────────────────────────────────────
const GOLDEN_ANGLE = 137.508;

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function getItemAccent(index: number) {
  const hue = (index * GOLDEN_ANGLE) % 360;
  const sat = hue > 50 && hue < 80 ? 85 : 72;
  const [r, g, b] = hslToRgb(hue, sat, 62);
  return {
    color:     `hsl(${hue}, ${sat}%, 68%)`,
    bg:        `rgba(${r},${g},${b}, 0.14)`,
    glow:      `rgba(${r},${g},${b}, 0.40)`,
    glowSoft:  `rgba(${r},${g},${b}, 0.18)`,
    scanLine:  `rgba(${r},${g},${b}, 0.70)`,
    ring:      `rgba(${r},${g},${b}, 0.30)`,
  };
}

// ─── Ripple hook ──────────────────────────────────────────────────────────────
function useRipple() {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);

  const addRipple = useCallback(
    (e: React.TouchEvent | React.MouseEvent, color: string) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x, y, color }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
    },
    []
  );

  return { ripples, addRipple };
}

// ─── Single dock item ──────────────────────────────────────────────────────────
function DockItem({
  href,
  label,
  Icon,
  isActive,
  index,
  onClick,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
  isActive: boolean;
  index: number;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const accent = getItemAccent(index);
  const { ripples, addRipple } = useRipple();
  const [pressed, setPressed] = useState(false);

  const handlePointerDown = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      setPressed(true);
      addRipple(e, accent.glow);
    },
    [accent.glow, addRipple]
  );

  const handlePointerUp = useCallback(() => {
    setTimeout(() => setPressed(false), 120);
  }, []);

  return (
    <a
      href={href}
      onClick={(e) => onClick(e, href)}
      onMouseDown={handlePointerDown as React.MouseEventHandler}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown as React.TouchEventHandler}
      onTouchEnd={handlePointerUp}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className="relative flex flex-col items-center justify-center min-w-[52px] min-h-[56px] rounded-2xl overflow-hidden select-none outline-none"
      style={{
        WebkitTapHighlightColor: "transparent",
        transform: pressed ? "scale(0.88)" : "scale(1)",
        transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* Active background pill */}
      <span
        className="absolute inset-0 rounded-2xl transition-all duration-300"
        style={{
          background: isActive ? accent.bg : "transparent",
          boxShadow: isActive
            ? `0 0 0 1px ${accent.ring}, inset 0 0 12px ${accent.glowSoft}`
            : "none",
        }}
        aria-hidden="true"
      />

      {/* Top scan-line — glows on active */}
      <span
        className="absolute top-0 left-[15%] right-[15%] h-[2px] rounded-full transition-all duration-300"
        style={{
          background: isActive
            ? `linear-gradient(90deg, transparent, ${accent.scanLine}, transparent)`
            : "transparent",
          boxShadow: isActive ? `0 0 6px 1px ${accent.glowSoft}` : "none",
          opacity: isActive ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Ripple layer */}
      {ripples.map(({ id, x, y, color }) => (
        <span
          key={id}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            left: x,
            top: y,
            width: 6,
            height: 6,
            marginLeft: -3,
            marginTop: -3,
            background: color,
            animation: "dock-ripple 0.55s ease-out forwards",
          }}
        />
      ))}

      {/* Icon */}
      <span
        className="relative z-10 flex items-center justify-center transition-all duration-300"
        style={{
          color: isActive ? accent.color : "rgb(113,113,122)",
          filter: isActive ? `drop-shadow(0 0 6px ${accent.glow})` : "none",
          transform: isActive ? "translateY(-1px) scale(1.12)" : "scale(1)",
        }}
        aria-hidden="true"
      >
        <Icon
          strokeWidth={isActive ? 2.2 : 1.8}
          style={{ width: 18, height: 18 }}
        />
      </span>

      {/* Label */}
      <span
        className="relative z-10 mt-0.5 font-mono tracking-wide leading-none transition-all duration-300"
        style={{
          fontSize: 9,
          fontWeight: isActive ? 700 : 500,
          color: isActive ? accent.color : "rgb(82,82,91)",
          letterSpacing: isActive ? "0.04em" : "0.02em",
        }}
      >
        {label}
      </span>

      {/* Active dot indicator */}
      {isActive && (
        <span
          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{
            background: accent.color,
            boxShadow: `0 0 5px 2px ${accent.glowSoft}`,
            animation: "dock-dot-in 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
          aria-hidden="true"
        />
      )}
    </a>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function BottomDock() {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible]             = useState(true);
  const lastScrollY = useRef(0);
  const hideTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Active section via IntersectionObserver ───────────────────────────────
  useEffect(() => {
    const ids = DOCK_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Auto-hide on scroll down, re-show on scroll up ───────────────────────
  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const dir = y > lastScrollY.current ? "down" : "up";
      lastScrollY.current = y;

      if (dir === "down" && y > 120) {
        setVisible(false);
        if (hideTimer.current) clearTimeout(hideTimer.current);
      } else {
        setVisible(true);
        // Re-hide after 3s of no scrolling if user hasn't scrolled back up
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => {
          if (window.scrollY > 120) setVisible(false);
        }, 3000);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setVisible(true);
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  return (
    <>
      {/* ── Keyframe injection ── */}
      <style>{`
        @keyframes dock-ripple {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(14);  opacity: 0;   }
        }
        @keyframes dock-dot-in {
          0%   { transform: translateX(-50%) scale(0); opacity: 0; }
          70%  { transform: translateX(-50%) scale(1.4); }
          100% { transform: translateX(-50%) scale(1);  opacity: 1; }
        }
        @keyframes dock-slide-up {
          from { transform: translateX(-50%) translateY(100%); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
        }
        @property --dock-border-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes dock-border-spin {
          to { --dock-border-angle: 360deg; }
        }
        @keyframes dock-glow-breathe {
          0%, 100% { opacity: 0.7; transform: scaleX(0.95); }
          50%       { opacity: 1.0; transform: scaleX(1.05); }
        }
      `}</style>

      <nav
        className="lg:hidden fixed z-50 left-1/2"
        style={{
          bottom: `calc(0.875rem + env(safe-area-inset-bottom, 0px))`,
          transform: visible
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(calc(100% + 1.5rem))",
          transition:
            "transform 0.40s cubic-bezier(0.34,1.56,0.64,1), opacity 0.30s ease",
          opacity: visible ? 1 : 0,
          animation: "dock-slide-up 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
          animationDelay: "0.3s",
        }}
        aria-label="Mobile bottom navigation"
      >
        {/* ── Animated gradient border wrapper ── */}
        {/* 
          Technique: a pseudo-border built from two stacked layers.
          Layer 1 (outer): gradient — the "border colour"
          Layer 2 (inner): solid dark — punches out the centre leaving only the rim
          The gradient rotates via CSS animation, and its hue shifts in JS
          to match whichever dock item is currently active.
        */}
        <div
          className="absolute rounded-[22px] pointer-events-none"
          style={{
            inset: -1.5,
            padding: 1.5,
            background: (() => {
              const activeIndex = DOCK_LINKS.findIndex(
                (l) => l.href.slice(1) === activeSection
              );
              const acc = getItemAccent(activeIndex >= 0 ? activeIndex : 0);
              return `conic-gradient(
                from var(--dock-border-angle, 0deg),
                ${acc.ring}        0%,
                ${acc.scanLine}    18%,
                rgba(255,255,255,0.06) 35%,
                rgba(255,255,255,0.03) 50%,
                rgba(255,255,255,0.06) 65%,
                ${acc.ring}        82%,
                ${acc.scanLine}    100%
              )`;
            })(),
            borderRadius: 22,
            transition: "background 0.6s ease",
            animation: "dock-border-spin 6s linear infinite",
          }}
          aria-hidden="true"
        >
          {/* Inner cutout — reveals only the border rim */}
          <div
            className="absolute rounded-[20px]"
            style={{
              inset: 1.5,
              background: "rgba(10,12,20,0.96)",
            }}
          />
        </div>

        {/* ── Outer ambient glow — breathes with active accent ── */}
        <div
          className="absolute -inset-[6px] rounded-[26px] pointer-events-none"
          style={{
            background: (() => {
              const activeIndex = DOCK_LINKS.findIndex(
                (l) => l.href.slice(1) === activeSection
              );
              const acc = getItemAccent(activeIndex >= 0 ? activeIndex : 0);
              return `radial-gradient(ellipse at 50% 120%, ${acc.glowSoft}, transparent 70%)`;
            })(),
            filter: "blur(8px)",
            transition: "background 0.6s ease",
            animation: "dock-glow-breathe 3s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        {/* Dock shell */}
        <div
          className="relative flex items-center gap-0 px-2 py-2 rounded-[20px] overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(15,18,28,0.92), rgba(10,12,20,0.96))",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow:
              "0 24px 48px rgba(0,0,0,0.55), 0 8px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle noise texture overlay */}
          <div
            className="absolute inset-0 rounded-[20px] pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />

          {/* Items */}
          {DOCK_LINKS.map(({ href, label, Icon }, index) => {
            const sectionId = href.slice(1);
            return (
              <DockItem
                key={href}
                href={href}
                label={label}
                Icon={Icon}
                isActive={activeSection === sectionId}
                index={index}
                onClick={handleClick}
              />
            );
          })}
        </div>
      </nav>
    </>
  );
}
