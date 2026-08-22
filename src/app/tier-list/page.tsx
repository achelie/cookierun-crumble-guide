import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { TierBoard } from "@/components/tier-board";
import { AppIcon } from "@/components/ui/icon";
import { cookieById } from "@/data/cookies";
import { tierList, tierRanks } from "@/data/tier-list";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";

const page = seoPages.tierList;
export const metadata: Metadata = pageMetadata(page);

export default function TierListPage() {
  const schemaItems = tierRanks.flatMap((rank) => tierList[rank].flatMap((id) => {
    const cookie = cookieById.get(id);
    return cookie ? [{
      "@type": "Thing",
      name: cookie.name,
      image: absoluteUrl(cookie.image),
      additionalProperty: { "@type": "PropertyValue", name: "Tier", value: rank },
    }] : [];
  }));
  return (
    <div className="page-shell">
      <StructuredData data={collectionPageSchema(page, schemaItems)} />
      <SeoPageHeader page={page} icon="trophy" />
      <aside className="team-tools-callout tier-tools-callout">
        <div><span className="eyebrow">Make your own</span><h2>Move every Cookie where you want.</h2><p>Load this ranking into the Tier List Builder, drag any Cookie to a new tier, then save the result as a link or PNG.</p></div>
        <Link className="primary-button" href="/tools/tier-builder/"><AppIcon name="tools" size={18} />Open Tier Builder</Link>
      </aside>
      <TierBoard />
    </div>
  );
}
