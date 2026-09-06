export type RecommendedTeam = {
  id: string;
  name: string;
  kicker: string;
  description: string;
  cookies: string[];
  pets: string[];
  updatedAt: string;
  guideReference?: {
    href: string;
    leadIn: string;
    anchor: string;
    followUp: string;
  };
};

export const teamsUpdatedAt = "2026-09-06";

export const recommendedTeams: RecommendedTeam[] = [
  {
    id: "september-general-purpose",
    name: "General Purpose Team",
    kicker: "Story stages and everyday farming",
    description: "Scorpion and Brightseeker handle bosses; Rye, Melon Soda, and Strawberry Crepe clear waves. Pinot Noir keeps attacks and healing moving through knock-ups. Keep Chargemellow for Multi-strike damage; swap Crepe for Ion Cookie Robot if the opening hit keeps killing your team.",
    cookies: ["cookie0059","cookie0181","cookie3001","cookie0126","cookie4024","cookie0063","cookie4013","cookie0515","cookie4010","cookie4019","cookie0518","cookie0103"],
    pets: ["pet4005","pet4001","pet0111"],
    updatedAt: "2026-09-06",
    guideReference: {
      href: "/guides/cookie-run-crumble-arena-healing-down-team-guide/",
      leadIn: "For PvP adjustments, see the ",
      anchor: "Arena healing reduction guide",
      followUp: ".",
    },
  },
  {
    id: "september-gingercraven",
    name: "Gingercraven Team",
    kicker: "Survive until Ion's shield arrives",
    description: "Keep GingerBright alive long enough to apply ATK Down, then let Ion's shield protect the team. Icy Birdie reduces incoming damage; Grapevine adds healing instead of Pinot Noir's anti-lift support. Retry early deaths or missed Scorpion poison. Swap Devil for Dark Choco if Devil keeps dying.",
    cookies: ["cookie0059","cookie0181","cookie0126","cookie4003","cookie4024","cookie0063","cookie4013","cookie0515","cookie0023","cookie4019","cookie0136","cookie0003"],
    pets: ["pet4001","pet0230","pet0111"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-cool-mint-choco-werehound",
    name: "Cool Mint & Choco Werehound Team",
    kicker: "Keep attacking through knock-ups",
    description: "Pair Pinot Noir with Panda Dumpling for Lift Resistance so attackers and healers spend less time airborne. This lets you fight Cool Mint without relying on the corner tactic. Chargemellow boosts the Multi-strike core. If survival fails, swap Devil for Dark Choco or Strawberry Crepe for Ion.",
    cookies: ["cookie0059","cookie0181","cookie3001","cookie0126","cookie4019","cookie0518","cookie4013","cookie0515","cookie4010","cookie0023","cookie4024","cookie0063"],
    pets: ["pet0069","pet0111","pet4005"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-rune-crystal-exp",
    name: "Rune Crystal & EXP Dungeon Team",
    kicker: "Single-target damage with a safety net",
    description: "Scorpion, Brightseeker, and Rye focus the boss while Devil applies DEF Down. Octo Wasabi supports Duration users, including Scorpion and Brightseeker. Keep Ion, GingerBright, and the healing core for harder floors; switch Devil to Dark Choco if repeated deaths cost more damage than the extra debuff gains.",
    cookies: ["cookie0059","cookie0181","cookie0126","cookie4003","cookie4024","cookie0063","cookie4013","cookie0515","cookie0023","cookie4019","cookie0136","cookie0003"],
    pets: ["pet0110","pet4001","pet0111"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-coin-dough",
    name: "Coin & Dough Dungeon Team",
    kicker: "Clear crowded waves; also works for Innovite",
    description: "Wind Archer and Milky Way clear groups, with Milky Way adding crowd control. Dark Choco supplies DEF Down; Grapevine provides healing and Multi-strike support. These dungeons do not need Pinot Noir's anti-lift utility. Use Espresso or Witchberry as an AoE substitute, or Ion if survival limits your clears.",
    cookies: ["cookie0070","cookie0573","cookie0126","cookie4003","cookie4024","cookie0063","cookie0059","cookie3001","cookie0018","cookie4019","cookie0518","cookie0103"],
    pets: ["pet4004","pet0111","pet4001"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-plaque-tower",
    name: "Plaque Tower Team",
    kicker: "Bring AoE for packed floors",
    description: "Use the dungeon AoE core to clear crowded floors. Sweet n' Sour is an early-game pet option. If you change the lineup, match the pet to your carries: Octo Wasabi for a Brightseeker and Scorpion setup, or Chargemellow for a Multi-strike setup. Add Ion if the team falls before clearing waves.",
    cookies: ["cookie0070","cookie0573","cookie0126","cookie4003","cookie4024","cookie0063","cookie0059","cookie3001","cookie0018","cookie4019","cookie0518","cookie0103"],
    pets: ["pet4004","pet4001","pet0111"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-arena",
    name: "Arena Team",
    kicker: "Early picks, AoE, and crowd control",
    description: "Brightseeker and Rye pressure enemies immediately; Milky Way adds crowd control and Strawberry Crepe adds AoE. Keep Herb for recovery despite healing reduction. Icy Birdie helps absorb the opening burst. Test Espresso in Crepe's slot if needed, and adjust to the opponents on your server.",
    cookies: ["cookie0059","cookie4013","cookie4018","cookie0126","cookie4024","cookie0063","cookie0573","cookie0515","cookie4010","cookie4019","cookie0518","cookie0103"],
    pets: ["pet4001","pet0230","pet0111"],
    updatedAt: "2026-09-06",
  },
  {
    id: "strawberry-crepe-rapid-aoe",
    name: "Strawberry Crepe Rapid AoE Team",
    kicker: "Keep the damage core, tune Arena survival",
    description: "Use this Rapid AoE formation for packed stages or as an Arena baseline. Herb and Milk still provide recovery, so this is not a no-healer team. Keep the damage core, then test Rockstar or extra control when healing reduction makes survival unreliable.",
    cookies: ["cookie0059", "cookie0181", "cookie3001", "cookie0126", "cookie4024", "cookie0063", "cookie4013", "cookie0515", "cookie4010", "cookie4019", "cookie0518", "cookie0103"],
    pets: ["pet4005", "pet4001", "pet0111"],
    updatedAt: "2026-09-05",
    guideReference: {
      href: "/guides/cookie-run-crumble-arena-healing-down-team-guide/",
      leadIn: "The ",
      anchor: "Arena healing reduction guide",
      followUp: " explains when to keep Herb and when shields or control help more.",
    },
  },
  {
    id: "pinot-noir-multistrike-boss",
    name: "Pinot Noir Multi-strike Boss Team",
    kicker: "Let the repeated hits reach full speed",
    description: "Use this as the general Pinot Noir boss preset. Wind Archer, Brightseeker, Melon Soda, and Rye carry the damage while Macaron, Pomegranate, Milk, Herb, Nameless Cake Hound, and Dark Choco keep the full cycle alive. Panda Dumpling adds anti-lift stability beside Pinot Noir.",
    cookies: ["cookie0070", "cookie4013", "cookie3001", "cookie0126", "cookie4019", "cookie0063", "cookie0059", "cookie0515", "cookie4010", "cookie0018", "cookie4024", "cookie0103"],
    pets: ["pet0069", "pet4005", "pet4001"],
    updatedAt: "2026-09-04",
    guideReference: {
      href: "/guides/cookie-run-crumble-pinot-noir-multistrike-scorpion-teams/",
      leadIn: "The ",
      anchor: "Pinot Noir team guide",
      followUp: " explains the Scorpion alternative, anti-knock-up setup, and safe slot swaps.",
    },
  },
  {
    id: "wind-archer-guild-conquest",
    name: "Wind Archer Guild Conquest Team",
    kicker: "A higher ceiling for Guild Conquest bosses",
    description: "Use this when a Guild Conquest boss survives your final push. Wind Archer, Scorpion, Rye, and Melon Soda carry the damage window, while Pomegranate, Milk, and the support core keep buffs, healing, DEF Down, and Lift Resistance online. If Wind Archer is underpromoted, use Milky Way only when its stars and Runes are clearly ahead.",
    cookies: ["cookie0070", "cookie0181", "cookie0040", "cookie0126", "cookie3001", "cookie4024", "cookie0059", "cookie0515", "cookie4010", "cookie0018", "cookie4019", "cookie0103"],
    pets: ["pet4001", "pet0111", "pet0069"],
    updatedAt: "2026-09-02",
    guideReference: {
      href: "/guides/cookie-run-crumble-guild-conquest-team-guide/",
      leadIn: "The ",
      anchor: "Guild Conquest team guide",
      followUp: " covers the Milky Way comparison, Runes, and retry method.",
    },
  },
];

export const teamSize = 12;
export const petTeamSize = 3;
