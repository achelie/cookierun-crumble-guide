import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { TierBoard } from "@/components/tier-board";
import { TierRecommendationSection } from "@/components/tier-recommendations";
import { AppIcon } from "@/components/ui/icon";
import { cookieById } from "@/data/cookies";
import { tierList, tierRanks } from "@/data/tier-list";
import type { Locale } from "@/i18n/config";
import { I18nElement, LocaleLink as Link } from "@/i18n/elements";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";

const page = seoPages.tierList;
export function TierListView({ locale }: { locale: Locale }) {
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
    <I18nElement as="div" className="page-shell">
      <StructuredData data={collectionPageSchema(page, schemaItems)} />
      <SeoPageHeader page={page} icon="trophy" showUpdatedAt />
      <I18nElement as="aside" className="page-crosslink" aria-label="Related team recommendations">
        <AppIcon name="users" size={16} />
        <I18nElement as="span">Want to turn these rankings into a working lineup?</I18nElement>
        <Link href="/teams/">Browse tested teams<AppIcon name="chevron" size={14} /></Link>
      </I18nElement>
      <I18nElement as="aside" className="builder-inline-link" aria-label="Tier List Builder">
        <AppIcon name="tools" size={15} />
        <I18nElement as="span">Want your own ranking?</I18nElement>
        <Link href="/tools/tier-builder/">Open Tier Builder<AppIcon name="chevron" size={13} /></Link>
      </I18nElement>
      <TierBoard>
        <TierRecommendationSection locale={locale} />
      </TierBoard>
    </I18nElement>
  );
}
