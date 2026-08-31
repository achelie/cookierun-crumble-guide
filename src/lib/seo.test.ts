import { describe, expect, it } from "vitest";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema, homeSchema, webApplicationSchema } from "@/lib/structured-data";

describe("SEO page registry", () => {
  const pages = Object.values(seoPages);

  it("keeps fourteen route pages and complete metadata for every registered guide", () => {
    expect(pages).toHaveLength(14);
    expect(guides.length).toBeGreaterThan(0);
    expect(guides.every((guide) => guide.seoTitle && guide.seoDescription && guide.updatedAt)).toBe(true);
  });

  it("publishes the four trust routes with stable public paths", () => {
    expect(pages.map((page) => page.path)).toEqual(expect.arrayContaining([
      "/about/",
      "/contact/",
      "/privacy/",
      "/disclaimer/",
    ]));
  });

  it("uses unique routes, titles, and search-sized descriptions", () => {
    expect(new Set(pages.map((page) => page.path)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);

    for (const page of pages) {
      expect(page.title.length, page.title).toBeGreaterThanOrEqual(35);
      expect(page.title.length, page.title).toBeLessThanOrEqual(65);
      expect(page.description.length, `${page.path} ${page.description}`).toBeGreaterThanOrEqual(120);
      expect(page.description.length, `${page.path} ${page.description}`).toBeLessThanOrEqual(165);
      expect(Date.parse(page.updatedAt), page.path).not.toBeNaN();
      expect(absoluteUrl(page.path)).toMatch(/^https:\/\/www\.cookieruncrumbles\.com\//);
    }
  });

  it("emits absolute titles, canonicals, and social metadata", () => {
    for (const page of pages) {
      const metadata = pageMetadata(page);
      expect(metadata.title).toEqual({ absolute: page.title });
      expect(metadata.description).toBe(page.description);
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(page.path));
      expect(metadata.openGraph?.title).toBe(page.title);
      expect(metadata.twitter?.title).toBe(page.title);
    }
  });

  it("exposes the Teams update date in search-facing copy", () => {
    expect(seoPages.teams.summary).toContain("Updated August 31, 2026");
    expect(seoPages.teams.description).toContain("Updated August 31, 2026");
    expect(seoPages.teams.updatedAt).toBe("2026-08-31");
  });
});

describe("SEO structured data", () => {
  it("serializes the home, collection, and application graphs", () => {
    const schemas = [
      homeSchema(seoPages.home),
      collectionPageSchema(seoPages.cookies, [{ "@type": "Thing", name: "GingerBrave" }]),
      webApplicationSchema(seoPages.teamBuilder, ["Drag-and-drop ordering"]),
    ];

    for (const schema of schemas) {
      expect(schema["@context"]).toBe("https://schema.org");
      expect(Array.isArray(schema["@graph"])).toBe(true);
      expect(() => JSON.stringify(schema)).not.toThrow();
    }
  });
});
