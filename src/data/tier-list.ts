// Combined PvP and PvE ranking updated on 2026-10-09.
export const tierRanks = ["S", "A", "B", "C", "D"] as const;
export type TierRank = (typeof tierRanks)[number];

const placedTierList: Record<Exclude<TierRank, "D">, string[]> = {
  S: [
    "chardonnay", "cookie4025", "cookie0081",
    "cookie4013", "cookie4010", "cookie0070", "cookie0250", "cookie4019", "cookie0126", "cookie0532", "cookie0103",
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

export const tierList: Record<TierRank, string[]> = {
  ...placedTierList,
  // Keep this ranking snapshot fixed when the catalog gains unreviewed Cookies.
  D: [
    "cookie0001", "cookie0002", "cookie0007", "cookie0008", "cookie0009", "cookie0010", "cookie0011", "cookie0012",
    "cookie0013", "cookie0015", "cookie0020", "cookie0025", "cookie0028", "cookie0034", "cookie0042", "cookie0045",
    "cookie0047", "cookie0050", "cookie0052", "cookie0056", "cookie0058", "cookie0101", "cookie0106", "cookie0107",
    "cookie0195", "cookie0502", "cookie0522", "cookie4001", "cookie4002", "cookie4021", "cookie4022", "cookie4023",
  ],
};

export const tierUpdatedAt = "2026-10-09";
