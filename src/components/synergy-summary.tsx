import { I18nElement } from "@/i18n/elements";
import { SynergyBadge } from "@/components/synergy-badge";
import type { Cookie } from "@/data/cookies";
import { calculateTeamSynergies } from "@/lib/team-synergy";

export function SynergySummary({ cookies }: { cookies: Cookie[] }) {
  const summary = calculateTeamSynergies(cookies);

  return (
    <I18nElement as="section" className="synergy-summary" aria-label="Team synergy summary">
      <I18nElement as="div" className="synergy-summary__panel synergy-summary__panel--granted">
        <I18nElement as="span">Granted</I18nElement>
        <I18nElement as="div">{summary.granted.length ? summary.granted.map((value) => <SynergyBadge key={value} value={value} direction="granted" />) : <I18nElement as="small">None yet</I18nElement>}</I18nElement>
      </I18nElement>
      <I18nElement as="div" className="synergy-summary__panel synergy-summary__panel--active">
        <I18nElement as="span">Active</I18nElement>
        <I18nElement as="div">{summary.active.length ? summary.active.map((value) => <SynergyBadge key={value} value={value} direction="active" />) : <I18nElement as="small">Needs a matching receiver</I18nElement>}</I18nElement>
        <I18nElement as="b">{summary.activeApplications} matches</I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
