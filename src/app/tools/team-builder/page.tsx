import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { TeamBuilder } from "@/components/team-builder";
import { TeamBuilderSkeleton } from "@/components/team-builder-skeleton";
import { AppIcon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Team Builder",
  "Build a 12-Cookie and 3-Pet formation, reorder every slot, copy the URL, and download a watermarked PNG.",
  "/tools/team-builder/",
);

export default function TeamBuilderPage() {
  return (
    <div className="page-shell page-shell--builder">
      <PageIntro eyebrow="Team Builder" title="Put all 15 slots to work." description="Drag Cookies and Pets into place, then save the URL or download your formation." icon="users" />
      <nav className="builder-route-nav" aria-label="Builder navigation">
        <Link href="/tools/"><AppIcon name="tools" size={17} />All tools</Link>
        <Link href="/tools/tier-builder/">Open Tier List Builder<AppIcon name="chevron" size={17} /></Link>
      </nav>
      <Suspense fallback={<TeamBuilderSkeleton />}><TeamBuilder /></Suspense>
    </div>
  );
}
