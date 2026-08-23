"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, Terminal } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "CP" },
  { href: "#skills", label: "Skills" },
  { href: "#papershelf", label: "Papershelf" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position for navbar styling
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsMobileOpen(false);
    },
    []
  );

  // Keyboard shortcut: Cmd+K to open command palette (placeholder)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // TODO: trigger command palette
      }
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass border-b border-white/[0.06] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo / Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group"
            aria-label="Back to top"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
              <Terminal className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </span>
            <span className="hidden sm:block font-mono text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">
              subhransu
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const sectionId = href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`relative px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop: Cmd+K hint */}
          <div className="hidden lg:flex items-center gap-2">
            <kbd className="hidden xl:flex items-center gap-1 px-2 py-1 text-xs text-zinc-500 border border-zinc-700 rounded-md font-mono">
              <span>⌘</span>
              <span>K</span>
            </kbd>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
              aria-label="Download Resume PDF"
            >
              Resume ↓
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] transition-colors"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
          >
            {isMobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-30 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="absolute top-0 right-0 bottom-0 w-72 glass border-l border-white/[0.08] p-6 flex flex-col gap-2 pt-20">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              Navigate
            </p>
            {NAV_LINKS.map(({ href, label }) => {
              const sectionId = href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-150 min-h-[44px] ${
                    isActive
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-zinc-300 hover:text-zinc-100 hover:bg-white/[0.05]"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  )}
                  {label}
                </a>
              );
            })}
            <div className="mt-auto pt-4 border-t border-white/[0.06]">
              <a
                href="/resume.pdf"
                download
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-emerald-300 border border-emerald-500/30 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors min-h-[44px]"
                aria-label="Download Resume PDF"
              >
                Download Resume ↓
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
