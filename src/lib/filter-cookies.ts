import type { Cookie } from "@/data/cookies";

export type CookieFilters = {
  query: string;
  rarity: string;
  element: string;
  role: string;
};

export function filterCookies(cookies: Cookie[], filters: CookieFilters) {
  const needle = filters.query.trim().toLowerCase();
  return cookies.filter((cookie) =>
    (!needle || cookie.name.toLowerCase().includes(needle))
    && (filters.rarity === "All" || cookie.rarity === filters.rarity)
    && (filters.element === "All" || cookie.element === filters.element)
    && (filters.role === "All" || cookie.role === filters.role),
  );
}
