"use client";

import { useState } from "react";
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
} from "lucide-react";
import { flagshipProjects, utilityProjects } from "@/data/portfolio-data";

// ─── Bold metric parser (unchanged) ──────────────────────────────────────────
function HighlightText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-zinc-100 font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

// ─── Per-project accent config ────────────────────────────────────────────────
const PROJECT_ACCENTS: Record<
  string,
  {
    icon: React.ElementType;
    accent: string;
    border: string;
    glow: string;
    badge: string;
    badgeText: string;
    indexColor: string;
    domain: string;
  }
> = {
  dynamocore: {
    icon: Network,
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.07)",
    badge: "bg-emerald-500/10 border-emerald-500/25",
    badgeText: "text-emerald-300",
    indexColor: "text-emerald-700",
    domain: "Distributed Systems",
  },
  urbaneats: {
    icon: Cpu,
    accent: "text-sky-400",
    border: "border-sky-500/20",
    glow: "rgba(14,165,233,0.07)",
    badge: "bg-sky-500/10 border-sky-500/25",
    badgeText: "text-sky-300",
    indexColor: "text-sky-700",
    domain: "Microservices · Real-time",
  },
  "enterprise-rag": {
    icon: Brain,
    accent: "text-violet-400",
    border: "border-violet-500/20",
    glow: "rgba(139,92,246,0.07)",
    badge: "bg-violet-500/10 border-violet-500/25",
    badgeText: "text-violet-300",
    indexColor: "text-violet-700",
    domain: "AI / Agentic Systems",
  },
};

const FALLBACK_ACCENT = PROJECT_ACCENTS["dynamocore"];

