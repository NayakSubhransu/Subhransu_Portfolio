"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Briefcase,
  GitBranch,
  ExternalLink,
  Zap,
  MapPin,
  CalendarDays,
  ChevronRight,
  Bot,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Database,
  Cpu,
} from "lucide-react";
import { workExperience, currentFocus } from "@/data/portfolio-data";

// ─── Golden-angle color engine (shared with Projects, Achievements, PaperCard) ─
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
    topGlow:     `rgba(${rgb}, 0.09)`,
    iconColor:   `hsl(${hue}, ${sat}%, 68%)`,
    iconBg:      `rgba(${rgb}, 0.12)`,
    iconBorder:  `rgba(${rgb}, 0.28)`,
    badgeText:   `hsl(${hue}, ${sat}%, 74%)`,
    badgeBg:     `rgba(${rgb}, 0.11)`,
    badgeBorder: `rgba(${rgb}, 0.30)`,
    tagText:     `hsl(${hue}, ${sat}%, 66%)`,
    tagBg:       `rgba(${rgb}, 0.09)`,
    tagBorder:   `rgba(${rgb}, 0.22)`,
    boldColor:   `hsl(${hue}, ${sat}%, 78%)`,
    scanLine:    `rgba(${rgbLight}, 0.15)`,
    hoverBorder: `rgba(${rgb}, 0.42)`,
    hoverShadow: `0 8px 40px rgba(${rgb}, 0.14), 0 0 0 1px rgba(${rgb}, 0.42)`,
    divider:     `rgba(${rgb}, 0.20)`,
    footerHover: `hsl(${hue}, ${sat}%, 64%)`,
    dotGlow:     `rgba(${rgb}, 0.60)`,
    btnBg:       `rgba(${rgb}, 0.10)`,
    btnBorder:   `rgba(${rgb}, 0.26)`,
    btnHoverBg:  `rgba(${rgb}, 0.20)`,
    indexText:   `hsl(${hue}, ${sat}%, 36%)`,
    chevron:     `hsl(${hue}, ${sat}%, 55%)`,
  };
}

// ─── Domain meta per job id ───────────────────────────────────────────────────
const JOB_META: Record<string, { icon: React.ElementType; domain: string }> = {
  healthyday: { icon: Database, domain: "Data Engineering · Analytics" },
  hanyaa:     { icon: Cpu,      domain: "AI / ML Engineering" },
};

