import { describe, expect, it } from "vitest";
import { cookies } from "./cookies";
import { tierList, tierRanks } from "./tier-list";

describe("combined tier list", () => {
  it("keeps every ranked Cookie unique and present in the catalog", () => {
    const rankedIds = tierRanks.flatMap((rank) => tierList[rank]);
    const catalogIds = cookies.map(({ id }) => id);

    expect(rankedIds).toHaveLength(90);
    expect(new Set(rankedIds).size).toBe(rankedIds.length);
    rankedIds.forEach((id) => expect(catalogIds).toContain(id));
  });

  it("keeps the reference tier sizes", () => {
    expect(Object.fromEntries(tierRanks.map((rank) => [rank, tierList[rank].length]))).toEqual({
      S: 9,
      A: 10,
      B: 25,
      C: 14,
      D: 32,
    });
  });

  it("matches the supplied S through D ranking order", () => {
    expect(tierList.S).toEqual([
      "cookie4028", "cookie4026", "cookie0678", "chardonnay", "cookie4010",
      "cookie4019", "cookie0126", "cookie0181", "cookie0063",
    ]);
    expect(tierList.A).toEqual([
      "cookie4027", "cookie4013", "cookie0672", "cookie0676", "cookie4014",
      "cookie0136", "cookie0018", "cookie4024", "cookie0518", "cookie0532",
    ]);
    expect(tierList.B).toEqual([
      "cookie4025", "cookie0675", "cookie0674", "cookie0103", "cookie4018",
      "cookie0059", "cookie0037", "cookie4017", "cookie4006", "cookie0070",
      "cookie0040", "cookie0513", "cookie4003", "cookie0673", "cookie0077",
      "cookie0081", "cookie4029", "cookie0515", "cookie0027", "cookie0023",
      "cookie0054", "cookie3001", "cookie0503", "cookie0038", "cookie0250",
    ]);
    expect(tierList.C).toEqual([
      "cookie0677", "cookie4012", "cookie0570", "cookie1004", "cookie0048",
      "cookie0573", "cookie0003", "cookie0527", "cookie0511", "cookie0072",
      "cookie0035", "cookie0053", "cookie0069", "cookie2006",
    ]);
    expect(tierList.D).toEqual([
      "cookie0001", "cookie0002", "cookie0007", "cookie0008", "cookie0009", "cookie0010", "cookie0011", "cookie0012",
      "cookie0013", "cookie0015", "cookie0020", "cookie0025", "cookie0028", "cookie0034", "cookie0042", "cookie0045",
      "cookie0047", "cookie0050", "cookie0052", "cookie0056", "cookie0058", "cookie0101", "cookie0106", "cookie0107",
      "cookie0195", "cookie0502", "cookie0522", "cookie4001", "cookie4002", "cookie4021", "cookie4022", "cookie4023",
    ]);
  });
});
