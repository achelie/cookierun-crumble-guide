import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { codes } from "./codes";

describe("coupon data", () => {
  it("stores each reward as label, amount, and local icon", () => {
    for (const code of codes) {
      expect(code.rewards).toHaveLength(4);
      for (const reward of code.rewards) {
        expect(reward.label).toBeTruthy();
        expect(reward.amount).toBeTruthy();
        expect(reward.image).toMatch(/^\/images\/rewards\//);
        expect(existsSync(join(process.cwd(), "public", reward.image.replace(/^\//, ""))), reward.image).toBe(true);
      }
    }
  });
});
