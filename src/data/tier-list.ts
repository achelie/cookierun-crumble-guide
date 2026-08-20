// Public Stage and Arena snapshot checked on 2026-08-19.
export const tierRanks = ["S", "A", "B", "C", "D"] as const;
export type TierRank = (typeof tierRanks)[number];
export type TierMode = "pve" | "pvp";

export const tierList: Record<TierMode, Record<TierRank, string[]>> = {
  pve: {
    S: ["cookie0070", "cookie0181", "cookie4019", "cookie0126"],
    A: ["cookie3001", "cookie0573", "cookie0072", "cookie0515", "cookie4024", "cookie0103"],
    B: ["cookie0511", "cookie0035", "cookie0136", "cookie4017", "cookie0518", "cookie0106", "cookie0527"],
    C: ["cookie4012", "cookie0570", "cookie1004", "cookie0513"],
    D: [],
  },
  pvp: {
    S: ["cookie0070", "cookie4019", "cookie0063", "cookie4003"],
    A: ["cookie0181", "cookie0106", "cookie0511", "cookie0527", "cookie0570"],
    B: ["cookie0072", "cookie0126", "cookie0103", "cookie0136"],
    C: ["cookie4017", "cookie0518", "cookie0035"],
    D: [],
  },
};

export const tierUpdatedAt = "August 19, 2026";
