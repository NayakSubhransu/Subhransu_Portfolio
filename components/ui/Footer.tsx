import { Github, Linkedin, Terminal } from "lucide-react";
import { contactInfo } from "@/data/portfolio-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/[0.06] py-8 px-4 sm:px-6 lg:px-8"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Wordmark */}
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
            aria-hidden="true"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          </span>
          <span className="font-mono text-xs font-semibold text-zinc-500">
            subhransu<span className="text-emerald-500">.</span>dev
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-zinc-600 text-center order-last sm:order-none">
          © {currentYear} Subhransu Priyaranjan Nayak. Built with{" "}
          <span className="text-zinc-500">Next.js & Tailwind CSS</span>.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-2" aria-label="Social links">
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-white/[0.04] transition-all duration-200"
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:text-blue-400 hover:bg-blue-500/[0.06] transition-all duration-200"
          >
            <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
