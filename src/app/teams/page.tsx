import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LegacyTeamQueryRedirect } from "@/components/legacy-team-query-redirect";
import { PageIntro } from "@/components/page-intro";
import { TeamShowcase } from "@/components/team-showcase";
import { AppIcon } from "@/components/ui/icon";
import { recommendedTeams } from "@/data/teams";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Best Teams", "Try practical CookieRun: Crumble teams for general play, free-to-play progress, and bosses.", "/teams/");

export default function TeamsPage() {
  return (
    <div className="page-shell page-shell--teams">
      <Suspense fallback={null}><LegacyTeamQueryRedirect /></Suspense>
      <PageIntro eyebrow="Teams" title="Borrow a lineup. Then break it." description="Start with three practical formations, then take the full roster into the drag-and-drop builder." icon="users" />
      <section className="recommended-teams" aria-label="Recommended teams">
        {recommendedTeams.map((team, index) => <TeamShowcase team={team} index={index} key={team.id} />)}
      </section>
      <aside className="team-tools-callout">
        <div><span className="eyebrow">Your turn</span><h2>Build beyond the presets.</h2><p>Place 12 Cookies and 3 Pets exactly where you want them, then share the lineup as a link or PNG.</p></div>
        <Link className="primary-button" href="/tools/team-builder/"><AppIcon name="tools" size={18} />Open Team Builder</Link>
      </aside>
    </div>
  );
}
