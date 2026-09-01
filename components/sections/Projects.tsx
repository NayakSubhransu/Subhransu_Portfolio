"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  FolderGit2,
  Github,
  ExternalLink,
  ChevronRight,
  Trophy,
  ArrowUpRight,
  Cpu,
  Network,
  Brain,
  ChevronDown,
} from "lucide-react";
import { flagshipProjects, utilityProjects } from "@/data/portfolio-data";

// ─── Golden-angle color engine (same as PaperCard) ───────────────────────────
const GOLDEN_ANGLE = 137.508;

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function getProjectColors(index: number) {
  const hue    = (index * GOLDEN_ANGLE) % 360;
  const sat    = hue > 50 && hue < 80 ? 88 : 75;
  const rgb      = hslToRgb(hue, sat, 60).join(",");
  const rgbLight = hslToRgb(hue, sat, 78).join(",");
  const rgbDeep  = hslToRgb(hue, 40, 6).join(",");
  return {
    hue, sat,
    // flagship
    accentBar:    `hsl(${hue}, ${sat}%, 62%)`,
    topGlow:      `rgba(${rgb}, 0.10)`,
    iconColor:    `hsl(${hue}, ${sat}%, 68%)`,
    iconBg:       `rgba(${rgb}, 0.13)`,
    iconBorder:   `rgba(${rgb}, 0.28)`,
    badgeText:    `hsl(${hue}, ${sat}%, 74%)`,
    badgeBg:      `rgba(${rgb}, 0.11)`,
    badgeBorder:  `rgba(${rgb}, 0.30)`,
    chevron:      `hsl(${hue}, ${sat}%, 55%)`,
    hoverBorder:  `rgba(${rgb}, 0.45)`,
    hoverShadow:  `0 8px 40px rgba(${rgb}, 0.16), 0 0 0 1px rgba(${rgb}, 0.45)`,
    scanLine:     `rgba(${rgbLight}, 0.16)`,
    // utility
    cardTopGlow:  `rgba(${rgb}, 0.08)`,
    tagText:      `hsl(${hue}, ${sat}%, 66%)`,
    tagBg:        `rgba(${rgb}, 0.09)`,
    tagBorder:    `rgba(${rgb}, 0.22)`,
    footerHover:  `hsl(${hue}, ${sat}%, 64%)`,
    drawerBg:     `rgba(${rgbDeep}, 0.85)`,
    dotColor:     `hsl(${hue}, ${sat}%, 62%)`,
    indexText:    `hsl(${hue}, ${sat}%, 40%)`,
    btnBg:        `rgba(${rgb}, 0.10)`,
    btnBorder:    `rgba(${rgb}, 0.26)`,
    btnHoverBg:   `rgba(${rgb}, 0.20)`,
  };
}

// ─── Flagship domain meta ─────────────────────────────────────────────────────
const FLAGSHIP_META: Record<string, { icon: React.ElementType; domain: string }> = {
  dynamocore:       { icon: Network, domain: "Distributed Systems" },
  urbaneats:        { icon: Cpu,     domain: "Microservices · Real-time" },
  "enterprise-rag": { icon: Brain,   domain: "AI / Agentic Systems" },
};

// ─── Bold metric text parser ─────────────────────────────────────────────────
function HighlightText({ text, boldColor }: { text: string; boldColor: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ color: boldColor, fontWeight: 600 }}>
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

