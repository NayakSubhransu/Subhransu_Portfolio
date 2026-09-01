// app/page.tsx — React Server Component

import Navbar          from "@/components/ui/Navbar";
import BottomDockClient from "@/components/ui/BottomDockClient";
import Footer          from "@/components/ui/Footer";

import Hero             from "@/components/sections/Hero";
import Experience       from "@/components/sections/Experience";
import Projects         from "@/components/sections/Projects";
import Achievements     from "@/components/sections/Achievements";
import Skills           from "@/components/sections/Skills";
import Papershelf       from "@/components/sections/Papershelf";
import EducationSection from "@/components/sections/Education";
import Contact          from "@/components/sections/Contact";

const Divider = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
  </div>
);

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-emerald-500 focus:text-zinc-900 focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>

        <Hero />
        <Divider />
        <Achievements />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Skills />
        <Divider />
        <Papershelf />
        <Divider />
        <EducationSection />
        <Divider />
        <Contact />
      </main>

      <Footer />
      <BottomDockClient />
    </>
  );
}
