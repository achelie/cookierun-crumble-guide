import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { codes, codesUpdatedAt } from "./codes";

describe("coupon data", () => {
  it("stores each reward as label, amount, and local icon", () => {
    for (const code of codes) {
      expect(code.rewards.length).toBeGreaterThan(0);
      for (const reward of code.rewards) {
        expect(reward.label).toBeTruthy();
        expect(reward.amount).toBeTruthy();
        if (reward.image) {
          expect(reward.image).toMatch(/^\/images\/rewards\//);
          expect(existsSync(join(process.cwd(), "public", reward.image.replace(/^\//, ""))), reward.image).toBe(true);
        }
      }
    }
  });

  it("keeps both August launch coupons in the expired archive", () => {
    expect(codesUpdatedAt).toBe("2026-11-09");
    expect(codes).toHaveLength(3);
    expect(codes.filter((code) => code.status === "active")).toEqual([
      { code: "CAINECOOKIEKNOWS", rewards: [{ label: "Red Doors", amount: "100", image: "/images/rewards/digital-circus-ticket.png" }], status: "active" },
    ]);
    expect(codes.filter((code) => code.status === "expired").map((code) => code.code)).toEqual([
      "COOKIERUNCRUMBLENO1",
      "COOKIERUNCRUMBLE1ST",
    ]);
  });
});
