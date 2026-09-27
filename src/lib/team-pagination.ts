import { teamCategories, type RecommendedTeam, type TeamCategory } from "@/data/teams";

export type TeamFilter = TeamCategory | "all";

export function normalizeTeamCategory(value: string | null | undefined): TeamFilter {
  return teamCategories.find((category) => category.slug === value)?.slug ?? "all";
}

export function filterTeams(items: RecommendedTeam[], category: TeamFilter) {
  return category === "all" ? items : items.filter((team) => team.category === category);
}

export const teamsPageSize = 7;

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