// ─── Flagship Card ────────────────────────────────────────────────────────────
function FlagshipCard({
  project,
  colorIndex,
}: {
  project: (typeof flagshipProjects)[0];
  colorIndex: number;
}) {
  const [expanded, setExpanded]       = useState(false);
  const [isHovered, setIsHovered]     = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const c   = getProjectColors(colorIndex);
  const meta = FLAGSHIP_META[project.id] ?? FLAGSHIP_META["dynamocore"];
  const Icon = meta.icon;

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
      data-tilt
      data-tilt-strength="5"
      data-tilt-glare="true"
      className="relative group rounded-2xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] transition-all duration-300 will-change-transform"
      style={{
        background: `radial-gradient(ellipse 70% 55% at 0% 0%, ${c.topGlow}, transparent 55%), rgba(17,24,39,0.65)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={project.name}
    >
      {/* Scan-line shimmer on hover - top edge */}
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
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${c.accentBar}, transparent)`,
          opacity: isHovered ? 1 : 0.45,
        }}
        aria-hidden="true"
      />

      <div className="p-5 sm:p-6 lg:p-8 pl-6 sm:pl-8 lg:pl-10">

        {/* ── Header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 mb-5">

          {/* Icon + domain eyebrow + title */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300"
              style={{
                background: c.iconBg,
                borderColor: c.iconBorder,
                boxShadow: isHovered ? `0 0 20px ${c.iconBg}` : "none",
              }}
              aria-hidden="true"
            >
              <Icon className="w-5 h-5" style={{ color: c.iconColor }} />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-1"
                style={{ color: c.iconColor, opacity: 0.85 }}
              >
                {meta.domain}
              </p>
              <h4 className="text-lg sm:text-xl font-extrabold text-zinc-100 tracking-tight leading-tight">
                {project.name}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5 leading-snug">
                {project.subheading}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 sm:pt-1">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] text-zinc-300 hover:text-zinc-100 text-xs font-semibold transition-all duration-200 min-h-[40px]"
              aria-label={`View ${project.name} on GitHub`}
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              GitHub
              <ArrowUpRight
                className="w-3 h-3 opacity-0 group-hover/btn:opacity-60 transition-opacity"
                aria-hidden="true"
              />
            </a>
            {project.paperUrl && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 min-h-[40px]"
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
                aria-label={`View research paper for ${project.name}`}
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                Paper
              </a>
            )}
          </div>
        </div>

        {/* ── Engineering Highlights ── */}
        <ul
          className="flex flex-col gap-3 mb-1"
          role="list"
          aria-label={`Engineering highlights for ${project.name}`}
        >
          {project.highlights
            .slice(0, expanded ? project.highlights.length : 2)
            .map((hl, hi) => (
              <li key={hi} className="flex items-start gap-3">
                <ChevronRight
                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                  style={{ color: c.chevron, opacity: 0.75 }}
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  <HighlightText text={hl} boldColor={c.iconColor} />
                </span>
              </li>
            ))}
        </ul>

        {/* Expand / Collapse */}
        {project.highlights.length > 2 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 mt-3 mb-2 text-[11px] font-mono font-bold transition-opacity duration-200 hover:opacity-100 cursor-pointer select-none"
            style={{ color: c.chevron, opacity: 0.65 }}
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : `+${project.highlights.length - 2} more highlights`}
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        )}

        {/* Divider */}
        <div
          className="h-px my-4"
          style={{
            background: `linear-gradient(90deg, ${c.accentBar}22, ${c.accentBar}55 40%, ${c.accentBar}22)`,
          }}
          aria-hidden="true"
        />

        {/* ── Tech Stack ── */}
        <div
          className="flex flex-wrap gap-1.5"
          aria-label={`Tech stack for ${project.name}`}
        >
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border"
              style={{
                color: c.tagText,
                background: c.tagBg,
                borderColor: c.tagBorder,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Utility Card ─────────────────────────────────────────────────────────────
function UtilityCard({
  project,
  colorIndex,
}: {
  project: (typeof utilityProjects)[0];
  colorIndex: number;
}) {
  const [isHovered, setIsHovered]         = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const c = getProjectColors(colorIndex);

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
      data-tilt
      data-tilt-strength="6"
      data-tilt-glare="true"
      className="group relative flex flex-col rounded-xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] transition-all duration-300 will-change-transform"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={project.name}
    >
      {/* Top glow strip */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to bottom, ${c.cardTopGlow}, transparent)`,
          opacity: isHovered ? 1 : 0.5,
        }}
        aria-hidden="true"
      />

      {/* Scan-line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-10 transition-opacity duration-400"
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

        {/* Award */}
        {project.award && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <Trophy className="w-3 h-3 text-yellow-400 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-mono font-bold text-yellow-400">
              {project.award}
            </span>
          </div>
        )}

        {/* Title */}
        <h4
          className="text-sm font-bold text-zinc-200 mb-2 leading-tight transition-colors duration-200"
          style={{ color: isHovered ? "rgb(244,244,245)" : undefined }}
        >
          {project.name}
        </h4>

        {/* Summary */}
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 flex-1 mb-3">
          {project.summary}
        </p>

        {/* Stack chips - colored with golden-angle accent */}
        <div
          className="flex flex-wrap gap-1 mb-4"
          aria-label={`Tech stack for ${project.name}`}
        >
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border"
              style={{
                color: c.tagText,
                background: c.tagBg,
                borderColor: c.tagBorder,
              }}
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-600">
              +{project.stack.length - 6}
            </span>
          )}
        </div>

        {/* Footer CTA */}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center justify-between pt-3 border-t border-white/[0.05] min-h-[40px] transition-colors duration-200"
          aria-label={`View ${project.name} on GitHub`}
        >
          <span
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
            style={{ color: isHovered ? c.footerHover : "rgb(82,82,91)" }}
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
            View on GitHub
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
      </div>
    </article>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Projects Showcase"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-0 w-[480px] h-[480px] bg-indigo-500/[0.025] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[320px] h-[320px] bg-emerald-500/[0.025] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <header className="mb-10 sm:mb-14" data-animate>
          <p className="section-eyebrow mb-3">
            <FolderGit2 className="w-3 h-3" aria-hidden="true" />
            Engineering
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Projects Showcase
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            Production-grade systems and tools - built with real architectural
            trade-offs in distributed systems, real-time systems, and AI engineering.
          </p>
        </header>

        {/* ── Flagship Projects ── */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" aria-hidden="true" />
            <span className="text-[15px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-300 whitespace-nowrap">
              The Flagship Implementations
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            {flagshipProjects.map((project, index) => (
              <FlagshipCard
                key={project.id}
                project={project}
                colorIndex={index}
              />
            ))}
          </div>
        </div>

        {/* ── Utility / Other Projects ── */}
        <div>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" aria-hidden="true" />
            <span className="text-[15px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-300 whitespace-nowrap">
              Other Projects &amp; Learnings
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {utilityProjects.map((project, index) => (
              <UtilityCard
                key={project.id}
                project={project}
                colorIndex={index + flagshipProjects.length}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
