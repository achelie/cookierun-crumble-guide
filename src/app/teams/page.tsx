import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { TeamBuilder } from "@/components/team-builder";
import { TeamBuilderSkeleton } from "@/components/team-builder-skeleton";
import { TeamShowcase } from "@/components/team-showcase";
import { recommendedTeams } from "@/data/teams";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Best Teams and Team Builder", "Try recommended CookieRun: Crumble teams or build a 12-cookie and 3-pet lineup with a shareable URL.", "/teams/");

export default function TeamsPage() {
  return (
    <div className="page-shell page-shell--teams">
      <PageIntro eyebrow="Teams" title="Borrow a lineup. Then break it." description="Start with three practical teams or fill 12 Cookie and 3 Pet slots yourself. The URL remembers every slot." icon="users" />
      <section className="recommended-teams" aria-label="Recommended teams">
        {recommendedTeams.map((team, index) => <TeamShowcase team={team} index={index} key={team.id} />)}
      </section>
      <Suspense fallback={<TeamBuilderSkeleton />}><TeamBuilder /></Suspense>
    </div>
  );
}
