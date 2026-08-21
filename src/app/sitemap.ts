import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.cookieruncrumbles.com";
  const routes: MetadataRoute.Sitemap = ["", "/cookies/", "/pets/", "/tier-list/", "/teams/", "/guides/", "/tools/", "/tools/team-builder/", "/tools/tier-builder/", "/codes/"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(path === "/guides/" ? "2026-08-21" : "2026-08-20"),
    changeFrequency: path === "" ? "weekly" : "daily",
    priority: path === "" ? 1 : 0.8,
  }));
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${base}/guides/${guide.slug}/`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));
  return [...routes, ...guideRoutes];
}
