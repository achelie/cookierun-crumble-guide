import { describe, expect, it } from "vitest";
import type { Cookie } from "@/data/cookies";
import { calculateTeamSynergies } from "./team-synergy";

const makeCookie = (overrides: Partial<Cookie>): Cookie => ({
  id: "cookie-test",
  name: "Test Cookie",
  rarity: "C",
  image: "/images/cookies/test.webp",
  element: "Fire",
  role: "Support",
  grantedSynergies: [],
  receivedSynergies: [],
  buffs: [],
  ...overrides,
});

describe("calculateTeamSynergies", () => {
  it("returns ordered unique granted and active synergies", () => {
    const result = calculateTeamSynergies([
      makeCookie({ grantedSynergies: ["Chain", "Pierce"] }),
      makeCookie({ id: "receiver", grantedSynergies: ["Chain"], receivedSynergies: ["Pierce"] }),
    ]);
    expect(result).toEqual({ granted: ["Chain", "Pierce"], active: ["Pierce"], activeApplications: 1 });
  });

  it("counts every active receive application", () => {
    const result = calculateTeamSynergies([
      makeCookie({ grantedSynergies: ["Area"] }),
      makeCookie({ id: "one", receivedSynergies: ["Area"] }),
      makeCookie({ id: "two", receivedSynergies: ["Area"] }),
    ]);
    expect(result.activeApplications).toBe(2);
  });

  it("returns empty values for an empty team", () => {
    expect(calculateTeamSynergies([])).toEqual({ granted: [], active: [], activeApplications: 0 });
  });
});
