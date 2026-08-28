import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="page-shell">
      <StructuredData data={collectionPageSchema(page, codes.map((code) => ({
        "@type": "Thing",
        name: code.code,
        description: `${code.rewards.map((reward) => `${reward.amount} ${reward.label}`).join(", ")}. Expires ${code.expires}.`,
      })))} />
      <SeoPageHeader page={page} icon="ticket" />
      <CodeList items={codes} />
      <div className="redeem-callout"><div><span>Official redemption</span><h2>Ready to cash in?</h2><p>The reward arrives through in-game mail after a successful redemption.</p></div><Link href="https://coupon.devplay.com/coupon/cc/en" target="_blank" rel="noreferrer">Open DevPlay <AppIcon name="external" size={18} /></Link></div>
    </div>
  );
}
