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
      <SeoPageHeader page={page} icon="ticket" showUpdatedAt />
      <CodeList items={codes} />
      <I18nElement as="section" className="redeem-callout"><I18nElement as="div"><I18nElement as="span">Official redemption</I18nElement><I18nElement as="h2">How to redeem codes</I18nElement><I18nElement as="ol"><I18nElement as="li">In the game, open Settings and find your DevPlay account under Account.</I18nElement><I18nElement as="li">Open the official coupon page and enter your DevPlay account and an active coupon code.</I18nElement><I18nElement as="li">Complete any verification and select Claim Reward.</I18nElement><I18nElement as="li">Restart the game and check your in-game mail for the reward.</I18nElement></I18nElement><I18nElement as="p">Each code can be used once per account. Expired codes cannot be redeemed.</I18nElement></I18nElement><Link href="https://coupon.devplay.com/coupon/cc/en" target="_blank" rel="noreferrer">Open DevPlay <AppIcon name="external" size={18} /></Link></I18nElement>
    </I18nElement>
  );
}
