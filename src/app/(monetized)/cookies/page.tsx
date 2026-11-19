import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { EntityCodex } from "@/components/entity-codex";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { cookies } from "@/data/cookies";
import { cookieDetailPathById } from "@/lib/cookie-detail-paths";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";
import { sortByRarityHighToLow } from "@/lib/rarity-order";

const page = seoPages.cookies;
export const metadata: Metadata = pageMetadata(page);

export default function CookiesPage() {
  const schemaItems = sortByRarityHighToLow(cookies).map((cookie) => ({
    "@type": "Thing",
    name: cookie.name,
    image: absoluteUrl(cookie.image),
    url: absoluteUrl(cookieDetailPathById.get(cookie.id)!),
  }));
  return <I18nElement as="div" className="page-shell"><StructuredData data={collectionPageSchema(page, schemaItems)} /><SeoPageHeader page={page} icon="cookie" /><EntityCodex items={cookies} kind="cookie" /></I18nElement>;
}
