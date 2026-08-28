export const rarities = ["TSSR", "SSR", "SR", "R", "U", "C"] as const;
export const cookiesUpdatedAt = "2026-08-28";
export type Rarity = (typeof rarities)[number];

export const elements = ["Fire", "Water", "Grass", "Light", "Dark"] as const;
export const roles = ["Charge", "Ranged", "Defense", "Support"] as const;
export const synergies = ["Area", "Chain", "Duration", "Multi-shot", "Multi-strike", "Pierce", "Projectile Speed"] as const;
export const buffs = [
  "ATK Down", "ATK Up", "Accuracy Down", "Accuracy Up", "Damage Taken Down", "DEF Down", "DEF Up",
  "Shield", "Skill Amp Up", "Move Speed Down", "Move Speed Up", "CRIT DMG Up", "CRIT Chance Up", "Healing",
  "Boss DMG Up", "Healing Received Down", "Knock-up Resistance Up",
] as const;

export type Element = (typeof elements)[number];
export type Role = (typeof roles)[number];
export type Synergy = (typeof synergies)[number];
export type Buff = (typeof buffs)[number];

type ImageDefinition = { label: string; image: string };

export const elementDefinitions: Record<Element, ImageDefinition> = {
  Fire: { label: "Fire", image: "/images/elements/fire.webp" },
  Water: { label: "Water", image: "/images/elements/water.webp" },
  Grass: { label: "Grass", image: "/images/elements/grass.webp" },
  Light: { label: "Light", image: "/images/elements/light.webp" },
  Dark: { label: "Dark", image: "/images/elements/dark.webp" },
};

export const roleDefinitions: Record<Role, ImageDefinition> = {
  Charge: { label: "Charge", image: "/images/roles/charge.webp" },
  Ranged: { label: "Ranged", image: "/images/roles/ranged.webp" },
  Defense: { label: "Defense", image: "/images/roles/defense.webp" },
  Support: { label: "Support", image: "/images/roles/support.webp" },
};

export const synergyDefinitions: Record<Synergy, ImageDefinition> = {
  Area: { label: "Area", image: "/images/synergies/area-of-effect.webp" },
  Chain: { label: "Chain", image: "/images/synergies/chain.webp" },
  Duration: { label: "Duration", image: "/images/synergies/duration.webp" },
  "Multi-shot": { label: "Multi-shot", image: "/images/synergies/multishot.webp" },
  "Multi-strike": { label: "Multi-strike", image: "/images/synergies/multistrike.webp" },
  Pierce: { label: "Pierce", image: "/images/synergies/pierce.webp" },
  "Projectile Speed": { label: "Projectile Speed", image: "/images/synergies/projectile-speed.webp" },
};

export const buffDefinitions: Record<Buff, { label: string }> = Object.fromEntries(
  buffs.map((buff) => [buff, { label: buff }]),
) as Record<Buff, { label: string }>;

export const synergyBadgeImages = {
  grantedBackground: "/images/synergy-badges/send-bg.webp",
  grantedArrow: "/images/synergy-badges/send-arrow.webp",
  receivedBackground: "/images/synergy-badges/receive-bg.webp",
  receivedArrow: "/images/synergy-badges/receive-arrow.webp",
} as const;

export type Cookie = {
  id: string;
  name: string;
  rarity: Rarity;
  image: string;
  element: Element;
  role: Role;
  grantedSynergies: Synergy[];
  receivedSynergies: Synergy[];
  buffs: Buff[];
};

