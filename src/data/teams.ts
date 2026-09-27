export const teamCategories = [
  { slug: "story", label: "Story" },
  { slug: "bosses", label: "Bosses" },
  { slug: "dungeons", label: "Dungeons" },
  { slug: "pvp", label: "PvP" },
] as const;

export type TeamCategory = typeof teamCategories[number]["slug"];

export type RecommendedTeam = {
  id: string;
  category: TeamCategory;
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

export const teamsUpdatedAt = "2026-09-27";

export const recommendedTeams: RecommendedTeam[] = [
  {
    id: "moon-rabbit-general-purpose",
    category: "story",
    name: "General Purpose Team",
    kicker: "One preset for waves and most story bosses",
    description: "Milk and Herb handle recovery while Moon Rabbit cuts incoming pressure with ATK Down and CRIT Chance Down. Scorpion, Brightseeker, and Rye bring single-target damage; Melon Soda and Strawberry Crepe help clear groups. If the team keeps dying, trade a damage pet for Icy Birdie, or use Candy Shade Pouch when knock-ups interrupt your healing.",
    cookies: ["cookie0059", "cookie0181", "cookie3001", "cookie0126", "cookie0518", "cookie0103", "cookie4013", "cookie0515", "cookie4010", "cookie4019", "cookie0063", "cookie4025"],
    pets: ["pet4005", "pet4001", "pet0111"],
    updatedAt: "2026-09-27",
  },
  {
    id: "bari-general-purpose-aoe",
    category: "story",
    name: "General Purpose AoE Team",
    kicker: "Clear crowded stages with fewer preset changes",
    description: "Use this preset against packed waves, especially groups of ten or more enemies. Bari, Cherry Cola, and Strawberry Crepe supply group damage while Moon Rabbit protects the team. Bari, Cherry Cola, and Moon Rabbit are flexible slots here: add other AoE attackers if survival already feels comfortable. Match your pets to the new carries instead of keeping Chargemellow after removing its Multi-strike users.",
    cookies: ["cookie0059", "cookie0126", "cookie0081", "cookie4024", "cookie0250", "cookie0103", "cookie4010", "cookie0018", "cookie4019", "cookie0518", "cookie0063", "cookie4025"],
    pets: ["pet0111", "pet4001", "pet4005"],
    updatedAt: "2026-09-27",
  },
  {
    id: "moon-rabbit-gingercraven",
    category: "bosses",
    name: "Gingercraven Team",
    kicker: "Reduce the opening burst, then keep hitting",
    description: "Moon Rabbit takes GingerBright's old job with a sturdier body, stronger ATK Down, and CRIT Chance Down. That protection leaves room for Skating Queen alongside the single-target damage core. Keep Dark Choco for a safer DEF Down slot. Devil applies stronger DEF Down earlier, but only make that swap if he survives. Melon Soda or Popcorn can replace Brightseeker when you do not own him.",
    cookies: ["cookie0059", "cookie0181", "cookie0126", "cookie4003", "cookie4024", "cookie0103", "cookie4013", "cookie0515", "cookie0018", "cookie4019", "cookie0063", "cookie4025"],
    pets: ["pet4001", "pet0230", "pet0111"],
    updatedAt: "2026-09-27",
  },
  {
    id: "moon-rabbit-cool-mint",
    category: "bosses",
    name: "Cool Mint Team",
    kicker: "Keep your healers and attackers on their feet",
    description: "Pinot Noir and Candy Shade Pouch supply the Lift Resistance that makes this setup work. Less time airborne means more attacks and fewer missed heals. Keep Macaron, Pomegranate, and Milk supporting the damage dealers, with Moon Rabbit reducing pressure. Candy Shade Pouch still helps below ten stars; Panda Dumpling is the fallback if you do not own it. Replace Brightseeker with Melon Soda or Popcorn if needed.",
    cookies: ["cookie0059", "cookie0181", "cookie4010", "cookie0023", "cookie4019", "cookie0063", "cookie4013", "cookie0515", "cookie0126", "cookie0018", "cookie4024", "cookie4025"],
    pets: ["pet0228", "pet0111", "pet4005"],
    updatedAt: "2026-09-27",
  },
  {
    id: "rowdy-bikers-three-target-summons",
    category: "bosses",
    name: "Rowdy Bikers Summon Team",
    kicker: "Keep three bosses close enough to poison together",
    description: "Licorice and Cool Mint bring summons that help keep the three targets from spreading apart. Check Scorpion's opening poison: you want it to hit all three bosses. A missed target can stay healthy long after the first one falls. Brightseeker and Rye handle focused damage while Grapevine, Herb, and Milk support the team. Use this preset when the general-purpose team leaves one biker alive.",
    cookies: ["cookie0059", "cookie0181", "cookie0503", "cookie4003", "cookie4024", "cookie0063", "cookie4013", "cookie0515", "cookie0126", "cookie4019", "cookie4006", "cookie0103"],
    pets: ["pet0111", "pet4001", "pet0110"],
    updatedAt: "2026-09-27",
  },
  {
    id: "moon-rabbit-exp-dungeon",
    category: "dungeons",
    name: "EXP Dungeon Team",
    kicker: "Keep the ranged damage alive through longer fights",
    description: "This preset spends more slots on shields, healing, and protection so Brightseeker can keep attacking. Ion, Nameless Cake Hound, and Moon Rabbit help absorb pressure while the healing core keeps recovering. Icy Birdie supplies damage reduction and Holy Baby Drop adds ATK. Candy Shade Pouch is the third pet for Lift Resistance; try Hot Doggie for Skill Amp only if you can afford to lose that protection.",
    cookies: ["cookie4013", "cookie0037", "cookie4003", "cookie4019", "cookie0136", "cookie0103", "cookie4010", "cookie0126", "cookie0054", "cookie4024", "cookie0063", "cookie4025"],
    pets: ["pet0230", "pet4001", "pet0228"],
    updatedAt: "2026-09-27",
  },
  {
    id: "bari-other-dungeons",
    category: "dungeons",
    name: "Other Dungeons Team",
    kicker: "AoE for Coin, Dough, and Innovite",
    description: "Strawberry Crepe and Cherry Cola clear groups, with Chargemellow supporting their Multi-strike damage and Herb's recovery. Milky Way, Bari, and Melon Soda add more wave damage. These three dungeons leave room to adjust your attackers: Wind Archer, Espresso, or Lemon can fill an AoE slot. If you change the damage core, change the pet setup with it; Sweet n' Sour is a general damage option.",
    cookies: ["cookie0059", "cookie3001", "cookie4003", "cookie4019", "cookie0518", "cookie0063", "cookie0573", "cookie0126", "cookie0081", "cookie4024", "cookie0250", "cookie0103"],
    pets: ["pet4005", "pet0111", "pet4001"],
    updatedAt: "2026-09-27",
  },
  {
    id: "moon-rabbit-rune-crystal",
    category: "dungeons",
    name: "Rune Crystal Dungeon Team",
    kicker: "Quick boss damage for daily clears",
    description: "Scorpion, Brightseeker, and Rye focus the boss while Devil supplies early DEF Down. Cherry Cola adds damage, and Moon Rabbit helps keep the lighter frontline alive. Octo Wasabi supports the Duration attackers alongside Holy Baby Drop and Hot Doggie. Use this damage-focused preset while your daily floor feels manageable; switch to the EXP Dungeon team if survival starts costing you clears.",
    cookies: ["cookie0059", "cookie0181", "cookie0126", "cookie4003", "cookie4024", "cookie0063", "cookie4013", "cookie0515", "cookie0023", "cookie4019", "cookie0250", "cookie4025"],
    pets: ["pet0110", "pet4001", "pet0111"],
    updatedAt: "2026-09-27",
  },
  {
    id: "moon-rabbit-arena",
    category: "pvp",
    name: "Arena Team",
    kicker: "Fast daily fights with a protected damage core",
    description: "Rye picks off targets while Strawberry Crepe deals AoE damage. Moon Rabbit, Ion, Nameless Cake Hound, and Herb keep the team steady through the opening exchange. Chargemellow supports the Multi-strike users, including Space Doughnut's Royal Excellence. Treat this as a daily-clear preset and adjust to your opponents. Crepe can give way to Brightseeker for focused damage or Milky Way for more control and AoE.",
    cookies: ["cookie0059", "cookie4018", "cookie0126", "cookie4024", "cookie0518", "cookie0103", "cookie0515", "cookie4010", "cookie4019", "cookie0136", "cookie0063", "cookie4025"],
    pets: ["pet4005", "pet4001", "pet0111"],
    updatedAt: "2026-09-27",
  },
  {
    id: "bari-rumble-arena",
    category: "pvp",
    name: "Rumble Arena Team",
    kicker: "Sustained damage for the Charge HP bonus ruleset",
    description: "Use this setup while Rumble Arena grants extra HP to Charge Cookies and damage reduction to all Cookies. Those rules weaken opening burst, so Bari and Cherry Cola provide sustained pressure. Below five stars on Bari, keep Strawberry Crepe as the flexible AoE slot. At five stars, Bari gains a second Guided Soul: replace Crepe with Oven Wanderer so both Wanderer and Cherry Cola receive her buff. Recheck the preset when the arena rules change.",
    cookies: ["cookie0059", "cookie0037", "cookie0081", "cookie4024", "cookie0518", "cookie0063", "cookie4010", "cookie0126", "cookie4019", "cookie0136", "cookie0250", "cookie4025"],
    pets: ["pet0230", "pet0111", "pet4001"],
    updatedAt: "2026-09-27",
  },
  {
    id: "espresso-witchberry-plaque-tower",
    category: "dungeons",
    name: "Plaque Tower Team",
    kicker: "Clear each wave before the next one piles up",
    description: "Espresso and Witchberry bring the wide damage this wave-based mode rewards. Rye, Strawberry Crepe, and the support core round out the preset, with Sweet n' Sour adding CRIT DMG. Milky Way or Wind Archer can replace an AoE attacker if yours has better investment. If the team keeps dying, trade Dark Choco for Moon Rabbit or Ion before giving up another damage slot.",
    cookies: ["cookie0059", "cookie0126", "cookie4003", "cookie0513", "cookie4024", "cookie0063", "cookie0515", "cookie0018", "cookie2006", "cookie4019", "cookie0518", "cookie0103"],
    pets: ["pet4004", "pet0111", "pet4001"],
    updatedAt: "2026-09-27",
  },
  {
    id: "bari-cherry-cola-story",
    category: "story",
    name: "Bari & Cherry Cola Story Team",
    kicker: "Default story progression",
    description: "Start here for ordinary story stages. Keep Cherry Cola while testing Strawberry Crepe swaps: Ion adds a shield, while Herb adds healing. For Redberry, replace Bari and Cherry Cola with Tiger Lily and Cool Mint, then fight just below the southern stairs.",
    cookies: [
      "cookie0059",
      "cookie0181",
      "cookie0037",
      "cookie0018",
      "cookie4019",
      "cookie0250",
      "cookie4013",
      "cookie4010",
      "cookie0126",
      "cookie0081",
      "cookie0518",
      "cookie0103"
    ],
    pets: [
      "pet0111",
      "pet4005",
      "pet4001"
    ],
    updatedAt: "2026-09-26",
    guideReference: {
      href: "/guides/cookie-run-crumble-bari-story-boss-team-presets/",
      leadIn: "The ",
      anchor: "story boss preset guide",
      followUp: " covers all three teams, survival swaps, and boss positioning."
    }
  },
  {
    id: "story-knock-up-resistance",
    category: "story",
    name: "Story Knock-up Resistance Team",
    kicker: "Hammer bosses and Cool Mint",
    description: "Use Candy Shade Pouch for knock-up resistance and extra HP; Panda Dumpling is the fallback if you lack it. This Wind Archer version already includes Ion and Herb. Against Cool Mint, try the seven or eleven o’clock corner before rebuilding the team.",
    cookies: [
      "cookie0070",
      "cookie4013",
      "cookie4010",
      "cookie0018",
      "cookie0136",
      "cookie0063",
      "cookie0059",
      "cookie0181",
      "cookie0126",
      "cookie4019",
      "cookie0518",
      "cookie0103"
    ],
    pets: [
      "pet0228",
      "pet0111",
      "pet4001"
    ],
    updatedAt: "2026-09-26",
    guideReference: {
      href: "/guides/cookie-run-crumble-bari-story-boss-team-presets/",
      leadIn: "The ",
      anchor: "story boss preset guide",
      followUp: " covers all three teams, survival swaps, and boss positioning."
    }
  },
  {
    id: "bari-gingercraven-power",
    category: "bosses",
    name: "Bari & Wind Archer GingerCraven Team",
    kicker: "When the team survives but damage stalls",
    description: "Use Wind Archer when his investment raises useful team Power; Cherry Cola can take his slot. Bari and Herb stay in this preset. Keep GingerBright as an early survival option, then reconsider that slot once incoming damage becomes manageable.",
    cookies: [
      "cookie0070",
      "cookie4013",
      "cookie4010",
      "cookie0126",
      "cookie0081",
      "cookie0063",
      "cookie0059",
      "cookie0181",
      "cookie0037",
      "cookie0018",
      "cookie4019",
      "cookie0103"
    ],
    pets: [
      "pet4001",
      "pet0111",
      "pet4005"
    ],
    updatedAt: "2026-09-26",
    guideReference: {
      href: "/guides/cookie-run-crumble-bari-story-boss-team-presets/",
      leadIn: "The ",
      anchor: "story boss preset guide",
      followUp: " covers all three teams, survival swaps, and boss positioning."
    }
  },
  {
    id: "princess-bari-story",
    category: "story",
    name: "Princess Bari Story Team",
    kicker: "Charge protection with two optional Herb swaps",
    description: "Use Bari with Scorpion for extra boss poison damage. If allies keep dying, replace Strawberry Crepe or Scorpion with Herb. Start with useful offensive Rune rolls for story when Bari survives; this developed roster still needs enough Power for the stage.",
    cookies: [
      "cookie0059",
      "cookie0181",
      "cookie0037",
      "cookie0018",
      "cookie4019",
      "cookie0518",
      "cookie4013",
      "cookie4010",
      "cookie0126",
      "cookie0081",
      "cookie4024",
      "cookie0103"
    ],
    pets: [
      "pet0111",
      "pet4005",
      "pet4001"
    ],
    updatedAt: "2026-09-24",
    guideReference: {
      href: "/guides/cookie-run-crumble-princess-bari-cookie-build-team/",
      leadIn: "The ",
      anchor: "Princess Bari build guide",
      followUp: " explains the complete lineup, Herb swaps, and separate Rune priorities for story and Arena."
    }
  },
  {
    id: "cherry-cola-auto-story",
    category: "story",
    name: "Cherry Cola Auto Story Team",
    kicker: "Story progression with fewer manual retries",
    description: "Use Cherry Cola with two Damage Reduction Rune lines and favor Skill Amp. Keep Milk as captain and ahead in ATK for the intended buffs. Rye is the comfortable auto choice; Melon Soda needs closer positioning. Swap Chargemellow for Icy Birdie or Crepe for Ion when survival fails.",
    cookies: [
      "cookie0059",
      "cookie0515",
      "cookie0126",
      "cookie4019",
      "cookie0518",
      "cookie0063",
      "cookie4013",
      "cookie4010",
      "cookie0018",
      "cookie4024",
      "cookie0250",
      "cookie0103"
    ],
    pets: [
      "pet4005",
      "pet0111",
      "pet4001"
    ],
    updatedAt: "2026-09-12",
    guideReference: {
      href: "/guides/cookie-run-crumble-cherry-cola-auto-stage-team/",
      leadIn: "The ",
      anchor: "Cherry Cola auto story guide",
      followUp: " covers the complete Rune plan, defensive Pet swaps, and boss positioning."
    }
  },
  {
    id: "september-general-purpose",
    category: "story",
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
    category: "bosses",
    name: "Gingercraven Team",
    kicker: "Survive until Ion's shield arrives",
    description: "Keep GingerBright alive long enough to apply ATK Down, then let Ion's shield protect the team. Icy Birdie reduces incoming damage; Grapevine adds healing instead of Pinot Noir's anti-lift support. Retry early deaths or missed Scorpion poison. Swap Devil for Dark Choco if Devil keeps dying.",
    cookies: ["cookie0059","cookie0181","cookie0126","cookie4003","cookie4024","cookie0063","cookie4013","cookie0515","cookie0023","cookie4019","cookie0136","cookie0003"],
    pets: ["pet4001","pet0230","pet0111"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-cool-mint-choco-werehound",
    category: "bosses",
    name: "Cool Mint & Choco Werehound Team",
    kicker: "Keep attacking through knock-ups",
    description: "Pair Pinot Noir with Panda Dumpling for Lift Resistance so attackers and healers spend less time airborne. This lets you fight Cool Mint without relying on the corner tactic. Chargemellow boosts the Multi-strike core. If survival fails, swap Devil for Dark Choco or Strawberry Crepe for Ion.",
    cookies: ["cookie0059","cookie0181","cookie3001","cookie0126","cookie4019","cookie0518","cookie4013","cookie0515","cookie4010","cookie0023","cookie4024","cookie0063"],
    pets: ["pet0069","pet0111","pet4005"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-rune-crystal-exp",
    category: "dungeons",
    name: "Rune Crystal & EXP Dungeon Team",
    kicker: "Single-target damage with a safety net",
    description: "Scorpion, Brightseeker, and Rye focus the boss while Devil applies DEF Down. Octo Wasabi supports Duration users, including Scorpion and Brightseeker. Keep Ion, GingerBright, and the healing core for harder floors; switch Devil to Dark Choco if repeated deaths cost more damage than the extra debuff gains.",
    cookies: ["cookie0059","cookie0181","cookie0126","cookie4003","cookie4024","cookie0063","cookie4013","cookie0515","cookie0023","cookie4019","cookie0136","cookie0003"],
    pets: ["pet0110","pet4001","pet0111"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-coin-dough",
    category: "dungeons",
    name: "Coin & Dough Dungeon Team",
    kicker: "Clear crowded waves; also works for Innovite",
    description: "Wind Archer and Milky Way clear groups, with Milky Way adding crowd control. Dark Choco supplies DEF Down; Grapevine provides healing and Multi-strike support. These dungeons do not need Pinot Noir's anti-lift utility. Use Espresso or Witchberry as an AoE substitute, or Ion if survival limits your clears.",
    cookies: ["cookie0070","cookie0573","cookie0126","cookie4003","cookie4024","cookie0063","cookie0059","cookie3001","cookie0018","cookie4019","cookie0518","cookie0103"],
    pets: ["pet4004","pet0111","pet4001"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-plaque-tower",
    category: "dungeons",
    name: "Plaque Tower Team",
    kicker: "Bring AoE for packed floors",
    description: "Use the dungeon AoE core to clear crowded floors. Sweet n' Sour is an early-game pet option. If you change the lineup, match the pet to your carries: Octo Wasabi for a Brightseeker and Scorpion setup, or Chargemellow for a Multi-strike setup. Add Ion if the team falls before clearing waves.",
    cookies: ["cookie0070","cookie0573","cookie0126","cookie4003","cookie4024","cookie0063","cookie0059","cookie3001","cookie0018","cookie4019","cookie0518","cookie0103"],
    pets: ["pet4004","pet4001","pet0111"],
    updatedAt: "2026-09-06",
  },
  {
    id: "september-arena",
    category: "pvp",
    name: "Arena Team",
    kicker: "Early picks, AoE, and crowd control",
    description: "Brightseeker and Rye pressure enemies immediately; Milky Way adds crowd control and Strawberry Crepe adds AoE. Keep Herb for recovery despite healing reduction. Icy Birdie helps absorb the opening burst. Test Espresso in Crepe's slot if needed, and adjust to the opponents on your server.",
    cookies: ["cookie0059","cookie4013","cookie4018","cookie0126","cookie4024","cookie0063","cookie0573","cookie0515","cookie4010","cookie4019","cookie0518","cookie0103"],
    pets: ["pet4001","pet0230","pet0111"],
    updatedAt: "2026-09-06",
  },
  {
    id: "strawberry-crepe-rapid-aoe",
    category: "pvp",
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
    category: "bosses",
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
    category: "bosses",
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
