"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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

  const [isRevealed, setIsRevealed] = useState(false);
  const router = useRouter();

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
      {/* Signature element: grid mesh */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Ambient radial glows — clipped to avoid horizontal scroll on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-cyan-500/[0.055] rounded-full blur-[60px] sm:blur-[80px]" />
        <div className="absolute bottom-1/4 right-0 sm:right-1/5 w-[240px] sm:w-[360px] h-[240px] sm:h-[360px] bg-violet-500/[0.05] rounded-full blur-[60px] sm:blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
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
                aria-label={isRevealed ? photoAlt : "Hover or tap to reveal profile photo"}
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
            <div
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
              <p className="text-sm font-medium text-emerald-400 font-mono">
                {headline}
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
        className="absolute bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors"
        aria-label="Scroll to Work Experience"
      >
        <span className="text-xs font-mono tracking-widest uppercase opacity-60">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
