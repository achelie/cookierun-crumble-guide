"use client";

import { I18nElement } from "@/i18n/elements";
import { useTranslator } from "@/i18n/provider";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GuideCard } from "@/components/guide-card";
import { AppIcon } from "@/components/ui/icon";
import { guideCategories, type GuideSummary } from "@/data/guides";
import { filterGuides, normalizeGuideCategory, paginateGuides } from "@/lib/guides";

export function GuidesExplorer({ guides }: { guides: GuideSummary[] }) {
  const t = useTranslator();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const rawCategory = searchParams.get("category") ?? "all";
  const category = normalizeGuideCategory(rawCategory);
  const filtered = filterGuides(guides, { query, category }, t);
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
    <I18nElement as="div" className="guides-explorer">
      <I18nElement as="div" className="guides-controls">
        <I18nElement as="label" className="guides-search">
          <I18nElement as="span" className="sr-only">Search guides</I18nElement>
          <AppIcon name="search" size={19} />
          <I18nElement as="input"
            type="search"
            value={query}
            placeholder="Search guides, tags, or topics"
            onChange={(event) => updateParams({ q: event.target.value, page: 1 })}
          />
        </I18nElement>
        <I18nElement as="div" className="guides-categories" aria-label="Guide categories">
          <I18nElement as="button" type="button" className={category === "all" ? "is-active" : ""} onClick={() => updateParams({ category: "all", page: 1 })}>
            All <I18nElement as="span">{guides.length}</I18nElement>
          </I18nElement>
          {guideCategories.map((item) => {
            const count = guides.filter((guide) => guide.category === item.slug).length;
            if (count === 0) return null;
            return (
              <I18nElement as="button" key={item.slug} type="button" className={category === item.slug ? "is-active" : ""} onClick={() => updateParams({ category: item.slug, page: 1 })}>
                {item.label} <I18nElement as="span">{count}</I18nElement>
              </I18nElement>
            );
          })}
        </I18nElement>
      </I18nElement>

      <I18nElement as="div" className="guides-result-line">
        <I18nElement as="strong">{pagination.total} {pagination.total === 1 ? "guide" : "guides"}</I18nElement>
        {(query || category !== "all") && <I18nElement as="span">matching your filters</I18nElement>}
      </I18nElement>

      {pagination.items.length > 0 ? (
        <>
          <I18nElement as="div" className="guides-grid">
            {pagination.items.map((guide, index) => <GuideCard key={guide.slug} guide={guide} featured={index === 0} />)}
          </I18nElement>
          <I18nElement as="nav" className="guides-pagination" aria-label="Guides pagination">
            <I18nElement as="button" type="button" disabled={pagination.page === 1} onClick={() => updateParams({ page: pagination.page - 1 })}>
              <AppIcon name="chevron-left" size={16} />Previous
            </I18nElement>
            <I18nElement as="span">Page <I18nElement as="strong">{pagination.page}</I18nElement> of {pagination.pageCount}</I18nElement>
            <I18nElement as="button" type="button" disabled={pagination.page === pagination.pageCount} onClick={() => updateParams({ page: pagination.page + 1 })}>
              Next<AppIcon name="chevron" size={16} />
            </I18nElement>
          </I18nElement>
        </>
      ) : (
        <I18nElement as="div" className="guides-empty">
          <AppIcon name="book" size={34} />
          <I18nElement as="h2">No guide fits that search.</I18nElement>
          <I18nElement as="p">Clear the filters and the whole notebook comes back.</I18nElement>
          <I18nElement as="button" type="button" onClick={() => router.replace(pathname, { scroll: false })}>Clear search and category</I18nElement>
        </I18nElement>
      )}
    </I18nElement>
  );
}

export function GuidesExplorerFallback({ guides }: { guides: GuideSummary[] }) {
  return (
    <I18nElement as="div" className="guides-explorer" aria-busy="true">
      <I18nElement as="div" className="guides-controls guides-controls--loading"><I18nElement as="div" /><I18nElement as="div" /></I18nElement>
      <I18nElement as="div" className="guides-grid">{guides[0] && <GuideCard guide={guides[0]} featured />}</I18nElement>
    </I18nElement>
  );
}
