import type { MetadataRoute } from "next";
import { cookieById, cookies } from "@/data/cookies";
import { guides } from "@/data/guides";
import { pets } from "@/data/pets";
import { absoluteUrl, seoPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const imagesByPath = new Map<string, string[]>([
    [seoPages.cookies.path, cookies.map((cookie) => absoluteUrl(cookie.image))],
    [seoPages.pets.path, pets.map((pet) => absoluteUrl(pet.image))],
  ]);
  const routes: MetadataRoute.Sitemap = Object.values(seoPages).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(`${page.updatedAt}T00:00:00Z`),
    images: imagesByPath.get(page.path),
  }));
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}/`),
    lastModified: new Date(`${guide.updatedAt}T00:00:00Z`),
    images: guide.coverCookieIds.flatMap((id) => {
      const cookie = cookieById.get(id);
      return cookie ? [absoluteUrl(cookie.image)] : [];
    }),
  }));
  return [...routes, ...guideRoutes];
}
