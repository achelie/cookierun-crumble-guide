import type { Metadata } from "next";
import { EntityCodex } from "@/components/entity-codex";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { pets } from "@/data/pets";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";

const page = seoPages.pets;
export const metadata: Metadata = pageMetadata(page);

export default function PetsPage() {
  const schemaItems = pets.map((pet) => ({
    "@type": "Thing",
    name: pet.name,
    image: absoluteUrl(pet.image),
    description: pet.effects.length ? pet.effects.join("; ") : `${pet.rarity} CookieRun: Crumble Pet`,
    additionalProperty: { "@type": "PropertyValue", name: "Rarity", value: pet.rarity },
  }));
  return <div className="page-shell"><StructuredData data={collectionPageSchema(page, schemaItems)} /><SeoPageHeader page={page} icon="paw" /><EntityCodex items={pets} kind="pet" /></div>;
}
