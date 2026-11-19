import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { LocaleLink as Link } from "@/i18n/elements";
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
import { DirectAnswer } from "@/components/direct-answer";
import { teamsAnswer } from "@/lib/direct-answers";
import { teamsPageSize } from "@/lib/team-pagination";
import type { Locale } from "@/i18n/config";

const page = seoPages.teams;
export const metadata: Metadata = pageMetadata(page);

export default function TeamsPage() {
  return <TeamsView locale="en" />;
}

export function TeamsView({ locale }: { locale: Locale }) {
  const firstPage = recommendedTeams.slice(0, teamsPageSize);
  return (
    <I18nElement as="div" className="page-shell page-shell--teams">
      <StructuredData data={collectionPageSchema(page, firstPage.map((team) => ({ "@type": "CreativeWork", name: team.name, description: team.description })))} />
      <Suspense fallback={null}><LegacyTeamQueryRedirect /></Suspense>
      <SeoPageHeader page={page} icon="users" answer={<DirectAnswer date={page.updatedAt} locale={locale}>{teamsAnswer(recommendedTeams.length, firstPage.length)[locale]}</DirectAnswer>} />
      <I18nElement as="aside" className="page-crosslink" aria-label="Related Cookie rankings">
        <AppIcon name="trophy" size={16} />
        <I18nElement as="span">Not sure which Cookie deserves your next upgrade?</I18nElement>
        <Link href="/tier-list/">Check the current tier list<AppIcon name="chevron" size={14} /></Link>
      </I18nElement>
      <I18nElement as="aside" className="builder-inline-link" aria-label="Team Builder">
        <AppIcon name="tools" size={15} />
        <I18nElement as="span">Need a custom lineup?</I18nElement>
        <Link href="/tools/team-builder/">Open Team Builder<AppIcon name="chevron" size={13} /></Link>
      </I18nElement>
      <Suspense fallback={<TeamsExplorerFallback teams={recommendedTeams} />}>
        <TeamsExplorer teams={recommendedTeams} />
      </Suspense>
    </I18nElement>
  );
}
