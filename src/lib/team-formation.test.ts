import { describe, expect, it } from "vitest";
import { placeFormationMember } from "./team-formation";

describe("team formation", () => {
  it("places a roster member in an exact empty slot", () => {
    expect(placeFormationMember([null, null, null], "cookie-a", 2)).toEqual([null, null, "cookie-a"]);
  });

  it("swaps two occupied slots", () => {
    expect(placeFormationMember(["cookie-a", "cookie-b", null], "cookie-a", 1, 0)).toEqual(["cookie-b", "cookie-a", null]);
  });

  it("moves a displaced member to the first empty slot", () => {
    expect(placeFormationMember(["cookie-a", null, "cookie-c"], "cookie-b", 0)).toEqual(["cookie-b", "cookie-a", "cookie-c"]);
  });

  it("does not replace a member when the formation is full", () => {
    const full = ["cookie-a", "cookie-b"];
    expect(placeFormationMember(full, "cookie-c", 0)).toBe(full);
  });
});
