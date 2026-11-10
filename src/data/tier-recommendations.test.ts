import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { guides } from "./guides";
import { teamCategories } from "./teams";
import { tierList } from "./tier-list";
import { recommendationRanks, recommendationText, tierRecommendations } from "./tier-recommendations";

describe("tier ranking recommendations", () => {
  it("covers exactly the S and A ranks in every site language", () => {
    expect(Object.keys(tierRecommendations).sort()).toEqual(recommendationRanks.flatMap((rank) => tierList[rank]).sort());
    for (const { reason } of Object.values(tierRecommendations)) {
      const copy = locales.map((locale) => recommendationText(reason, locale));
      expect(copy.every((text) => text.trim().length > 0)).toBe(true);
      expect(new Set(copy).size).toBe(locales.length);
    }
  });

  it("links each reason to a published guide or team category", () => {
    const sources = new Set([
      ...guides.map(({ slug }) => `/guides/${slug}/`),
      ...teamCategories.map(({ slug }) => `/teams/?category=${slug}`),
    ]);
    for (const { source } of Object.values(tierRecommendations)) {
      expect(sources).toContain(source);
    }
  });
});
