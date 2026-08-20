import type { Rarity } from "./cookies";

// Public game-data snapshot checked on 2026-08-19.

export type Pet = {
  id: string;
  name: string;
  rarity: Exclude<Rarity, "TSSR">;
  image: string;
  effects: string[];
};

const effectsById: Partial<Record<string, string[]>> = {
  pet0029: ["CRIT Chance Up"],
  pet0037: ["Water allies gain CRIT DMG"],
  pet0046: ["Fire allies gain ATK"],
  pet0047: ["Grants Chain synergy", "Chain receivers gain ATK"],
  pet0050: ["Water allies gain ATK"],
  pet0052: ["DEF Up"],
  pet0053: ["Grants Projectile Speed synergy", "Projectile Speed receivers gain ATK"],
  pet0056: ["Dark allies gain CRIT DMG"],
  pet0059: ["Grass allies gain ATK"],
  pet0064: ["Light allies gain ATK"],
  pet0074: ["Dark allies gain ATK"],
  pet0080: ["Grants Area synergy", "Area receivers gain ATK"],
  pet0110: ["Grants Duration synergy", "Duration receivers gain ATK"],
  pet0111: ["Skill Amp Up"],
  pet0115: ["Resistance Chance Up"],
  pet0134: ["Charge allies gain CRIT Chance"],
  pet0135: ["Defense allies gain CRIT Resistance"],
  pet0141: ["Ranged allies gain CRIT DMG"],
  pet0142: ["Support allies gain Skill Amp"],
  pet0154: ["Dodge Up"],
  pet0183: ["Accuracy Up"],
  pet0184: ["Fire allies gain CRIT DMG"],
  pet0186: ["Grass allies gain CRIT DMG"],
  pet0187: ["Light allies gain CRIT DMG"],
  pet0207: ["Focus Chance Up"],
  pet0216: ["ATK Up"],
  pet0230: ["Damage Reduction Up"],
  pet0239: ["Charge allies gain Damage Reduction"],
  pet0243: ["Defense allies gain Dodge"],
  pet0252: ["Ranged allies gain Accuracy"],
  pet0517: ["Support allies gain Focus Chance"],
  pet1004: ["Max HP Up"],
  pet4001: ["All allies gain ATK"],
  pet4003: ["Max HP Up"],
  pet4004: ["All allies gain CRIT DMG"],
};

const raw = [
  ["pet0001", "Choco Drop", "C"], ["pet0002", "Cheese Drop", "C"],
  ["pet0005", "Dust Unicorn", "C"], ["pet0010", "Unpeeled Garlic", "C"],
  ["pet0012", "Little Ghost", "R"], ["pet0017", "Dragon's Tail", "U"],
  ["pet0018", "Brain Gum", "U"], ["pet0019", "Mocha Delight", "U"],
  ["pet0020", "Celestial Star", "U"], ["pet0028", "Flame Bat", "U"],
  ["pet0029", "Gold Drop", "SSR"], ["pet0037", "Yule Log Cake", "SSR"],
  ["pet0046", "Apple Rabbit", "SR"], ["pet0047", "Fluffy Cheese Cat", "SSR"],
  ["pet0050", "Lemon Slice", "SR"], ["pet0052", "Kiwi Bird", "SSR"],
  ["pet0053", "Furball Pup", "SSR"], ["pet0056", "Marshmallow Hamster", "SSR"],
  ["pet0059", "Owlcorn", "SR"], ["pet0064", "Mini Orange Mouse", "SR"],
  ["pet0069", "Panda Dumpling", "R"], ["pet0074", "Sweet Rice Seal", "SR"],
  ["pet0080", "Banana Lion", "SSR"], ["pet0104", "Dark Spirit Helmet", "R"],
  ["pet0106", "Cloud Pelican", "R"], ["pet0109", "Pocket Strawberry", "U"],
  ["pet0110", "Octo Wasabi", "SSR"], ["pet0111", "Hot Doggie", "SSR"],
  ["pet0115", "Avocatapult", "SSR"], ["pet0131", "Fruit Doe", "R"],
  ["pet0132", "Carrot Cake Rabbit", "R"], ["pet0134", "Firestarter", "SR"],
  ["pet0135", "Milk Angel", "SR"], ["pet0141", "Junior Sleuth Ted", "SR"],
  ["pet0142", "Lord Crumbles III", "SR"], ["pet0147", "Jingle Deer", "R"],
  ["pet0154", "Mango Toucan", "SSR"], ["pet0183", "Rooty", "SSR"],
  ["pet0184", "Floral Froglet", "SSR"], ["pet0186", "Pterosatchel", "SSR"],
  ["pet0187", "Bonbon Birdy", "SSR"], ["pet0197", "Floofy Fruity", "R"],
  ["pet0207", "Yakgwa Pupper", "SSR"], ["pet0216", "Creamtese", "SR"],
  ["pet0230", "Icy Birdie", "SR"], ["pet0239", "Eggbeak", "SSR"],
  ["pet0243", "Breadog", "SSR"], ["pet0252", "Berry Angrybeak", "SSR"],
  ["pet0517", "Constable Whiskers", "SSR"], ["pet1004", "Soda Dollop", "SR"],
  ["pet4001", "Holy Baby Drop", "SSR"], ["pet4002", "Toofie", "R"],
  ["pet4003", "Majestic King Choco Drop", "SSR"], ["pet4004", "Sweet n' Sour", "SSR"],
] as const;

export const pets: Pet[] = raw.map(([id, name, rarity]) => ({
  id,
  name,
  rarity,
  image: `/images/pets/${id}.webp`,
  effects: effectsById[id] ?? [],
}));

export const petById = new Map(pets.map((pet) => [pet.id, pet]));
