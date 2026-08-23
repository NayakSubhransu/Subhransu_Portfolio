// app/page.tsx
// React Server Component — no "use client" here.
// Client boundaries are scoped to tiny interactive leaves only.

import Navbar from "@/components/ui/Navbar";
import BottomDock from "@/components/ui/BottomDock";
import Footer from "@/components/ui/Footer";

import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Skills from "@/components/sections/Skills";
import Papershelf from "@/components/sections/Papershelf";
import EducationSection from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Main content ── */}
      <main id="main-content" tabIndex={-1}>
        {/* Skip-to-content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-emerald-500 focus:text-zinc-900 focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>

        {/* 1. Hero */}
        <Hero />

        {/* Subtle section divider */}
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* 2. Work Experience & Current Focus */}
        <Experience />

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* 3. Projects Showcase */}
        <Projects />

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* 4. Competitive Programming & Achievements */}
        <Achievements />

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* 5. Stack & Technical Skills */}
        <Skills />

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* 6. Papershelf */}
        <Papershelf />

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* 7. Education & Certifications */}
        <EducationSection />

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* 8. Contact & Socials */}
        <Contact />
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Mobile Bottom Dock (client island) ── */}
      <BottomDock />
    </>
  );
}
