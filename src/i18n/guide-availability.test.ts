import { describe, expect, it } from "vitest";
import { alternateLanguages, localizedPath, locales } from "./config";
import { guideSupportsLocale } from "./guide-availability";
import sitemap from "@/app/sitemap";

const slug = "cookie-run-crumble-caine-guild-conquest-team";
const path = `/guides/${slug}/`;
const origin = "https://www.cookieruncrumbles.com";

describe("translated Caine guide availability", () => {
  it("links to the published translations and preserves query strings and fragments", () => {
    expect(guideSupportsLocale(slug, "en")).toBe(true);
    expect(locales.every((locale) => guideSupportsLocale(slug, locale))).toBe(true);
    expect(localizedPath(`${path}#caine-pets`, "ja")).toBe(`/ja${path}#caine-pets`);
    expect(localizedPath(`/ja${path}?mode=read#caine-pets`, "zh-Hant")).toBe(`/zh-tw${path}?mode=read#caine-pets`);
    expect(Object.keys(alternateLanguages(path, origin))).toHaveLength(6);
  });

  it("only includes published translations in the sitemap", () => {
    const routes = sitemap().filter((route) => route.url.includes(slug));
    expect(routes).toHaveLength(5);
    expect(routes.map((route) => route.url)).toEqual(locales.map((locale) => origin + localizedPath(path, locale)));
    for (const route of routes) expect(route.alternates?.languages).toEqual(alternateLanguages(path, origin));
    const oldPath = "/guides/cookie-run-crumble-guild-conquest-team-guide/";
    expect(guideSupportsLocale("cookie-run-crumble-guild-conquest-team-guide", "ja")).toBe(true);
    expect(localizedPath(oldPath, "ja")).toBe(`/ja${oldPath}`);
    expect(Object.keys(alternateLanguages(oldPath, origin))).toHaveLength(6);
  });
});
