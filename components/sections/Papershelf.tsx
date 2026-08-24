import { BookOpen } from "lucide-react";
import { papers } from "@/data/portfolio-data";
import PaperCard from "@/components/ui/PaperCard";

export default function Papershelf() {
  return (
    <section
      id="papershelf"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Papershelf - Research Reading List"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-14">
          <p className="section-eyebrow mb-3">
            <BookOpen className="w-3 h-3" aria-hidden="true" />
            Research &amp; Curated Reading Log
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            The Papershelf
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            A curated collection of landmark research papers I have studied and
            deconstructed to master systems internals, trace architectural
            evolution, and ground my engineering in first principles.
          </p>

          {/* Interactive UX Microcopy */}
          <div className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-400 backdrop-blur-sm">
            <span className="text-zinc-500">💡</span>
            <span>
              Click any paper for key architectural takeaways and TL;DRs
            </span>
          </div>
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
        <p className="mt-8 text-center text-s text-white-600 font-mono">
          All whitepapers have been independently read, annotated, and leveraged
          to solve practical engineering challenges.
        </p>
      </div>
    </section>
  );
}
