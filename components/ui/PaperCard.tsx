"use client";

import { useState, useCallback } from "react";
import {
  FileText,
  ExternalLink,
  ChevronDown,
  Download,
  Lightbulb,
  Zap,
} from "lucide-react";
import type { Paper } from "@/types";

const CATEGORY_STYLES: Record<string, string> = {
  "Distributed Systems & Storage": "text-sky-400 bg-sky-500/10 border-sky-500/20",
  "LLM Architecture & Deep Learning": "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Agentic AI & RAG Pipelines": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

export default function PaperCard({ paper }: { paper: Paper }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const categoryStyle =
    CATEGORY_STYLES[paper.category] ??
    "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";

  return (
    <article
      className="glass-card rounded-2xl overflow-hidden"
      aria-label={paper.title}
    >
      {/* Card Header — always visible */}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <span
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07]"
            aria-hidden="true"
          >
            <FileText className="w-4 h-4 text-zinc-400" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-zinc-200 leading-snug">
              {paper.title}
            </h3>
            <p className="text-xs text-zinc-600 mt-0.5 line-clamp-2">
              {paper.authors}
            </p>
          </div>
        </div>

        {/* Category badge */}
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${categoryStyle} font-mono`}
        >
          {paper.category}
        </span>
      </div>

      {/* TL;DR Toggle Button */}
      <button
        type="button"
        onClick={toggleDrawer}
        aria-expanded={isOpen}
        aria-controls={`tldr-${paper.id}`}
        className="w-full flex items-center justify-between px-5 py-3 border-t border-white/[0.05] text-xs font-semibold text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] transition-all duration-200 min-h-[44px]"
      >
        <span className="flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-yellow-400" aria-hidden="true" />
          Quick TL;DR
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-emerald-400" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* TL;DR Drawer — collapsible */}
      <div
        id={`tldr-${paper.id}`}
        role="region"
        aria-label={`TL;DR for ${paper.title}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-4 pt-2 flex flex-col gap-3 border-t border-white/[0.05] bg-white/[0.015]">
          {/* Problem */}
          <div>
            <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-600 mb-1">
              The Problem
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {paper.tldr.problem}
            </p>
          </div>

          {/* Breakthrough */}
          <div>
            <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-600 mb-1">
              Core Breakthrough
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {paper.tldr.breakthrough}
            </p>
          </div>

          {/* Takeaways */}
          <div>
            <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-600 mb-1.5">
              Engineering Takeaways
            </p>
            <ul className="flex flex-col gap-1.5" role="list">
              {paper.tldr.takeaways.map((tw, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Zap
                    className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    {tw}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-t border-white/[0.05]">
        <a
          href={paper.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold transition-all duration-200 min-h-[44px]"
          aria-label={`Download annotated PDF for ${paper.title}`}
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          PDF
        </a>
        <a
          href={paper.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/[0.07] text-zinc-500 hover:text-zinc-300 hover:border-white/10 text-xs font-semibold transition-all duration-200 min-h-[44px]"
          aria-label={`View original source paper for ${paper.title}`}
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          Source
        </a>
      </div>
    </article>
  );
}
