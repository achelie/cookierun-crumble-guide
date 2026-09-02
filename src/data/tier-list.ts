import { cookies } from "./cookies";

// Combined PvP and PvE ranking checked on 2026-09-02.
export const tierRanks = ["S", "A", "B", "C", "D"] as const;
export type TierRank = (typeof tierRanks)[number];

const placedTierList: Record<Exclude<TierRank, "D">, string[]> = {
  S: [
    "cookie4013", "cookie4010", "cookie0070", "cookie4019", "cookie0126", "cookie0532", "cookie0103",
    "cookie0181", "cookie0059", "cookie0003",
  ],
  A: [
    "cookie0518", "cookie0018", "cookie3001", "cookie4024", "cookie0573", "cookie0513", "cookie0063",
    "cookie0515", "cookie0037", "cookie4003", "cookie0023",
  ],
  B: [
    "cookie4018", "cookie0136", "cookie4017", "cookie4006", "cookie0027", "cookie0040", "cookie0054",
    "cookie0503", "cookie0038",
  ],
  C: [
    "cookie4012", "cookie0570", "cookie1004", "cookie0048", "cookie0527", "cookie0511", "cookie0072",
    "cookie0035", "cookie0053", "cookie0069", "cookie2006",
  ],
};

const placedCookieIds = new Set(Object.values(placedTierList).flat());

export const tierList: Record<TierRank, string[]> = {
  ...placedTierList,
  D: cookies.map(({ id }) => id).filter((id) => !placedCookieIds.has(id)),
};

export const tierUpdatedAt = "2026-09-02";
