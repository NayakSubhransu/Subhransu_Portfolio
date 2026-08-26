"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Trophy,
  ExternalLink,
  Target,
  ArrowUpRight,
  Github,
  Medal,
  Star,
  Code2,
} from "lucide-react";
import { cpPlatforms, cpAchievements } from "@/data/portfolio-data";

// ─── Golden-angle color engine (shared with Projects & PaperCard) ─────────────
const GOLDEN_ANGLE = 137.508;

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function getCardColors(index: number) {
  const hue    = (index * GOLDEN_ANGLE) % 360;
  const sat    = hue > 50 && hue < 80 ? 88 : 75;
  const rgb      = hslToRgb(hue, sat, 60).join(",");
  const rgbLight = hslToRgb(hue, sat, 78).join(",");
  return {
    accentBar:   `hsl(${hue}, ${sat}%, 62%)`,
    topGlow:     `rgba(${rgb}, 0.10)`,
    iconColor:   `hsl(${hue}, ${sat}%, 68%)`,
    iconBg:      `rgba(${rgb}, 0.12)`,
    iconBorder:  `rgba(${rgb}, 0.28)`,
    badgeText:   `hsl(${hue}, ${sat}%, 74%)`,
    badgeBg:     `rgba(${rgb}, 0.11)`,
    badgeBorder: `rgba(${rgb}, 0.30)`,
    tagText:     `hsl(${hue}, ${sat}%, 66%)`,
    tagBg:       `rgba(${rgb}, 0.09)`,
    tagBorder:   `rgba(${rgb}, 0.22)`,
    ratingColor: `hsl(${hue}, ${sat}%, 72%)`,
    scanLine:    `rgba(${rgbLight}, 0.16)`,
    hoverBorder: `rgba(${rgb}, 0.45)`,
    hoverShadow: `0 8px 40px rgba(${rgb}, 0.16), 0 0 0 1px rgba(${rgb}, 0.45)`,
    footerHover: `hsl(${hue}, ${sat}%, 64%)`,
    indexText:   `hsl(${hue}, ${sat}%, 38%)`,
    btnBg:       `rgba(${rgb}, 0.10)`,
    btnBorder:   `rgba(${rgb}, 0.26)`,
    btnHoverBg:  `rgba(${rgb}, 0.20)`,
  };
}

// ─── Platform icon abbreviations ─────────────────────────────────────────────
const PLATFORM_ABBR: Record<string, string> = {
  codeforces: "CF",
  leetcode:   "LC",
  codechef:   "CC",
};

// ─── Platform Card ────────────────────────────────────────────────────────────
function PlatformCard({
  platform,
  colorIndex,
}: {
  platform: (typeof cpPlatforms)[0];
  colorIndex: number;
}) {
  const [isHovered, setIsHovered]         = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const c = getCardColors(colorIndex);

  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(true);
    const el = cardRef.current;
    if (!el) return;
    el.style.borderColor = c.hoverBorder;
    el.style.boxShadow   = c.hoverShadow;
  }, [c, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(false);
    const el = cardRef.current;
    if (!el) return;
    el.style.borderColor = "";
    el.style.boxShadow   = "";
  }, [isTouchDevice]);

  return (
    <article
      ref={cardRef}
      className="relative group rounded-2xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] flex flex-col transition-all duration-300 will-change-transform"
      style={{
        background: `radial-gradient(ellipse 75% 50% at 0% 0%, ${c.topGlow}, transparent 60%), rgba(17,24,39,0.65)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${platform.name} competitive programming profile`}
    >
      {/* Scan-line shimmer on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-20 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${c.scanLine} 30%, ${c.iconColor} 50%, ${c.scanLine} 70%, transparent 100%)`,
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered ? `0 0 10px 2px ${c.scanLine}` : "none",
        }}
        aria-hidden="true"
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(to bottom, transparent, ${c.accentBar}, transparent)`,
          opacity: isHovered ? 1 : 0.4,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-5 pl-5 sm:pl-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Platform icon block */}
            <div
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border font-mono font-black text-sm transition-all duration-300"
              style={{
                background: c.iconBg,
                borderColor: c.iconBorder,
                color: c.iconColor,
                boxShadow: isHovered ? `0 0 18px ${c.iconBg}` : "none",
              }}
              aria-hidden="true"
            >
              {PLATFORM_ABBR[platform.id] ?? <Code2 className="w-4 h-4" />}
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-zinc-100 tracking-tight leading-tight">
                {platform.name}
              </h3>
              <p
                className="text-xs font-mono mt-0.5 truncate"
                style={{ color: c.tagText }}
              >
                @{platform.handle}
              </p>
            </div>
          </div>

          {/* Rank badge */}
          <span
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border font-mono"
            style={{
              color: c.badgeText,
              background: c.badgeBg,
              borderColor: c.badgeBorder,
            }}
          >
            <Star className="w-2.5 h-2.5" aria-hidden="true" />
            {platform.badgeLabel}
          </span>
        </div>

        {/* ── Rating Block ── */}
        <div
          className="p-3.5 rounded-xl border mb-4"
          style={{
            background: `rgba(255,255,255,0.025)`,
            borderColor: c.iconBorder,
          }}
        >
          <div className="flex items-baseline gap-2 mb-0.5">
            <span
              className="text-3xl font-extrabold font-mono tabular-nums tracking-tight"
              style={{ color: c.ratingColor }}
            >
              {platform.peakRating.toLocaleString()}
            </span>
            <span className="text-xs text-zinc-500">Peak Rating</span>
          </div>
          <p
            className="text-xs font-semibold"
            style={{ color: c.tagText, opacity: 0.85 }}
          >
            {platform.ratingLabel}
          </p>
        </div>

        {/* ── Problems Solved ── */}
        {platform.problemsSolved !== undefined && (
          <div className="flex items-center gap-2 mb-4">
            <Target
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: c.iconColor, opacity: 0.6 }}
              aria-hidden="true"
            />
            <span className="text-xs text-zinc-500">
              <strong
                className="font-bold"
                style={{ color: c.tagText }}
              >
                {platform.problemsSolved.toLocaleString()}+
              </strong>{" "}
              problems solved
            </span>
          </div>
        )}

        {/* ── CTA ── */}
        <a
          href={platform.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all duration-200 min-h-[44px] mt-auto"
          style={{
            background: c.btnBg,
            borderColor: c.btnBorder,
            color: c.badgeText,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = c.btnHoverBg;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = c.btnBg;
          }}
          aria-label={`View ${platform.name} profile`}
        >
          View Profile
          <ArrowUpRight
            className="w-3.5 h-3.5 opacity-0 group-hover/btn:opacity-70 transition-opacity"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}

