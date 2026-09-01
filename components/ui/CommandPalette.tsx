"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, ArrowRight, X } from "lucide-react";

const COMMANDS = [
  { label: "Home",          href: "#home",         shortcut: "1" },
  { label: "Experience",    href: "#experience",   shortcut: "2" },
  { label: "Projects",      href: "#projects",     shortcut: "3" },
  { label: "Achievements",  href: "#achievements", shortcut: "4" },
  { label: "Skills",        href: "#skills",       shortcut: "5" },
  { label: "Papershelf",    href: "#papershelf",   shortcut: "6" },
  { label: "Education",     href: "#education",    shortcut: "7" },
  { label: "Contact",       href: "#contact",      shortcut: "8" },
  { label: "View Resume",   href: "/resume",       shortcut: "R", external: false, isLink: true },
  { label: "Cover Letter",  href: "/cover-letter", shortcut: "C", external: false, isLink: true },
] as const;

export default function CommandPalette() {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const [active, setActive]   = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open on Cmd+K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback((cmd: (typeof COMMANDS)[number]) => {
    setOpen(false);
    if ("isLink" in cmd && cmd.isLink) {
      window.location.href = cmd.href;
      return;
    }
    const target = document.querySelector(cmd.href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter" && filtered[active]) {
        execute(filtered[active]);
      }
    },
    [filtered, active, execute]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.10] bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden">

        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.07]">
          <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onKeyDown}
            placeholder="Jump to section…"
            className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none"
            aria-label="Search commands"
            aria-autocomplete="list"
            role="combobox"
            aria-expanded="true"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-zinc-600 hover:text-zinc-300 transition-colors p-1"
            aria-label="Close command palette"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Results */}
        <ul
          className="py-2 max-h-80 overflow-y-auto"
          role="listbox"
          aria-label="Navigation commands"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-zinc-600">
              No results for &ldquo;{query}&rdquo;
            </li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={cmd.href} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onClick={() => execute(cmd)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                    i === active
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-colors ${i === active ? "text-emerald-400" : "text-zinc-700"}`}
                      aria-hidden="true"
                    />
                    {cmd.label}
                  </span>
                  <kbd
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                      i === active
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-zinc-700 bg-zinc-800 text-zinc-600"
                    }`}
                  >
                    {cmd.shortcut}
                  </kbd>
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer hint */}
        <div className="px-4 py-2.5 border-t border-white/[0.05] flex items-center gap-4 text-[11px] text-zinc-600 font-mono">
          <span><kbd className="text-zinc-500">↑↓</kbd> navigate</span>
          <span><kbd className="text-zinc-500">↵</kbd> go</span>
          <span><kbd className="text-zinc-500">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
