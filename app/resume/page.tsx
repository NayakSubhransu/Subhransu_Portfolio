import type { Metadata } from "next";
import DocumentViewer from "@/components/ui/DocumentViewer";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download the resume of Subhransu Priyaranjan Nayak.",
  openGraph: {
    title: "Resume — Subhransu Priyaranjan Nayak",
    description: "Software Developer & AI Engineer · IIT Bhubaneswar",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ResumePage() {
  return (
    <DocumentViewer
      title="Resume"
      subtitle="Subhransu Priyaranjan Nayak"
      filePath="/resume.pdf"
      downloadName="Subhransu_Nayak_Resume.pdf"
      backHref="/"
      accentColor="emerald"
    />
  );
}
