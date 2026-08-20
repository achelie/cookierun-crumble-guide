import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { TierBoard } from "@/components/tier-board";
import { tierUpdatedAt } from "@/data/tier-list";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Cookie Tier List", "Current CookieRun: Crumble PvE and PvP cookie rankings from S through D tier.", "/tier-list/");

export default function TierListPage() {
  return <div className="page-shell"><PageIntro eyebrow={`Checked ${tierUpdatedAt}`} title="The current pecking order." description="Swap between stage PvE and arena PvP. The board uses the latest public game-data snapshot." icon="trophy" /><TierBoard /></div>;
}
