import type { RecommendedTeam } from "@/data/teams";

export const teamsPageSize = 6;

export function normalizeTeamsPage(value: string | number | undefined, totalItems: number) {
  const raw = typeof value === "number" ? value : Number(value ?? "1");
  const pageCount = Math.max(1, Math.ceil(totalItems / teamsPageSize));
  if (!Number.isFinite(raw)) return 1;
  return Math.min(pageCount, Math.max(1, Math.trunc(raw)));
}

export function paginateTeams(items: RecommendedTeam[], pageValue?: string | number) {
  const pageCount = Math.max(1, Math.ceil(items.length / teamsPageSize));
  const page = normalizeTeamsPage(pageValue, items.length);
  const start = (page - 1) * teamsPageSize;

  return {
    items: items.slice(start, start + teamsPageSize),
    page,
    pageCount,
    total: items.length,
  };
}
