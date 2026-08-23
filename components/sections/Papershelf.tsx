import { BookOpen } from "lucide-react";
import { papers } from "@/data/portfolio-data";
import PaperCard from "@/components/ui/PaperCard";

export default function Papershelf() {
  return (
    <section
      id="papershelf"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Papershelf — Research Reading List"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-14">
          <p className="section-eyebrow mb-3">
            <BookOpen className="w-3 h-3" aria-hidden="true" />
            Research
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Papershelf
          </h2>
          <p className="mt-2 text-zinc-500 max-w-xl text-sm sm:text-base">
            Foundational AI, LLM, and Distributed Systems papers I&apos;ve studied and applied to real systems.
            Tap any card to reveal the engineering TL;DR.
          </p>
        </header>

        {/* Paper Cards Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Research papers"
        >
          {papers.map((paper) => (
            <div key={paper.id} role="listitem">
              <PaperCard paper={paper} />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-center text-xs text-zinc-600 font-mono">
          All papers have been personally read, annotated, and applied in real engineering projects.
        </p>
      </div>
    </section>
  );
}
