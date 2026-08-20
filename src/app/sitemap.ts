import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.cookieruncrumbles.com";
  return ["", "/cookies/", "/pets/", "/tier-list/", "/teams/", "/codes/"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-08-19"),
    changeFrequency: path === "" ? "weekly" : "daily",
    priority: path === "" ? 1 : 0.8,
  }));
}
