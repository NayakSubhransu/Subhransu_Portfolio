import {
  Github,
  Linkedin,
  Terminal,
  Mail,
  ArrowRight,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { contactInfo } from "@/data/portfolio-data";

// ─── Quick nav columns ────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { label: "Experience",   href: "/#experience"   },
  { label: "Projects",     href: "/#projects"     },
  { label: "Achievements", href: "/#achievements" },
  { label: "Skills",       href: "/#skills"       },
] as const;

const NAV_RESOURCES = [
  { label: "Papershelf",   href: "/#papershelf"   },
  { label: "Education",    href: "/#education"    },
  { label: "Contact",      href: "/#contact"      },
  { label: "Resume",       href: "/resume"        },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-white/[0.06] bg-[#09090b] overflow-hidden"
      role="contentinfo"
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.05), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top section: CTA + nav columns ── */}
        <div className="py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] gap-8 lg:gap-16">

          {/* ── Left: brand + CTA ── */}
          <div className="flex flex-col gap-5">
            {/* Wordmark */}
            <div className="flex items-center gap-2">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700/10 border border-emerald-500/20"
                aria-hidden="true"
              >
                <Terminal className="w-4 h-4 text-emerald-500" />
              </span>
              <span className="font-mono text-lg font-semibold text-zinc-300">
                subhransu<span className="text-emerald-700">.</span>dev
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Software Developer & AI Engineer building distributed systems,
              real-time platforms, and agentic AI pipelines.
            </p>

            {/* CTA — "Let's connect" */}
            <div className="flex flex-col gap-2.5">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-900 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 w-fit min-h-[44px]"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                Let&apos;s connect
                <ArrowRight
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </a>

              <Link
                href="/resume"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] text-zinc-400 hover:text-zinc-200 font-semibold text-sm transition-all duration-200 w-fit min-h-[44px]"
                aria-label="View Resume"
              >
                <FileText className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                View Resume
                <ArrowRight
                  className="w-3 h-3 opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-200"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* ── Middle: Work nav column ── */}
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-mono font-black uppercase tracking-[0.2em] text-white-100 mb-1">
              Work
            </p>
            <nav aria-label="Footer work navigation">
              <ul className="flex flex-col gap-2" role="list">
                {NAV_SECTIONS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="group flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-zinc-00 group-hover:bg-emerald-700 transition-colors duration-200 flex-shrink-0"
                        aria-hidden="true"
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        
        </div>

        {/* ── Divider ── */}
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
          aria-hidden="true"
        />

        {/* ── Bottom bar: copyright + socials — centered ── */}
        <div className="py-5 flex flex-col items-center justify-center gap-3">

          {/* Copyright */}
          <p className="text-base text-zinc-200 text-center font-mono">
            © {currentYear} Subhransu Priyaranjan Nayak
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-1.5" aria-label="Social profiles">
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05] transition-all duration-200"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-300 hover:text-blue-400 hover:bg-blue-500/[0.06] transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              aria-label="Send email"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-300 hover:text-emerald-400 hover:bg-emerald-500/[0.06] transition-all duration-200"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
