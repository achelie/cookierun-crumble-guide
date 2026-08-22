import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LegacyTeamQueryRedirect } from "@/components/legacy-team-query-redirect";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { TeamShowcase } from "@/components/team-showcase";
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
      <aside className="team-tools-callout">
        <div><span className="eyebrow">Your turn</span><h2>Build beyond the presets.</h2><p>Place 12 Cookies and 3 Pets exactly where you want them, then share the lineup as a link or PNG.</p></div>
        <Link className="primary-button" href="/tools/team-builder/"><AppIcon name="tools" size={18} />Open Team Builder</Link>
      </aside>
      <section className="recommended-teams" aria-label="Recommended teams">
        {recommendedTeams.map((team, index) => <TeamShowcase team={team} index={index} key={team.id} />)}
      </section>
    </div>
  );
}
