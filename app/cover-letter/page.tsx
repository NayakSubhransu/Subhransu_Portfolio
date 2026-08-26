import type { Metadata } from "next";
import DocumentViewer from "@/components/ui/DocumentViewer";

export const metadata: Metadata = {
  title: "Cover Letter",
  description:
    "View and download the cover letter of Subhransu Priyaranjan Nayak — Software Developer & AI Engineer.",
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
