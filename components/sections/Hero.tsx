"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import HeroNetwork from "@/components/ui/HeroNetwork";
import {
  Github,
  Linkedin,
  FileText,
  ExternalLink,
  Code2,
  ArrowDown,
  Eye,
} from "lucide-react";
import { heroData } from "@/data/portfolio-data";

/* ── Social icon definitions with full brand identity ── */
const SOCIALS = (s: typeof heroData.socials) => [
  {
    href:  s.github.url,
    label: "GitHub",
    icon:  <Github className="w-4 h-4" />,
    color: "#e2e8f0",
    bg:    "rgba(226,232,240,0.08)",
    border:"rgba(226,232,240,0.15)",
    glow:  "rgba(226,232,240,0.12)",
    short: "GH",
  },
  {
    href:  s.linkedin.url,
    label: "LinkedIn",
    icon:  <Linkedin className="w-4 h-4" />,
    color: "#60a5fa",
    bg:    "rgba(96,165,250,0.08)",
    border:"rgba(96,165,250,0.20)",
    glow:  "rgba(96,165,250,0.18)",
    short: "in",
  },
  {
    href:  s.leetcode.url,
    label: "LeetCode",
    icon:  (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.7a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
    color: "#fbbf24",
    bg:    "rgba(251,191,36,0.08)",
    border:"rgba(251,191,36,0.20)",
    glow:  "rgba(251,191,36,0.16)",
    short: "LC",
  },
  {
    href:  s.codeforces.url,
    label: "Codeforces",
    icon:  (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-9c0-.828.672-1.5 1.5-1.5h3z"/>
      </svg>
    ),
    color: "#38bdf8",
    bg:    "rgba(56,189,248,0.08)",
    border:"rgba(56,189,248,0.20)",
    glow:  "rgba(56,189,248,0.16)",
    short: "CF",
  },
  {
    href:  s.codechef.url,
    label: "CodeChef",
    icon:  (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M11.257.004a11.816 11.816 0 0 0-1.958.2C5.63.87 2.195 3.951.836 8.094c-.358 1.088-.499 1.93-.499 3.048 0 1.643.298 3.017.956 4.38 1.437 2.99 4.18 5.133 7.39 5.8.85.178 1.148.204 2.317.204s1.467-.026 2.317-.204c3.21-.667 5.953-2.81 7.39-5.8.658-1.363.956-2.737.956-4.38 0-1.118-.141-1.96-.499-3.048C19.805 3.951 16.37.87 12.7.2A12.85 12.85 0 0 0 11.257.004zm.737 5.08c.17 0 .333.01.485.034.85.13 1.505.628 1.843 1.398.183.415.23.677.23 1.297 0 .618-.05.888-.234 1.31-.256.6-.698 1.046-1.288 1.3l-.213.09.155.07c.405.18.72.44.973.8.32.456.458.89.479 1.518.012.342-.015.66-.077.915-.18.74-.67 1.33-1.384 1.659-.404.186-.75.262-1.274.262-.5 0-.837-.07-1.226-.252-.617-.29-1.072-.822-1.281-1.5-.096-.318-.133-.618-.122-1.003.016-.612.165-1.082.473-1.524.254-.37.566-.628.986-.812l.161-.07-.222-.095c-.6-.257-1.04-.706-1.297-1.318-.167-.398-.218-.655-.218-1.255 0-.626.053-.907.239-1.328.34-.77.994-1.267 1.843-1.397a3.38 3.38 0 0 1 .469-.098zm-.02.97a1.48 1.48 0 0 0-.266.044c-.47.107-.817.433-.972.907-.09.277-.117.49-.106.864.012.42.063.648.208.908.234.42.634.65 1.143.65.507 0 .91-.233 1.142-.653.143-.258.196-.487.208-.907.01-.374-.016-.587-.106-.864-.154-.474-.5-.8-.97-.907a1.555 1.555 0 0 0-.281-.042zm.003 5.394c-.617 0-1.077.27-1.327.779-.145.294-.195.537-.195.955 0 .422.05.67.196.963.253.513.71.78 1.326.78.614 0 1.072-.267 1.325-.78.147-.293.197-.54.197-.963 0-.418-.05-.66-.197-.955-.252-.509-.71-.779-1.325-.779z"/>
      </svg>
    ),
    color: "#fb923c",
    bg:    "rgba(251,146,60,0.08)",
    border:"rgba(251,146,60,0.20)",
    glow:  "rgba(251,146,60,0.16)",
    short: "CC",
  },
];


export default function Hero() {
  const {
    name,
    title,
    headline,
    bio,
    photoPath,
    photoAlt,
    resumePath,
    coverLetterPath,
    socials,
  } = heroData;

  const [isRevealed, setIsRevealed]       = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const socialItems = SOCIALS(socials);
  const router = useRouter();

  // ── Typewriter effect on headline ──────────────────────────────────────────
  const [displayedHeadline, setDisplayedHeadline] = useState("");
  const headlineRef = useRef(headline);

  useEffect(() => {
    headlineRef.current = headline;
    setDisplayedHeadline("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < headlineRef.current.length) {
        setDisplayedHeadline(headlineRef.current.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [headline]);

  // Prefetch both document pages immediately so navigation is instant
  useEffect(() => {
    router.prefetch("/resume");
    router.prefetch("/cover-letter");
  }, [router]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pb-24 overflow-hidden"
      aria-label="Hero - Introduction"
    >
      {/* Interactive distributed network — primary hero background */}
      <HeroNetwork />

      {/* Signature grid mesh — sits on top of network as subtle overlay */}
      <div className="hero-grid" style={{ opacity: 0.45 }} aria-hidden="true" />

      {/* Ambient radial glows — clipped to avoid horizontal scroll on mobile */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-[1]"
        aria-hidden="true"
      >
        <div data-depth="0.4" className="absolute top-1/3 left-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-cyan-500/[0.055] rounded-full blur-[60px] sm:blur-[80px]" />
        <div data-depth="0.7" className="absolute bottom-1/4 right-0 sm:right-1/5 w-[240px] sm:w-[360px] h-[240px] sm:h-[360px] bg-violet-500/[0.05] rounded-full blur-[60px] sm:blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Mobile: stacked column. Desktop: side-by-side row */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-16">
          {/* ── Photo Column ── */}
          <div className="flex-shrink-0 flex flex-col items-center gap-5">
            {/* Profile image */}
            <div className="relative">
              <div
                className={`photo-container w-44 h-44 sm:w-56 sm:h-56 lg:w-80 lg:h-80 select-none${isRevealed ? " revealed" : ""}`}
                onMouseEnter={() => setIsRevealed(true)}
                onMouseLeave={() => setIsRevealed(false)}
                onTouchStart={() => setIsRevealed(true)}
                onTouchEnd={() => setIsRevealed(false)}
                role="img"
                aria-label={
                  isRevealed ? photoAlt : "Hover or tap to reveal profile photo"
                }
              >
                <Image
                  src={photoPath}
                  alt={photoAlt}
                  fill
                  priority
                  className={`photo-img${isRevealed ? " revealed" : ""}`}
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 320px"
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoIAAgAAUAmJaACdAEO/gHOAAD++P/rjf//+z//8v////8A"
                />
                {/* Hint overlay */}
                <div
                  className={`photo-hint${isRevealed ? " revealed" : ""}`}
                  aria-hidden="true"
                >
                  <Eye className="w-5 h-5 text-cyan-300 drop-shadow-lg" />
                  <span className="photo-hint-label text-[10px] font-semibold text-cyan-200/80 font-mono tracking-widest uppercase drop-shadow" />
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071a10]/90 border border-cyan-500/25 text-cyan-300 text-xs font-semibold backdrop-blur-sm shadow-lg">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot"
                  aria-hidden="true"
                />
                Open to Work
              </div>
            </div>

            {/* Social icon row */}
            {/* <div
              className="flex items-center gap-2 mt-1 flex-wrap justify-center"
              aria-label="Social profiles"
            >
              {[
                {
                  href: socials.github.url,
                  label: "GitHub",
                  icon: <Github className="w-4 h-4" />,
                  hover: "hover:text-white hover:border-white/20",
                },
                {
                  href: socials.linkedin.url,
                  label: "LinkedIn",
                  icon: <Linkedin className="w-4 h-4" />,
                  hover: "hover:text-blue-400 hover:border-blue-500/25",
                },
                {
                  href: socials.leetcode.url,
                  label: "LeetCode",
                  icon: <span className="font-mono text-[10px] font-bold">LC</span>,
                  hover: "hover:text-yellow-400 hover:border-yellow-500/25",
                },
                {
                  href: socials.codeforces.url,
                  label: "Codeforces",
                  icon: <span className="font-mono text-[10px] font-bold">CF</span>,
                  hover: "hover:text-sky-400 hover:border-sky-500/25",
                },
                {
                  href: socials.codechef.url,
                  label: "CodeChef",
                  icon: <span className="font-mono text-[10px] font-bold">CC</span>,
                  hover: "hover:text-amber-400 hover:border-amber-500/25",
                },
              ].map(({ href, label, icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg text-[--text-muted] border border-[--border-subtle] bg-white/[0.02] transition-all duration-200 ${hover}`}
                >
                  {icon}
                </a>
              ))}
            </div> */}
            {/* ── Social Icons — redesigned ── */}
            <div
              className="flex items-center gap-2 mt-2 flex-wrap justify-center"
              aria-label="Social profiles"
            >
              {socialItems.map(
                ({ href, label, icon, color, bg, border, glow }) => {
                  const isHov = hoveredSocial === label;
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      onMouseEnter={() => setHoveredSocial(label)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      className="relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300"
                      style={{
                        color: isHov ? color : "rgba(148,163,184,0.7)",
                        background: isHov ? bg : "rgba(255,255,255,0.02)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: isHov ? border : "rgba(255,255,255,0.06)",
                        boxShadow: isHov
                          ? `0 0 0 1px ${border}, 0 4px 20px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                          : "none",
                        transform: isHov
                          ? "translateY(-2px) scale(1.08)"
                          : "none",
                      }}
                    >
                      {/* Inner glow pulse on hover */}
                      {isHov && (
                        <span
                          className="absolute inset-0 rounded-xl opacity-30"
                          style={{
                            background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{icon}</span>

                      {/* Tooltip */}
                      <span
                        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold whitespace-nowrap pointer-events-none transition-all duration-200"
                        style={{
                          background: bg,
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: border,
                          color,
                          opacity: isHov ? 1 : 0,
                          transform: isHov
                            ? "translateY(0)"
                            : "translateY(4px)",
                        }}
                        aria-hidden="true"
                      >
                        {label}
                      </span>
                    </a>
                  );
                },
              )}
            </div>
          </div>

          {/* ── Content Column ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 flex-1 w-full">
            {/* Eyebrow */}
            <div className="section-eyebrow">
              <Code2 className="w-3 h-3" aria-hidden="true" />
              <span>IIT Bhubaneswar · 2021–2026</span>
            </div>

            {/* Name — fluid size from mobile to desktop */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] gradient-text-hero w-full">
              {name}
            </h1>

            {/* Title & Specialization */}
            <div className="flex flex-col items-center lg:items-start gap-1">
              <p className="text-base sm:text-lg font-semibold text-zinc-300">
                {title}
              </p>
              <p className="text-sm font-medium text-emerald-400 font-mono flex items-center gap-0.5" aria-label={headline}>
                <span aria-hidden="true">{displayedHeadline}</span>
                <span
                  className="inline-block w-[2px] h-[1em] bg-emerald-400 ml-0.5 align-middle"
                  style={{ animation: "blink 1s step-end infinite" }}
                  aria-hidden="true"
                />
              </p>
            </div>

            {/* Bio */}
            <p className="max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed">
              {bio}
            </p>

            {/* CTA Buttons — wrap gracefully on narrow screens */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
              {/* Primary: View Resume */}
              <Link
                href="/resume"
                prefetch={true}
                data-magnetic
                data-magnetic-strength="0.30"
                className="group flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-900 font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 min-h-[44px]"
                aria-label="View Resume"
              >
                <FileText
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                Resume
                <span className="text-xs font-normal opacity-70">View</span>
              </Link>

              {/* Secondary: View Cover Letter */}
              <Link
                href="/cover-letter"
                prefetch={true}
                data-magnetic
                data-magnetic-strength="0.30"
                className="group flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 active:bg-indigo-500/30 text-indigo-300 hover:text-indigo-200 font-semibold text-sm transition-all duration-200 min-h-[44px]"
                aria-label="View Cover Letter"
              >
                <FileText
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                Cover Letter
                <span className="text-xs font-normal opacity-70">View</span>
              </Link>

              {/* Tertiary: GitHub */}
              <a
                href={socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                data-magnetic-strength="0.25"
                className="group flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300 hover:text-zinc-100 font-semibold text-sm transition-all duration-200 min-h-[44px]"
                aria-label="Visit GitHub profile"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                GitHub
                <ExternalLink
                  className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — positioned above the bottom dock on mobile */}
      <a
        href="#experience"
        className="absolute bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors z-10"
        aria-label="Scroll to next section"
      >
        <span className="text-xs font-mono tracking-widest uppercase opacity-60">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
