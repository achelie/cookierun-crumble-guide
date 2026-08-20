import { rarities, type Rarity } from "@/data/cookies";

const rarityPriority = new Map<Rarity, number>(rarities.map((rarity, index) => [rarity, index]));

export function compareRarityHighToLow(
  left: { rarity: Rarity },
  right: { rarity: Rarity },
) {
  return (rarityPriority.get(left.rarity) ?? rarities.length)
    - (rarityPriority.get(right.rarity) ?? rarities.length);
}

export function sortByRarityHighToLow<T extends { rarity: Rarity }>(items: readonly T[]) {
  return [...items].sort(compareRarityHighToLow);
}
