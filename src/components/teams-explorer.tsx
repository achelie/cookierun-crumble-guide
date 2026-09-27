"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TeamShowcase } from "@/components/team-showcase";
import { AppIcon } from "@/components/ui/icon";
import { teamCategories, type RecommendedTeam } from "@/data/teams";
import { filterTeams, normalizeTeamCategory, paginateTeams, teamsPageSize, type TeamFilter } from "@/lib/team-pagination";

export function TeamsExplorer({ teams }: { teams: RecommendedTeam[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const listRef = useRef<HTMLElement>(null);
  const rawPage = searchParams.get("page");
  const rawCategory = searchParams.get("category");
  const category = normalizeTeamCategory(rawCategory);
  const filtered = filterTeams(teams, category);
  const pagination = paginateTeams(filtered, rawPage ?? "1");

  function updateCategory(nextCategory: TeamFilter) {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("page");
    if (nextCategory === "all") next.delete("category");
    else next.set("category", nextCategory);
    const nextQuery = next.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }

  function updatePage(page: number, shouldFocusList = false) {
    const next = new URLSearchParams(searchParams.toString());
    if (page === 1) next.delete("page");
    else next.set("page", String(page));

    const nextQuery = next.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });

    if (shouldFocusList) {
      window.requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        listRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });
    }
  }

  useEffect(() => {
    const parsedPage = Number(rawPage ?? "1");
    const invalidCategory = rawCategory !== null && rawCategory !== category;
    if (!invalidCategory && Number.isFinite(parsedPage) && parsedPage === pagination.page) return;

    const next = new URLSearchParams(searchParams.toString());
    if (category === "all") next.delete("category");
    else next.set("category", category);
    if (pagination.page === 1) next.delete("page");
    else next.set("page", String(pagination.page));
    const nextQuery = next.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [category, pagination.page, pathname, rawCategory, rawPage, router, searchParams]);

  return (
    <div className="teams-explorer">
      <div className="teams-filters" role="group" aria-label="Team categories">
        {[{ slug: "all", label: "All" } as const, ...teamCategories].map((item) => (
          <button
            key={item.slug}
            type="button"
            aria-pressed={category === item.slug}
            className={category === item.slug ? "is-active" : ""}
            onClick={() => updateCategory(item.slug)}
          >
            {item.label}<span>{filterTeams(teams, item.slug).length}</span>
          </button>
        ))}
      </div>
      <p className="teams-result-line" role="status">{pagination.total} {pagination.total === 1 ? "team" : "teams"}{category !== "all" && ` in ${teamCategories.find((item) => item.slug === category)?.label}`}</p>
      <section ref={listRef} className="recommended-teams" aria-label="Recommended teams">
        {pagination.items.map((team) => <TeamShowcase team={team} key={team.id} />)}
      </section>
      <nav className="teams-pagination" aria-label="Teams pagination">
        <button type="button" disabled={pagination.page === 1} onClick={() => updatePage(pagination.page - 1, true)}>
          <AppIcon name="chevron-left" size={16} />Previous
        </button>
        <span>Page <strong>{pagination.page}</strong> of {pagination.pageCount}</span>
        <button type="button" disabled={pagination.page === pagination.pageCount} onClick={() => updatePage(pagination.page + 1, true)}>
          Next<AppIcon name="chevron" size={16} />
        </button>
      </nav>
    </div>
  );
}

export function TeamsExplorerFallback({ teams }: { teams: RecommendedTeam[] }) {
  return (
    <div className="teams-explorer" aria-busy="true">
      <section className="recommended-teams" aria-label="Recommended teams">
        {teams.slice(0, teamsPageSize).map((team) => <TeamShowcase team={team} key={team.id} />)}
      </section>
    </div>
  );
}
