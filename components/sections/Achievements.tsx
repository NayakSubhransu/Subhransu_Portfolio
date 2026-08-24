import {
  Trophy,
  ExternalLink,
  Medal,
  Target,
  Star,
  Flame,
} from "lucide-react";
import { cpPlatforms, cpAchievements } from "@/data/portfolio-data";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Competitive Programming & Achievements"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-14">
          <p className="section-eyebrow mb-3">
            <Trophy className="w-3 h-3" aria-hidden="true" />
            Competitive Programming
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Algorithmic Achievements
          </h2>
          <p className="mt-2 text-white-500 max-w-xl text-sm sm:text-base">
            1,500+ problems solved across major platforms. Consistent
            performance in algorithmic contests.
          </p>
        </header>

        {/* ── Platform Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {cpPlatforms.map((platform) => (
            <article
              key={platform.id}
              className="glass-card rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden"
              aria-label={`${platform.name} profile`}
            >
              <div className="card-accent-line" aria-hidden="true" />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[--text-primary] tracking-[-0.01em]">
                    {platform.name}
                  </h3>
                  <p
                    className={`text-xs font-mono mt-0.5 ${platform.colorClass}`}
                  >
                    @{platform.handle}
                  </p>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold border flex-shrink-0"
                  style={{
                    color: platform.accentColor,
                    borderColor: `${platform.accentColor}30`,
                    backgroundColor: `${platform.accentColor}10`,
                  }}
                >
                  {platform.badgeLabel}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.025] border border-[--border-subtle]">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-extrabold font-mono tabular-nums"
                    style={{ color: platform.accentColor }}
                  >
                    {platform.peakRating}
                  </span>
                  <span className="text-xs text-[--text-muted]">
                    Peak Rating
                  </span>
                </div>
                <p className="text-xs font-semibold text-[--text-secondary] mt-0.5">
                  {platform.ratingLabel}
                </p>
              </div>

              {platform.problemsSolved !== undefined && (
                <div className="flex items-center gap-2">
                  <Target
                    className="w-3.5 h-3.5 text-[--text-faint]"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-[--text-muted]">
                    <strong className="text-[--text-secondary] font-semibold">
                      {platform.problemsSolved}+
                    </strong>{" "}
                    problems solved
                  </span>
                </div>
              )}

              <a
                href={platform.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-[--border-medium] bg-white/[0.025] hover:bg-white/[0.06] text-[--text-secondary] hover:text-[--text-primary] text-xs font-semibold transition-all duration-200 min-h-[44px] mt-auto"
              >
                View Profile
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        {/* ── Hackathon & Contest Honors ── */}

        <div>
          <h3 className="text-s font-mono font-semibold uppercase tracking-widest text-white-500 mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-white-700" aria-hidden="true" />
            Hackathon Honors
            <span className="w-4 h-px bg-white-700" aria-hidden="true" />
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cpAchievements.map((ach) => (
              <div
                key={ach.id}
                className="glass-card rounded-xl p-4 flex flex-col justify-between border border-zinc-800 bg-zinc-900/40"
                role="article"
                aria-label={ach.title}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Trophy
                      className="w-4 h-4 text-yellow-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <h4 className="text-sm font-bold text-zinc-200 leading-tight">
                      {ach.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                    {ach.description}
                  </p>
                </div>

                {/* Dynamic Action Link: Certificate OR GitHub Repo */}
                <div className="mt-4">
                  {ach.certUrl && (
                    <a
                      href={ach.certUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                      aria-label={`View certificate for ${ach.title}`}
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}

                  {ach.githubUrl && (
                    <a
                      href={ach.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors min-h-[36px]"
                    >
                      <span>View Repository</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
