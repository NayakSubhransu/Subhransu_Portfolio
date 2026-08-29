"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  ArrowLeft,
  Terminal,
  Briefcase,
  FolderGit2,
  Trophy,
  Layers,
  BookOpen,
  GraduationCap,
  Mail,
  ArrowRight,
} from "lucide-react";

// ─── Golden-angle color engine (consistent with rest of portfolio) ─────────
const GOLDEN_ANGLE = 137.508;

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function getAccent(index: number) {
  const hue = (index * GOLDEN_ANGLE) % 360;
  const sat = hue > 50 && hue < 80 ? 85 : 72;
  const [r, g, b] = hslToRgb(hue, sat, 62);
  return {
    color:  `hsl(${hue}, ${sat}%, 68%)`,
    bg:     `rgba(${r},${g},${b}, 0.10)`,
    border: `rgba(${r},${g},${b}, 0.24)`,
    glow:   `rgba(${r},${g},${b}, 0.35)`,
  };
}

// ─── Quick-nav links ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "/#experience",   label: "Experience",   Icon: Briefcase,     index: 0 },
  { href: "/#projects",     label: "Projects",     Icon: FolderGit2,    index: 1 },
  { href: "/#achievements", label: "Achievements", Icon: Trophy,        index: 2 },
  { href: "/#skills",       label: "Skills",       Icon: Layers,        index: 3 },
  { href: "/#papershelf",   label: "Papershelf",   Icon: BookOpen,      index: 4 },
  { href: "/#education",    label: "Education",    Icon: GraduationCap, index: 5 },
  { href: "/#contact",      label: "Contact",      Icon: Mail,          index: 6 },
] as const;

// ─── Glitching "404" display ──────────────────────────────────────────────────
function GlitchNumber() {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    // Fire a glitch burst every 3.5 seconds
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative select-none" aria-hidden="true">
      {/* Main number */}
      <span
        className="block font-mono font-black leading-none tracking-tighter"
        style={{
          fontSize: "clamp(7rem, 22vw, 16rem)",
          background: "linear-gradient(135deg, rgba(244,244,245,0.08) 0%, rgba(244,244,245,0.03) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: glitching
            ? "drop-shadow(0 0 20px rgba(16,185,129,0.6)) drop-shadow(-3px 0 rgba(239,68,68,0.5)) drop-shadow(3px 0 rgba(99,102,241,0.5))"
            : "drop-shadow(0 0 40px rgba(16,185,129,0.12))",
          transform: glitching ? `translate(${Math.random() > 0.5 ? 2 : -2}px, 0)` : "none",
          transition: "filter 0.05s ease, transform 0.05s ease",
        }}
      >
        404
      </span>

      {/* Emerald glow layer underneath */}
      <span
        className="absolute inset-0 block font-mono font-black leading-none tracking-tighter pointer-events-none"
        style={{
          fontSize: "clamp(7rem, 22vw, 16rem)",
          background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(99,102,241,0.08))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "blur(24px)",
          transform: "scale(1.02)",
        }}
      >
        404
      </span>

      {/* Scan-line sweep across the number */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ mixBlendMode: "overlay" }}
      >
        <div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
          style={{
            animation: "scanline-sweep 4s ease-in-out infinite",
            top: "0%",
          }}
        />
      </div>

      <style>{`
        @keyframes scanline-sweep {
          0%   { top: -4px;   opacity: 0; }
          5%   { opacity: 0.8; }
          95%  { opacity: 0.8; }
          100% { top: 100%;  opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Animated grid background (matches Hero section) ──────────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Grid mesh */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-indigo-500/[0.04] rounded-full blur-[80px]" />
    </div>
  );
}

// ─── Terminal blink cursor ────────────────────────────────────────────────────
function TerminalLine() {
  const [text, setText]     = useState("");
  const fullText = "page_not_found.tsx";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] w-fit mx-auto">
      <span className="text-emerald-500 font-mono text-xs font-bold select-none">~/</span>
      <span className="text-zinc-400 font-mono text-xs">{text}</span>
      <span
        className="inline-block w-[7px] h-[13px] bg-emerald-400 rounded-[1px]"
        style={{ animation: "blink 1s step-end infinite" }}
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Main 404 page ────────────────────────────────────────────────────────────
export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // Auto-redirect countdown
  useEffect(() => {
    if (!autoRedirect) return;
    if (countdown <= 0) {
      router.push("/");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, autoRedirect, router]);

  const cancelRedirect = useCallback(() => {
    setAutoRedirect(false);
  }, []);

  return (
    <div className="relative min-h-[100svh] bg-[#09090b] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
      <GridBackground />

      {/* ── Top-left wordmark ── */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Back to portfolio home"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/15 transition-colors">
            <Terminal className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          </span>
          <span className="font-mono text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors hidden sm:block">
            subhransu.dev
          </span>
        </Link>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full gap-6 sm:gap-8">

        {/* Terminal line */}
        <TerminalLine />

        {/* Glitch 404 */}
        <GlitchNumber />

        {/* Heading + description */}
        <div className="flex flex-col gap-3 -mt-4 sm:-mt-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-zinc-100 tracking-tight">
            This page doesn&apos;t exist
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
            The URL you followed is broken, moved, or never existed.
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* ── Primary CTAs ── */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-900 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 min-h-[44px]"
            aria-label="Go to homepage"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] text-zinc-300 hover:text-zinc-100 font-semibold text-sm transition-all duration-200 min-h-[44px]"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Go Back
          </button>
        </div>

        {/* ── Auto-redirect countdown ── */}
        {autoRedirect && (
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            {/* Circular progress */}
            <div className="relative w-7 h-7 flex-shrink-0" aria-hidden="true">
              <svg className="w-7 h-7 -rotate-90" viewBox="0 0 28 28">
                <circle
                  cx="14" cy="14" r="11"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="2"
                />
                <circle
                  cx="14" cy="14" r="11"
                  fill="none"
                  stroke="rgba(16,185,129,0.7)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 11}`}
                  strokeDashoffset={`${2 * Math.PI * 11 * (1 - countdown / 10)}`}
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-emerald-400">
                {countdown}
              </span>
            </div>

            <p className="text-xs text-zinc-500 font-mono">
              Redirecting to home in{" "}
              <span className="text-zinc-300 font-semibold">{countdown}s</span>
            </p>

            <button
              type="button"
              onClick={cancelRedirect}
              className="text-[11px] font-mono font-semibold text-zinc-600 hover:text-zinc-400 transition-colors underline underline-offset-2 flex-shrink-0"
              aria-label="Cancel auto redirect"
            >
              Cancel
            </button>
          </div>
        )}

        {/* ── Divider ── */}
        <div
          className="w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
          aria-hidden="true"
        />

        {/* ── Quick nav ── */}
        <div className="w-full">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-zinc-600 mb-4">
            Or jump to a section
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {NAV_LINKS.map(({ href, label, Icon, index }) => {
              const acc = getAccent(index);
              return (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition-all duration-200 min-h-[44px]"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = acc.border;
                    (e.currentTarget as HTMLElement).style.background  = acc.bg;
                    (e.currentTarget as HTMLElement).style.boxShadow   = `0 4px 20px ${acc.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.02)";
                    (e.currentTarget as HTMLElement).style.boxShadow   = "none";
                  }}
                  aria-label={`Go to ${label} section`}
                >
                  <Icon
                    className="w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200"
                    style={{ color: acc.color }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200 truncate">
                    {label}
                  </span>
                  <ArrowRight
                    className="w-3 h-3 ml-auto flex-shrink-0 text-zinc-700 group-hover:text-zinc-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
