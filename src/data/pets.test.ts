import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { pets } from "./pets";
import catalogSource from "./catalog-source.json";

describe("pet catalog", () => {
  it("keeps all 59 IDs unique and defines an effect list for every pet", () => {
    expect(pets).toHaveLength(59);
    expect(new Set(pets.map(({ id }) => id)).size).toBe(pets.length);
    for (const pet of pets) expect(pet.effects, `${pet.name} effects`).toBeInstanceOf(Array);
  });

  it("matches both new 1.6.002 pet identities and companion effects", () => {
    for (const source of catalogSource.pets) {
      expect(pets.find(({ id }) => id === source.resourceKey)).toMatchObject({
        name: source.names.en,
        rarity: source.rarity,
      });
    }
    expect(pets.find(({ id }) => id === "pet0011")?.effects).toEqual(["Summons gain ATK"]);
    expect(pets.find(({ id }) => id === "pet4006")?.effects).toEqual(["All allies gain Damage Reduction"]);
  });

  it("includes the current registered effects", () => {
    expect(pets.find(({ id }) => id === "pet0029")?.effects).toContain("CRIT Chance Up");
    expect(pets.find(({ id }) => id === "pet0047")?.effects).toEqual(["Grants Chain synergy", "Chain receivers gain ATK"]);
    expect(pets.find(({ id }) => id === "pet4004")?.effects).toContain("All allies gain CRIT DMG");
    expect(pets.find(({ id }) => id === "pet4005")?.effects).toEqual(["Grants Multi-strike synergy", "Multi-strike receivers gain ATK"]);
  });

  it("ships every pet image locally", () => {
    for (const pet of pets) {
      expect(existsSync(join(process.cwd(), "public", pet.image.replace(/^\//, ""))), pet.image).toBe(true);
    }
  });
});
