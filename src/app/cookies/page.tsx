import type { Metadata } from "next";
import { EntityCodex } from "@/components/entity-codex";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { cookies } from "@/data/cookies";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";

const page = seoPages.cookies;
export const metadata: Metadata = pageMetadata(page);

export default function CookiesPage() {
  const schemaItems = cookies.map((cookie) => ({
    "@type": "Thing",
    name: cookie.name,
    image: absoluteUrl(cookie.image),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Rarity", value: cookie.rarity },
      { "@type": "PropertyValue", name: "Element", value: cookie.element },
      { "@type": "PropertyValue", name: "Role", value: cookie.role },
    ],
  }));
  return <div className="page-shell"><StructuredData data={collectionPageSchema(page, schemaItems)} /><SeoPageHeader page={page} icon="cookie" /><EntityCodex items={cookies} kind="cookie" /></div>;
}
