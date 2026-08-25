import { Github, Linkedin, Terminal } from "lucide-react";
import { contactInfo } from "@/data/portfolio-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/[0.06] pt-8 pb-8 lg:py-8 px-4 sm:px-6 lg:px-8"
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
          <span className="font-mono text-sm font-semibold text-white-500">
            subhransu<span className="text-emerald-500">.</span>dev
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-white-300 text-center order-last sm:order-none">
          © {currentYear} Subhransu Priyaranjan Nayak. Built with{" "}
          <span className="text-white-300">Next.js</span>.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-2" aria-label="Social links">
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-white-600 hover:text-zinc-400 hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200"
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-white-600 hover:text-blue-400 hover:bg-blue-500/[0.06] active:bg-blue-500/[0.1] transition-all duration-200"
          >
            <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
