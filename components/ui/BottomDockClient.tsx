"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const BottomDock = dynamic(() => import("@/components/ui/BottomDock"), {
  ssr: false,
  loading: () => null,
});

export default function BottomDockClient() {
  const [mountEl, setMountEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Remove any stale portal from a previous mount
    const existing = document.getElementById("bottom-dock-portal");
    if (existing) existing.remove();

    const el = document.createElement("div");
    el.id = "bottom-dock-portal";
    // No position/transform/filter here — the dock's own `fixed` handles placement
    document.body.appendChild(el);
    setMountEl(el);

    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
    };
  }, []);

  if (!mountEl) return null;

  return createPortal(<BottomDock />, mountEl);
}
