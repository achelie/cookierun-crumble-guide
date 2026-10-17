"use client";

import { localeConfig } from "@/i18n/config";
import { useLocale } from "@/i18n/provider";

const guideLabels = { "zh-Hant": "玩家攻略", ja: "攻略ガイド", ko: "공략 가이드", th: "คู่มือผู้เล่น" };
export function GameTitle() {
  const locale = useLocale();
  if (locale === "en") return <h1><span>CookieRun:</span><span><strong>Crumble Guide</strong></span></h1>;
  return <h1><span>{localeConfig[locale].gameName}</span><span><strong>{guideLabels[locale]}</strong></span></h1>;
}
