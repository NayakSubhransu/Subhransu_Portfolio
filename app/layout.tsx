import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import ThreeD from "@/components/ui/ThreeD";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import GlobalNetwork from "@/components/ui/GlobalNetwork";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://subhransu.dev"),
  title: {
    default: "Subhransu Priyaranjan Nayak - Software Developer & AI Engineer",
    template: "%s | Subhransu Nayak",
  },
  description:
    "Software Developer & AI Engineer specializing in High-Throughput Distributed Systems, Scalable Data Pipelines, and Agentic AI Architectures. IIT Bhubaneswar. LeetCode Peak 1934 (Top 4%).",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: [
    "Software Engineer","AI Developer","Distributed Systems","Backend Engineer",
    "LangGraph","RAG","FastAPI","Next.js","IIT Bhubaneswar","Subhransu Nayak",
  ],
  authors: [{ name: "Subhransu Priyaranjan Nayak", url: "https://github.com/NayakSubhransu" }],
  creator: "Subhransu Priyaranjan Nayak",
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "https://subhransu.dev",
    siteName: "Subhransu Nayak Portfolio",
    title: "Subhransu Priyaranjan Nayak - Software Developer & AI Engineer",
    description: "Distributed Systems || Backend Development || Generative AI || Competitive Programming",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Subhransu Priyaranjan Nayak" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhransu Priyaranjan Nayak - Software Developer & AI Engineer",
    description: "Distributed Systems || Backend Development || Generative AI || Competitive Programming",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://subhransu.dev/#person",
      name: "Subhransu Priyaranjan Nayak",
      jobTitle: "Software Developer & AI Engineer",
      description: "Software Developer & AI Engineer specializing in High-Throughput Distributed Systems, Scalable Data Pipelines, and Agentic AI Architectures.",
      url: "https://subhransu.dev",
      email: "subhransu.nayak.connect@gmail.com",
      address: { "@type": "PostalAddress", addressRegion: "Odisha", addressCountry: "IN" },
      alumniOf: { "@type": "EducationalOrganization", name: "Indian Institute of Technology Bhubaneswar", url: "https://iitbbs.ac.in" },
      knowsAbout: ["Distributed Systems","Backend Engineering","AI Engineering","LangGraph","RAG Pipelines","Data Engineering","Competitive Programming","Next.js","FastAPI"],
      sameAs: [
        "https://github.com/NayakSubhransu",
        "https://www.linkedin.com/in/subhransu-p-nayak/",
        "https://leetcode.com/u/Subhransu_Nayak_07/",
        "https://www.codechef.com/users/quantum_07",
        "https://codeforces.com/profile/Quantum-Questor",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://subhransu.dev/#profilepage",
      name: "Subhransu Priyaranjan Nayak - Portfolio",
      url: "https://subhransu.dev",
      mainEntity: { "@id": "https://subhransu.dev/#person" },
    },
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="preload" as="script" href="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/resume.pdf"       crossOrigin="anonymous" fetchPriority="low" />
        <link rel="preload" as="fetch" href="/cover-letter.pdf" crossOrigin="anonymous" fetchPriority="low" />
      </head>
      <body
        className="bg-[#09090b] text-zinc-100 antialiased font-sans selection:bg-emerald-500/30 selection:text-emerald-200"
        suppressHydrationWarning
      >
        {/* ── Layer 0: Global network — fixed, behind everything ── */}
        <GlobalNetwork />

        {/* ── Layer 1: Floating particles + ambient glows + spotlight ── */}
        <ThreeD />

        {/* ── Scroll-triggered .in-view toggler ── */}
        <ScrollAnimations />

        {/* ── Page content (z-index ≥ 1 via globals.css) ── */}
        {children}
      </body>
    </html>
  );
}
