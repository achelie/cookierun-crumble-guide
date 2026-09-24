import type { Metadata } from "next";
import { Suspense } from "react";
import { GuidesExplorer, GuidesExplorerFallback } from "@/components/guides-explorer";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";

const page = seoPages.guides;
export const metadata: Metadata = pageMetadata(page);

export default function GuidesPage() {
  return (
    <div className="page-shell guides-page">
      <StructuredData data={collectionPageSchema(page, guides.map((guide) => ({
        "@type": "Article",
        headline: guide.title,
        description: guide.seoDescription,
        url: absoluteUrl(`/guides/${guide.slug}/`),
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt,
      })))} />
      <SeoPageHeader page={page} icon="book" />
      <Suspense fallback={<GuidesExplorerFallback guides={guides} />}>
        <GuidesExplorer guides={guides} />
      </Suspense>
    </div>
  );
}
