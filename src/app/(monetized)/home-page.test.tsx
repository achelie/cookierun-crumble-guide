import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

const homeSource = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");

describe("home navigation", () => {
  it("removes the old coverage strip and filler slogans", () => {
    expect(homeSource).not.toContain("cookies catalogued");
    expect(homeSource).not.toContain("pets catalogued");
    expect(homeSource).not.toContain("data check");
    expect(homeSource).not.toContain("Get the answer. Get back in game.");
    expect(homeSource).not.toContain("Fresh crumbs only");
    expect(homeSource).not.toContain("The roster moves fast");
  });

  it.each([
    "/cookies/",
    "/pets/",
    "/tier-list/",
    "/teams/",
    "/codes/",
    "/guides/",
    "/tools/",
    "/tools/team-builder/",
    "/tools/tier-builder/",
  ])("links to %s", (href) => {
    const isConfiguredDestination = homeSource.includes(`href: \"${href}\"`);
    const isDirectLink = homeSource.includes(`href=\"${href}\"`);
    expect(isConfiguredDestination || isDirectLink).toBe(true);
  });

  it("keeps visible copy free of long dash separators", () => {
    expect(homeSource).not.toMatch(/[—–]/);
  });

  it("sends the beginner CTA to the beginner progression guide", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain('href="/guides/cookie-run-crumble-beginner-progression-guide"');
    expect(html).not.toContain('href="/guides/cookie-run-crumble-pinot-noir-cookie-build" class="secondary-link"');
  });
});
