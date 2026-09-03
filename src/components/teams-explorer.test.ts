import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const explorerSource = readFileSync(new URL("./teams-explorer.tsx", import.meta.url), "utf8");
const showcaseSource = readFileSync(new URL("./team-showcase.tsx", import.meta.url), "utf8");

describe("TeamsExplorer", () => {
  it("renders URL-backed pagination with clear boundaries", () => {
    expect(explorerSource).toContain('searchParams.get("page")');
    expect(explorerSource).toContain('aria-label="Teams pagination"');
    expect(explorerSource).toContain("pagination.page === 1");
    expect(explorerSource).toContain("pagination.page === pagination.pageCount");
    expect(explorerSource).toContain("Page <strong>{pagination.page}</strong> of {pagination.pageCount}");
  });

  it("limits the static fallback and renders guide links inside team descriptions", () => {
    expect(explorerSource).toContain("teams.slice(0, teamsPageSize)");
    expect(showcaseSource).toContain("team.guideReference.leadIn");
    expect(showcaseSource).toContain("<Link href={team.guideReference.href}>");
    expect(showcaseSource).toContain("team.guideReference.followUp");
  });
});
