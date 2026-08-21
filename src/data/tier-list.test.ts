import { describe, expect, it } from "vitest";
import { cookies } from "./cookies";
import { tierList, tierRanks } from "./tier-list";

describe("combined tier list", () => {
  it("ranks all 70 Cookies exactly once", () => {
    const rankedIds = tierRanks.flatMap((rank) => tierList[rank]);
    const catalogIds = cookies.map(({ id }) => id);

    expect(rankedIds).toHaveLength(70);
    expect(new Set(rankedIds).size).toBe(70);
    expect(new Set(rankedIds)).toEqual(new Set(catalogIds));
  });

  it("keeps the reference tier sizes", () => {
    expect(Object.fromEntries(tierRanks.map((rank) => [rank, tierList[rank].length]))).toEqual({
      S: 14,
      A: 11,
      B: 8,
      C: 9,
      D: 28,
    });
  });
});
