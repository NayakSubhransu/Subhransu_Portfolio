import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://subhransu.dev"),
  title: {
    default: "Subhransu Priyaranjan Nayak - Software Engineer & AI Developer",
    template: "%s | Subhransu Nayak",
  },
  description:
    "Software Engineer & AI Developer specializing in High-Throughput Distributed Systems, Scalable Data Pipelines, and Agentic AI Architectures. IIT Bhubaneswar. LeetCode Peak 1934 (Top 4%).",
  keywords: [
    "Software Engineer",
    "AI Developer",
    "Distributed Systems",
    "Backend Engineer",
    "LangGraph",
    "RAG",
    "FastAPI",
    "Next.js",
    "IIT Bhubaneswar",
    "Subhransu Nayak",
  ],
  authors: [{ name: "Subhransu Priyaranjan Nayak", url: "https://github.com/NayakSubhransu" }],
  creator: "Subhransu Priyaranjan Nayak",
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "https://subhransu.dev",
    siteName: "Subhransu Nayak Portfolio",
    title: "Subhransu Priyaranjan Nayak - Software Engineer & AI Developer",
    description:
      "Backend · Distributed Systems · GenAI. Building DynamoCore, Enterprise RAG Orchestrator, and more.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Subhransu Priyaranjan Nayak - Software Engineer & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhransu Priyaranjan Nayak - Software Engineer & AI Developer",
    description:
      "Backend · Distributed Systems · GenAI. IIT Bhubaneswar. LeetCode Top 4%.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://subhransu.dev/#person",
      name: "Subhransu Priyaranjan Nayak",
      jobTitle: "Software Engineer & AI Developer",
      description:
        "Software Engineer & AI Developer specializing in High-Throughput Distributed Systems, Scalable Data Pipelines, and Agentic AI Architectures.",
      url: "https://subhransu.dev",
      email: "subhransu.nayak.connect@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Indian Institute of Technology Bhubaneswar",
        url: "https://iitbbs.ac.in",
      },
      knowsAbout: [
        "Distributed Systems",
        "Backend Engineering",
        "AI Engineering",
        "LangGraph",
        "RAG Pipelines",
        "Data Engineering",
        "Competitive Programming",
        "Next.js",
        "FastAPI",
      ],
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
    {
      "@type": "EducationalOccupationalCredential",
      name: "Integrated B.Tech in Mechanical System Design Engineering",
      educationalLevel: "Bachelor's Degree",
      credentialCategory: "degree",
      recognizedBy: {
        "@type": "EducationalOrganization",
        name: "Indian Institute of Technology Bhubaneswar",
      },
    },
    {
      "@type": "SoftwareSourceCode",
      name: "DynamoCore - Highly Available Key-Value Storage",
      description:
        "End-to-End implementation of the Amazon Dynamo (2007) distributed storage paper.",
      codeRepository: "https://github.com/NayakSubhransu/DynamoCore",
      programmingLanguage: "Java",
      author: { "@id": "https://subhransu.dev/#person" },
    },
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://github.com" />
      </head>
      <body
        className="bg-[#09090b] text-zinc-100 antialiased font-sans selection:bg-emerald-500/30 selection:text-emerald-200"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
