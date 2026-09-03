import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { recommendedTeams } from "@/data/teams";
import { normalizeTeamsPage, paginateTeams, teamsPageSize } from "./team-pagination";

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
  it("shows 14 teams across pages of 6, 6, and 2", () => {
    expect(teamsPageSize).toBe(6);
    expect([1, 2, 3].map((page) => paginateTeams(recommendedTeams, page).items.length)).toEqual([6, 6, 2]);
    expect(paginateTeams(recommendedTeams, 1)).toMatchObject({ page: 1, pageCount: 3, total: 14 });
  });

  it("normalizes missing, malformed, negative, and oversized page values", () => {
    expect(normalizeTeamsPage(undefined, recommendedTeams.length)).toBe(1);
    expect(normalizeTeamsPage("nope", recommendedTeams.length)).toBe(1);
    expect(normalizeTeamsPage("2oops", recommendedTeams.length)).toBe(1);
    expect(normalizeTeamsPage(-4, recommendedTeams.length)).toBe(1);
    expect(normalizeTeamsPage(99, recommendedTeams.length)).toBe(3);
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
      "strawberry-crepe-rapid-aoe",
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
