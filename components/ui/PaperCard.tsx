// "use client";

// import { useState, useCallback } from "react";
// import {
//   FileText,
//   ExternalLink,
//   ChevronDown,
//   Download,
//   Lightbulb,
//   Zap,
// } from "lucide-react";
// import type { Paper } from "@/types";

// const CATEGORY_STYLES: Record<string, string> = {
//   "Distributed Systems & Storage": "text-sky-400 bg-sky-500/10 border-sky-500/20",
//   "LLM Architecture & Deep Learning": "text-violet-400 bg-violet-500/10 border-violet-500/20",
//   "Agentic AI & RAG Pipelines": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
// };

// export default function PaperCard({ paper }: { paper: Paper }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = useCallback(() => {
//     setIsOpen((v) => !v);
//   }, []);

//   const categoryStyle =
//     CATEGORY_STYLES[paper.category] ??
//     "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";

//   return (
//     <article
//       className="glass-card rounded-2xl overflow-hidden"
//       aria-label={paper.title}
//     >
//       {/* Card Header - always visible */}
//       <div className="p-5">
//         <div className="flex items-start gap-3 mb-3">
//           <span
//             className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07]"
//             aria-hidden="true"
//           >
//             <FileText className="w-4 h-4 text-zinc-400" />
//           </span>
//           <div className="flex-1 min-w-0">
//             <h3 className="text-sm font-bold text-zinc-200 leading-snug">
//               {paper.title}
//             </h3>
//             <p className="text-xs text-zinc-600 mt-0.5 line-clamp-2">
//               {paper.authors}
//             </p>
//           </div>
//         </div>

//         {/* Category badge */}
//         <span
//           className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${categoryStyle} font-mono`}
//         >
//           {paper.category}
//         </span>
//       </div>

//       {/* TL;DR Toggle Button */}
//       <button
//         type="button"
//         onClick={toggleDrawer}
//         aria-expanded={isOpen}
//         aria-controls={`tldr-${paper.id}`}
//         className="w-full flex items-center justify-between px-5 py-3 border-t border-white/[0.05] text-xs font-semibold text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] transition-all duration-200 min-h-[44px]"
//       >
//         <span className="flex items-center gap-1.5">
//           <Lightbulb className="w-3.5 h-3.5 text-yellow-400" aria-hidden="true" />
//           Quick TL;DR
//         </span>
//         <ChevronDown
//           className={`w-3.5 h-3.5 transition-transform duration-300 ${
//             isOpen ? "rotate-180 text-emerald-400" : ""
//           }`}
//           aria-hidden="true"
//         />
//       </button>

//       {/* TL;DR Drawer - collapsible */}
//       <div
//         id={`tldr-${paper.id}`}
//         role="region"
//         aria-label={`TL;DR for ${paper.title}`}
//         className={`overflow-hidden transition-all duration-300 ease-in-out ${
//           isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="px-5 pb-4 pt-2 flex flex-col gap-3 border-t border-white/[0.05] bg-white/[0.015]">
//           {/* Problem */}
//           <div>
//             <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-600 mb-1">
//               The Problem
//             </p>
//             <p className="text-xs text-zinc-400 leading-relaxed">
//               {paper.tldr.problem}
//             </p>
//           </div>

//           {/* Breakthrough */}
//           <div>
//             <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-600 mb-1">
//               Core Breakthrough
//             </p>
//             <p className="text-xs text-zinc-400 leading-relaxed">
//               {paper.tldr.breakthrough}
//             </p>
//           </div>

//           {/* Takeaways */}
//           <div>
//             <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-600 mb-1.5">
//               Engineering Takeaways
//             </p>
//             <ul className="flex flex-col gap-1.5" role="list">
//               {paper.tldr.takeaways.map((tw, i) => (
//                 <li key={i} className="flex items-start gap-2">
//                   <Zap
//                     className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5"
//                     aria-hidden="true"
//                   />
//                   <span className="text-xs text-zinc-400 leading-relaxed">
//                     {tw}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex items-center gap-2 px-5 py-3.5 border-t border-white/[0.05]">
//         <a
//           href={paper.pdfPath}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold transition-all duration-200 min-h-[44px]"
//           aria-label={`Download annotated PDF for ${paper.title}`}
//         >
//           <Download className="w-3.5 h-3.5" aria-hidden="true" />
//           PDF
//         </a>
//         <a
//           href={paper.originalUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/[0.07] text-zinc-500 hover:text-zinc-300 hover:border-white/10 text-xs font-semibold transition-all duration-200 min-h-[44px]"
//           aria-label={`View original source paper for ${paper.title}`}
//         >
//           <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
//           Source
//         </a>
//       </div>
//     </article>
//   );
// }



"use client";

