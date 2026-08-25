"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  ExternalLink, ChevronDown, Download,
  Lightbulb, Zap, BookMarked, AlertCircle, Sparkles, Target, Clock,
} from "lucide-react";
import type { Paper } from "@/types";

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
  const hue = (index * GOLDEN_ANGLE) % 360;
  const sat  = hue > 50 && hue < 80 ? 90 : 78;
  const rgb      = hslToRgb(hue, sat, 62).join(",");
  const rgbLight = hslToRgb(hue, sat, 80).join(",");
  const rgbDeep  = hslToRgb(hue, 45, 7).join(",");
  return {
    hue, sat,
    topGlow:     `rgba(${rgb}, 0.14)`,
    iconColor:   `hsl(${hue}, ${sat}%, 70%)`,
    iconBg:      `rgba(${rgb}, 0.15)`,
    iconBorder:  `rgba(${rgb}, 0.32)`,
    badgeText:   `hsl(${hue}, ${sat}%, 76%)`,
    badgeBg:     `rgba(${rgb}, 0.13)`,
    badgeBorder: `rgba(${rgb}, 0.38)`,
    dot:         `hsl(${hue}, ${sat}%, 70%)`,
    drawerBg:    `rgba(${rgbDeep}, 0.80)`,
    hoverBorder: `rgba(${rgb}, 0.50)`,
    hoverShadow: `0 8px 40px rgba(${rgb}, 0.20), 0 0 0 1px rgba(${rgb}, 0.50)`,
    shimmer:     `rgba(${rgbLight}, 0.12)`,
    btnBg:       `rgba(${rgb}, 0.10)`,
    btnBorder:   `rgba(${rgb}, 0.28)`,
    btnText:     `hsl(${hue}, ${sat}%, 72%)`,
    btnHoverBg:  `rgba(${rgb}, 0.22)`,
    indexText:   `hsl(${hue}, ${sat}%, 55%)`,
    scanLine:    `rgba(${rgbLight}, 0.18)`,
  };
}

function estimateReadMinutes(paper: Paper): number {
  const words = [
    paper.tldr.problem,
    paper.tldr.breakthrough,
    ...paper.tldr.takeaways,
  ].join(" ").split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 200) + 8);
}

function TldrRow({
  icon: Icon,
  dotColor,
  label,
  children,
}: {
  icon: React.ElementType;
  dotColor: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} aria-hidden="true" />
        <Icon className="w-3 h-3 text-[--text-faint] flex-shrink-0" aria-hidden="true" />
        <span className="text-[9px] font-mono font-black uppercase tracking-[0.22em] text-[--text-faint]">
          {label}
        </span>
      </div>
      <div className="pl-[22px]">{children}</div>
    </div>
  );
}

