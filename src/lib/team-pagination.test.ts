import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { recommendedTeams } from "@/data/teams";
import { filterTeams, normalizeTeamCategory, normalizeTeamsPage, paginateTeams, teamsPageSize } from "./team-pagination";

type GuideFormation = {
  slug: string;
  cookies: string[];
  pets: string[];
};

function guideFormations() {
  const guidesDirectory = new URL("../content/guides/", import.meta.url);
  const formations: GuideFormation[] = [];

  for (const file of readdirSync(guidesDirectory).filter((name) => name.endsWith(".mdx"))) {
    const source = readFileSync(new URL(file, guidesDirectory), "utf8");
    const formationPattern = /<GuideTeamFormation[\s\S]*?cookieIds=\{(\[[^\]]+\])\}[\s\S]*?petIds=\{(\[[^\]]+\])\}/g;

    for (const match of source.matchAll(formationPattern)) {
      formations.push({
        slug: file.replace(/\.mdx$/, ""),
        cookies: JSON.parse(match[1]) as string[],
        pets: JSON.parse(match[2]) as string[],
      });
    }
  }

  return formations;
}

describe("teams pagination", () => {
  it("filters all teams before calculating category pages", () => {
    expect(filterTeams(recommendedTeams, "all")).toHaveLength(26);
    for (const [category, total] of [["story", 7], ["bosses", 8], ["dungeons", 7], ["pvp", 4]] as const) {
      const filtered = filterTeams(recommendedTeams, category);
      expect(filtered).toHaveLength(total);
      expect(filtered.every((team) => team.category === category)).toBe(true);
      expect(paginateTeams(filtered, 99).pageCount).toBe(category === "bosses" ? 2 : 1);
    }
    expect(paginateTeams(filterTeams(recommendedTeams, "bosses"), 2).items).toHaveLength(1);
    expect(paginateTeams(filterTeams(recommendedTeams, "pvp"), 4)).toMatchObject({ page: 1, total: 4 });
  });

  it("accepts only the supported category slugs", () => {
    for (const category of ["all", "story", "bosses", "dungeons", "pvp"] as const) {
      expect(normalizeTeamCategory(category)).toBe(category);
    }
    for (const invalid of [null, undefined, "", "store", "PVP", "unknown"]) {
      expect(normalizeTeamCategory(invalid)).toBe("all");
    }
    expect(paginateTeams([], 99)).toMatchObject({ items: [], page: 1, pageCount: 1, total: 0 });
  });
  it("shows 26 teams across pages of 7, 7, 7, and 5", () => {
    expect(teamsPageSize).toBe(7);
    expect([1, 2, 3, 4].map((page) => paginateTeams(recommendedTeams, page).items.length)).toEqual([7, 7, 7, 5]);
    expect(paginateTeams(recommendedTeams, 1)).toMatchObject({ page: 1, pageCount: 4, total: 26 });
  });

  it("normalizes missing, malformed, negative, and oversized page values", () => {
    expect(normalizeTeamsPage(undefined, recommendedTeams.length)).toBe(1);
    expect(normalizeTeamsPage("nope", recommendedTeams.length)).toBe(1);
    expect(normalizeTeamsPage("2oops", recommendedTeams.length)).toBe(1);
    expect(normalizeTeamsPage(-4, recommendedTeams.length)).toBe(1);
    expect(normalizeTeamsPage(99, recommendedTeams.length)).toBe(4);
  });
});

describe("team guide references", () => {
  it("links only formations whose ordered Cookies and Pets exactly match a guide", () => {
    const formations = guideFormations();
    const exactMatches = recommendedTeams.filter((team) => formations.some((formation) =>
      JSON.stringify(formation.cookies) === JSON.stringify(team.cookies)
      && JSON.stringify(formation.pets) === JSON.stringify(team.pets),
    ));
    const linkedTeams = recommendedTeams.filter((team) => team.guideReference);

    expect(exactMatches.map((team) => team.id)).toEqual([
      "bari-cherry-cola-story",
      "story-knock-up-resistance",
      "bari-gingercraven-power",
      "princess-bari-story",
      "cherry-cola-auto-story",
      "september-general-purpose",
      "strawberry-crepe-rapid-aoe",
      "pinot-noir-multistrike-boss",
      "wind-archer-guild-conquest",
    ]);
    expect(linkedTeams.map((team) => team.id)).toEqual(exactMatches.map((team) => team.id));

    for (const team of linkedTeams) {
      const guideSlug = team.guideReference?.href.match(/^\/guides\/([^/]+)\/$/)?.[1];
      expect(guideSlug).toBeTruthy();
      expect(formations.some((formation) =>
        formation.slug === guideSlug
        && JSON.stringify(formation.cookies) === JSON.stringify(team.cookies)
        && JSON.stringify(formation.pets) === JSON.stringify(team.pets),
      )).toBe(true);
    }
  });
});
