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
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            1,500+ problems solved across major platforms. Consistent performance in algorithmic contests.
          </p>
        </header>

        {/* ── Platform Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {cpPlatforms.map((platform) => (
            <article
              key={platform.id}
              className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
              aria-label={`${platform.name} competitive programming profile`}
            >
              {/* Platform Name & Handle */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-zinc-100">
                    {platform.name}
                  </h3>
                  <p
                    className={`text-xs font-mono mt-0.5 ${platform.colorClass}`}
                  >
                    @{platform.handle}
                  </p>
                </div>

                {/* Badge pill */}
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold border"
                  style={{
                    color: platform.accentColor,
                    borderColor: `${platform.accentColor}30`,
                    backgroundColor: `${platform.accentColor}10`,
                  }}
                  aria-label={`${platform.badgeLabel} rating badge`}
                >
                  {platform.badgeLabel}
                </span>
              </div>

              {/* Rating display */}
              <div
                className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                aria-label={`Peak rating: ${platform.peakRating}`}
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-extrabold font-mono tabular-nums"
                    style={{ color: platform.accentColor }}
                  >
                    {platform.peakRating}
                  </span>
                  <span className="text-xs text-zinc-500">Peak Rating</span>
                </div>
                <p className="text-xs font-semibold text-zinc-400">
                  {platform.ratingLabel}
                </p>
              </div>

              {/* Problems Solved (if available) */}
              {platform.problemsSolved !== undefined && (
                <div
                  className="flex items-center gap-2"
                  aria-label={`Problems solved: ${platform.problemsSolved}+`}
                >
                  <Target
                    className="w-3.5 h-3.5 text-zinc-600"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-zinc-500">
                    <strong className="text-zinc-300 font-semibold">
                      {platform.problemsSolved}+
                    </strong>{" "}
                    problems solved
                  </span>
                </div>
              )}

              {/* Visit Profile */}
              <a
                href={platform.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] text-zinc-400 hover:text-zinc-200 text-xs font-semibold transition-all duration-200 min-h-[44px] mt-auto"
                aria-label={`Visit ${platform.name} profile for ${platform.handle}`}
              >
                View Profile
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        {/* ── Aggregate Stats Banner ── */}
        {/* <div
          className="mb-12 rounded-2xl border border-emerald-500/15 bg-gradient-to-r from-emerald-500/[0.05] to-indigo-500/[0.05] p-5 sm:p-6"
          aria-label="Combined competitive programming statistics"
        >
          <div className="flex flex-wrap justify-around gap-6">
            {[
              {
                icon: Flame,
                label: "Total Problems Solved",
                value: "1,500+",
                color: "text-orange-400",
              },
              {
                icon: Star,
                label: "LeetCode Peak",
                value: "#1934 · Top 4%",
                color: "text-yellow-400",
              },
              {
                icon: Medal,
                label: "CodeChef",
                value: "3★ · 1682",
                color: "text-amber-400",
              },
              {
                icon: Target,
                label: "Codeforces",
                value: "Pupil · 1345",
                color: "text-sky-400",
              },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center">
                <Icon
                  className={`w-5 h-5 ${color} mb-1`}
                  aria-hidden="true"
                />
                <span className="text-lg sm:text-2xl font-extrabold text-zinc-100 font-mono">
                  {value}
                </span>
                <span className="text-xs text-zinc-500">{label}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* ── Hackathon & Contest Honors ── */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-500 mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-700" aria-hidden="true" />
            Hackathon & Contest Honors
            <span className="w-4 h-px bg-zinc-700" aria-hidden="true" />
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cpAchievements.map((ach) => (
              <div
                key={ach.id}
                className="glass-card rounded-xl p-4 flex flex-col gap-2"
                role="article"
                aria-label={ach.title}
              >
                <div className="flex items-center gap-2">
                  <Trophy
                    className="w-4 h-4 text-yellow-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <h4 className="text-sm font-bold text-zinc-200 leading-tight">
                    {ach.title}
                  </h4>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {ach.description}
                </p>
                {ach.certUrl && (
                  <a
                    href={ach.certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-500 hover:text-emerald-400 transition-colors mt-1 min-h-[44px]"
                    aria-label={`View certificate for ${ach.title}`}
                  >
                    View Certificate
                    <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
