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
import { DirectAnswer } from "@/components/direct-answer";
import { LastUpdated } from "@/components/last-updated";
import { codesAnswer } from "@/lib/direct-answers";
import type { Locale } from "@/i18n/config";

const page = seoPages.codes;
export const metadata: Metadata = pageMetadata(page);

export default function CodesPage() {
  return <CodesView locale="en" />;
}

export function CodesView({ locale }: { locale: Locale }) {
  const active = codes.filter((code) => code.status === "active").length;
  const expired = codes.filter((code) => code.status === "expired").length;
  return (
    <I18nElement as="div" className="page-shell">
      <StructuredData data={collectionPageSchema(page, codes.map((code) => ({
        "@type": "Thing",
        name: code.code,
        ...(code.status === "active" && { description: `${code.rewards.map((reward) => `${reward.amount} ${reward.label}`).join(", ")}${code.expires ? `. Expires ${code.expires}.` : "."}` }),
      })))} />
      <SeoPageHeader page={page} icon="ticket" answer={<><DirectAnswer date={page.updatedAt} locale={locale} cutoff>{codesAnswer(active, expired)[locale]}</DirectAnswer><LastUpdated date={page.updatedAt} /></>} />
      <CodeList items={codes} />
      <I18nElement as="section" className="redeem-callout"><I18nElement as="div"><I18nElement as="span">Official redemption</I18nElement><I18nElement as="h2">How to redeem codes</I18nElement><I18nElement as="ol"><I18nElement as="li">In the game, open Settings and find your DevPlay account under Account.</I18nElement><I18nElement as="li">Open the official coupon page and enter your DevPlay account and an active coupon code.</I18nElement><I18nElement as="li">Complete any verification and select Claim Reward.</I18nElement><I18nElement as="li">Restart the game and check your in-game mail for the reward.</I18nElement></I18nElement><I18nElement as="p">Each code can be used once per account. Expired codes cannot be redeemed.</I18nElement></I18nElement><Link href="https://coupon.devplay.com/coupon/cc/en" target="_blank" rel="noreferrer">Open DevPlay <AppIcon name="external" size={18} /></Link></I18nElement>
    </I18nElement>
  );
}
