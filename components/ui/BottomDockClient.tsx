"use client";

import dynamic from "next/dynamic";

const BottomDock = dynamic(() => import("@/components/ui/BottomDock"), {
  ssr: false,
});

export default function BottomDockClient() {
  return <BottomDock />;
}
