// app/cover-letter/loading.tsx
// Next.js App Router streams this instantly while DocumentViewer hydrates.
// Mirrors DocumentViewer layout exactly — accent: indigo.

export default function CoverLetterLoading() {
  return (
    <div className="min-h-[100svh] bg-[#09090b] flex flex-col">

      {/* ── Top bar skeleton ── */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/[0.04] shimmer flex-shrink-0" />
            <span className="w-px h-5 bg-white/[0.06] flex-shrink-0" aria-hidden="true" />
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex-shrink-0" />
            <div className="hidden sm:block w-24 h-3.5 rounded-full bg-white/[0.05] shimmer" />
            <div className="hidden sm:flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-white/[0.04]" />
              <div className="w-20 h-3 rounded-full bg-indigo-500/15 shimmer" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block w-9 h-9 rounded-lg bg-white/[0.04] shimmer" />
            <div className="w-28 h-9 rounded-xl bg-indigo-500/20 shimmer" />
          </div>
        </div>
      </header>

      {/* ── Metadata row skeleton ── */}
      <div
        className="border-b border-white/[0.05]"
        style={{
          background: "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(99,102,241,0.06), transparent 70%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shimmer" />
            <div className="flex flex-col gap-2 min-w-0">
              <div className="w-20 h-2.5 rounded-full bg-indigo-500/20 shimmer" />
              <div className="w-48 sm:w-64 h-4 rounded-full bg-white/[0.07] shimmer" />
              <div className="w-44 h-2.5 rounded-full bg-white/[0.04] shimmer" />
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-zinc-900/60 border border-white/[0.06] p-1 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-white/[0.04] shimmer" />
            <div className="w-10 h-4 rounded bg-white/[0.04] shimmer mx-1" />
            <div className="w-7 h-7 rounded-lg bg-white/[0.04] shimmer" />
            <div className="w-px h-3.5 bg-white/[0.08] mx-0.5" />
            <div className="w-7 h-7 rounded-lg bg-white/[0.04] shimmer" />
          </div>
        </div>
      </div>

      {/* ── Canvas area skeleton ── */}
      <main className="flex-1 flex flex-col p-3 sm:p-6 items-center">
        <div className="relative w-full max-w-5xl rounded-2xl border border-white/[0.06] bg-[#0c0c0e] min-h-[75vh] flex flex-col items-center justify-center overflow-hidden">

          <div className="flex flex-col items-center gap-5 z-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/25">
              <svg
                className="w-8 h-8 animate-pulse"
                style={{ color: "rgb(129,140,248)" }}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold font-mono" style={{ color: "rgb(129,140,248)" }}>
                Rendering PDF document…
              </p>
              <p className="text-xs text-zinc-600 mt-1">
                Generating high-resolution canvas
              </p>
            </div>

            <div className="w-52 h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
              <div
                className="h-full w-2/5 rounded-full"
                style={{
                  background: "rgba(99,102,241,0.75)",
                  animation: "loading-slide 1.4s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          <div className="absolute inset-6 sm:inset-10 flex flex-col gap-4 pointer-events-none opacity-[0.04]">
            {[85, 92, 78, 88, 70].map((w, i) => (
              <div
                key={i}
                className="h-3 rounded-full bg-white"
                style={{ width: `${w}%`, marginLeft: i % 2 === 0 ? 0 : "auto" }}
              />
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes loading-slide {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(500%);  }
        }
        .shimmer { animation: shimmer-sweep 1.8s ease-in-out infinite; }
        @keyframes shimmer-sweep {
          0%   { opacity: 0.5; }
          50%  { opacity: 0.9; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
