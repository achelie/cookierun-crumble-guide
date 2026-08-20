import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { TierListBuilder } from "@/components/tier-list-builder";
import { TeamBuilderSkeleton } from "@/components/team-builder-skeleton";
import { AppIcon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Tier List Builder",
  "Rank every Cookie from S through D, load PvE or PvP presets, copy the URL, and download a watermarked PNG.",
  "/tools/tier-builder/",
);

export default function TierBuilderPage() {
  return (
    <div className="page-shell page-shell--builder">
      <PageIntro eyebrow="Tier List Builder" title="Rank the whole roster." description="Move Cookies across five tiers, keep every order in the URL, and download the result." icon="trophy" />
      <nav className="builder-route-nav" aria-label="Builder navigation">
        <Link href="/tools/"><AppIcon name="tools" size={17} />All tools</Link>
        <Link href="/tools/team-builder/">Open Team Builder<AppIcon name="chevron" size={17} /></Link>
      </nav>
      <Suspense fallback={<TeamBuilderSkeleton />}><TierListBuilder /></Suspense>
    </div>
  );
}
