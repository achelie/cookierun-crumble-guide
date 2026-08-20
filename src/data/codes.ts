// Public coupon snapshot checked on 2026-08-19. No expired codes were listed.
export type RedeemCode = {
  code: string;
  rewards: string[];
  expires: string;
  status: "active" | "expired";
};

export const codes: RedeemCode[] = [
  {
    code: "COOKIERUNCRUMBLENO1",
    rewards: ["10,000 Crystals", "1,000 Flames of Bravery", "1,000 Lucky Dough", "1,000 Rune Crystals"],
    expires: "Aug 25, 2026 at 23:59 KST",
    status: "active",
  },
  {
    code: "COOKIERUNCRUMBLE1ST",
    rewards: ["10,000 Crystals", "1,000 Flames of Bravery", "1,000 Stellar Points", "10 x 1-hour Auto-Hunt Coins"],
    expires: "Aug 25, 2026 at 23:59 KST",
    status: "active",
  },
];
