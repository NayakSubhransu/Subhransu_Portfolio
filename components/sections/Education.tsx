import {
  GraduationCap,
  ExternalLink,
  Award,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { education, certifications } from "@/data/portfolio-data";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Education & Certifications"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-10 sm:mb-14">
          <p className="section-eyebrow mb-3">
            <GraduationCap className="w-3 h-3" aria-hidden="true" />
            Academic
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Education & Certifications
          </h2>
          <p className="mt-2 text-zinc-400 max-w-xl text-sm sm:text-base">
            Institutional foundation from IIT Bhubaneswar, backed by verified
            technical certifications.
          </p>
        </header>

        {/* ── Education Timeline / List ── */}
        <div className="space-y-5 sm:space-y-6 mb-12 sm:mb-16">
          {education.map((edu, idx) => (
            <article
              key={`${edu.institution}-${idx}`}
              className="relative rounded-2xl overflow-hidden border border-emerald-500/15 bg-zinc-900/40 backdrop-blur-sm"
              aria-label={`${edu.degree} from ${edu.institution}`}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-indigo-500/[0.03] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative p-4 sm:p-5 lg:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-xl border border-emerald-500/20 bg-emerald-500/10 self-start"
                    aria-hidden="true"
                  >
                    <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 sm:mb-3">
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-100 leading-tight">
                          {edu.institution}
                        </h3>
                        <p className="text-sm font-semibold text-emerald-400 mt-0.5 leading-snug">
                          {edu.degree}
                          {edu.major ? ` - ${edu.major}` : ""}
                        </p>
                      </div>

                      {/* Meta — row on mobile, column on sm */}
                      <div className="flex flex-row sm:flex-col flex-wrap sm:items-end gap-x-4 gap-y-1 text-xs text-zinc-400 font-mono flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                          <time>{edu.duration}</time>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* CGPA Badge */}
                    {(edu.cgpa || edu.percentage) && (
                      <div className="flex items-center gap-2 mt-2 sm:mt-3">
                        <div
                          className="inline-flex items-baseline gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                          aria-label={`Score: ${edu.cgpa || edu.percentage}`}
                        >
                          <span className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
                            {edu.cgpa || edu.percentage}
                          </span>
                          <span className="text-[10px] sm:text-xs text-emerald-500 font-semibold uppercase tracking-wider">
                            {edu.cgpa ? "CGPA" : "Score"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Certifications Grid ── */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-5 sm:mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-700" aria-hidden="true" />
            Verified Certifications & Training
            <span className="w-4 h-px bg-zinc-700" aria-hidden="true" />
          </h3>

          {/* 1 col → 2 col → 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <article
                key={cert.id}
                className="glass-card rounded-xl p-4 flex flex-col justify-between border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors"
                aria-label={`${cert.name} certification by ${cert.issuer}`}
              >
                <div>
                  <div className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                      aria-hidden="true"
                    >
                      <Award className="w-4 h-4 text-indigo-400" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-200 leading-snug">
                        {cert.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className="text-xs text-zinc-400">{cert.issuer}</span>
                        <span className="text-zinc-600">·</span>
                        <time className="text-xs font-mono text-zinc-500">{cert.year}</time>
                      </div>
                    </div>
                  </div>

                  {cert.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3.5" aria-label="Skills covered">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white/[0.03] border border-[--border-subtle] text-[--text-muted]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors mt-4 pt-3 border-t border-zinc-800/80 min-h-[36px]"
                    aria-label={`Verify ${cert.name} certificate`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>View Certificate</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
