import { describe, expect, it } from "vitest";
import { cookies } from "./cookies";
import { tierList, tierRanks, tierUpdatedAt } from "./tier-list";

describe("combined tier list", () => {
  it("keeps every ranked Cookie unique and present in the catalog", () => {
    const rankedIds = tierRanks.flatMap((rank) => tierList[rank]);
    const catalogIds = cookies.map(({ id }) => id);

    expect(rankedIds).toHaveLength(73);
    expect(new Set(rankedIds).size).toBe(73);
    rankedIds.forEach((id) => expect(catalogIds).toContain(id));
  });

  it("keeps the reference tier sizes", () => {
    expect(Object.fromEntries(tierRanks.map((rank) => [rank, tierList[rank].length]))).toEqual({
      S: 16,
      A: 11,
      B: 9,
      C: 9,
      D: 28,
    });
  });

  it("places the three newly ranked Cookies first in their reference tiers", () => {
    expect(tierList.S.slice(0, 2)).toEqual(["cookie4013", "cookie4010"]);
    expect(tierList.B[0]).toBe("cookie0532");
    expect(tierUpdatedAt).toBe("2026-08-31");
  });
});
