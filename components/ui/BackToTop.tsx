"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`back-to-top ${visible ? "visible" : ""} flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] bg-zinc-900/80 backdrop-blur-sm text-zinc-400 hover:text-zinc-100 hover:border-white/[0.15] hover:bg-zinc-800/80 transition-colors duration-200 shadow-lg`}
    >
      <ArrowUp className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
