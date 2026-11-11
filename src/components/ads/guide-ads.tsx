"use client";

import { createContext, useContext, type ReactNode } from "react";
import { guideSecondAdEnabled } from "@/lib/ads/config";
import { AdSlot } from "./ad-slot";

type SectionIds = { answer?: string; middle?: string };
const GuideAdContext = createContext<SectionIds>({});

export function GuideAds({ sections, children }: { sections: SectionIds; children: ReactNode }) {
  return <GuideAdContext.Provider value={sections}>{children}</GuideAdContext.Provider>;
}

export function GuideSectionAd({ id }: { id: string }) {
  const { answer, middle } = useContext(GuideAdContext);
  if (id === answer) return <AdSlot placement="guide-after-answer" />;
  return guideSecondAdEnabled && id === middle ? <AdSlot placement="guide-mid-article" /> : null;
}
