"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TeamShowcase } from "@/components/team-showcase";
import { AppIcon } from "@/components/ui/icon";
import type { RecommendedTeam } from "@/data/teams";
import { paginateTeams, teamsPageSize } from "@/lib/team-pagination";

export function TeamsExplorer({ teams }: { teams: RecommendedTeam[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const listRef = useRef<HTMLElement>(null);
  const rawPage = searchParams.get("page");
  const pagination = paginateTeams(teams, rawPage ?? "1");

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
    if (Number.isFinite(parsedPage) && parsedPage === pagination.page) return;

    const next = new URLSearchParams(searchParams.toString());
    if (pagination.page === 1) next.delete("page");
    else next.set("page", String(pagination.page));
    const nextQuery = next.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [pagination.page, pathname, rawPage, router, searchParams]);

  return (
    <div className="teams-explorer">
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
