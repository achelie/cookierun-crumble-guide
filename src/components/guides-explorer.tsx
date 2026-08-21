"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GuideCard } from "@/components/guide-card";
import { AppIcon } from "@/components/ui/icon";
import { guideCategories, type GuideSummary } from "@/data/guides";
import { filterGuides, normalizeGuideCategory, paginateGuides } from "@/lib/guides";

export function GuidesExplorer({ guides }: { guides: GuideSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const rawCategory = searchParams.get("category") ?? "all";
  const category = normalizeGuideCategory(rawCategory);
  const filtered = filterGuides(guides, { query, category });
  const pagination = paginateGuides(filtered, searchParams.get("page") ?? "1");

  function updateParams(updates: Record<string, string | number | undefined>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === "all" || (key === "page" && value === 1)) next.delete(key);
      else next.set(key, String(value));
    });
    const nextQuery = next.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }

  useEffect(() => {
    const rawPage = searchParams.get("page");
    const parsedPage = Number.parseInt(rawPage ?? "1", 10);
    const invalidCategory = rawCategory !== "all" && category === "all";
    const invalidPage = !Number.isFinite(parsedPage) || parsedPage !== pagination.page;
    if (invalidCategory || invalidPage) {
      updateParams({ category, page: pagination.page });
    }
  }, [category, pagination.page, rawCategory, searchParams]);

  return (
    <div className="guides-explorer">
      <div className="guides-controls">
        <label className="guides-search">
          <span className="sr-only">Search guides</span>
          <AppIcon name="search" size={19} />
          <input
            type="search"
            value={query}
            placeholder="Search guides, tags, or topics"
            onChange={(event) => updateParams({ q: event.target.value, page: 1 })}
          />
        </label>
        <div className="guides-categories" aria-label="Guide categories">
          <button type="button" className={category === "all" ? "is-active" : ""} onClick={() => updateParams({ category: "all", page: 1 })}>
            All <span>{guides.length}</span>
          </button>
          {guideCategories.map((item) => {
            const count = guides.filter((guide) => guide.category === item.slug).length;
            return (
              <button key={item.slug} type="button" className={category === item.slug ? "is-active" : ""} onClick={() => updateParams({ category: item.slug, page: 1 })}>
                {item.label} <span>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="guides-result-line">
        <strong>{pagination.total} {pagination.total === 1 ? "guide" : "guides"}</strong>
        {(query || category !== "all") && <span>matching your filters</span>}
      </div>

      {pagination.items.length > 0 ? (
        <>
          <div className="guides-grid">
            {pagination.items.map((guide, index) => <GuideCard key={guide.slug} guide={guide} featured={index === 0} />)}
          </div>
          <nav className="guides-pagination" aria-label="Guides pagination">
            <button type="button" disabled={pagination.page === 1} onClick={() => updateParams({ page: pagination.page - 1 })}>
              <AppIcon name="chevron-left" size={16} />Previous
            </button>
            <span>Page <strong>{pagination.page}</strong> of {pagination.pageCount}</span>
            <button type="button" disabled={pagination.page === pagination.pageCount} onClick={() => updateParams({ page: pagination.page + 1 })}>
              Next<AppIcon name="chevron" size={16} />
            </button>
          </nav>
        </>
      ) : (
        <div className="guides-empty">
          <AppIcon name="book" size={34} />
          <h2>No guide fits that search.</h2>
          <p>Clear the filters and the whole notebook comes back.</p>
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })}>Clear search and category</button>
        </div>
      )}
    </div>
  );
}

export function GuidesExplorerFallback({ guides }: { guides: GuideSummary[] }) {
  return (
    <div className="guides-explorer" aria-busy="true">
      <div className="guides-controls guides-controls--loading"><div /><div /></div>
      <div className="guides-grid">{guides[0] && <GuideCard guide={guides[0]} featured />}</div>
    </div>
  );
}
