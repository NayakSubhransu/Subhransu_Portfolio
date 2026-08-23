import { Code2, Brain, Server, Layers } from "lucide-react";
import { skillCategories } from "@/data/portfolio-data";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Brain,
  Server,
  Layers,
};

const CATEGORY_STYLES: Record<
  string,
  { accent: string; border: string; bg: string; tag: string }
> = {
  languages: {
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "from-emerald-500/[0.06] to-transparent",
    tag: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
  },
  "ai-ml": {
    accent: "text-violet-400",
    border: "border-violet-500/20",
    bg: "from-violet-500/[0.06] to-transparent",
    tag: "bg-violet-500/10 border-violet-500/20 text-violet-300",
  },
  backend: {
    accent: "text-sky-400",
    border: "border-sky-500/20",
    bg: "from-sky-500/[0.06] to-transparent",
    tag: "bg-sky-500/10 border-sky-500/20 text-sky-300",
  },
  "frontend-devops": {
    accent: "text-amber-400",
    border: "border-amber-500/20",
    bg: "from-amber-500/[0.06] to-transparent",
    tag: "bg-amber-500/10 border-amber-500/20 text-amber-300",
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Technical Skills"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-14">
          <p className="section-eyebrow mb-3">
            <Layers className="w-3 h-3" aria-hidden="true" />
            Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Stack & Technical Skills
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            Tools, frameworks, and systems I work with across the full engineering stack.
          </p>
        </header>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {skillCategories.map((category) => {
            const Icon = ICON_MAP[category.icon] ?? Layers;
            const style = CATEGORY_STYLES[category.id] ?? CATEGORY_STYLES["languages"];

            return (
              <article
                key={category.id}
                className={`relative overflow-hidden rounded-2xl border ${style.border} glass-card p-5 sm:p-6`}
                aria-label={`${category.title} skills`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b ${style.bg} pointer-events-none`}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-lg border ${style.border} bg-white/[0.03]`}
                      aria-hidden="true"
                    >
                      <Icon className={`w-4 h-4 ${style.accent}`} />
                    </span>
                    <h3 className={`text-sm font-bold ${style.accent}`}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Tags */}
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label={`${category.title} technologies`}
                  >
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        role="listitem"
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${style.tag} font-mono`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom: Open Source / Community Note */}
        <div
          className="mt-8 p-4 sm:p-5 rounded-xl border border-white/[0.05] bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center gap-3"
          aria-hidden="true"
        >
          <Code2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <p className="text-xs text-zinc-500 leading-relaxed">
            Most comfortable with{" "}
            <span className="text-zinc-300 font-medium">
              C++ for competitive programming
            </span>
            ,{" "}
            <span className="text-zinc-300 font-medium">
              Python for AI/ML pipelines
            </span>
            , and{" "}
            <span className="text-zinc-300 font-medium">
              TypeScript for full-stack systems
            </span>
            . Continuously exploring new distributed systems research and GenAI tooling.
          </p>
        </div>
      </div>
    </section>
  );
}