export const cookies: Cookie[] = [
  { id: "cookie0001", name: "GingerBrave", rarity: "C", image: "/images/cookies/cookie0001.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0002", name: "Strawberry Cookie", rarity: "C", image: "/images/cookies/cookie0002.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: [] },
  { id: "cookie0003", name: "GingerBright", rarity: "C", image: "/images/cookies/cookie0003.webp", element: "Light", role: "Charge", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: ["ATK Down"] },
  { id: "cookie0007", name: "Ninja Cookie", rarity: "C", image: "/images/cookies/cookie0007.webp", element: "Dark", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Multi-shot"], buffs: [] },
  { id: "cookie0008", name: "Princess Cookie", rarity: "U", image: "/images/cookies/cookie0008.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0009", name: "Knight Cookie", rarity: "U", image: "/images/cookies/cookie0009.webp", element: "Light", role: "Defense", grantedSynergies: ["Area"], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0010", name: "Coffee Cookie", rarity: "U", image: "/images/cookies/cookie0010.webp", element: "Water", role: "Support", grantedSynergies: ["Duration"], receivedSynergies: ["Multi-strike"], buffs: ["Accuracy Up"] },
  { id: "cookie0011", name: "Skater Cookie", rarity: "C", image: "/images/cookies/cookie0011.webp", element: "Water", role: "Charge", grantedSynergies: [], receivedSynergies: ["Chain"], buffs: [] },
  { id: "cookie0012", name: "Angel Cookie", rarity: "U", image: "/images/cookies/cookie0012.webp", element: "Light", role: "Support", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: [] },
  { id: "cookie0013", name: "Zombie Cookie", rarity: "U", image: "/images/cookies/cookie0013.webp", element: "Grass", role: "Defense", grantedSynergies: [], receivedSynergies: ["Projectile Speed"], buffs: [] },
  { id: "cookie0015", name: "Muscle Cookie", rarity: "C", image: "/images/cookies/cookie0015.webp", element: "Dark", role: "Defense", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0018", name: "Skating Queen Cookie", rarity: "SSR", image: "/images/cookies/cookie0018.webp", element: "Water", role: "Charge", grantedSynergies: ["Chain"], receivedSynergies: ["Duration"], buffs: ["CRIT DMG Up"] },
  { id: "cookie0020", name: "Cheerleader Cookie", rarity: "U", image: "/images/cookies/cookie0020.webp", element: "Water", role: "Support", grantedSynergies: ["Duration"], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0023", name: "Devil Cookie", rarity: "U", image: "/images/cookies/cookie0023.webp", element: "Dark", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Pierce"], buffs: ["DEF Down"] },
  { id: "cookie0025", name: "Wizard Cookie", rarity: "C", image: "/images/cookies/cookie0025.webp", element: "Light", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Multi-strike"], buffs: [] },
  { id: "cookie0027", name: "Rockstar Cookie", rarity: "SR", image: "/images/cookies/cookie0027.webp", element: "Fire", role: "Support", grantedSynergies: ["Pierce"], receivedSynergies: ["Area"], buffs: ["Shield"] },
  { id: "cookie0028", name: "Cherry Cookie", rarity: "R", image: "/images/cookies/cookie0028.webp", element: "Fire", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Multi-strike"], buffs: [] },
  { id: "cookie0034", name: "Alchemist Cookie", rarity: "R", image: "/images/cookies/cookie0034.webp", element: "Water", role: "Ranged", grantedSynergies: ["Projectile Speed"], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0035", name: "Vampire Cookie", rarity: "SSR", image: "/images/cookies/cookie0035.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: ["Chain"], buffs: ["Accuracy Down"] },
  { id: "cookie0037", name: "Cheesecake Cookie", rarity: "R", image: "/images/cookies/cookie0037.webp", element: "Light", role: "Support", grantedSynergies: ["Multi-shot"], receivedSynergies: ["Pierce"], buffs: ["ATK Up"] },
  { id: "cookie0038", name: "Adventurer Cookie", rarity: "U", image: "/images/cookies/cookie0038.webp", element: "Grass", role: "Charge", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: [] },
  { id: "cookie0040", name: "Tiger Lily Cookie", rarity: "SR", image: "/images/cookies/cookie0040.webp", element: "Grass", role: "Charge", grantedSynergies: ["Multi-shot"], receivedSynergies: ["Duration"], buffs: [] },
  { id: "cookie0042", name: "Blackberry Cookie", rarity: "R", image: "/images/cookies/cookie0042.webp", element: "Dark", role: "Charge", grantedSynergies: [], receivedSynergies: ["Projectile Speed"], buffs: [] },
  { id: "cookie0045", name: "Cocoa Cookie", rarity: "R", image: "/images/cookies/cookie0045.webp", element: "Water", role: "Defense", grantedSynergies: [], receivedSynergies: ["Projectile Speed"], buffs: [] },
  { id: "cookie0047", name: "Red Pepper Cookie", rarity: "U", image: "/images/cookies/cookie0047.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0048", name: "Cream Puff Cookie", rarity: "SSR", image: "/images/cookies/cookie0048.webp", element: "Light", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: [] },
  { id: "cookie0050", name: "Gumball Cookie", rarity: "U", image: "/images/cookies/cookie0050.webp", element: "Water", role: "Defense", grantedSynergies: [], receivedSynergies: ["Multi-shot"], buffs: ["Move Speed Down"] },
  { id: "cookie0052", name: "Lemon Cookie", rarity: "SR", image: "/images/cookies/cookie0052.webp", element: "Light", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Projectile Speed"], buffs: [] },
  { id: "cookie0053", name: "Orange Cookie", rarity: "SR", image: "/images/cookies/cookie0053.webp", element: "Water", role: "Support", grantedSynergies: ["Multi-strike"], receivedSynergies: ["Duration"], buffs: ["CRIT Chance Up"] },
  { id: "cookie0054", name: "Lime Cookie", rarity: "SR", image: "/images/cookies/cookie0054.webp", element: "Water", role: "Support", grantedSynergies: ["Chain"], receivedSynergies: ["Multi-shot"], buffs: ["CRIT Chance Up", "Healing"] },
  { id: "cookie0056", name: "Peach Cookie", rarity: "SR", image: "/images/cookies/cookie0056.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: [] },
  { id: "cookie0058", name: "Onion Cookie", rarity: "U", image: "/images/cookies/cookie0058.webp", element: "Dark", role: "Support", grantedSynergies: [], receivedSynergies: ["Area"], buffs: ["ATK Down"] },
  { id: "cookie0059", name: "Macaron Cookie", rarity: "SR", image: "/images/cookies/cookie0059.webp", element: "Grass", role: "Support", grantedSynergies: ["Area"], receivedSynergies: ["Multi-strike"], buffs: ["CRIT Chance Up"] },
  { id: "cookie0063", name: "Herb Cookie", rarity: "SR", image: "/images/cookies/cookie0063.webp", element: "Grass", role: "Support", grantedSynergies: ["Multi-shot"], receivedSynergies: ["Multi-strike"], buffs: ["Healing"] },
  { id: "cookie0069", name: "Pancake Cookie", rarity: "SR", image: "/images/cookies/cookie0069.webp", element: "Grass", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: ["DEF Down"] },
  { id: "cookie0070", name: "Wind Archer Cookie", rarity: "TSSR", image: "/images/cookies/cookie0070.webp", element: "Grass", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Pierce"], buffs: [] },
  { id: "cookie0072", name: "Strawberry Shortcake Cookie", rarity: "SSR", image: "/images/cookies/cookie0072.webp", element: "Grass", role: "Charge", grantedSynergies: ["Pierce"], receivedSynergies: ["Projectile Speed"], buffs: ["Move Speed Up"] },
  { id: "cookie0101", name: "Popcorn Cookie", rarity: "SR", image: "/images/cookies/cookie0101.webp", element: "Light", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: [] },
  { id: "cookie0103", name: "Dark Choco Cookie", rarity: "SSR", image: "/images/cookies/cookie0103.webp", element: "Dark", role: "Defense", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: ["DEF Down"] },
  { id: "cookie0106", name: "Space Doughnut", rarity: "R", image: "/images/cookies/cookie0106.webp", element: "Light", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Pierce"], buffs: [] },
  { id: "cookie0107", name: "Dr. Wasabi Cookie", rarity: "SR", image: "/images/cookies/cookie0107.webp", element: "Grass", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Multi-strike"], buffs: [] },
  { id: "cookie0126", name: "Pomegranate Cookie", rarity: "SSR", image: "/images/cookies/cookie0126.webp", element: "Dark", role: "Support", grantedSynergies: ["Projectile Speed"], receivedSynergies: ["Multi-shot"], buffs: ["Skill Amp Up"] },
  { id: "cookie0136", name: "Ion Cookie Robot", rarity: "SSR", image: "/images/cookies/cookie0136.webp", element: "Water", role: "Defense", grantedSynergies: [], receivedSynergies: ["Multi-shot"], buffs: ["Shield"] },
  { id: "cookie0181", name: "Scorpion Cookie", rarity: "SSR", image: "/images/cookies/cookie0181.webp", element: "Fire", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Multi-shot", "Duration"], buffs: [] },
  { id: "cookie0195", name: "Dr. Bones Cookie", rarity: "SR", image: "/images/cookies/cookie0195.webp", element: "Grass", role: "Support", grantedSynergies: [], receivedSynergies: ["Chain"], buffs: [] },
  { id: "cookie0502", name: "Poison Mushroom Cookie", rarity: "R", image: "/images/cookies/cookie0502.webp", element: "Dark", role: "Charge", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0503", name: "Licorice Cookie", rarity: "SR", image: "/images/cookies/cookie0503.webp", element: "Dark", role: "Defense", grantedSynergies: [], receivedSynergies: ["Multi-shot"], buffs: [] },
  { id: "cookie0511", name: "Madeleine Cookie", rarity: "SSR", image: "/images/cookies/cookie0511.webp", element: "Light", role: "Defense", grantedSynergies: [], receivedSynergies: ["Projectile Speed", "Area"], buffs: [] },
  { id: "cookie0513", name: "Espresso Cookie", rarity: "SSR", image: "/images/cookies/cookie0513.webp", element: "Grass", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0515", name: "Rye Cookie", rarity: "SR", image: "/images/cookies/cookie0515.webp", element: "Fire", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Multi-strike"], buffs: [] },
  { id: "cookie0518", name: "Strawberry Crepe Cookie", rarity: "SSR", image: "/images/cookies/cookie0518.webp", element: "Light", role: "Defense", grantedSynergies: [], receivedSynergies: ["Multi-strike"], buffs: [] },
  { id: "cookie0522", name: "Lilac Cookie", rarity: "R", image: "/images/cookies/cookie0522.webp", element: "Dark", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Pierce"], buffs: [] },
  { id: "cookie0527", name: "Twizzly Gummy Cookie", rarity: "SSR", image: "/images/cookies/cookie0527.webp", element: "Dark", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Chain"], buffs: [] },
  { id: "cookie0532", name: "Tea Knight Cookie", rarity: "SSR", image: "/images/cookies/cookie0532.webp", element: "Light", role: "Defense", grantedSynergies: [], receivedSynergies: ["Area"], buffs: ["DEF Up", "Boss DMG Up"] },
  { id: "cookie0570", name: "Schwarzwälder", rarity: "SSR", image: "/images/cookies/cookie0570.webp", element: "Fire", role: "Defense", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie0573", name: "Milky Way Cookie", rarity: "SSR", image: "/images/cookies/cookie0573.webp", element: "Light", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie1004", name: "Cream Soda Cookie", rarity: "SSR", image: "/images/cookies/cookie1004.webp", element: "Water", role: "Charge", grantedSynergies: ["Area"], receivedSynergies: ["Projectile Speed"], buffs: [] },
  { id: "cookie2006", name: "Witchberry Cookie", rarity: "SR", image: "/images/cookies/cookie2006.webp", element: "Dark", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Pierce"], buffs: [] },
  { id: "cookie3001", name: "Melon Soda Cookie", rarity: "SSR", image: "/images/cookies/cookie3001.webp", element: "Water", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Multi-strike"], buffs: [] },
  { id: "cookie4001", name: "Dark Cherry Cookie", rarity: "R", image: "/images/cookies/cookie4001.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: ["Multi-strike"], buffs: [] },
  { id: "cookie4002", name: "Berry Yogurt Cookie", rarity: "R", image: "/images/cookies/cookie4002.webp", element: "Water", role: "Defense", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie4003", name: "Grapevine Cookie", rarity: "R", image: "/images/cookies/cookie4003.webp", element: "Grass", role: "Support", grantedSynergies: ["Multi-strike"], receivedSynergies: ["Area"], buffs: ["Healing"] },
  { id: "cookie4006", name: "Cool Mint Cookie", rarity: "SSR", image: "/images/cookies/cookie4006.webp", element: "Water", role: "Charge", grantedSynergies: [], receivedSynergies: ["Multi-shot", "Duration"], buffs: [] },
  { id: "cookie4010", name: "Pinot Noir Cookie", rarity: "SSR", image: "/images/cookies/cookie4010.webp", element: "Dark", role: "Support", grantedSynergies: ["Multi-strike"], receivedSynergies: ["Chain"], buffs: ["Healing Received Down", "Knock-up Resistance Up"] },
  { id: "cookie4012", name: "Oven Wanderer Cookie", rarity: "TSSR", image: "/images/cookies/cookie4012.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: ["Chain"], buffs: [] },
  { id: "cookie4013", name: "Brightseeker Cookie", rarity: "TSSR", image: "/images/cookies/cookie4013.webp", element: "Light", role: "Ranged", grantedSynergies: [], receivedSynergies: ["Duration"], buffs: [] },
  { id: "cookie4017", name: "Toothpaste Cookie", rarity: "SSR", image: "/images/cookies/cookie4017.webp", element: "Grass", role: "Support", grantedSynergies: ["Area"], receivedSynergies: ["Multi-shot"], buffs: ["Healing"] },
  { id: "cookie4018", name: "Space Doughnut's Royal Excellence", rarity: "SSR", image: "/images/cookies/cookie4018.webp", element: "Light", role: "Support", grantedSynergies: [], receivedSynergies: ["Multi-strike", "Duration"], buffs: [] },
  { id: "cookie4019", name: "Milk Cookie's Crunchy Strong Pediatrician", rarity: "SSR", image: "/images/cookies/cookie4019.webp", element: "Light", role: "Support", grantedSynergies: ["Duration"], receivedSynergies: ["Projectile Speed"], buffs: ["ATK Up", "Healing"] },
  { id: "cookie4021", name: "Blueberry Bird", rarity: "C", image: "/images/cookies/cookie4021.webp", element: "Water", role: "Support", grantedSynergies: [], receivedSynergies: ["Multi-shot"], buffs: ["DEF Up"] },
  { id: "cookie4022", name: "Sugar Gnome", rarity: "C", image: "/images/cookies/cookie4022.webp", element: "Grass", role: "Charge", grantedSynergies: [], receivedSynergies: ["Area"], buffs: [] },
  { id: "cookie4023", name: "Bear Jelly Worker", rarity: "R", image: "/images/cookies/cookie4023.webp", element: "Fire", role: "Charge", grantedSynergies: [], receivedSynergies: ["Multi-strike"], buffs: [] },
  { id: "cookie4024", name: "Nameless Cake Hound", rarity: "SSR", image: "/images/cookies/cookie4024.webp", element: "Fire", role: "Defense", grantedSynergies: [], receivedSynergies: ["Area"], buffs: ["Damage Taken Down"] },
];

export const cookieById = new Map(cookies.map((cookie) => [cookie.id, cookie]));
