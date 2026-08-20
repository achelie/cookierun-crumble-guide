import { describe, expect, it } from "vitest";
import type { Cookie } from "@/data/cookies";
import { filterCookies } from "./filter-cookies";

const cookies: Cookie[] = [
  { id: "fire", name: "Fire Runner", rarity: "SSR", image: "/fire.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: [], buffs: [] },
  { id: "water", name: "Water Helper", rarity: "SR", image: "/water.webp", element: "Water", role: "Support", grantedSynergies: [], receivedSynergies: [], buffs: [] },
];

describe("filterCookies", () => {
  it("combines name, rarity, element, and role filters", () => {
    expect(filterCookies(cookies, { query: "runner", rarity: "SSR", element: "Fire", role: "Charge" })).toEqual([cookies[0]]);
    expect(filterCookies(cookies, { query: "", rarity: "All", element: "Water", role: "Support" })).toEqual([cookies[1]]);
  });

  it("returns no records when one filter disagrees", () => {
    expect(filterCookies(cookies, { query: "runner", rarity: "SSR", element: "Water", role: "All" })).toEqual([]);
  });
});