// ─── Flagship Card ────────────────────────────────────────────────────────────
function FlagshipCard({
  project,
  index,
}: {
  project: (typeof flagshipProjects)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const acc = PROJECT_ACCENTS[project.id] ?? FALLBACK_ACCENT;
  const Icon = acc.icon;

  return (
    <article
      className={`relative group rounded-2xl overflow-hidden border ${acc.border} bg-[--bg-card] transition-all duration-300`}
      style={{
        background: `radial-gradient(ellipse 80% 50% at 0% 0%, ${acc.glow}, transparent 60%), rgba(17,24,39,0.6)`,
      }}
      aria-label={project.name}
    >
      {/* Thin accent line at the left edge */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[3px] ${acc.accent.replace("text-", "bg-")} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
        aria-hidden="true"
      />

      <div className="p-5 sm:p-6 lg:p-8 pl-6 sm:pl-8 lg:pl-10">
        {/* ── Top row ── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-5">
          {/* Left: icon + index + title */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Icon block */}
            <div
              className={`flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl border ${acc.border} bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors`}
              aria-hidden="true"
            >
              <Icon className={`w-5 h-5 ${acc.accent}`} />
            </div>

            <div className="flex-1 min-w-0">
              {/* Domain eyebrow */}
              <p className={`text-[10px] font-mono font-bold uppercase tracking-[0.18em] ${acc.accent} mb-1 opacity-80`}>
                {acc.domain}
              </p>
              <h4 className="text-lg sm:text-xl font-extrabold text-zinc-100 tracking-tight leading-tight">
                {project.name}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5 leading-snug">
                {project.subheading}
              </p>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 sm:pt-1">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] text-zinc-300 hover:text-zinc-100 text-xs font-semibold transition-all duration-200 min-h-[40px] group/btn"
              aria-label={`View ${project.name} on GitHub`}
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/btn:opacity-60 -translate-y-0.5 translate-x-0.5 transition-all" aria-hidden="true" />
            </a>
            {project.paperUrl && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border ${acc.badge} ${acc.badgeText} hover:opacity-90 text-xs font-semibold transition-all duration-200 min-h-[40px]`}
                aria-label={`View research paper for ${project.name}`}
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                Paper
              </a>
            )}
          </div>
        </div>

        {/* ── Highlights ── */}
        {/* Show first 2 always; expand for the rest */}
        <ul
          className="flex flex-col gap-2.5 mb-5"
          aria-label={`Engineering highlights for ${project.name}`}
          role="list"
        >
          {project.highlights
            .slice(0, expanded ? project.highlights.length : 2)
            .map((hl, hi) => (
              <li key={hi} className="flex items-start gap-3">
                <ChevronRight
                  className={`w-3.5 h-3.5 ${acc.accent} flex-shrink-0 mt-0.5 opacity-70`}
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  <HighlightText text={hl} />
                </span>
              </li>
            ))}
        </ul>

        {/* Expand toggle - only if there are hidden bullets */}
        {project.highlights.length > 2 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`text-[11px] font-mono font-semibold ${acc.accent} opacity-70 hover:opacity-100 transition-opacity mb-4 flex items-center gap-1 cursor-pointer select-none`}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Show less" : `+${project.highlights.length - 2} more`}</span>
            <ChevronRight
              className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
              aria-hidden="true"
            />
          </button>
        )}

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-4" aria-hidden="true" />

        {/* ── Tech stack ── */}
        <div
          className="flex flex-wrap gap-1.5"
          aria-label={`Tech stack for ${project.name}`}
        >
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border ${acc.badge} ${acc.badgeText}`}
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
}: {
  project: (typeof utilityProjects)[0];
}) {
  return (
    <article
      className="group relative glass-card rounded-xl p-4 sm:p-5 flex flex-col gap-3 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300 overflow-hidden"
      aria-label={project.name}
    >
      {/* Subtle corner glow on hover */}
      <div
        className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.04] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Award badge - sits at top */}
      {project.award && (
        <div className="flex items-center gap-1.5">
          <Trophy className="w-3 h-3 text-yellow-400 flex-shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-semibold text-yellow-400 font-mono">
            {project.award}
          </span>
        </div>
      )}

      {/* Title + summary */}
      <div className="flex-1">
        <h4 className="text-sm font-bold text-zinc-200 mb-1.5 leading-tight group-hover:text-zinc-100 transition-colors">
          {project.name}
        </h4>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
          {project.summary}
        </p>
      </div>

      {/* Stack chips */}
      <div
        className="flex flex-wrap gap-1"
        aria-label={`Tech stack for ${project.name}`}
      >
        {project.stack.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.04] border border-white/[0.07] text-zinc-500"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 6 && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.02] border border-white/[0.05] text-zinc-600">
            +{project.stack.length - 6}
          </span>
        )}
      </div>

      {/* Footer CTA */}
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between pt-3 border-t border-white/[0.05] text-zinc-600 hover:text-emerald-400 transition-colors min-h-[40px] group/link"
        aria-label={`View ${project.name} on GitHub`}
      >
        <span className="flex items-center gap-1.5 text-xs font-semibold">
          <Github className="w-3.5 h-3.5" aria-hidden="true" />
          View on GitHub
        </span>
        <ArrowUpRight
          className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 -translate-y-0.5 translate-x-0.5 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-200"
          aria-hidden="true"
        />
      </a>
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
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-0 w-[480px] h-[480px] bg-indigo-500/[0.025] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[320px] h-[320px] bg-emerald-500/[0.025] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Section Header ── */}
        <header className="mb-10 sm:mb-14">
          <p className="section-eyebrow mb-3">
            <FolderGit2 className="w-3 h-3" aria-hidden="true" />
            Engineering
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Projects Showcase
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            Production-grade systems and tools - built with real architectural
            trade-offs in distributed architecture , real-time systems, and AI engineering.
          </p>
        </header>

        {/* ── Part 1: Flagship Projects ── */}
        <div className="mb-12 sm:mb-16">
          {/* Sub-header */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" aria-hidden="true" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">
              Flagship Implementations
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            {flagshipProjects.map((project, index) => (
              <FlagshipCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* ── Part 2: Utility Projects ── */}
        <div>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" aria-hidden="true" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">
              Other Projects & Learnings
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {utilityProjects.map((project) => (
              <UtilityCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
