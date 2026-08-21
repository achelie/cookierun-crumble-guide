import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LegacyTeamQueryRedirect } from "@/components/legacy-team-query-redirect";
import { TeamShowcase } from "@/components/team-showcase";
import { AppIcon } from "@/components/ui/icon";
import { recommendedTeams } from "@/data/teams";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Best Teams", "Try practical CookieRun: Crumble teams for story stages, bosses, tower floors, and daily dungeons.", "/teams/");

export default function TeamsPage() {
  return (
    <div className="page-shell page-shell--teams">
      <Suspense fallback={null}><LegacyTeamQueryRedirect /></Suspense>
      <h1 className="sr-only">Recommended Teams</h1>
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
