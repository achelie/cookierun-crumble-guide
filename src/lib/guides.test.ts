import { describe, expect, it } from "vitest";
import { guides, type GuideSummary } from "@/data/guides";
import {
  filterGuides,
  getRelatedGuides,
  normalizeGuideCategory,
  normalizeGuidePage,
  paginateGuides,
} from "@/lib/guides";

function guide(overrides: Partial<GuideSummary>): GuideSummary {
  return {
    slug: "example",
    title: "Example Guide",
    seoTitle: "Example Guide | Crumble Guide",
    seoDescription: "Example search description for the guide fixture.",
    excerpt: "Example summary",
    category: "cookies",
    tags: ["Damage"],
    publishedAt: "2026-08-01",
    updatedAt: "2026-08-01",
    readingMinutes: 5,
    author: "Crumble Guide",
    coverCookieIds: ["cookie0136", "cookie0181", "cookie0059"],
    relatedGuideSlugs: ["two-tags", "same-category", "one-tag"],
    toc: [],
    faq: [],
    ...overrides,
  };
}

describe("guide filtering", () => {
  it("searches the title, excerpt, category label, and tags", () => {
    expect(filterGuides(guides, { query: "beginner guide" })).toHaveLength(1);
    expect(filterGuides(guides, { query: "burning crystals" })).toHaveLength(1);
    expect(filterGuides(guides, { query: "getting started" }).map((item) => item.slug)).toEqual([
      "cookie-run-crumble-tips-hidden-mechanics",
      "cookie-run-crumble-beginner-progression-guide",
    ]);
    expect(filterGuides(guides, { query: "free to play" }).map((item) => item.slug)).toEqual([
      "cookie-run-crumble-rye-cookie-build-team",
      "cookie-run-crumble-beginner-progression-guide",
    ]);
    expect(filterGuides(guides, { query: "not here" })).toHaveLength(0);
  });

  it("filters by category and treats an invalid category as all", () => {
    expect(filterGuides(guides, { category: "getting-started" }).map((item) => item.slug)).toEqual([
      "cookie-run-crumble-tips-hidden-mechanics",
      "cookie-run-crumble-beginner-progression-guide",
    ]);
    expect(filterGuides(guides, { category: "pets" })).toHaveLength(0);
    expect(normalizeGuideCategory("broken")).toBe("all");
    expect(filterGuides(guides, { category: "broken" })).toHaveLength(guides.length);
  });
});

describe("guide pagination", () => {
  const items = Array.from({ length: 13 }, (_, index) => guide({ slug: `guide-${index}` }));

  it("uses six items per page and clamps page boundaries", () => {
    expect(paginateGuides(items, 1).items).toHaveLength(6);
    expect(paginateGuides(items, 3).items).toHaveLength(1);
    expect(paginateGuides(items, 99).page).toBe(3);
    expect(normalizeGuidePage("nope", items.length)).toBe(1);
    expect(normalizeGuidePage(-4, items.length)).toBe(1);
  });

  it("keeps an empty result on page one of one", () => {
    expect(paginateGuides([], 4)).toEqual({ items: [], page: 1, pageCount: 1, total: 0 });
  });
});

describe("related guides", () => {
  const current = guide({ slug: "current", category: "cookies", tags: ["Damage", "Boss"] });
  const candidates = [
    current,
    guide({ slug: "same-category", category: "cookies", tags: ["Other"] }),
    guide({ slug: "two-tags", category: "pets", tags: ["Damage", "Boss"] }),
    guide({ slug: "one-tag", category: "team-building", tags: ["Boss"] }),
    guide({ slug: "unrelated", category: "events-codes", tags: ["Codes"] }),
  ];

  it("uses the curated order, excludes current, and limits output", () => {
    expect(getRelatedGuides(current, candidates, 2).map((item) => item.slug)).toEqual(["two-tags", "same-category"]);
  });

  it("fills missing curated guides by category, shared tags, and recency", () => {
    const missing = guide({
      slug: "missing-current",
      category: "cookies",
      tags: ["Damage", "Boss"],
      relatedGuideSlugs: ["unknown-a", "unknown-b", "unknown-c"],
    });
    expect(getRelatedGuides(missing, [missing, ...candidates.filter((item) => item.slug !== "current")], 3).map((item) => item.slug)).toEqual([
      "same-category",
      "two-tags",
      "one-tag",
    ]);
  });

  it("returns no block when there is nothing related", () => {
    expect(getRelatedGuides(current, [current])).toEqual([]);
  });
});
