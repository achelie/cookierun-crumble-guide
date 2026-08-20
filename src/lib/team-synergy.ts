import type { Cookie } from "@/data/cookies";

export function calculateTeamSynergies(team: Cookie[]) {
  const granted = Array.from(new Set(team.flatMap((cookie) => cookie.grantedSynergies)));
  const grantedSet = new Set(granted);
  const active = granted.filter((value) => team.some((cookie) => cookie.receivedSynergies.includes(value)));
  const activeSet = new Set(active);
  const activeApplications = team.reduce(
    (total, cookie) => total + cookie.receivedSynergies.filter((value) => activeSet.has(value) && grantedSet.has(value)).length,
    0,
  );

  return { granted, active, activeApplications };
}