export default function PaperCard({
  paper,
  index = 0,
}: {
  paper: Paper;
  index?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const c = getCardColors(index);
  const readMins = estimateReadMinutes(paper);

  // Detect touch device to disable 3D tilt
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateX(${(-dy * 4).toFixed(2)}deg) rotateY(${(dx * 4).toFixed(2)}deg) scale(1.015)`;
  }, [isTouchDevice]);

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(true);
    const card = cardRef.current;
    if (!card) return;
    card.style.borderColor = c.hoverBorder;
    card.style.boxShadow = c.hoverShadow;
  }, [c, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(false);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
    card.style.borderColor = "";
    card.style.boxShadow = "";
  }, [isTouchDevice]);

  return (
    <article
      ref={cardRef}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] transition-all duration-300 will-change-transform h-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={paper.title}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-0"
        style={{ background: `linear-gradient(to bottom, ${c.topGlow}, transparent)` }}
        aria-hidden="true"
      />

      {/* Shimmer scan-line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-20 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${c.scanLine} 30%, ${c.iconColor} 50%, ${c.scanLine} 70%, transparent 100%)`,
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered ? `0 0 12px 2px ${c.scanLine}` : "none",
        }}
        aria-hidden="true"
      />

      {/* Catalog index */}
      <div
        className="absolute top-3.5 right-4 z-10 font-mono text-[10px] font-black tracking-widest select-none"
        style={{ color: c.indexText, opacity: 0.6 }}
        aria-hidden="true"
      >
        #{String(index + 1).padStart(2, "0")}
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 p-4 sm:p-5 pb-3 flex flex-col gap-3 pr-10 sm:pr-12">
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border shadow-sm transition-all duration-300"
            style={{
              background: c.iconBg,
              borderColor: c.iconBorder,
              color: c.iconColor,
              boxShadow: isHovered ? `0 0 16px ${c.iconBg}` : "none",
            }}
          >
            <BookMarked className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3
              className="text-sm font-bold text-[--text-primary] leading-snug tracking-[-0.015em] line-clamp-2"
              title={paper.title}
            >
              {paper.title}
            </h3>
            {/* <p
              className="text-[10px] text-[--text-faint] mt-1 font-mono truncate"
              title={paper.authors}
            >
              {paper.authors}
            </p> */}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border font-mono tracking-wide"
            style={{
              color: c.badgeText,
              background: c.badgeBg,
              borderColor: c.badgeBorder,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full opacity-90 flex-shrink-0"
              style={{ background: c.dot }}
              aria-hidden="true"
            />
            {paper.category}
          </span>

          {/* <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono font-semibold border border-[--border-subtle] text-[--text-faint] bg-white/[0.02]">
            <Clock className="w-2.5 h-2.5" aria-hidden="true" />~{readMins} min read
          </span> */}
        </div>
      </div>

      {/* ── TL;DR Toggle ── */}
      <div className="relative z-10 px-4 sm:px-5 pb-4">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={`tldr-${paper.id}`}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 min-h-[44px] ${
            isOpen
              ? "border-amber-500/30 bg-amber-500/[0.08] text-amber-300"
              : "border-[--border-subtle] bg-white/[0.02] text-[--text-muted] hover:border-[--border-medium] hover:bg-white/[0.04] hover:text-[--text-secondary]"
          }`}
        >
          <span className="flex items-center gap-2">
            <Lightbulb
              className={`w-3.5 h-3.5 transition-colors ${isOpen ? "text-amber-400" : "text-[--text-faint]"}`}
              aria-hidden="true"
            />
            <span className="font-mono tracking-wide">Engineering TL;DR</span>
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-400" : "text-[--text-faint]"}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ── Scrollable Drawer ── */}
      <div
        id={`tldr-${paper.id}`}
        role="region"
        aria-label={`TL;DR for ${paper.title}`}
        className={`relative z-10 transition-all duration-300 ease-in-out overflow-hidden border-t border-[--border-subtle] ${
          isOpen ? "max-h-72" : "max-h-0 border-transparent"
        }`}
      >
        <div
          className="overflow-y-auto max-h-72 overscroll-contain scrollbar-thin"
          style={{ background: c.drawerBg }}
        >
          <div className="px-4 sm:px-5 py-4 flex flex-col gap-4">
            <TldrRow icon={AlertCircle} dotColor="bg-red-400/70" label="The Problem">
              <p className="text-xs text-[--text-secondary] leading-relaxed">
                {paper.tldr.problem}
              </p>
            </TldrRow>

            <div className="h-px bg-gradient-to-r from-transparent via-[--border-subtle] to-transparent" aria-hidden="true" />

            <TldrRow icon={Sparkles} dotColor="bg-amber-400/70" label="Core Breakthrough">
              <p className="text-xs text-[--text-secondary] leading-relaxed">
                {paper.tldr.breakthrough}
              </p>
            </TldrRow>

            <div className="h-px bg-gradient-to-r from-transparent via-[--border-subtle] to-transparent" aria-hidden="true" />

            <TldrRow icon={Target} dotColor="bg-cyan-400/70" label="Engineering Takeaways">
              <ul className="flex flex-col gap-2" role="list">
                {paper.tldr.takeaways.map((tw, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Zap className="w-3 h-3 text-[--accent-cyan] flex-shrink-0 mt-0.5 opacity-60" aria-hidden="true" />
                    <span className="text-xs text-[--text-secondary] leading-relaxed">{tw}</span>
                  </li>
                ))}
              </ul>
            </TldrRow>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="relative z-10 flex items-center gap-2 px-4 sm:px-5 py-4 border-t border-[--border-subtle] mt-auto bg-white/[0.015]">
        <a
          href={paper.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg border text-xs font-bold transition-all duration-200 min-h-[40px]"
          style={{
            background: c.btnBg,
            borderColor: c.btnBorder,
            color: c.btnText,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = c.btnHoverBg;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = c.btnBg;
          }}
          aria-label={`Download PDF for ${paper.title}`}
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          PDF
        </a>

        <a
          href={paper.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg border border-[--border-subtle] text-[--text-muted] hover:text-[--text-secondary] hover:border-[--border-medium] hover:bg-white/[0.03] text-xs font-bold transition-all duration-200 min-h-[40px]"
          aria-label={`View source paper for ${paper.title}`}
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          Source
        </a>
      </div>
    </article>
  );
}
