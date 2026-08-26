import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cookieById } from "@/data/cookies";
import { guideCategories, guides } from "@/data/guides";

const gearRuneGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-gear-sugar-rune-stats-guide.mdx", import.meta.url),
  "utf8",
);
const coolMintGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-cool-mint-cookie-build-team.mdx", import.meta.url),
  "utf8",
);
const ryeGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-rye-cookie-build-team.mdx", import.meta.url),
  "utf8",
);
const accuracyFocusGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-accuracy-focus-guide.mdx", import.meta.url),
  "utf8",
);
const powerGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-power-guide-stage-damage.mdx", import.meta.url),
  "utf8",
);

function guideProse(source: string) {
  return source
    .replace(/^import .*$/gm, "")
    .replace(/<[^>]+>/g, "");
}

function expectPublishableGuide(source: string) {
  const prose = guideProse(source);
  const wordCount = prose.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g)?.length ?? 0;

  expect(wordCount).toBeGreaterThanOrEqual(1_000);
  expect(wordCount).toBeLessThanOrEqual(1_500);
  expect(prose).not.toMatch(/\b(?:youtube|video|subtitle|source)\b/i);
  expect(prose).not.toMatch(/[—–]/);
}

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
      expect(guide.relatedGuideSlugs).toHaveLength(3);
      expect(new Set(guide.relatedGuideSlugs).size).toBe(3);
      expect(guide.relatedGuideSlugs).not.toContain(guide.slug);
      guide.relatedGuideSlugs.forEach((slug) => {
        expect(guides.some((candidate) => candidate.slug === slug)).toBe(true);
      });
    });
  });

  it("uses three real local Cookie records for every cover", () => {
    guides.forEach((guide) => {
      expect(guide.coverCookieIds).toHaveLength(3);
      guide.coverCookieIds.forEach((id) => expect(cookieById.has(id)).toBe(true));
    });
  });

  it("publishes the newest guide at the top and keeps the old test article removed", () => {
    expect(guides[0]?.slug).toBe("cookie-run-crumble-power-guide-stage-damage");
    expect(guides.some((guide) => guide.slug === "build-your-first-team-without-wasting-upgrades")).toBe(false);
  });

  it("keeps the Power guide concise, original, and free of production notes", () => {
    expectPublishableGuide(powerGuideSource);
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-power-guide-stage-damage");
    const sectionIds = [...powerGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(powerGuideSource).toContain("[recommended Teams](/teams/)");
    expect(powerGuideSource).toContain("[Tier List](/tier-list/)");
  });

  it("keeps the gear guide concise, original, and free of production notes", () => {
    expectPublishableGuide(gearRuneGuideSource);
  });

  it("keeps the Cool Mint guide concise, original, and free of production notes", () => {
    expectPublishableGuide(coolMintGuideSource);
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-cool-mint-cookie-build-team");
    const sectionIds = [...coolMintGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
  });

  it("keeps the Rye guide concise, original, and free of production notes", () => {
    expectPublishableGuide(ryeGuideSource);
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-rye-cookie-build-team");
    const sectionIds = [...ryeGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
  });

  it("keeps the Accuracy and Focus guide concise, original, and free of production notes", () => {
    expectPublishableGuide(accuracyFocusGuideSource);
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-accuracy-focus-guide");
    const sectionIds = [...accuracyFocusGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
  });
});
