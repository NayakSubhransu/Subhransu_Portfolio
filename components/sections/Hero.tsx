import Image from "next/image";
import {
  Github,
  Linkedin,
  Download,
  ExternalLink,
  Code2,
  ArrowDown,
} from "lucide-react";
import { heroData } from "@/data/portfolio-data";

export default function Hero() {
  const { name, title, headline, bio, photoPath, photoAlt, resumePath, coverLetterPath, socials } =
    heroData;

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-24 overflow-hidden"
      aria-label="Hero - Introduction"
    >
      {/* Background ambient gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          {/* ── Photo Column ── */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            {/* Profile Image */}
            <div className="relative">
              <div
                className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-2xl overflow-hidden photo-glow"
                aria-hidden="true"
              >
                <Image
                  src={photoPath}
                  alt={photoAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 208px"
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoIAAgAAUAmJaACdAEO/gHOAAD++P/rjf//+z//8v////8A"
                />
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-sm shadow-lg">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot"
                  aria-hidden="true"
                />
                Open to Work
              </div>
            </div>

            {/* Social Links */}
            <div
              className="flex items-center gap-2"
              aria-label="Social profiles"
            >
              <a
                href={socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 transition-all duration-200"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-blue-500/[0.08] border border-white/[0.06] hover:border-blue-500/20 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={socials.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode profile"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-yellow-400 hover:bg-yellow-500/[0.08] border border-white/[0.06] hover:border-yellow-500/20 transition-all duration-200 font-mono text-xs font-bold"
              >
                LC
              </a>
              <a
                href={socials.codeforces.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Codeforces profile"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-sky-400 hover:bg-sky-500/[0.08] border border-white/[0.06] hover:border-sky-500/20 transition-all duration-200 font-mono text-xs font-bold"
              >
                CF
              </a>
              <a
                href={socials.codechef.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CodeChef profile"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-500/[0.08] border border-white/[0.06] hover:border-amber-500/20 transition-all duration-200 font-mono text-xs font-bold"
              >
                CC
              </a>
            </div>
          </div>

          {/* ── Content Column ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 flex-1">
            {/* Eyebrow */}
            <div className="section-eyebrow">
              <Code2 className="w-3 h-3" aria-hidden="true" />
              <span>IIT Bhubaneswar · 2021–2026</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] gradient-text-hero">
              {name}
            </h1>

            {/* Title & Specialization */}
            <div className="flex flex-col items-center lg:items-start gap-1">
              <p className="text-lg sm:text-xl font-semibold text-zinc-300">
                {title}
              </p>
              <p className="text-sm sm:text-base font-medium text-emerald-400 font-mono">
                {headline}
              </p>
            </div>

            {/* Bio */}
            <p className="max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed">
              {bio}
            </p>

            {/* Stat Chips */}
            {/* <div className="flex flex-wrap justify-center lg:justify-start gap-2" aria-label="Key statistics">
              {[
                { label: "LeetCode", value: "1934 Peak", sub: "Top 4%" },
                { label: "DSA Problems", value: "1,500+", sub: "Solved" },
                { label: "CodeChef", value: "3-Star", sub: "1682 Peak" },
                { label: "Scale", value: "600K+", sub: "Users Served" },
              ].map(({ label, value, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/10 transition-colors"
                >
                  <span className="text-xs text-zinc-500 font-medium">{label}</span>
                  <span className="text-sm font-bold text-zinc-100">{value}</span>
                  <span className="text-xs text-emerald-400 font-medium">{sub}</span>
                </div>
              ))}
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
              {/* Primary: Download Resume */}
              <a
                href={resumePath}
                download
                className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 min-h-[44px]"
                aria-label="Download Resume PDF"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
                Download Resume
                <span className="text-xs font-normal opacity-70">PDF</span>
              </a>

              {/* Secondary: Download Cover Letter */}
              <a
                href={coverLetterPath}
                download
                className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 font-semibold text-sm transition-all duration-200 min-h-[44px]"
                aria-label="Download Cover Letter PDF"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
                Cover Letter
                <span className="text-xs font-normal opacity-70">PDF</span>
              </a>

              {/* Tertiary: GitHub */}
              <a
                href={socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300 hover:text-zinc-100 font-semibold text-sm transition-all duration-200 min-h-[44px]"
                aria-label="Visit GitHub profile"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                GitHub
                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors"
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
