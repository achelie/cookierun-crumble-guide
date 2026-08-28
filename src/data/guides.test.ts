import { existsSync, readFileSync } from "node:fs";
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
const hiddenMechanicsGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-tips-hidden-mechanics.mdx", import.meta.url),
  "utf8",
);
const resourceGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-resource-guide-account-traps.mdx", import.meta.url),
  "utf8",
);
const pinotNoirGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-pinot-noir-cookie-build.mdx", import.meta.url),
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
  it("publishes the Pinot Noir guide as the newest article", () => {
    const guide = guides[0];

    expect(guide?.slug).toBe("cookie-run-crumble-pinot-noir-cookie-build");
    expectPublishableGuide(pinotNoirGuideSource);
    const sectionIds = [...pinotNoirGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(pinotNoirGuideSource).toContain("[CookieRun: Crumble Tier List](/tier-list/)");
    expect(pinotNoirGuideSource).toContain("[CookieRun: Crumble Teams](/teams/)");
    guide?.faq.forEach((item) => {
      expect(pinotNoirGuideSource).toContain(`### ${item.question}`);
      expect(pinotNoirGuideSource).toContain(item.answer);
    });
  });

  it("publishes the resource guide as the newest article", () => {
    const guidePath = new URL(
      "../content/guides/cookie-run-crumble-resource-guide-account-traps.mdx",
      import.meta.url,
    );
    const guide = guides[1];

    expect(guide?.slug).toBe("cookie-run-crumble-resource-guide-account-traps");
    expect(existsSync(guidePath)).toBe(true);
    expectPublishableGuide(resourceGuideSource);
    const sectionIds = [...resourceGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(resourceGuideSource).toContain("[Teams](/teams/)");
    expect(resourceGuideSource).toContain("[Tier List](/tier-list/)");
    guide?.faq.forEach((item) => {
      expect(resourceGuideSource).toContain(`### ${item.question}`);
      expect(resourceGuideSource).toContain(item.answer);
    });
  });

  it("keeps the hidden mechanics tips guide published behind the resource guide", () => {
    const guidePath = new URL(
      "../content/guides/cookie-run-crumble-tips-hidden-mechanics.mdx",
      import.meta.url,
    );

    expect(guides[2]?.slug).toBe("cookie-run-crumble-tips-hidden-mechanics");
    expect(existsSync(guidePath)).toBe(true);
    expectPublishableGuide(hiddenMechanicsGuideSource);
    const sectionIds = [...hiddenMechanicsGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guides[2]?.toc.map((item) => item.id));
    expect(hiddenMechanicsGuideSource).toContain("[Teams](/teams/)");
    expect(hiddenMechanicsGuideSource).toContain("[Tier List](/tier-list/)");
  });

  it("keeps slugs and table of contents anchors unique", () => {
    expect(new Set(guides.map((guide) => guide.slug)).size).toBe(guides.length);
    guides.forEach((guide) => {
      expect(new Set(guide.toc.map((item) => item.id)).size).toBe(guide.toc.length);
    });
  });

  it("connects every guide to the tier list and recommended teams", () => {
    for (const guide of guides) {
      const source = readFileSync(
        new URL(`../content/guides/${guide.slug}.mdx`, import.meta.url),
        "utf8",
      );

      expect(source, guide.slug).toContain("(/tier-list/)");
      expect(source, guide.slug).toContain("(/teams/)");
    }
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
    expect(guides[0]?.slug).toBe("cookie-run-crumble-pinot-noir-cookie-build");
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
