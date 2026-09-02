import { describe, expect, it } from "vitest";
import { cookies } from "./cookies";
import { tierList, tierRanks, tierUpdatedAt } from "./tier-list";

describe("combined tier list", () => {
  it("keeps every ranked Cookie unique and present in the catalog", () => {
    const rankedIds = tierRanks.flatMap((rank) => tierList[rank]);
    const catalogIds = cookies.map(({ id }) => id);

    expect(rankedIds).toHaveLength(cookies.length);
    expect(new Set(rankedIds).size).toBe(cookies.length);
    rankedIds.forEach((id) => expect(catalogIds).toContain(id));
  });

  it("keeps the reference tier sizes", () => {
    expect(Object.fromEntries(tierRanks.map((rank) => [rank, tierList[rank].length]))).toEqual({
      S: 10,
      A: 11,
      B: 9,
      C: 11,
      D: 32,
    });
  });

  it("matches the supplied S through C ranking order", () => {
    expect(tierList.S).toEqual([
      "cookie4013", "cookie4010", "cookie0070", "cookie4019", "cookie0126", "cookie0532", "cookie0103",
      "cookie0181", "cookie0059", "cookie0003",
    ]);
    expect(tierList.A).toEqual([
      "cookie0518", "cookie0018", "cookie3001", "cookie4024", "cookie0573", "cookie0513", "cookie0063",
      "cookie0515", "cookie0037", "cookie4003", "cookie0023",
    ]);
    expect(tierList.B).toEqual([
      "cookie4018", "cookie0136", "cookie4017", "cookie4006", "cookie0027", "cookie0040", "cookie0054",
      "cookie0503", "cookie0038",
    ]);
    expect(tierList.C).toEqual([
      "cookie4012", "cookie0570", "cookie1004", "cookie0048", "cookie0527", "cookie0511", "cookie0072",
      "cookie0035", "cookie0053", "cookie0069", "cookie2006",
    ]);
  });

  it("puts every Cookie outside S through C into D Tier", () => {
    const placedIds = new Set([...tierList.S, ...tierList.A, ...tierList.B, ...tierList.C]);
    const expectedDTier = cookies.map(({ id }) => id).filter((id) => !placedIds.has(id));

    expect(tierList.D).toEqual(expectedDTier);
    expect(tierUpdatedAt).toBe("2026-09-02");
  });
});
