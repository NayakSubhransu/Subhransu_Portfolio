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
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Education & Certifications"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-14">
          <p className="section-eyebrow mb-3 flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            Academic
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Education & Certifications
          </h2>
          <p className="mt-2 text-zinc-400 max-w-xl text-sm sm:text-base">
            Institutional foundation from IIT Bhubaneswar, backed by verified
            technical certifications.
          </p>
        </header>

        {/* ── Education Timeline / List ── */}
        <div className="space-y-6 mb-16">
          {education.map((edu, idx) => (
            <article
              key={`${edu.institution}-${idx}`}
              className="relative rounded-2xl overflow-hidden border border-emerald-500/15 bg-zinc-900/40 backdrop-blur-sm"
              aria-label={`${edu.degree} from ${edu.institution}`}
            >
              {/* Subtle gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-indigo-500/[0.03] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-emerald-500/20 bg-emerald-500/10"
                    aria-hidden="true"
                  >
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header: Degree & Duration */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-100">
                          {edu.institution}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-emerald-400 mt-0.5">
                          {edu.degree}
                          {edu.major ? ` - ${edu.major}` : ""}
                        </p>
                      </div>

                      <div className="flex flex-wrap sm:flex-col sm:items-end gap-x-4 gap-y-1 text-xs text-zinc-400 font-mono flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays
                            className="w-3.5 h-3.5 text-zinc-500"
                            aria-hidden="true"
                          />
                          <time>{edu.duration}</time>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin
                            className="w-3.5 h-3.5 text-zinc-500"
                            aria-hidden="true"
                          />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* CGPA / Percentage Badge */}
                    {(edu.cgpa || edu.percentage) && (
                      <div className="flex items-center gap-2 mt-3">
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
          <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-700" aria-hidden="true" />
            Verified Certifications & Training
            <span className="w-4 h-px bg-zinc-700" aria-hidden="true" />
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs text-zinc-400">
                          {cert.issuer}
                        </span>
                        <span className="text-zinc-600">·</span>
                        <time className="text-xs font-mono text-zinc-500">
                          {cert.year}
                        </time>
                      </div>
                    </div>
                  </div>

                
                  {/* Skills covered */}
                  {cert.skills?.length > 0 && (
                    <div
                      className="flex flex-wrap gap-1.5 mt-3.5"
                      aria-label="Skills covered"
                    >
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

                {/* Verify Link */}
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors mt-4 pt-3 border-t border-zinc-800/80"
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



// import {
//   GraduationCap,
//   ExternalLink,
//   Award,
//   BookOpen,
//   CalendarDays,
//   MapPin,
// } from "lucide-react";
// import { education, certifications } from "@/data/portfolio-data";

// export default function EducationSection() {
//   return (
//     <section
//       id="education"
//       className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
//       aria-label="Education & Certifications"
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* Section Header */}
//         <header className="mb-14">
//           <p className="section-eyebrow mb-3">
//             <GraduationCap className="w-3 h-3" aria-hidden="true" />
//             Academic
//           </p>
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
//             Education & Certifications
//           </h2>
//           <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
//             Institutional foundation from IIT Bhubaneswar, backed by verified
//             technical certifications.
//           </p>
//         </header>

//         {/* ── Education Card ── */}
//         <div
//           className="relative mb-12 rounded-2xl overflow-hidden border border-emerald-500/15"
//           role="article"
//           aria-label={`${education.degree} from ${education.institution}`}
//         >
//           {/* Background gradient */}
//           <div
//             className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-indigo-500/[0.03] pointer-events-none"
//             aria-hidden="true"
//           />

//           <div className="relative p-5 sm:p-8">
//             <div className="flex flex-col lg:flex-row lg:items-start gap-6">
//               {/* Logo placeholder */}
//               <div
//                 className="flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-emerald-500/20 bg-emerald-500/10"
//                 aria-hidden="true"
//               >
//                 <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
//               </div>

//               <div className="flex-1">
//                 {/* Institution */}
//                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
//                   <div>
//                     <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
//                       {education.institution}
//                     </h3>
//                     <p className="text-base font-semibold text-emerald-400 mt-1">
//                       {education.degree} - {education.major}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-1 text-xs text-zinc-500 font-mono flex-shrink-0">
//                     <div className="flex items-center gap-1.5">
//                       <CalendarDays className="w-3 h-3" aria-hidden="true" />
//                       <time>{education.duration}</time>
//                     </div>
//                     <div className="flex items-center gap-1.5">
//                       <MapPin className="w-3 h-3" aria-hidden="true" />
//                       <span>{education.location}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* CGPA */}
//                 <div className="flex items-center gap-3 mb-5">
//                   <div
//                     className="flex items-baseline gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
//                     aria-label={`CGPA: ${education.cgpa}`}
//                   >
//                     <span className="text-xl font-extrabold text-emerald-400 font-mono">
//                       {education.cgpa}
//                     </span>
//                     <span className="text-xs text-emerald-600 font-semibold">
//                       CGPA
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Certifications Grid ── */}
//         <div>
//           <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
//             <span className="w-4 h-px bg-zinc-700" aria-hidden="true" />
//             Verified Certifications & Training
//             <span className="w-4 h-px bg-zinc-700" aria-hidden="true" />
//           </h3>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {certifications.map((cert) => (
//               <article
//                 key={cert.id}
//                 className="glass-card rounded-xl p-4 flex flex-col gap-3"
//                 aria-label={`${cert.name} certification by ${cert.issuer}`}
//               >
//                 <div className="flex items-start gap-2.5">
//                   <span
//                     className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
//                     aria-hidden="true"
//                   >
//                     <Award className="w-4 h-4 text-indigo-400" />
//                   </span>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="text-sm font-bold text-zinc-200 leading-tight">
//                       {cert.name}
//                     </h4>
//                     <div className="flex items-center gap-2 mt-0.5">
//                       <span className="text-xs text-zinc-500">
//                         {cert.issuer}
//                       </span>
//                       <span className="text-zinc-700">·</span>
//                       <time className="text-xs font-mono text-zinc-600">
//                         {cert.year}
//                       </time>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Skills covered */}
//                 <div
//                   className="flex flex-wrap gap-1"
//                   aria-label="Skills covered"
//                 >
//                   {cert.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-800 border border-zinc-700 text-zinc-500 font-mono"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Verify Link */}
//                 <a
//                   href={cert.verifyUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 transition-colors mt-auto min-h-[44px]"
//                   aria-label={`Verify ${cert.name} certificate`}
//                 >
//                   <ExternalLink className="w-3 h-3" aria-hidden="true" />
//                   View Certificate
//                 </a>
//               </article>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
