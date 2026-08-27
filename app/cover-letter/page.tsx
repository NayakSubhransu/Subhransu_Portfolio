import type { Metadata } from "next";
import DocumentViewer from "@/components/ui/DocumentViewer";

export const metadata: Metadata = {
  title: "Cover Letter",
  description: "View and download the cover letter of Subhransu Priyaranjan Nayak.",
  openGraph: {
    title: "Cover Letter — Subhransu Priyaranjan Nayak",
    description: "Software Developer & AI Engineer · IIT Bhubaneswar",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function CoverLetterPage() {
  return (
    <DocumentViewer
      title="Cover Letter"
      subtitle="Subhransu Priyaranjan Nayak"
      filePath="/cover-letter.pdf"
      downloadName="Subhransu_Nayak_Cover_Letter.pdf"
      backHref="/"
      accentColor="indigo"
    />
  );
}
