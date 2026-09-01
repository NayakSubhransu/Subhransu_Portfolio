"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Zap,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import { contactInfo } from "@/data/portfolio-data";

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
    tagText:     `hsl(${hue}, ${sat}%, 68%)`,
    tagBg:       `rgba(${rgb}, 0.09)`,
    tagBorder:   `rgba(${rgb}, 0.22)`,
    scanLine:    `rgba(${rgbLight}, 0.15)`,
    hoverBorder: `rgba(${rgb}, 0.42)`,
    hoverShadow: `0 8px 40px rgba(${rgb}, 0.14), 0 0 0 1px rgba(${rgb}, 0.42)`,
    footerHover: `hsl(${hue}, ${sat}%, 64%)`,
    divider:     `rgba(${rgb}, 0.20)`,
  };
}

// ─── Inline CopyButton (avoids prop-drilling, uses card accent color) ─────────
function CopyEmailButton({
  email,
  accentColor,
}: {
  email: string;
  accentColor: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const el = document.createElement("textarea");
      el.value = email;
      el.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy email address"}
      className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-200 min-h-[36px]"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
      ) : (
        <Copy className="w-3.5 h-3.5" style={{ color: accentColor }} aria-hidden="true" />
      )}
      <span
        className="text-[11px] font-mono font-semibold transition-colors"
        style={{ color: copied ? "rgb(52,211,153)" : accentColor }}
        role="status"
        aria-live="polite"
      >
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

// ─── Info Card (email, location, profiles) ────────────────────────────────────
function InfoCard({
  colorIndex,
  children,
}: {
  colorIndex: number;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered]         = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const c   = getCardColors(colorIndex);

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

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] transition-all duration-300 will-change-transform"
      style={{
        background: `radial-gradient(ellipse 70% 50% at 0% 0%, ${c.topGlow}, transparent 55%), rgba(17,24,39,0.65)`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Scan-line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-20 transition-opacity duration-500"
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
          opacity: isHovered ? 1 : 0.3,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 p-4 sm:p-5 pl-5 sm:pl-6">
        {children}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const c0 = getCardColors(0); // email card
  const c1 = getCardColors(1); // location card
  const c2 = getCardColors(2); // profiles card

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Contact & Socials"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-emerald-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-indigo-500/[0.025] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <header className="mb-10 sm:mb-14 text-center" data-animate>
          <p className="section-eyebrow justify-center mb-3">
            <Mail className="w-3 h-3" aria-hidden="true" />
            Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Contact & Socials
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl mx-auto text-sm sm:text-base">
            Open to opportunities, collaborations, and interesting conversations.
            I typically respond within 24 hours.
          </p>
        </header>

        {/* ── Two-column layout ── */}
        {/* Mobile: form first (most important), then info. Desktop: info left, form right */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[360px_1fr] gap-6 lg:gap-10 items-start">

          {/* ── Left: Info sidebar ── */}
          <aside
            className="flex flex-col gap-4 lg:sticky lg:top-24 w-full"
            aria-label="Contact information"
          >

            {/* Email card */}
            <InfoCard colorIndex={0}>
              <p
                className="text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-2.5"
                style={{ color: c0.iconColor, opacity: 0.85 }}
              >
                Email
              </p>
              <div className="flex items-center justify-between gap-3 min-w-0">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm font-medium transition-colors min-w-0 truncate"
                  style={{ color: c0.tagText }}
                  aria-label={`Send email to ${contactInfo.email}`}
                >
                  {contactInfo.email}
                </a>
                <CopyEmailButton email={contactInfo.email} accentColor={c0.iconColor} />
              </div>
            </InfoCard>

            {/* Location card */}
            <InfoCard colorIndex={1}>
              <p
                className="text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-2.5"
                style={{ color: c1.iconColor, opacity: 0.85 }}
              >
                Location
              </p>
              <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                <MapPin
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: c1.iconColor, opacity: 0.7 }}
                  aria-hidden="true"
                />
                {contactInfo.location}
              </div>
            </InfoCard>

            {/* Profiles card */}
            <InfoCard colorIndex={2}>
              <p
                className="text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-3"
                style={{ color: c2.iconColor, opacity: 0.85 }}
              >
                Profiles
              </p>
              <div className="flex flex-col gap-1">
                {/* GitHub */}
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/[0.04] active:bg-white/[0.07] transition-colors group min-h-[48px]"
                  aria-label="GitHub profile"
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200"
                    style={{
                      background: c2.iconBg,
                      borderColor: c2.iconBorder,
                    }}
                    aria-hidden="true"
                  >
                    <Github className="w-4 h-4" style={{ color: c2.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors leading-tight">
                      GitHub
                    </p>
                    <p className="text-[11px] font-mono text-zinc-600 truncate">
                      NayakSubhransu
                    </p>
                  </div>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                </a>

                {/* Divider */}
                <div
                  className="h-px mx-3"
                  style={{ background: c2.divider }}
                  aria-hidden="true"
                />

                {/* LinkedIn */}
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/[0.04] active:bg-white/[0.07] transition-colors group min-h-[48px]"
                  aria-label="LinkedIn profile"
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200"
                    style={{
                      background: c2.iconBg,
                      borderColor: c2.iconBorder,
                    }}
                    aria-hidden="true"
                  >
                    <Linkedin className="w-4 h-4" style={{ color: c2.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors leading-tight">
                      LinkedIn
                    </p>
                    <p className="text-[11px] font-mono text-zinc-600 truncate">
                      subhransu-p-nayak
                    </p>
                  </div>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 text-zinc-700 group-hover:text-blue-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </InfoCard>

            {/* Deployment status badge */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] transition-colors hover:border-emerald-500/25"
              aria-label="Site deployment status"
            >
              <span
                className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot flex-shrink-0"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-emerald-400">
                  🟢 Deployed on Edge
                </p>
                <p className="text-[11px] text-zinc-600 font-mono">
                  Latency: &lt;20ms · Vercel Edge Network
                </p>
              </div>
              <Zap className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" aria-hidden="true" />
            </div>
          </aside>

          {/* ── Right: Contact Form ── */}
          <div
            className="relative rounded-2xl overflow-hidden border border-[--border-subtle] bg-[--bg-card] transition-all duration-300 w-full"
            style={{
              background: `radial-gradient(ellipse 60% 40% at 100% 0%, rgba(16,185,129,0.06), transparent 55%), rgba(17,24,39,0.65)`,
            }}
            role="region"
            aria-label="Send a message"
          >
            {/* Scan-line accent at top */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(16,185,129,0.5) 40%, rgba(99,102,241,0.4) 70%, transparent)",
              }}
              aria-hidden="true"
            />

            {/* Left accent bar — gradient emerald to indigo */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(16,185,129,0.7) 40%, rgba(99,102,241,0.5) 80%, transparent)",
                opacity: 0.5,
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 p-5 sm:p-6 lg:p-8 pl-6 sm:pl-8 lg:pl-10">
              {/* Form header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl border bg-emerald-500/10 border-emerald-500/25 flex-shrink-0"
                  aria-hidden="true"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-emerald-400 opacity-85">
                    Direct Message
                  </p>
                  <h3 className="text-base font-extrabold text-zinc-100 tracking-tight leading-tight">
                    Send a Message
                  </h3>
                </div>
              </div>

              {/* Accent divider */}
              <div
                className="h-px mb-6"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(16,185,129,0.3), rgba(16,185,129,0.5) 40%, rgba(16,185,129,0.1))",
                }}
                aria-hidden="true"
              />

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
