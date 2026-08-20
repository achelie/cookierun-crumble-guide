// Public coupon snapshot checked on 2026-08-20. No expired codes were listed.
export type CodeReward = {
  label: string;
  amount: string;
  image: string;
};

export type RedeemCode = {
  code: string;
  rewards: CodeReward[];
  expires: string;
  status: "active" | "expired";
};

export const codes: RedeemCode[] = [
  {
    code: "COOKIERUNCRUMBLENO1",
    rewards: [
      { label: "Crystals", amount: "10,000", image: "/images/rewards/crystal.webp" },
      { label: "Flames of Bravery", amount: "1,000", image: "/images/rewards/flame-of-bravery.webp" },
      { label: "Lucky Dough", amount: "1,000", image: "/images/rewards/lucky-dough.webp" },
      { label: "Rune Crystals", amount: "1,000", image: "/images/rewards/rune-crystal.webp" },
    ],
    expires: "Aug 25, 2026 at 23:59 KST",
    status: "active",
  },
  {
    code: "COOKIERUNCRUMBLE1ST",
    rewards: [
      { label: "Crystals", amount: "10,000", image: "/images/rewards/crystal.webp" },
      { label: "Flames of Bravery", amount: "1,000", image: "/images/rewards/flame-of-bravery.webp" },
      { label: "Stellar Points", amount: "1,000", image: "/images/rewards/stellar-point.webp" },
      { label: "1-hour Auto-Hunt Coins", amount: "10", image: "/images/rewards/auto-hunt-coin.webp" },
    ],
    expires: "Aug 25, 2026 at 23:59 KST",
    status: "active",
  },
];
