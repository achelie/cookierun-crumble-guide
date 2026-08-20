import { describe, expect, it } from "vitest";
import type { Rarity } from "@/data/cookies";
import { sortByRarityHighToLow } from "./rarity-order";

describe("sortByRarityHighToLow", () => {
  it("orders entities from TSSR through C and keeps ties stable", () => {
    const entities: { id: string; rarity: Rarity }[] = [
      { id: "common", rarity: "C" },
      { id: "ssr-first", rarity: "SSR" },
      { id: "uncommon", rarity: "U" },
      { id: "tssr", rarity: "TSSR" },
      { id: "ssr-second", rarity: "SSR" },
      { id: "rare", rarity: "R" },
      { id: "super-rare", rarity: "SR" },
    ];

    expect(sortByRarityHighToLow(entities).map(({ id }) => id)).toEqual([
      "tssr",
      "ssr-first",
      "ssr-second",
      "super-rare",
      "rare",
      "uncommon",
      "common",
    ]);
    expect(entities[0].id).toBe("common");
  });
});
