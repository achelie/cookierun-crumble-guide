import type { Metadata } from "next";
import Link from "next/link";
import { TierBoard } from "@/components/tier-board";
import { AppIcon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Cookie Tier List", "Current CookieRun: Crumble combined PvP and PvE ranking for all 70 Cookies from S through D tier.", "/tier-list/");

export default function TierListPage() {
  return (
    <div className="page-shell">
      <h1 className="sr-only">Cookie Tier List</h1>
      <aside className="team-tools-callout tier-tools-callout">
        <div><span className="eyebrow">Make your own</span><h2>Move every Cookie where you want.</h2><p>Load this ranking into the Tier List Builder, drag any Cookie to a new tier, then save the result as a link or PNG.</p></div>
        <Link className="primary-button" href="/tools/tier-builder/"><AppIcon name="tools" size={18} />Open Tier Builder</Link>
      </aside>
      <TierBoard />
    </div>
  );
}
