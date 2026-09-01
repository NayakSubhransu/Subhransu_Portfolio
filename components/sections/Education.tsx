"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  GraduationCap,
  ExternalLink,
  Award,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  BookOpen,
  School,
  Building2,
} from "lucide-react";
import { education, certifications } from "@/data/portfolio-data";

// ─── Golden-angle color engine (shared across all sections) ──────────────────
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
    badgeText:   `hsl(${hue}, ${sat}%, 76%)`,
    badgeBg:     `rgba(${rgb}, 0.11)`,
    badgeBorder: `rgba(${rgb}, 0.30)`,
    tagText:     `hsl(${hue}, ${sat}%, 66%)`,
    tagBg:       `rgba(${rgb}, 0.09)`,
    tagBorder:   `rgba(${rgb}, 0.22)`,
    scanLine:    `rgba(${rgbLight}, 0.15)`,
    hoverBorder: `rgba(${rgb}, 0.42)`,
    hoverShadow: `0 8px 40px rgba(${rgb}, 0.14), 0 0 0 1px rgba(${rgb}, 0.42)`,
    divider:     `rgba(${rgb}, 0.22)`,
    footerHover: `hsl(${hue}, ${sat}%, 64%)`,
    indexText:   `hsl(${hue}, ${sat}%, 36%)`,
    scoreColor:  `hsl(${hue}, ${sat}%, 72%)`,
    scoreBg:     `rgba(${rgb}, 0.10)`,
    scoreBorder: `rgba(${rgb}, 0.26)`,
    eyebrow:     `hsl(${hue}, ${sat}%, 58%)`,
  };
}

// ─── Institution-level meta ───────────────────────────────────────────────────
const EDU_META: Record<
  number,
  { icon: React.ElementType; level: string }
> = {
  0: { icon: Building2, level: "Undergraduate · IIT" },
  1: { icon: School,    level: "Senior Secondary · Grade 12" },
  2: { icon: BookOpen,  level: "Secondary School · Grade 10" },
};

// ─── Shared hover logic ───────────────────────────────────────────────────────
function useCardHover(c: ReturnType<typeof getCardColors>) {
  const [isHovered, setIsHovered]         = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
  }, []);

  const onEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(true);
    if (!ref.current) return;
    ref.current.style.borderColor = c.hoverBorder;
    ref.current.style.boxShadow   = c.hoverShadow;
  }, [c, isTouchDevice]);

  const onLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(false);
    if (!ref.current) return;
    ref.current.style.borderColor = "";
    ref.current.style.boxShadow   = "";
  }, [isTouchDevice]);

  return { ref, isHovered, onEnter, onLeave };
}

