import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cookieById } from "@/data/cookies";
import { guideCategories, guides } from "@/data/guides";
import { guideContentSlugs } from "@/lib/guide-content";

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
const skillAmpGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-skill-amp-fix-rune-refund.mdx", import.meta.url),
  "utf8",
);
const brightseekerGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-brightseeker-cookie-build-team.mdx", import.meta.url),
  "utf8",
);
const gingercravenGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-gingercraven-boss-guide.mdx", import.meta.url),
  "utf8",
);
const guildConquestGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-guild-conquest-team-guide.mdx", import.meta.url),
  "utf8",
);
const strawberryCrepeGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-strawberry-crepe-cookie-build-team.mdx", import.meta.url),
  "utf8",
);
const fastAccountGrowthGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-fast-account-growth-guide.mdx", import.meta.url),
  "utf8",
);
const pinotTeamGuideSource = readFileSync(
  new URL("../content/guides/cookie-run-crumble-pinot-noir-multistrike-scorpion-teams.mdx", import.meta.url),
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
  it("publishes the Pinot Noir team guide as the newest article", () => {
    const guide = guides[0];

    expect(guide?.slug).toBe("cookie-run-crumble-pinot-noir-multistrike-scorpion-teams");
    expectPublishableGuide(pinotTeamGuideSource);
    const sectionIds = [...pinotTeamGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(pinotTeamGuideSource).toContain("[CookieRun: Crumble Tier List](/tier-list/)");
    expect(pinotTeamGuideSource).toContain("[recommended teams page](/teams/)");
    expect(pinotTeamGuideSource.match(/\]\(\/[^)]+\)/g)).toHaveLength(4);
    expect(pinotTeamGuideSource.match(/<GuideTeamFormation/g)).toHaveLength(2);
    expect(pinotTeamGuideSource).toContain('cookieIds={["cookie0070", "cookie4013", "cookie3001", "cookie0126", "cookie4019", "cookie0063", "cookie0059", "cookie0515", "cookie4010", "cookie0018", "cookie4024", "cookie0103"]}');
    expect(pinotTeamGuideSource).toContain('petIds={["pet0069", "pet4005", "pet4001"]}');
    expect(pinotTeamGuideSource).toContain('cookieIds={["cookie0059", "cookie4010", "cookie0018", "cookie4019", "cookie0136", "cookie0063", "cookie0181", "cookie0126", "cookie0040", "cookie4024", "cookie4006", "cookie0003"]}');
    expect(pinotTeamGuideSource).toContain('petIds={["pet0069", "pet0110", "pet4001"]}');
    guide?.faq.forEach((item) => {
      expect(pinotTeamGuideSource).toContain(`### ${item.question}`);
      expect(pinotTeamGuideSource).toContain(item.answer);
    });
  });

  it("keeps the fast account growth guide published", () => {
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-fast-account-growth-guide");

    expectPublishableGuide(fastAccountGrowthGuideSource);
    const sectionIds = [...fastAccountGrowthGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(fastAccountGrowthGuideSource).toContain("[CookieRun: Crumble Tier List](/tier-list/)");
    expect(fastAccountGrowthGuideSource).toContain("[recommended teams page](/teams/)");
    expect(fastAccountGrowthGuideSource.match(/\]\(\/[^)]+\)/g)).toHaveLength(4);
    guide?.faq.forEach((item) => {
      expect(fastAccountGrowthGuideSource).toContain(`### ${item.question}`);
      expect(fastAccountGrowthGuideSource).toContain(item.answer);
    });
  });

  it("publishes the Strawberry Crepe build with both complete lineups", () => {
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-strawberry-crepe-cookie-build-team");

    expect(guide?.slug).toBe("cookie-run-crumble-strawberry-crepe-cookie-build-team");
    expectPublishableGuide(strawberryCrepeGuideSource);
    const sectionIds = [...strawberryCrepeGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(strawberryCrepeGuideSource).toContain("[CookieRun: Crumble Tier List](/tier-list/)");
    expect(strawberryCrepeGuideSource).toContain("[recommended teams page](/teams/)");
    expect(strawberryCrepeGuideSource.match(/\]\(\/[^)]+\)/g)).toHaveLength(4);
    expect(strawberryCrepeGuideSource.match(/<GuideTeamFormation/g)).toHaveLength(2);
    expect(strawberryCrepeGuideSource).toContain('cookieIds={["cookie0059", "cookie0181", "cookie3001", "cookie0126", "cookie4024", "cookie0063", "cookie4013", "cookie0515", "cookie4010", "cookie4019", "cookie0518", "cookie0103"]}');
    expect(strawberryCrepeGuideSource).toContain('cookieIds={["cookie0059", "cookie0181", "cookie3001", "cookie0126", "cookie4024", "cookie0063", "cookie4013", "cookie0515", "cookie4010", "cookie4019", "cookie0518", "cookie0023"]}');
    expect(strawberryCrepeGuideSource.match(/petIds=\{\["pet4005", "pet4001", "pet0111"\]\}/g)).toHaveLength(2);
    guide?.faq.forEach((item) => {
      expect(strawberryCrepeGuideSource).toContain(`### ${item.question}`);
      expect(strawberryCrepeGuideSource).toContain(item.answer);
    });
  });

  it("publishes the Guild Conquest guide with both supplied lineups", () => {
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-guild-conquest-team-guide");

    expect(guide?.slug).toBe("cookie-run-crumble-guild-conquest-team-guide");
    expectPublishableGuide(guildConquestGuideSource);
    const sectionIds = [...guildConquestGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(guildConquestGuideSource).toContain("[CookieRun: Crumble Tier List](/tier-list/)");
    expect(guildConquestGuideSource).toContain("[recommended teams](/teams/)");
    expect(guildConquestGuideSource.match(/\]\(\/[^)]+\)/g)).toHaveLength(4);
    expect(guildConquestGuideSource.match(/<GuideTeamFormation/g)).toHaveLength(2);
    expect(guildConquestGuideSource).toContain('cookieIds={["cookie0070", "cookie0181", "cookie0040", "cookie0126", "cookie3001", "cookie4024", "cookie0059", "cookie0515", "cookie4010", "cookie0018", "cookie4019", "cookie0103"]}');
    expect(guildConquestGuideSource).toContain('cookieIds={["cookie0059", "cookie0181", "cookie0040", "cookie0126", "cookie3001", "cookie4024", "cookie0573", "cookie0515", "cookie4010", "cookie0018", "cookie4019", "cookie0103"]}');
    expect(guildConquestGuideSource.match(/petIds=\{\["pet4001", "pet0111", "pet0069"\]\}/g)).toHaveLength(2);
    guide?.faq.forEach((item) => {
      expect(guildConquestGuideSource).toContain(`### ${item.question}`);
      expect(guildConquestGuideSource).toContain(item.answer);
    });
  });

  it("publishes the GingerCraven boss guide with the complete sustain team", () => {
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-gingercraven-boss-guide");

    expect(guide?.slug).toBe("cookie-run-crumble-gingercraven-boss-guide");
    expectPublishableGuide(gingercravenGuideSource);
    const sectionIds = [...gingercravenGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(gingercravenGuideSource).toContain("[CookieRun: Crumble Tier List](/tier-list/)");
    expect(gingercravenGuideSource).toContain("[recommended teams](/teams/)");
    expect(gingercravenGuideSource.match(/<GuideTeamFormation/g)).toHaveLength(1);
    expect(gingercravenGuideSource).toContain('cookieIds={["cookie0059", "cookie0126", "cookie4003", "cookie0054", "cookie4024", "cookie0103", "cookie0181", "cookie0018", "cookie0040", "cookie4019", "cookie0063", "cookie0003"]}');
    expect(gingercravenGuideSource).toContain('petIds={["pet0110", "pet4001", "pet4003"]}');
    guide?.faq.forEach((item) => {
      expect(gingercravenGuideSource).toContain(`### ${item.question}`);
      expect(gingercravenGuideSource).toContain(item.answer);
    });
  });

  it("keeps the Brightseeker build directly behind the newest article", () => {
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-brightseeker-cookie-build-team");

    expect(guide?.slug).toBe("cookie-run-crumble-brightseeker-cookie-build-team");
    expectPublishableGuide(brightseekerGuideSource);
    const sectionIds = [...brightseekerGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(brightseekerGuideSource).toContain("[CookieRun: Crumble Tier List](/tier-list/)");
    expect(brightseekerGuideSource).toContain("[recommended teams](/teams/)");
    expect(brightseekerGuideSource.match(/<GuideTeamFormation/g)).toHaveLength(2);
    expect(brightseekerGuideSource).toContain('cookieIds={["cookie0059", "cookie0515", "cookie3001", "cookie0126", "cookie4019", "cookie0518", "cookie4013", "cookie0503", "cookie4010", "cookie0018", "cookie4024", "cookie0063"]}');
    expect(brightseekerGuideSource).toContain('petIds={["pet4001", "pet0111", "pet4005"]}');
    expect(brightseekerGuideSource).toContain('cookieIds={["cookie0070", "cookie0515", "cookie3001", "cookie0037", "cookie0513", "cookie4024", "cookie0059", "cookie4018", "cookie4010", "cookie0126", "cookie4019", "cookie0063"]}');
    expect(brightseekerGuideSource).toContain('petIds={["pet4001", "pet0111", "pet4003"]}');
    guide?.faq.forEach((item) => {
      expect(brightseekerGuideSource).toContain(`### ${item.question}`);
      expect(brightseekerGuideSource).toContain(item.answer);
    });
  });

  it("keeps the Skill Amp fix directly behind the newest article", () => {
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-skill-amp-fix-rune-refund");

    expect(guide?.slug).toBe("cookie-run-crumble-skill-amp-fix-rune-refund");
    expectPublishableGuide(skillAmpGuideSource);
    const sectionIds = [...skillAmpGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(skillAmpGuideSource).toContain("[CookieRun: Crumble Tier List](/tier-list/)");
    expect(skillAmpGuideSource).toContain("[CookieRun: Crumble Teams](/teams/)");
    guide?.faq.forEach((item) => {
      expect(skillAmpGuideSource).toContain(`### ${item.question}`);
      expect(skillAmpGuideSource).toContain(item.answer);
    });
  });

  it("keeps the Pinot Noir guide near the newest article", () => {
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-pinot-noir-cookie-build");

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

  it("keeps the resource guide published with complete metadata", () => {
    const guidePath = new URL(
      "../content/guides/cookie-run-crumble-resource-guide-account-traps.mdx",
      import.meta.url,
    );
    const guide = guides.find((item) => item.slug === "cookie-run-crumble-resource-guide-account-traps");

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

    const guide = guides.find((item) => item.slug === "cookie-run-crumble-tips-hidden-mechanics");
    expect(guide?.slug).toBe("cookie-run-crumble-tips-hidden-mechanics");
    expect(existsSync(guidePath)).toBe(true);
    expectPublishableGuide(hiddenMechanicsGuideSource);
    const sectionIds = [...hiddenMechanicsGuideSource.matchAll(/<GuideSection id="([^"]+)"/g)].map((match) => match[1]);
    expect(sectionIds).toEqual(guide?.toc.map((item) => item.id));
    expect(hiddenMechanicsGuideSource).toContain("[Teams](/teams/)");
    expect(hiddenMechanicsGuideSource).toContain("[Tier List](/tier-list/)");
  });

  it("keeps slugs and table of contents anchors unique", () => {
    expect(new Set(guides.map((guide) => guide.slug)).size).toBe(guides.length);
    guides.forEach((guide) => {
      expect(new Set(guide.toc.map((item) => item.id)).size).toBe(guide.toc.length);
    });
  });

  it("registers one loadable MDX module for every guide slug", () => {
    expect(new Set(guideContentSlugs)).toEqual(new Set(guides.map((guide) => guide.slug)));
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
    expect(guides[0]?.slug).toBe("cookie-run-crumble-pinot-noir-multistrike-scorpion-teams");
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
