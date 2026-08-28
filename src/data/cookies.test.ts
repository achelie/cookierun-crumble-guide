import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buffDefinitions,
  cookies,
  elementDefinitions,
  roleDefinitions,
  synergyBadgeImages,
  synergyDefinitions,
} from "./cookies";

describe("cookie catalog", () => {
  it("defines every requested combat field", () => {
    for (const cookie of cookies) {
      const record = cookie as unknown as Record<string, unknown>;
      expect(record.element, `${cookie.name} element`).toBeTypeOf("string");
      expect(record.role, `${cookie.name} role`).toBeTypeOf("string");
      expect(record.grantedSynergies, `${cookie.name} granted synergies`).toBeInstanceOf(Array);
      expect(record.receivedSynergies, `${cookie.name} received synergies`).toBeInstanceOf(Array);
      expect(record.buffs, `${cookie.name} buffs`).toBeInstanceOf(Array);
    }
  });

  it("keeps all current cookie IDs unique", () => {
    expect(cookies).toHaveLength(73);
    expect(new Set(cookies.map(({ id }) => id)).size).toBe(cookies.length);
  });

  it("includes the latest Cookie additions", () => {
    expect(cookies.find(({ id }) => id === "cookie4013")?.name).toBe("Brightseeker Cookie");
    expect(cookies.find(({ id }) => id === "cookie0532")?.buffs).toEqual(["DEF Up", "Boss DMG Up"]);
    expect(cookies.find(({ id }) => id === "cookie4010")?.grantedSynergies).toEqual(["Multi-strike"]);
  });

  it("uses only declared taxonomy values", () => {
    for (const cookie of cookies) {
      expect(elementDefinitions[cookie.element]).toBeDefined();
      expect(roleDefinitions[cookie.role]).toBeDefined();
      cookie.grantedSynergies.forEach((value) => expect(synergyDefinitions[value]).toBeDefined());
      cookie.receivedSynergies.forEach((value) => expect(synergyDefinitions[value]).toBeDefined());
      cookie.buffs.forEach((value) => expect(buffDefinitions[value]).toBeDefined());
    }
  });

  it("ships every referenced game image locally", () => {
    const images = [
      ...cookies.map(({ image }) => image),
      ...Object.values(elementDefinitions).map(({ image }) => image),
      ...Object.values(roleDefinitions).map(({ image }) => image),
      ...Object.values(synergyDefinitions).map(({ image }) => image),
      ...Object.values(synergyBadgeImages),
    ];
    for (const image of images) {
      expect(existsSync(join(process.cwd(), "public", image.replace(/^\//, ""))), image).toBe(true);
    }
  });
});
