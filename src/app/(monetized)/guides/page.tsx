import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { Suspense } from "react";
import { GuidesExplorer, GuidesExplorerFallback } from "@/components/guides-explorer";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";
import { localeFromSegment } from "@/i18n/config";
import { guideSupportsLocale } from "@/i18n/guide-availability";
import { paginateGuides } from "@/lib/guides";

const page = seoPages.guides;
export const metadata: Metadata = pageMetadata(page);

export default async function GuidesPage({params}: {params?: Promise<{locale?: string}>} = {}) {
  const segment = (await params)?.locale;
  const locale = segment ? localeFromSegment(segment) ?? "en" : "en";
  const availableGuides = guides.filter((guide) => guideSupportsLocale(guide.slug, locale));
  return (
    <I18nElement as="div" className="page-shell guides-page">
      <StructuredData data={collectionPageSchema(page, paginateGuides(availableGuides).items.map((guide) => ({
        "@type": "Article",
        headline: guide.title,
        description: guide.excerpt,
        url: absoluteUrl(`/guides/${guide.slug}/`),
        dateModified: guide.updatedAt,
      })))} />
      <SeoPageHeader page={page} icon="book" />
      <Suspense fallback={<GuidesExplorerFallback guides={availableGuides} />}>
        <GuidesExplorer guides={availableGuides} />
      </Suspense>
    </I18nElement>
  );
}
