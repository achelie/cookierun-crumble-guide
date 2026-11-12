import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { EntityCodex } from "@/components/entity-codex";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { cookies, elementDefinitions, roleDefinitions } from "@/data/cookies";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema, propertyValue } from "@/lib/structured-data";
import { sortByRarityHighToLow } from "@/lib/rarity-order";

const page = seoPages.cookies;
export const metadata: Metadata = pageMetadata(page);

export default function CookiesPage() {
  const schemaItems = sortByRarityHighToLow(cookies).map((cookie) => ({
    "@type": "Product",
    name: cookie.name,
    image: absoluteUrl(cookie.image),
    additionalProperty: [
      propertyValue("Rarity", cookie.rarity),
      propertyValue("Element", elementDefinitions[cookie.element].label),
      propertyValue("Role", roleDefinitions[cookie.role].label),
    ],
  }));
  return <I18nElement as="div" className="page-shell"><StructuredData data={collectionPageSchema(page, schemaItems)} /><SeoPageHeader page={page} icon="cookie" /><EntityCodex items={cookies} kind="cookie" /></I18nElement>;
}
