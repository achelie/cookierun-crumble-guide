import type { Metadata } from "next";
import Link from "next/link";
import { CodeList } from "@/components/code-list";
import { AppIcon } from "@/components/ui/icon";
import { codes } from "@/data/codes";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Active Coupon Codes", "Copy active CookieRun: Crumble coupon codes and check rewards and expiry times.", "/codes/");

export default function CodesPage() {
  return (
    <div className="page-shell">
      <h1 className="sr-only">Coupon Codes</h1>
      <CodeList items={codes} />
      <div className="redeem-callout"><div><span>Official redemption</span><h2>Ready to cash in?</h2><p>The reward arrives through in-game mail after a successful redemption.</p></div><Link href="https://coupon.devplay.com/coupon/cc/en" target="_blank" rel="noreferrer">Open DevPlay <AppIcon name="external" size={18} /></Link></div>
    </div>
  );
}