// ─── Achievement Card ─────────────────────────────────────────────────────────
function AchievementCard({
  achievement,
  colorIndex,
}: {
  achievement: (typeof cpAchievements)[0];
  colorIndex: number;
}) {
  const [isHovered, setIsHovered]         = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const c = getCardColors(colorIndex);

  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(true);
    const el = cardRef.current;
    if (!el) return;
    el.style.borderColor = c.hoverBorder;
    el.style.boxShadow   = c.hoverShadow;
  }, [c, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(false);
    const el = cardRef.current;
    if (!el) return;
    el.style.borderColor = "";
    el.style.boxShadow   = "";
  }, [isTouchDevice]);

  return (
    <div
      ref={cardRef}
      className="relative group rounded-xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] flex flex-col transition-all duration-300 will-change-transform"
      style={{
        background: `radial-gradient(ellipse 80% 45% at 0% 0%, ${c.topGlow}, transparent 60%), rgba(17,24,39,0.60)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-label={achievement.title}
    >
      {/* Scan-line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-10 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.iconColor} 50%, transparent)`,
          opacity: isHovered ? 0.7 : 0,
        }}
        aria-hidden="true"
      />

      {/* Index badge */}
      <div
        className="absolute top-3 right-3 z-10 font-mono text-[10px] font-black tracking-widest select-none"
        style={{ color: c.indexText }}
        aria-hidden="true"
      >
        #{String(colorIndex + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-5 pr-10">

        {/* Medal icon + title */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-300"
            style={{
              background: c.iconBg,
              borderColor: c.iconBorder,
              boxShadow: isHovered ? `0 0 14px ${c.iconBg}` : "none",
            }}
            aria-hidden="true"
          >
            <Medal className="w-4 h-4" style={{ color: c.iconColor }} />
          </div>

          <h4 className="text-sm font-bold text-zinc-200 leading-snug pt-1">
            {achievement.title}
          </h4>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-500 leading-relaxed flex-1 mb-4">
          {achievement.description}
        </p>

        {/* Footer CTA */}
        <div className="pt-3 border-t border-white/[0.05]">
          {achievement.certUrl && (
            <a
              href={achievement.certUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center justify-between min-h-[36px] transition-colors duration-200"
              aria-label={`View certificate for ${achievement.title}`}
            >
              <span
                className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                style={{ color: isHovered ? c.footerHover : "rgb(82,82,91)" }}
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                View Certificate
              </span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-all duration-200"
                style={{
                  color: c.footerHover,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translate(0,0)" : "translate(2px,-2px)",
                }}
                aria-hidden="true"
              />
            </a>
          )}
          {achievement.githubUrl && (
            <a
              href={achievement.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center justify-between min-h-[36px] transition-colors duration-200"
              aria-label={`View repository for ${achievement.title}`}
            >
              <span
                className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                style={{ color: isHovered ? c.footerHover : "rgb(82,82,91)" }}
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                View Repository
              </span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-all duration-200"
                style={{
                  color: c.footerHover,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translate(0,0)" : "translate(2px,-2px)",
                }}
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Competitive Programming & Achievements"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-[360px] h-[360px] bg-yellow-500/[0.025] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-indigo-500/[0.025] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <header className="mb-10 sm:mb-14">
          <p className="section-eyebrow mb-3">
            <Trophy className="w-3 h-3" aria-hidden="true" />
            Competitive Programming
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Algorithmic Achievements
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            1,500+ problems solved across major platforms. Consistent
            performance in algorithmic contests.
          </p>
        </header>

        {/* ── Platform Cards ── */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" aria-hidden="true" />
            <span className="text-[15px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-300 whitespace-nowrap">
              Platform Ratings
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {cpPlatforms.map((platform, index) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                colorIndex={index}
              />
            ))}
          </div>
        </div>

        {/* ── Achievement Cards ── */}
        <div>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" aria-hidden="true" />
            <span className="text-[15px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-300 whitespace-nowrap">
              Hackathon Honors
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cpAchievements.map((ach, index) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                colorIndex={index + cpPlatforms.length}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
