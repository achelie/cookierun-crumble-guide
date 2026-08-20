import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { pets } from "./pets";

describe("pet catalog", () => {
  it("keeps all 54 IDs unique and defines an effect list for every pet", () => {
    expect(pets).toHaveLength(54);
    expect(new Set(pets.map(({ id }) => id)).size).toBe(pets.length);
    for (const pet of pets) expect(pet.effects, `${pet.name} effects`).toBeInstanceOf(Array);
  });

  it("includes the current registered effects", () => {
    expect(pets.find(({ id }) => id === "pet0029")?.effects).toContain("CRIT Chance Up");
    expect(pets.find(({ id }) => id === "pet0047")?.effects).toEqual(["Grants Chain synergy", "Chain receivers gain ATK"]);
    expect(pets.find(({ id }) => id === "pet4004")?.effects).toContain("All allies gain CRIT DMG");
  });

  it("ships every pet image locally", () => {
    for (const pet of pets) {
      expect(existsSync(join(process.cwd(), "public", pet.image.replace(/^\//, ""))), pet.image).toBe(true);
    }
  });
});
