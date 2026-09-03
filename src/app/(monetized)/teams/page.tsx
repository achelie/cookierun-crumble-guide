import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LegacyTeamQueryRedirect } from "@/components/legacy-team-query-redirect";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { TeamsExplorer, TeamsExplorerFallback } from "@/components/teams-explorer";
import { AppIcon } from "@/components/ui/icon";
import { recommendedTeams } from "@/data/teams";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";

const page = seoPages.teams;
export const metadata: Metadata = pageMetadata(page);

export default function TeamsPage() {
  return (
    <div className="page-shell page-shell--teams">
      <StructuredData data={collectionPageSchema(page, recommendedTeams.map((team) => ({ "@type": "CreativeWork", name: team.name, description: team.description })))} />
      <Suspense fallback={null}><LegacyTeamQueryRedirect /></Suspense>
      <SeoPageHeader page={page} icon="users" />
      <aside className="page-crosslink" aria-label="Related Cookie rankings">
        <AppIcon name="trophy" size={16} />
        <span>Not sure which Cookie deserves your next upgrade?</span>
        <Link href="/tier-list/">Check the current tier list<AppIcon name="chevron" size={14} /></Link>
      </aside>
      <aside className="builder-inline-link" aria-label="Team Builder">
        <AppIcon name="tools" size={15} />
        <span>Need a custom lineup?</span>
        <Link href="/tools/team-builder/">Open Team Builder<AppIcon name="chevron" size={13} /></Link>
      </aside>
      <Suspense fallback={<TeamsExplorerFallback teams={recommendedTeams} />}>
        <TeamsExplorer teams={recommendedTeams} />
      </Suspense>
    </div>
  );
}
