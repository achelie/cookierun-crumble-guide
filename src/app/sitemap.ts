import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.cookieruncrumbles.com";
  return ["", "/cookies/", "/pets/", "/tier-list/", "/teams/", "/tools/", "/codes/"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-08-20"),
    changeFrequency: path === "" ? "weekly" : "daily",
    priority: path === "" ? 1 : 0.8,
  }));
}
