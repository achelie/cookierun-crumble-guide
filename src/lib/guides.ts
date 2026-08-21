import {
  getGuideCategory,
  guideCategories,
  guidePageSize,
  type GuideCategorySlug,
  type GuideSummary,
} from "@/data/guides";

export type GuideFilters = {
  query?: string;
  category?: string;
  page?: string | number;
};

export function normalizeGuideCategory(value?: string): GuideCategorySlug | "all" {
  if (!value || value === "all") return "all";
  return guideCategories.some((category) => category.slug === value)
    ? (value as GuideCategorySlug)
    : "all";
}

export function filterGuides(items: GuideSummary[], filters: GuideFilters) {
  const category = normalizeGuideCategory(filters.category);
  const query = filters.query?.trim().toLocaleLowerCase() ?? "";

  return items.filter((guide) => {
    if (category !== "all" && guide.category !== category) return false;
    if (!query) return true;

    const searchable = [
      guide.title,
      guide.excerpt,
      getGuideCategory(guide.category).label,
      ...guide.tags,
    ].join(" ").toLocaleLowerCase();

    return searchable.includes(query);
  });
}

export function normalizeGuidePage(value: string | number | undefined, totalItems: number) {
  const raw = typeof value === "number" ? value : Number.parseInt(value ?? "1", 10);
  const pageCount = Math.max(1, Math.ceil(totalItems / guidePageSize));
  if (!Number.isFinite(raw)) return 1;
  return Math.min(pageCount, Math.max(1, Math.trunc(raw)));
}

export function paginateGuides(items: GuideSummary[], pageValue?: string | number) {
  const pageCount = Math.max(1, Math.ceil(items.length / guidePageSize));
  const page = normalizeGuidePage(pageValue, items.length);
  const start = (page - 1) * guidePageSize;
  return {
    items: items.slice(start, start + guidePageSize),
    page,
    pageCount,
    total: items.length,
  };
}

export function getRelatedGuides(current: GuideSummary, items: GuideSummary[], limit = 3) {
  return items
    .filter((guide) => guide.slug !== current.slug)
    .map((guide) => ({
      guide,
      categoryMatch: guide.category === current.category ? 1 : 0,
      sharedTags: guide.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter((candidate) => candidate.categoryMatch > 0 || candidate.sharedTags > 0)
    .sort((a, b) =>
      b.categoryMatch - a.categoryMatch
      || b.sharedTags - a.sharedTags
      || b.guide.updatedAt.localeCompare(a.guide.updatedAt),
    )
    .slice(0, limit)
    .map((candidate) => candidate.guide);
}
