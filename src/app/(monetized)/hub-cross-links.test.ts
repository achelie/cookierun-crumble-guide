import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const tierListPage = readFileSync(new URL("./tier-list/page.tsx", import.meta.url), "utf8");
const teamsPage = readFileSync(new URL("./teams/page.tsx", import.meta.url), "utf8");

describe("content hub cross-links", () => {
  it("links the tier list to tested teams with compact text styling", () => {
    expect(tierListPage).toContain('className="page-crosslink"');
    expect(tierListPage).toContain('href="/teams/"');
    expect(tierListPage).not.toMatch(/className="primary-button" href="\/teams\/"/);
    expect(tierListPage).toContain('className="builder-inline-link"');
    expect(tierListPage).toContain('href="/tools/tier-builder/"');
    expect(tierListPage).not.toMatch(/className="primary-button" href="\/tools\/tier-builder\/"/);
  });

  it("links the teams page back to the tier list with compact text styling", () => {
    expect(teamsPage).toContain('className="page-crosslink"');
    expect(teamsPage).toContain('href="/tier-list/"');
    expect(teamsPage).not.toMatch(/className="primary-button" href="\/tier-list\/"/);
    expect(teamsPage).toContain('className="builder-inline-link"');
    expect(teamsPage).toContain('href="/tools/team-builder/"');
    expect(teamsPage).not.toMatch(/className="primary-button" href="\/tools\/team-builder\/"/);
  });
});
