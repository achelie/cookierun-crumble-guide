import { SynergyBadge } from "@/components/synergy-badge";
import type { Cookie } from "@/data/cookies";
import { calculateTeamSynergies } from "@/lib/team-synergy";

export function SynergySummary({ cookies }: { cookies: Cookie[] }) {
  const summary = calculateTeamSynergies(cookies);

  return (
    <section className="synergy-summary" aria-label="Team synergy summary">
      <div className="synergy-summary__panel synergy-summary__panel--granted">
        <span>Granted</span>
        <div>{summary.granted.length ? summary.granted.map((value) => <SynergyBadge key={value} value={value} direction="granted" />) : <small>None yet</small>}</div>
      </div>
      <div className="synergy-summary__panel synergy-summary__panel--active">
        <span>Active</span>
        <div>{summary.active.length ? summary.active.map((value) => <SynergyBadge key={value} value={value} direction="active" />) : <small>Needs a matching receiver</small>}</div>
        <b>{summary.activeApplications} matches</b>
      </div>
    </section>
  );
}
