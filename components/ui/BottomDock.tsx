"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Home,
  Briefcase,
  FolderGit2,
  Trophy,
  Layers,
  BookOpen,
  GraduationCap,
  Mail,
} from "lucide-react";

const DOCK_LINKS = [
  { href: "#home",         label: "Home",     Icon: Home },
  { href: "#experience",   label: "Work",     Icon: Briefcase },
  { href: "#projects",     label: "Projects", Icon: FolderGit2 },
  { href: "#achievements", label: "CP",       Icon: Trophy },
  { href: "#skills",       label: "Skills",   Icon: Layers },
  { href: "#papershelf",   label: "Papers",   Icon: BookOpen },
  { href: "#education",    label: "Edu",      Icon: GraduationCap },
  { href: "#contact",      label: "Contact",  Icon: Mail },
] as const;

export default function BottomDock() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = DOCK_LINKS.map((l) => l.href.slice(1));
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

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  return (
    <nav
      className="bottom-dock lg:hidden"
      aria-label="Mobile bottom navigation"
    >
      {/* Scrollable dock container — allows all 8 icons on very narrow screens */}
      <div className="max-w-[calc(100vw-2rem)] overflow-x-auto overscroll-x-contain scrollbar-none">
        <div className="flex items-center gap-0.5 px-2 py-2 glass rounded-2xl border border-white/10 shadow-2xl shadow-black/50 w-max mx-auto">
          {DOCK_LINKS.map(({ href, label, Icon }) => {
            const sectionId = href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center justify-center px-2.5 py-1.5 min-w-[44px] min-h-[52px] rounded-xl transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "text-emerald-400 bg-emerald-500/15"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05]"
                }`}
              >
                <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                <span
                  className={`text-[9px] mt-0.5 font-medium leading-none transition-colors ${
                    isActive ? "text-emerald-400" : "text-zinc-600"
                  }`}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