// ─── Education Card ───────────────────────────────────────────────────────────
function EducationCard({
  edu,
  colorIndex,
  rank,
}: {
  edu: (typeof education)[0];
  colorIndex: number;
  rank: number;
}) {
  const c = getCardColors(colorIndex);
  const { ref, isHovered, onEnter, onLeave } = useCardHover(c);
  const meta = EDU_META[rank] ?? EDU_META[2];
  const Icon = meta.icon;

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="relative rounded-2xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] transition-all duration-300 will-change-transform"
      style={{
        background: `radial-gradient(ellipse 65% 50% at 0% 0%, ${c.topGlow}, transparent 55%), rgba(17,24,39,0.65)`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={`${edu.degree} from ${edu.institution}`}
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
          opacity: isHovered ? 1 : 0.4,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-4 sm:p-5 lg:p-7 pl-5 sm:pl-7 lg:pl-9">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">

          {/* Icon block */}
          <div
            className="flex-shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl border transition-all duration-300 self-start"
            style={{
              background: c.iconBg,
              borderColor: c.iconBorder,
              boxShadow: isHovered ? `0 0 20px ${c.iconBg}` : "none",
            }}
            aria-hidden="true"
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: c.iconColor }} />
          </div>

          <div className="flex-1 min-w-0">

            {/* Level eyebrow */}
            <p
              className="text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-1"
              style={{ color: c.eyebrow, opacity: 0.85 }}
            >
              {meta.level}
            </p>

            {/* Institution + degree row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-extrabold text-zinc-100 leading-tight tracking-tight">
                  {edu.institution}
                </h3>
                <p
                  className="text-sm font-semibold mt-0.5 leading-snug"
                  style={{ color: c.iconColor }}
                >
                  {edu.degree}
                  {edu.major ? ` — ${edu.major}` : ""}
                </p>
              </div>

              {/* Meta: duration + location */}
              <div className="flex flex-row sm:flex-col flex-wrap sm:items-end gap-x-3 gap-y-1 text-xs text-zinc-500 font-mono flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-3 h-3" aria-hidden="true" />
                  <time>{edu.duration}</time>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  <span>{edu.location}</span>
                </div>
              </div>
            </div>

            {/* Accent divider */}
            <div
              className="h-px my-3 sm:my-4"
              style={{
                background: `linear-gradient(90deg, ${c.accentBar}22, ${c.accentBar}55 40%, ${c.accentBar}11)`,
              }}
              aria-hidden="true"
            />

            {/* Score badge */}
            {(edu.cgpa || edu.percentage) && (
              <div className="flex items-center gap-3 flex-wrap">
                <div
                  className="inline-flex items-baseline gap-2 px-3.5 py-1.5 rounded-xl border"
                  style={{
                    background: c.scoreBg,
                    borderColor: c.scoreBorder,
                  }}
                  aria-label={`Score: ${edu.cgpa || edu.percentage}`}
                >
                  <span
                    className="text-lg sm:text-xl font-extrabold font-mono tabular-nums tracking-tight"
                    style={{ color: c.scoreColor }}
                  >
                    {edu.cgpa || edu.percentage}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-widest"
                    style={{ color: c.tagText, opacity: 0.80 }}
                  >
                    {edu.cgpa ? "CGPA" : "Score"}
                  </span>
                </div>

                {/* Rank context label for IIT */}
                {rank === 0 && (
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border"
                    style={{
                      color: c.badgeText,
                      background: c.badgeBg,
                      borderColor: c.badgeBorder,
                    }}
                  >
                    5-Year Integrated Programme
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Certification Card ───────────────────────────────────────────────────────
function CertificationCard({
  cert,
  colorIndex,
}: {
  cert: (typeof certifications)[0];
  colorIndex: number;
}) {
  const c = getCardColors(colorIndex);
  const { ref, isHovered, onEnter, onLeave } = useCardHover(c);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="relative group rounded-xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] flex flex-col transition-all duration-300 will-change-transform"
      style={{
        background: `radial-gradient(ellipse 80% 45% at 0% 0%, ${c.topGlow}, transparent 60%), rgba(17,24,39,0.60)`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={`${cert.name} by ${cert.issuer}`}
    >
      {/* Scan-line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-10 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.iconColor} 50%, transparent)`,
          opacity: isHovered ? 0.75 : 0,
        }}
        aria-hidden="true"
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(to bottom, transparent, ${c.accentBar}, transparent)`,
          opacity: isHovered ? 1 : 0.28,
        }}
        aria-hidden="true"
      />

      {/* Index badge */}
      <div
        className="absolute top-3.5 right-3.5 z-10 font-mono text-[10px] font-black tracking-widest select-none"
        style={{ color: c.indexText }}
        aria-hidden="true"
      >
        #{String(colorIndex - 2).padStart(2, "0")}
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-5 pl-5 sm:pl-6 pr-10">

        {/* Icon + name */}
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
            <Award className="w-4 h-4" style={{ color: c.iconColor }} />
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <h4 className="text-sm font-bold text-zinc-200 leading-snug">
              {cert.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span
                className="text-[11px] font-mono font-semibold"
                style={{ color: c.tagText }}
              >
                {cert.issuer}
              </span>
              <span className="text-zinc-700">·</span>
              <time className="text-[11px] font-mono text-zinc-500">
                {cert.year}
              </time>
            </div>
          </div>
        </div>

        {/* Accent divider */}
        <div
          className="h-px mb-3"
          style={{
            background: `linear-gradient(90deg, ${c.divider}, transparent)`,
          }}
          aria-hidden="true"
        />

        {/* Skill tags */}
        {cert.skills?.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5 flex-1 mb-4"
            aria-label="Skills covered"
          >
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border"
                style={{
                  color: c.tagText,
                  background: c.tagBg,
                  borderColor: c.tagBorder,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between pt-3 border-t border-white/[0.05] min-h-[40px] transition-colors duration-200"
            aria-label={`Verify ${cert.name} certificate`}
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
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Education & Certifications"
    >
      {/* Ambient blobs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 right-0 w-[360px] h-[360px] bg-indigo-500/[0.025] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-emerald-500/[0.020] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <header className="mb-10 sm:mb-14" data-animate>
          <p className="section-eyebrow mb-3">
            <GraduationCap className="w-3 h-3" aria-hidden="true" />
            Academic
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Education & Certifications
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            Institutional foundation from IIT Bhubaneswar, backed by verified
            technical certifications.
          </p>
        </header>

        {/* ── Education Cards ── */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span
              className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800"
              aria-hidden="true"
            />
            <span className="text-[15px] font-mono font-semibold uppercase tracking-[0.2em] text-white-300 whitespace-nowrap">
              Academic Background
            </span>
            <span
              className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800"
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {education.map((edu, idx) => (
              <EducationCard
                key={`${edu.institution}-${idx}`}
                edu={edu}
                colorIndex={idx}
                rank={idx}
              />
            ))}
          </div>
        </div>

        {/* ── Certification Cards ── */}
        <div>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span
              className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800"
              aria-hidden="true"
            />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">
              Verified Certifications & Training
            </span>
            <span
              className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                colorIndex={idx + education.length}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
