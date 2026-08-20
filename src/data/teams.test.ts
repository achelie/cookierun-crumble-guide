import { describe, expect, it } from "vitest";
import { cookieById } from "./cookies";
import * as petData from "./pets";
import { recommendedTeams } from "./teams";

describe("recommended teams", () => {
  it("contains 12 valid cookies and 3 valid pets per team", () => {
    const petById = (petData as typeof petData & { petById?: Map<string, unknown> }).petById;
    expect(petById).toBeInstanceOf(Map);
    for (const team of recommendedTeams) {
      const record = team as typeof team & { pets?: string[] };
      expect(team.cookies).toHaveLength(12);
      expect(record.pets).toHaveLength(3);
      team.cookies.forEach((id) => expect(cookieById.has(id), id).toBe(true));
      record.pets?.forEach((id) => expect(petById?.has(id), id).toBe(true));
    }
  });
});
