import {
  Briefcase,
  GitBranch,
  ExternalLink,
  Zap,
  MapPin,
  CalendarDays,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { workExperience, currentFocus } from "@/data/portfolio-data";

function BulletText({ text }: { text: string }) {
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

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Work Experience & Current Focus"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-10 sm:mb-14">
          <p className="section-eyebrow mb-3">
            <Briefcase className="w-3 h-3" aria-hidden="true" />
            Career
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Work Experience
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            Industry internships and engineering contributions — with verified
            credentials.
          </p>
        </header>

        {/* On mobile: single column (Current Focus stacks below). On desktop: 2-col. */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-12 items-start">

          {/* ── Left: Timeline ── */}
          <div>
            <div className="relative pl-7 sm:pl-8">
              <div className="timeline-line" aria-hidden="true" />

              <div className="flex flex-col gap-10 sm:gap-12">
                {workExperience.map((job, index) => (
                  <article
                    key={job.id}
                    className="relative"
                    aria-label={`${job.role} at ${job.company}`}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[27px] sm:-left-[29px] top-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-emerald-400 bg-[#09090b] shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      aria-hidden="true"
                    />

                    {/* Card */}
                    <div className="glass-card rounded-2xl p-4 sm:p-5 lg:p-6">
                      {/* Header — stacked on mobile, row on sm+ */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-zinc-100 leading-tight">
                            {job.role}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <a
                              href={job.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors inline-flex items-center gap-1"
                              aria-label={`Visit ${job.company} website`}
                            >
                              {job.company}
                              <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                            </a>
                          </div>
                        </div>

                        {/* Meta row — keep on same line on mobile using flex-wrap */}
                        <div className="flex flex-row sm:flex-col flex-wrap items-center sm:items-end gap-x-3 gap-y-1 text-xs text-zinc-500 font-mono flex-shrink-0">
                          <div className="flex items-center gap-1.5">
                            <CalendarDays className="w-3 h-3" aria-hidden="true" />
                            <time>{job.duration}</time>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" aria-hidden="true" />
                            <span>{job.location}</span>
                          </div>
                          {index === 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bullet Points */}
                      <ul className="flex flex-col gap-2.5 mb-4" role="list">
                        {job.bullets.map((bullet, bi) => (
                          <li key={bi} className="flex items-start gap-2.5">
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                              <BulletText text={bullet} />
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack — allow wrapping */}
                      <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                        {job.stack.map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Verification Link */}
                      {job.verificationUrl && (
                        <div className="mt-3 pt-3 border-t border-white/[0.05]">
                          <a
                            href={job.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors min-h-[36px]"
                            aria-label={`Verify employment at ${job.company}`}
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                            Verified - View Offer/Experience Letter
                            <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Current Focus Card ── */}
          {/* On mobile it appears below the timeline — still makes sense contextually */}
          <aside aria-label="Current engineering focus">
            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-2xl p-px bg-gradient-to-br from-emerald-500/40 via-indigo-500/20 to-transparent">
                <div className="rounded-2xl bg-[#0d1d14]/90 backdrop-blur-sm p-4 sm:p-5 lg:p-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Bot className="w-4 h-4 text-emerald-400" />
                    </span>
                    <div>
                      <p className="text-xs text-emerald-500 font-mono font-semibold uppercase tracking-widest">
                        Currently Working On
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" aria-hidden="true" />
                    <span className="text-xs font-semibold text-emerald-400 font-mono">
                      {currentFocus.status}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-100 mb-3 leading-tight">
                    {currentFocus.title}
                    <span className="block text-sm font-normal text-zinc-500 mt-0.5">
                      AI-Powered Automated Code Review Agent
                    </span>
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 border-l-2 border-emerald-500/30 pl-3">
                    {currentFocus.architecture}
                  </p>

                  <div className="mb-5">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      Active Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5" aria-label="Technologies in use">
                      {currentFocus.stack.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={currentFocus.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-emerald-500/25 bg-emerald-500/8 hover:bg-emerald-500/15 active:bg-emerald-500/25 text-emerald-300 hover:text-emerald-200 text-sm font-semibold transition-all duration-200 min-h-[44px]"
                    aria-label="View GitHub PR Reviewer repository"
                  >
                    <GitBranch className="w-4 h-4" aria-hidden="true" />
                    View Repository
                    <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div
                className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.5] bg-white/[0.02]"
                aria-hidden="true"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Learning & Building: Stateful Agentic workflows with LangGraph and Redis.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
