import { describe, expect, it } from "vitest";
import { parseTeamQuery, serializeTeamQuery } from "./team-query";

const cookieIds = new Set(["cookie-a", "cookie-b"]);
const petIds = new Set(["pet-a", "pet-b"]);

describe("team query", () => {
  it("preserves slot order and empty slots", () => {
    expect(parseTeamQuery("cookie-a,,cookie-b", "pet-b,,pet-a", cookieIds, petIds)).toEqual({
      cookies: ["cookie-a", null, "cookie-b", ...Array(9).fill(null)],
      pets: ["pet-b", null, "pet-a"],
    });
  });

  it("removes unknown and duplicate members", () => {
    expect(parseTeamQuery("cookie-a,missing,cookie-a", "pet-a,pet-a", cookieIds, petIds)).toEqual({
      cookies: ["cookie-a", null, null, ...Array(9).fill(null)],
      pets: ["pet-a", null, null],
    });
  });

  it("serializes both formations and keeps interior gaps", () => {
    expect(serializeTeamQuery(["cookie-a", null], [null, "pet-b"])).toEqual({
      team: "cookie-a",
      pets: ",pet-b",
    });
  });
});