import { useState, useCallback } from "react";
import { FileText, ExternalLink, ChevronDown, Download, Lightbulb, Zap, BookMarked } from "lucide-react";
import type { Paper } from "@/types";

const CATEGORY_STYLES: Record<string, { badge: string; icon: string; glow: string }> = {
  "Distributed Systems & Storage":    { badge: "text-sky-400 bg-sky-500/10 border-sky-500/25",    icon: "text-sky-400",    glow: "from-sky-500/[0.06]" },
  "LLM Architecture & Deep Learning": { badge: "text-violet-400 bg-violet-500/10 border-violet-500/25", icon: "text-violet-400", glow: "from-violet-500/[0.06]" },
  "Agentic AI & RAG Pipelines":       { badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",  icon: "text-cyan-400",   glow: "from-cyan-500/[0.06]" },
};

const FALLBACK = { badge: "text-[--text-muted] bg-white/[0.03] border-[--border-subtle]", icon: "text-[--text-muted]", glow: "from-white/[0.03]" };

export default function PaperCard({ paper }: { paper: Paper }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const style = CATEGORY_STYLES[paper.category] ?? FALLBACK;

  return (
    <article
      className="glass-card rounded-2xl overflow-hidden relative flex flex-col"
      aria-label={paper.title}
    >
      {/* Top gradient tint per category */}
      <div
        className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b ${style.glow} to-transparent pointer-events-none`}
        aria-hidden="true"
      />
      <div className="card-accent-line" aria-hidden="true" />

      {/* ── Header ── */}
      <div className="relative p-5 pb-4">
        <div className="flex items-start gap-3 mb-3">
          <span
            className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-[--border-subtle] ${style.icon}`}
            aria-hidden="true"
          >
            <BookMarked className="w-4 h-4" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[--text-primary] leading-snug tracking-[-0.01em]">
              {paper.title}
            </h3>
            <p className="text-[11px] text-[--text-faint] mt-0.5 line-clamp-1 font-mono">
              {paper.authors}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border font-mono tracking-wide ${style.badge}`}
        >
          {paper.category}
        </span>
      </div>

      {/* ── TL;DR Toggle Button ── */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`tldr-${paper.id}`}
        className={`w-full flex items-center justify-between px-5 py-3 border-t border-[--border-subtle] text-xs font-semibold transition-all duration-200 min-h-[44px] ${
          isOpen
            ? "text-amber-300 bg-amber-500/[0.06]"
            : "text-[--text-muted] hover:text-[--text-secondary] hover:bg-white/[0.025]"
        }`}
      >
        <span className="flex items-center gap-1.5">
          <Lightbulb
            className={`w-3.5 h-3.5 ${isOpen ? "text-amber-400" : "text-amber-500/60"}`}
            aria-hidden="true"
          />
          Engineering TL;DR
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-400" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* ── TL;DR Scrollable Drawer ── */}
      <div
        id={`tldr-${paper.id}`}
        role="region"
        aria-label={`TL;DR for ${paper.title}`}
        className={`border-t border-[--border-subtle] bg-black/20 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        {/* Inner div is what actually scrolls */}
        <div className="overflow-y-auto max-h-64 overscroll-contain px-5 py-4 flex flex-col gap-3.5 scrollbar-thin">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[--text-faint] mb-1.5 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-red-400/60 inline-block" />
              The Problem
            </p>
            <p className="text-xs text-[--text-secondary] leading-relaxed">
              {paper.tldr.problem}
            </p>
          </div>

          <div className="h-px bg-[--border-subtle]" />

          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[--text-faint] mb-1.5 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-amber-400/60 inline-block" />
              Core Breakthrough
            </p>
            <p className="text-xs text-[--text-secondary] leading-relaxed">
              {paper.tldr.breakthrough}
            </p>
          </div>

          <div className="h-px bg-[--border-subtle]" />

          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[--text-faint] mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-cyan-400/60 inline-block" />
              Engineering Takeaways
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {paper.tldr.takeaways.map((tw, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Zap
                    className="w-3 h-3 text-[--accent-cyan] flex-shrink-0 mt-0.5 opacity-70"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-[--text-secondary] leading-relaxed">
                    {tw}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Footer Actions ── */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-t border-[--border-subtle] mt-auto">
        <a
          href={paper.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/[0.08] border border-cyan-500/20 text-[--accent-cyan] hover:bg-cyan-500/[0.18] text-xs font-semibold transition-all duration-200 min-h-[44px]"
          aria-label={`Download PDF for ${paper.title}`}
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          PDF
        </a>
        <a
          href={paper.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[--border-medium] text-[--text-muted] hover:text-[--text-secondary] hover:border-[--border-strong] text-xs font-semibold transition-all duration-200 min-h-[44px]"
          aria-label={`View source paper for ${paper.title}`}
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          Source
        </a>
      </div>
    </article>
  );
}