import { describe, expect, it } from "vitest";
import { cookieById } from "./cookies";
import * as petData from "./pets";
import { recommendedTeams, teamsUpdatedAt } from "./teams";

const newStageTeams = [
  {
    id: "brightseeker-stage-core",
    cookies: ["cookie0059", "cookie4013", "cookie3001", "cookie0126", "cookie4019", "cookie0063", "cookie0573", "cookie0515", "cookie4010", "cookie0018", "cookie4024", "cookie0103"],
    pets: ["pet4001", "pet0111", "pet4003"],
  },
  {
    id: "forest-stump",
    cookies: ["cookie0059", "cookie0181", "cookie0503", "cookie0126", "cookie4019", "cookie0063", "cookie4013", "cookie0515", "cookie4010", "cookie4003", "cookie4024", "cookie0103"],
    pets: ["pet4001", "pet0111", "pet0046"],
  },
  {
    id: "hammer-princess",
    cookies: ["cookie0059", "cookie0181", "cookie0126", "cookie0018", "cookie0054", "cookie4024", "cookie4013", "cookie4010", "cookie0023", "cookie4003", "cookie4019", "cookie0063"],
    pets: ["pet4001", "pet4003", "pet0069"],
  },
] as const;

const addedTeams = [
  {
    id: "pinot-noir-multistrike-boss",
    cookies: ["cookie0070", "cookie4013", "cookie3001", "cookie0126", "cookie4019", "cookie0063", "cookie0059", "cookie0515", "cookie4010", "cookie0018", "cookie4024", "cookie0103"],
    pets: ["pet0069", "pet4005", "pet4001"],
    updatedAt: "2026-09-04",
  },
  {
    id: "strawberry-crepe-rapid-aoe",
    cookies: ["cookie0059", "cookie0181", "cookie3001", "cookie0126", "cookie4024", "cookie0063", "cookie4013", "cookie0515", "cookie4010", "cookie4019", "cookie0518", "cookie0103"],
    pets: ["pet4005", "pet4001", "pet0111"],
    updatedAt: "2026-09-02",
  },
  {
    id: "wind-archer-guild-conquest",
    cookies: ["cookie0070", "cookie0181", "cookie0040", "cookie0126", "cookie3001", "cookie4024", "cookie0059", "cookie0515", "cookie4010", "cookie0018", "cookie4019", "cookie0103"],
    pets: ["pet4001", "pet0111", "pet0069"],
    updatedAt: "2026-09-02",
  },
] as const;

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

  it("puts the newly added formations first with the latest date", () => {
    expect(teamsUpdatedAt).toBe("2026-09-04");
    expect(recommendedTeams.slice(0, 3).map((team) => team.id)).toEqual(addedTeams.map((team) => team.id));

    for (const expected of addedTeams) {
      const team = recommendedTeams.find((candidate) => candidate.id === expected.id);
      expect(team?.cookies).toEqual(expected.cookies);
      expect(team?.pets).toEqual(expected.pets);
      expect(team?.updatedAt).toBe(expected.updatedAt);
    }
  });

  it("preserves the previous team order and update date", () => {
    expect(recommendedTeams.slice(3, 6).map((team) => team.id)).toEqual(newStageTeams.map((team) => team.id));

    for (const expected of newStageTeams) {
      const team = recommendedTeams.find((candidate) => candidate.id === expected.id);
      expect(team?.cookies).toEqual(expected.cookies);
      expect(team?.pets).toEqual(expected.pets);
      expect(team?.updatedAt).toBe("2026-08-31");
    }

    expect(recommendedTeams.slice(3).every((team) => team.updatedAt === "2026-08-31")).toBe(true);
  });

  it("uses distinct ids and copy without long dash characters", () => {
    expect(new Set(recommendedTeams.map((team) => team.id)).size).toBe(recommendedTeams.length);
    recommendedTeams.forEach((team) => {
      expect(`${team.name} ${team.kicker} ${team.description}`).not.toMatch(/[—–]/);
    });
  });
});
