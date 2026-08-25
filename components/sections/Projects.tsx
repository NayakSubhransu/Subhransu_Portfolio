import {
  FolderGit2,
  Github,
  ExternalLink,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { flagshipProjects, utilityProjects } from "@/data/portfolio-data";

function HighlightText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-zinc-200 font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Projects Showcase"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-10 sm:mb-14">
          <p className="section-eyebrow mb-3">
            <FolderGit2 className="w-3 h-3" aria-hidden="true" />
            Engineering
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Projects Showcase
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            Production-grade systems and tools - built with real architectural
            trade-offs.
          </p>
        </header>

        {/* ── Part 1: Flagship Projects ── */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-sm font-mono font-semibold uppercase tracking-widest text-white-200 mb-5 sm:mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-white-200" aria-hidden="true" />
            The Flagship Implementations
            <span className="w-4 h-px bg-white-200" aria-hidden="true" />
          </h3>

          <div className="flex flex-col gap-6 sm:gap-8">
            {flagshipProjects.map((project, index) => (
              <article
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden"
                aria-label={project.name}
              >
                <div className="p-4 sm:p-5 lg:p-7">
                  {/* Header Row - stack on mobile */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 sm:mb-5">
                    <div className="min-w-0">
                      <span
                        className="font-mono text-xs font-bold text-zinc-600 mb-1 block"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-100 leading-tight">
                        {project.name}
                      </h4>
                      <p className="text-sm text-zinc-500 mt-0.5 leading-snug">
                        {project.subheading}
                      </p>
                    </div>

                    {/* Action buttons - full width on mobile, auto on larger */}
                    <div className="flex items-center gap-2 flex-shrink-0 sm:flex-row">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] active:bg-white/[0.1] text-zinc-300 hover:text-zinc-100 text-xs font-semibold transition-all duration-200 min-h-[44px]"
                        aria-label={`View ${project.name} on GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" aria-hidden="true" />
                        GitHub
                      </a>
                      {project.paperUrl && (
                        <a
                          href={project.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-indigo-500/20 bg-indigo-500/8 hover:bg-indigo-500/15 text-indigo-300 hover:text-indigo-200 text-xs font-semibold transition-all duration-200 min-h-[44px]"
                          aria-label={`View research paper for ${project.name}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          Paper
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Engineering Highlights */}
                  <ul
                    className="flex flex-col gap-2.5 mb-4 sm:mb-5"
                    aria-label={`Engineering highlights for ${project.name}`}
                    role="list"
                  >
                    {project.highlights.map((hl, hi) => (
                      <li key={hi} className="flex items-start gap-2.5">
                        <ChevronRight
                          className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          <HighlightText text={hl} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5" aria-label={`Tech stack for ${project.name}`}>
                    {project.stack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Part 2: Utility Projects ── */}
        <div>
          <h3 className="text-sm font-mono font-semibold uppercase tracking-widest text-zinc-200 mb-5 sm:mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-200" aria-hidden="true" />
            Other Projects & Learnings
            <span className="w-4 h-px bg-zinc-200" aria-hidden="true" />
          </h3>

          {/* 1 col on mobile, 2 on sm, 3 on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {utilityProjects.map((project) => (
              <article
                key={project.id}
                className="glass-card rounded-xl p-4 flex flex-col gap-3"
                aria-label={project.name}
              >
                {project.award && (
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-3 h-3 text-yellow-400" aria-hidden="true" />
                    <span className="text-xs font-semibold text-yellow-400">
                      {project.award}
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <h4 className="text-sm font-bold text-zinc-200 mb-1 leading-tight">
                    {project.name}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1" aria-label={`Tech stack for ${project.name}`}>
                  {project.stack.slice(0, 7).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 7 && (
                    <span className="tech-tag text-zinc-600">
                      +{Math.max(0, project.stack.length - 7)}
                    </span>
                  )}
                </div>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors min-h-[44px] mt-auto"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  View on GitHub
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
