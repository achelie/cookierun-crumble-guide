"use client";

import { createContext, useContext, type ReactNode } from "react";
import { adOptions } from "@/lib/ads/config";
import { AdSlot } from "./ad-slot";
import { SecondAd } from "./ad-rail";

type SectionIds = { answer?: string; middle?: string };
const GuideAdContext = createContext<SectionIds>({});

export function GuideAds({ sections, children }: { sections: SectionIds; children: ReactNode }) {
  return <GuideAdContext.Provider value={sections}>{children}</GuideAdContext.Provider>;
}

export function GuideSectionAd({ id }: { id: string }) {
  const { answer, middle } = useContext(GuideAdContext);
  if (id === answer) return <AdSlot placement="guide-after-answer" />;
  return id === middle ? <SecondAd mode={adOptions.guideSecond} inline="guide-mid-article" rail="guide-sidebar" /> : null;
}
