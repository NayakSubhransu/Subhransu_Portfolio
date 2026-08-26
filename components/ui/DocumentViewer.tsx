"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Terminal,
  AlertCircle,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

type AccentColor = "emerald" | "indigo";

interface DocumentViewerProps {
  title: string;
  subtitle: string;
  filePath: string;       // e.g. "/resume.pdf"
  downloadName: string;   // e.g. "Subhransu_Nayak_Resume.pdf"
  backHref: string;
  accentColor: AccentColor;
}

// ── Per-accent design tokens ─────────────────────────────────────────────────
const ACCENT = {
  emerald: {
    eyebrow:     "text-emerald-400",
    iconColor:   "text-emerald-400",
    iconRing:    "bg-emerald-500/10 border-emerald-500/25",
    badgePill:   "bg-emerald-500/10 border-emerald-500/25 text-emerald-300",
    badgeDot:    "bg-emerald-400",
    glow:        "rgba(16,185,129,0.08)",
    downloadBtn: "bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-900 shadow-lg shadow-emerald-500/20",
    navBtn:      "text-emerald-300 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20",
    divider:     "rgba(16,185,129,0.25)",
  },
  indigo: {
    eyebrow:     "text-indigo-400",
    iconColor:   "text-indigo-400",
    iconRing:    "bg-indigo-500/10 border-indigo-500/25",
    badgePill:   "bg-indigo-500/10 border-indigo-500/25 text-indigo-300",
    badgeDot:    "bg-indigo-400",
    glow:        "rgba(99,102,241,0.08)",
    downloadBtn: "bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20",
    navBtn:      "text-indigo-300 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20",
    divider:     "rgba(99,102,241,0.25)",
  },
} as const;

// ── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingSkeleton({ a }: { a: (typeof ACCENT)[AccentColor] }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10 bg-[#0d0d0f]">
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-2xl border ${a.iconRing}`}
        aria-hidden="true"
      >
        <FileText className={`w-8 h-8 ${a.iconColor} animate-pulse`} />
      </div>
      <div className="text-center">
        <p className={`text-sm font-semibold font-mono ${a.eyebrow}`}>
          Loading document…
        </p>
        <p className="text-xs text-zinc-600 mt-1">Fetching from server</p>
      </div>
      {/* Progress bar */}
      <div className="w-52 h-1 rounded-full bg-white/[0.05] overflow-hidden">
        <div
          className="h-full w-1/3 rounded-full"
          style={{
            background: a.divider.replace("0.25", "0.7"),
            animation: "slide-progress 1.4s ease-in-out infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes slide-progress {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState({
  a,
  filePath,
  downloadName,
  onRetry,
}: {
  a: (typeof ACCENT)[AccentColor];
  filePath: string;
  downloadName: string;
  onRetry: () => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center bg-[#0d0d0f]">
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-2xl border ${a.iconRing}`}
      >
        <AlertCircle className={`w-8 h-8 ${a.iconColor}`} />
      </div>
      <div>
        <h2 className="text-base font-bold text-zinc-200 mb-2">
          Preview unavailable
        </h2>
        <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
          Your browser blocked the inline preview. Use the buttons below to
          open or download the file directly.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-sm font-semibold transition-all min-h-[44px]"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
        <a
          href={filePath}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-sm font-semibold transition-all min-h-[44px]"
        >
          <ExternalLink className="w-4 h-4" />
          Open in new tab
        </a>
        <a
          href={filePath}
          download={downloadName}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${a.downloadBtn}`}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DocumentViewer({
  title,
  subtitle,
  filePath,
  downloadName,
  backHref,
  accentColor,
}: DocumentViewerProps) {
  const [embedKey, setEmbedKey]     = useState(0);
  const [isLoading, setIsLoading]   = useState(true);
  const [hasError, setHasError]     = useState(false);
  const a = ACCENT[accentColor];

  const retry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setEmbedKey((k) => k + 1);
  }, []);

  return (
    <div className="min-h-[100svh] bg-[#09090b] flex flex-col">

      {/* ── Top navigation bar ── */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">

          {/* Left: back arrow + wordmark + breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href={backHref}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.07] active:bg-white/[0.12] transition-all flex-shrink-0"
              aria-label="Back to portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <span className="w-px h-5 bg-white/[0.08] flex-shrink-0" aria-hidden="true" />

            <Link
              href={backHref}
              className="flex items-center gap-2 group flex-shrink-0"
              aria-label="Portfolio home"
            >
              <span className={`flex items-center justify-center w-7 h-7 rounded-lg border ${a.iconRing}`}>
                <Terminal className={`w-3.5 h-3.5 ${a.iconColor}`} />
              </span>
              <span className="hidden sm:block font-mono text-xs font-semibold text-zinc-500 group-hover:text-zinc-200 transition-colors">
                subhransu.dev
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-zinc-600 min-w-0">
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span className={`font-bold truncate ${a.eyebrow}`}>{title}</span>
            </div>
          </div>

          {/* Right: open-in-tab + download */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06] transition-all"
              aria-label="Open in new tab"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={filePath}
              download={downloadName}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all min-h-[40px] ${a.downloadBtn}`}
              aria-label={`Download ${title}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
              <span className="hidden sm:inline text-[10px] opacity-70">PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Document metadata row ── */}
      <div
        className="border-b border-white/[0.05]"
        style={{
          background: `radial-gradient(ellipse 50% 100% at 50% 0%, ${a.glow}, transparent 70%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-4">
          <div
            className={`flex-shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl border ${a.iconRing}`}
            aria-hidden="true"
          >
            <FileText className={`w-5 h-5 sm:w-6 sm:h-6 ${a.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-[10px] font-mono font-black uppercase tracking-[0.2em] ${a.eyebrow} mb-0.5`}>
              {title}
            </p>
            <h1 className="text-sm sm:text-base font-extrabold text-zinc-100 tracking-tight leading-tight truncate">
              {subtitle}
            </h1>
            <p className="text-[11px] text-zinc-600 font-mono mt-0.5 truncate">{downloadName}</p>
          </div>
          <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border ${a.badgePill} flex-shrink-0`}>
            <span className={`w-1.5 h-1.5 rounded-full ${a.badgeDot}`} />
            PDF
          </span>
        </div>
      </div>

      {/* ── PDF Viewer ── */}
      {/*
        STRATEGY: Use <object> tag instead of <iframe>.
        <object data="/resume.pdf" type="application/pdf"> is the most
        cross-browser reliable way to embed PDFs inline. It works on
        localhost without the "refused to connect" error that plagues
        <iframe> with same-origin PDFs in Chrome. The inner <p> is the
        fallback shown when the browser can't render the PDF.
      */}
      <main className="flex-1 flex flex-col p-3 sm:p-5">
        <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-zinc-950 min-h-[70vh]">

          {/* Loading overlay */}
          {isLoading && !hasError && <LoadingSkeleton a={a} />}

          {/* Error overlay */}
          {hasError && (
            <ErrorState
              a={a}
              filePath={filePath}
              downloadName={downloadName}
              onRetry={retry}
            />
          )}

          {/* PDF object embed */}
          {!hasError && (
            <object
              key={embedKey}
              data={filePath}
              type="application/pdf"
              className="w-full h-full min-h-[70vh] block"
              aria-label={`${title} PDF document`}
              onLoad={() => setIsLoading(false)}
              // object doesn't fire onError reliably — use inner fallback instead
            >
              {/*
                This inner content renders if the browser cannot display the
                PDF (e.g. mobile browsers with no PDF plugin). We hide the
                loading state and show the error UI instead.
              */}
              <div
                ref={(el) => {
                  // If this div mounts it means <object> couldn't render the PDF
                  if (el) {
                    setIsLoading(false);
                    setHasError(true);
                  }
                }}
              />
            </object>
          )}
        </div>
      </main>

      {/* ── Bottom action footer ── */}
      <footer className="border-t border-white/[0.05] bg-[#09090b]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600 font-mono text-center sm:text-left">
            Preview not loading?{" "}
            <a
              href={filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 underline underline-offset-2 transition-colors"
            >
              Open directly in browser
            </a>
          </p>
          <div className="flex items-center gap-2">
            <a
              href={filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300 hover:text-zinc-100 text-xs font-semibold transition-all min-h-[40px]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in tab
            </a>
            <a
              href={filePath}
              download={downloadName}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all min-h-[40px] ${a.downloadBtn}`}
            >
              <Download className="w-3.5 h-3.5" />
              Download {title}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
