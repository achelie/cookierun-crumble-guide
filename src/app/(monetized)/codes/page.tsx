import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { LocaleLink as Link } from "@/i18n/elements";
import { CodeList } from "@/components/code-list";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { AppIcon } from "@/components/ui/icon";
import { codes } from "@/data/codes";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";

const page = seoPages.codes;
export const metadata: Metadata = pageMetadata(page);

export default function CodesPage() {
  return (
    <I18nElement as="div" className="page-shell">
      <StructuredData data={collectionPageSchema(page, codes.map((code) => ({
        "@type": "Thing",
        name: code.code,
        description: `${code.rewards.map((reward) => `${reward.amount} ${reward.label}`).join(", ")}. Expires ${code.expires}.`,
      })))} />
      <SeoPageHeader page={page} icon="ticket" />
      <CodeList items={codes} />
      <I18nElement as="div" className="redeem-callout"><I18nElement as="div"><I18nElement as="span">Official redemption</I18nElement><I18nElement as="h2">Ready to cash in?</I18nElement><I18nElement as="p">The reward arrives through in-game mail after a successful redemption.</I18nElement></I18nElement><Link href="https://coupon.devplay.com/coupon/cc/en" target="_blank" rel="noreferrer">Open DevPlay <AppIcon name="external" size={18} /></Link></I18nElement>
    </I18nElement>
  );
}
