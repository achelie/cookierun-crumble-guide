import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { EntityCodex } from "@/components/entity-codex";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { pets } from "@/data/pets";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";
import { sortByRarityHighToLow } from "@/lib/rarity-order";

const page = seoPages.pets;
export const metadata: Metadata = pageMetadata(page);

export default function PetsPage() {
  const schemaItems = sortByRarityHighToLow(pets).map((pet) => ({
    "@type": "Thing",
    name: pet.name,
    url: absoluteUrl(`${page.path}#${pet.id}`),
    image: absoluteUrl(pet.image),
  }));
  return (
    <I18nElement as="div" className="page-shell">
      <StructuredData data={collectionPageSchema(page, schemaItems)} />
      <SeoPageHeader page={page} icon="paw" />
      <EntityCodex items={pets} kind="pet" />
    </I18nElement>
  );
}
