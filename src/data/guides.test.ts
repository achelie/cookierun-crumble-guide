import { describe, expect, it } from "vitest";
import { cookieById } from "@/data/cookies";
import { guideCategories, guides } from "@/data/guides";

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
      expect(guide.excerpt).toBeTruthy();
      expect(categorySlugs.has(guide.category)).toBe(true);
      expect(Date.parse(guide.publishedAt)).not.toBeNaN();
      expect(Date.parse(guide.updatedAt)).not.toBeNaN();
      expect(guide.readingMinutes).toBeGreaterThan(0);
      expect(guide.tags.length).toBeGreaterThan(0);
      expect(guide.faq.length).toBeGreaterThan(0);
    });
  });

  it("uses three real local Cookie records for every cover", () => {
    guides.forEach((guide) => {
      expect(guide.coverCookieIds).toHaveLength(3);
      guide.coverCookieIds.forEach((id) => expect(cookieById.has(id)).toBe(true));
    });
  });
});
