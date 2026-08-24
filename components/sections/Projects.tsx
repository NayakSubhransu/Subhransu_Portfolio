import {
  FolderGit2,
  Github,
  ExternalLink,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { flagshipProjects, utilityProjects } from "@/data/portfolio-data";

// Helper: render **bold** text in highlight strings
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
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Projects Showcase"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-14">
          <p className="section-eyebrow mb-3">
            <FolderGit2 className="w-3 h-3" aria-hidden="true" />
            Engineering
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Projects Showcase
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            Production-grade systems and tools - built with real architectural
            trade-offs.
          </p>
        </header>

        {/* ── Part 1: Flagship Projects ── */}
        <div className="mb-16">
          <h3 className="text-s font-mono font-semibold uppercase tracking-widest text-white-500 mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-white-700" aria-hidden="true" />
            Flagship Systems
            <span className="w-4 h-px bg-white-700" aria-hidden="true" />
          </h3>

          <div className="flex flex-col gap-8">
            {flagshipProjects.map((project, index) => (
              <article
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden"
                aria-label={project.name}
              >
                <div className="p-5 sm:p-7">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                    <div>
                      {/* Index number */}
                      <span
                        className="font-mono text-xs font-bold text-zinc-600 mb-1 block"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-zinc-100">
                        {project.name}
                      </h4>
                      <p className="text-sm text-zinc-500 mt-0.5 leading-snug">
                        {project.subheading}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300 hover:text-zinc-100 text-xs font-semibold transition-all duration-200 min-h-[44px]"
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
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-indigo-500/20 bg-indigo-500/8 hover:bg-indigo-500/15 text-indigo-300 hover:text-indigo-200 text-xs font-semibold transition-all duration-200 min-h-[44px]"
                          aria-label={`View research paper for ${project.name}`}
                        >
                          <ExternalLink
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                          />
                          Paper
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Engineering Highlights */}
                  <ul
                    className="flex flex-col gap-2.5 mb-5"
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
                  <div
                    className="flex flex-wrap gap-1.5"
                    aria-label={`Tech stack for ${project.name}`}
                  >
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

        {/* ── Part 2: Utility Projects & Experiments ── */}
        <div>
          <h3 className="text-s font-mono font-semibold uppercase tracking-widest text-white-500 mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-white-700" aria-hidden="true" />
            Other Projects & Experiments
            <span className="w-4 h-px bg-white-700" aria-hidden="true" />
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {utilityProjects.map((project) => (
              <article
                key={project.id}
                className="glass-card rounded-xl p-4 flex flex-col gap-3"
                aria-label={project.name}
              >
                {/* Award badge */}
                {project.award && (
                  <div className="flex items-center gap-1.5">
                    <Trophy
                      className="w-3 h-3 text-yellow-400"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-semibold text-yellow-400">
                      {project.award}
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <h4 className="text-sm font-bold text-zinc-200 mb-1">
                    {project.name}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Stack chips */}
                <div
                  className="flex flex-wrap gap-1"
                  aria-label={`Tech stack for ${project.name}`}
                >
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

                {/* GitHub link */}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors min-h-[44px] mt-auto"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  View on GitHub
                  <ExternalLink
                    className="w-2.5 h-2.5 opacity-50"
                    aria-hidden="true"
                  />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
