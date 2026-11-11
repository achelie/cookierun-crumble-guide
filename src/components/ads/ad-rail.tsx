"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "./ad-slot";
import { adWidths, getAdPlacement, type AdPlacement } from "@/lib/ads/config";

export function AdRail({ placement, eligible = true }: { placement: AdPlacement; eligible?: boolean }) {
  if (!getAdPlacement(placement)) return null;
  return <div className="ad-rail"><AdSlot placement={placement} eligible={eligible} sidebar /></div>;
}

export function SecondAd({ mode, inline, rail, eligible = true }: {
  mode: string | undefined;
  inline: AdPlacement;
  rail: AdPlacement;
  eligible?: boolean;
}) {
  const [wide, setWide] = useState<boolean | null>(null);
  useEffect(() => {
    if (mode === "sidebar") setWide(window.innerWidth >= adWidths.rail);
  }, [mode]);

  if (mode === "sidebar" && wide) return <AdRail placement={rail} eligible={eligible} />;
  if (mode === "inline" || (mode === "sidebar" && wide === false)) return <AdSlot placement={inline} eligible={eligible} />;
  return null;
}
