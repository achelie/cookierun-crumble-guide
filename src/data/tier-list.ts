// Combined PvP and PvE ranking checked on 2026-08-21.
export const tierRanks = ["S", "A", "B", "C", "D"] as const;
export type TierRank = (typeof tierRanks)[number];

export const tierList: Record<TierRank, string[]> = {
  S: [
    "cookie0070", "cookie4019", "cookie0126", "cookie0181", "cookie3001", "cookie0035", "cookie0573",
    "cookie4024", "cookie0059", "cookie0063", "cookie0515", "cookie0040", "cookie4003", "cookie0023",
  ],
  A: [
    "cookie0136", "cookie4017", "cookie0072", "cookie0103", "cookie0527", "cookie0511", "cookie0053",
    "cookie0054", "cookie0101", "cookie0037", "cookie0003",
  ],
  B: [
    "cookie4012", "cookie4018", "cookie4006", "cookie1004", "cookie0018", "cookie0027", "cookie0069",
    "cookie0038",
  ],
  C: [
    "cookie0518", "cookie0513", "cookie0052", "cookie0107", "cookie0195", "cookie0503", "cookie2006",
    "cookie4001", "cookie0502",
  ],
  D: [
    "cookie0048", "cookie0570", "cookie4023", "cookie0056", "cookie0028", "cookie0034", "cookie0042",
    "cookie0045", "cookie0522", "cookie0106", "cookie4002", "cookie0008", "cookie0009", "cookie0010",
    "cookie0012", "cookie0013", "cookie0020", "cookie0047", "cookie0050", "cookie0058", "cookie0001",
    "cookie0002", "cookie0007", "cookie0011", "cookie0015", "cookie0025", "cookie4021", "cookie4022",
  ],
};

export const tierUpdatedAt = "2026-08-21";
