import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cookieById } from "@/data/cookies";
import { guideCategories, guides } from "@/data/guides";

const gearRuneGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-gear-sugar-rune-stats-guide.mdx", import.meta.url),
  "utf8",
);

describe("guide registry", () => {
  it("keeps slugs and table of contents anchors unique", () => {
    expect(new Set(guides.map((guide) => guide.slug)).size).toBe(guides.length);
    guides.forEach((guide) => {
      expect(new Set(guide.toc.map((item) => item.id)).size).toBe(guide.toc.length);
    });
  });

  it("contains complete metadata and valid category references", () => {
    const categorySlugs = new Set(guideCategories.map((category) => category.slug));
    guides.forEach((guide) => {
      expect(guide.title).toBeTruthy();
      expect(guide.seoTitle).toContain("CookieRun: Crumble");
      expect(guide.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(guide.seoDescription.length).toBeLessThanOrEqual(165);
      expect(guide.excerpt).toBeTruthy();
      expect(categorySlugs.has(guide.category)).toBe(true);
      expect(Date.parse(guide.publishedAt)).not.toBeNaN();
      expect(Date.parse(guide.updatedAt)).not.toBeNaN();
      expect(guide.readingMinutes).toBeGreaterThan(0);
      expect(guide.tags.length).toBeGreaterThan(0);
      expect(guide.faq.length).toBeGreaterThan(0);
    });
  });

  it("uses three real local Cookie records for every cover", () => {
    guides.forEach((guide) => {
      expect(guide.coverCookieIds).toHaveLength(3);
      guide.coverCookieIds.forEach((id) => expect(cookieById.has(id)).toBe(true));
    });
  });

  it("publishes the gear guide at the top and keeps the old test article removed", () => {
    expect(guides[0]?.slug).toBe("cookie-run-crumble-gear-sugar-rune-stats-guide");
    expect(guides.some((guide) => guide.slug === "build-your-first-team-without-wasting-upgrades")).toBe(false);
  });

  it("keeps the gear guide long-form, original, and free of production notes", () => {
    const prose = gearRuneGuideSource
      .replace(/^import .*$/gm, "")
      .replace(/<[^>]+>/g, "");
    const wordCount = prose.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g)?.length ?? 0;

    expect(wordCount).toBeGreaterThanOrEqual(2_000);
    expect(wordCount).toBeLessThanOrEqual(2_500);
    expect(prose).not.toMatch(/\b(?:youtube|video|subtitle|source)\b/i);
    expect(prose).not.toMatch(/[—–]/);
  });
});
