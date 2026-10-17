import { notFound } from "next/navigation";
import { localeFromSegment } from "./config";
import type { Locale } from "./config";
import { seoPages } from "@/lib/seo";
import { pageMetadata } from "@/lib/metadata";

export function getGuideLocale(segment: string): Locale {
  const locale = localeFromSegment(segment);
  if (!locale) notFound();
  return locale;
}
export function metadataForPath(path: string, locale: Locale) {
  const page = Object.values(seoPages).find((entry) => entry.path === path);
  if (!page) throw new Error(`Unknown SEO page: ${path}`);
  return pageMetadata(page, locale);
}