// ─── Bold metric parser - accent-colored per card ────────────────────────────
function BulletText({
  text,
  boldColor,
}: {
  text: string;
  boldColor: string;
}) {
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

// ─── Experience Card ──────────────────────────────────────────────────────────
function ExperienceCard({
  job,
  colorIndex,
  isFirst,
}: {
  job: (typeof workExperience)[0];
  colorIndex: number;
  isFirst: boolean;
}) {
  const [expanded, setExpanded]           = useState(false);
  const [isHovered, setIsHovered]         = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const c   = getCardColors(colorIndex);
  const meta = JOB_META[job.id] ?? JOB_META["healthyday"];
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
      className="relative rounded-2xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] transition-all duration-300 will-change-transform"
      style={{
        background: `radial-gradient(ellipse 70% 50% at 0% 0%, ${c.topGlow}, transparent 55%), rgba(17,24,39,0.65)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${job.role} at ${job.company}`}
    >
      {/* Scan-line shimmer */}
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
          opacity: isHovered ? 1 : 0.45,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-4 sm:p-5 lg:p-7 pl-5 sm:pl-7 lg:pl-9">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 mb-5">

          {/* Icon + domain + role */}
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
              {/* Domain eyebrow */}
              <p
                className="text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-1"
                style={{ color: c.iconColor, opacity: 0.85 }}
              >
                {meta.domain}
              </p>
              <h3 className="text-base sm:text-lg font-extrabold text-zinc-100 tracking-tight leading-tight">
                {job.role}
              </h3>
              <a
                href={job.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-0.5 text-sm font-semibold transition-colors duration-200 group/clink"
                style={{ color: c.footerHover }}
                aria-label={`Visit ${job.company} website`}
              >
                {job.company}
                <ExternalLink
                  className="w-3 h-3 opacity-50 group-hover/clink:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* Meta: date, location, badge */}
          <div className="flex flex-row sm:flex-col flex-wrap sm:items-end items-center gap-x-3 gap-y-1.5 flex-shrink-0 sm:pt-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
              <CalendarDays className="w-3 h-3" aria-hidden="true" />
              <time>{job.duration}</time>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <span>{job.location}</span>
            </div>
            {/* Current / type badge */}
            {isFirst ? (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono"
                style={{
                  color: c.badgeText,
                  background: c.badgeBg,
                  borderColor: c.badgeBorder,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full pulse-dot"
                  style={{ background: c.iconColor }}
                  aria-hidden="true"
                />
                Current
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-zinc-700/60 bg-zinc-800/40 text-zinc-500 font-mono">
                Completed
              </span>
            )}
          </div>
        </div>

        {/* ── Bullets ── */}
        <ul
          className="flex flex-col gap-3 mb-2"
          role="list"
          aria-label={`Responsibilities at ${job.company}`}
        >
          {job.bullets
            .slice(0, expanded ? job.bullets.length : 2)
            .map((bullet, bi) => (
              <li key={bi} className="flex items-start gap-3">
                <ChevronRight
                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                  style={{ color: c.chevron, opacity: 0.75 }}
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  <BulletText text={bullet} boldColor={c.boldColor} />
                </span>
              </li>
            ))}
        </ul>

        {/* Expand / collapse */}
        {job.bullets.length > 2 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 mt-3 mb-1 text-[11px] font-mono font-bold transition-opacity duration-200 hover:opacity-100 cursor-pointer select-none"
            style={{ color: c.chevron, opacity: 0.65 }}
            aria-expanded={expanded}
          >
            {expanded
              ? "Show less"
              : `+${job.bullets.length - 2} more responsibilities`}
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        )}

        {/* Accent divider */}
        <div
          className="h-px my-4"
          style={{
            background: `linear-gradient(90deg, ${c.accentBar}22, ${c.accentBar}55 40%, ${c.accentBar}22)`,
          }}
          aria-hidden="true"
        />

        {/* ── Tech Stack ── */}
        <div
          className="flex flex-wrap gap-1.5 mb-4"
          aria-label={`Technologies used at ${job.company}`}
        >
          {job.stack.map((tech) => (
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

        {/* ── Verification footer ── */}
        {job.verificationUrl && (
          <div className="pt-3 border-t border-white/[0.05]">
            <a
              href={job.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between min-h-[40px] group/vlink transition-colors duration-200"
              aria-label={`Verify employment at ${job.company}`}
            >
              <span
                className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                style={{ color: isHovered ? c.footerHover : "rgb(82,82,91)" }}
              >
                <CheckCircle2
                  className="w-3.5 h-3.5"
                  style={{ color: isHovered ? c.iconColor : "rgb(82,82,91)" }}
                  aria-hidden="true"
                />
                Verified - View Offer / Experience Letter
              </span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-all duration-200"
                style={{
                  color: c.footerHover,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered
                    ? "translate(0,0)"
                    : "translate(2px,-2px)",
                }}
                aria-hidden="true"
              />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Current Focus sidebar card ───────────────────────────────────────────────
function CurrentFocusCard() {
  // Fixed emerald identity - this is the site's primary accent, intentional
  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-4">
      {/* Main card */}
      <div className="relative rounded-2xl p-px overflow-hidden">
        {/* Gradient border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.45), rgba(99,102,241,0.25), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative rounded-2xl bg-[#0b1d13]/95 backdrop-blur-sm p-4 sm:p-5 lg:p-6">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-4">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/50 flex-shrink-0"
              aria-hidden="true"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
            </span>
            <div>
              <p className="text-[15px] text-black-500 font-mono font-black uppercase tracking-[0.2em]">
                Currently Building
              </p>
            </div>
          </div>

          {/* Live status pill */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold text-emerald-400 font-mono tracking-wide">
              {currentFocus.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 leading-tight mb-1">
            {currentFocus.title}
          </h3>
          <p className="text-xs text-zinc-500 mb-4">
            AI-Powered Automated Code Review Agent
          </p>

          {/* Architecture quote */}
          <p className="text-xs text-zinc-400 leading-relaxed mb-5 pl-3 border-l-2 border-emerald-500/30">
            {currentFocus.architecture}
          </p>

          {/* Accent divider */}
          <div
            className="h-px mb-4"
            style={{
              background:
                "linear-gradient(90deg, rgba(16,185,129,0.25), rgba(16,185,129,0.50) 40%, rgba(16,185,129,0.25))",
            }}
            aria-hidden="true"
          />

          {/* Stack */}
          <div className="mb-5">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-zinc-500 mb-2.5">
              Active Stack
            </p>
            <div
              className="flex flex-wrap gap-1.5"
              aria-label="Technologies in active use"
            >
              {currentFocus.stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border bg-emerald-500/[0.09] border-emerald-500/22 text-emerald-300/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href={currentFocus.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/repo flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 hover:bg-emerald-500/18 active:bg-emerald-500/25 text-emerald-300 hover:text-emerald-200 text-sm font-semibold transition-all duration-200 min-h-[44px]"
            aria-label="View GitHub PR Reviewer Agent repository"
          >
            <GitBranch className="w-4 h-4" aria-hidden="true" />
            View Repository
            <ArrowUpRight
              className="w-3.5 h-3.5 opacity-0 group-hover/repo:opacity-70 transition-opacity"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* Learning footnote */}
      <div
        className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl border border-white/[0.5] bg-white/[0.02]"
        aria-hidden="true"
      >
        <Zap className="w-3.5 h-3.5 text-yellow-600 flex-shrink-0 mt-0.5" />
        {/* <p className="text-sm text-zinc-500 leading-relaxed">
          Exploring stateful agentic workflows with{" "}
          <span className="text-white-300">LangGraph</span> and{" "}
          <span className="text-white-300">Redis</span>.
        </p> */}
        <p className="text-sm text-zinc-500 leading-relaxed">
          Exploring stateful agentic workflows with{" "}
          <span className="text-zinc-200 text-sm font-medium">LangGraph</span>{" "}
          and <span className="text-zinc-200 text-sm font-medium">Redis</span>.
        </p>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Work Experience & Current Focus"
    >
      {/* Ambient blobs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 right-0 w-[360px] h-[360px] bg-emerald-500/[0.025] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-indigo-500/[0.025] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <header className="mb-10 sm:mb-14">
          <p className="section-eyebrow mb-3">
            <Briefcase className="w-3 h-3" aria-hidden="true" />
            Career
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Work Experience
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            Industry internships and engineering contributions - with verified
            credentials.
          </p>
        </header>

        {/* Two-column layout: cards left, sidebar right */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-12 items-start">

          {/* ── Left: Experience Cards ── */}
          <div>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span
                className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800"
                aria-hidden="true"
              />
              <span className="text-[15px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-300 whitespace-nowrap">
                Industry Experience
              </span>
              <span
                className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col gap-5 sm:gap-6">
              {workExperience.map((job, index) => (
                <ExperienceCard
                  key={job.id}
                  job={job}
                  colorIndex={index}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Current Focus ── */}
          <aside aria-label="Current engineering focus">
            <CurrentFocusCard />
          </aside>
        </div>
      </div>
    </section>
  );
}
