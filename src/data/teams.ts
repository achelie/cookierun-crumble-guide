export type RecommendedTeam = {
  id: string;
  name: string;
  kicker: string;
  description: string;
  cookies: string[];
  pets: string[];
};

export const teamsUpdatedAt = "2026-08-31";

export const recommendedTeams: RecommendedTeam[] = [
  {
    id: "brightseeker-stage-core",
    name: "Brightseeker Stage Core",
    kicker: "The five-star default for story pushes",
    description: "Use this as the default stage team once Brightseeker reaches five stars. Swap Milky Way for Scorpion when a fight with three or fewer bosses needs more damage, or swap Pinot Noir for Grapevine when Biker-style openings keep killing the front line.",
    cookies: ["cookie0059", "cookie4013", "cookie3001", "cookie0126", "cookie4019", "cookie0063", "cookie0573", "cookie0515", "cookie4010", "cookie0018", "cookie4024", "cookie0103"],
    pets: ["pet4001", "pet0111", "pet4003"],
  },
  {
    id: "forest-stump",
    name: "Forest Stump Team",
    kicker: "A specialist answer for the Forest stump",
    description: "Use this Licorice formation only for the stump encounter in Forest. Apple Rabbit supports the Fire-heavy damage package. If the team still cannot survive, replace Brightseeker with Lime Cookie instead of rerolling the same failed opening.",
    cookies: ["cookie0059", "cookie0181", "cookie0503", "cookie0126", "cookie4019", "cookie0063", "cookie4013", "cookie0515", "cookie4010", "cookie4003", "cookie4024", "cookie0103"],
    pets: ["pet4001", "pet0111", "pet0046"],
  },
  {
    id: "hammer-princess",
    name: "Hammer Princess Team",
    kicker: "Built for the Kingdom boss",
    description: "Save this formation for Hammer Princess in Kingdom. Use Milk's Welfare at 2%, then add Medical Insurance when the extra mercenary slot opens. If survival forces you to use repair, replace Skating Queen with Strawberry Crepe.",
    cookies: ["cookie0059", "cookie0181", "cookie0126", "cookie0018", "cookie0054", "cookie4024", "cookie4013", "cookie4010", "cookie0023", "cookie4003", "cookie4019", "cookie0063"],
    pets: ["pet4001", "pet4003", "pet0069"],
  },
  {
    id: "f2p",
    name: "F2P Team",
    kicker: "Invest where stars are realistic",
    description: "An accessible progression core built around efficient supports and synergy providers. Grapevine supplies healing, Cheesecake brings ATK and Volley, and Rye becomes a major carry at five stars; Devil is the first slot to replace when survivability turns inconsistent.",
    cookies: ["cookie0059", "cookie0515", "cookie0126", "cookie0018", "cookie0040", "cookie4024", "cookie0181", "cookie0037", "cookie0023", "cookie4003", "cookie4019", "cookie0136"],
    pets: ["pet4004", "pet0029", "pet4001"],
  },
  {
    id: "single-target-boss",
    name: "Single-Target Boss",
    kicker: "Burst with a safety net",
    description: "Built for one dangerous boss: Rye and Scorpion carry the focused damage while Milk, Grapevine, Herb, and Ion protect the opener. If the front line still folds, trade a damage slot for mitigation instead of adding more AoE.",
    cookies: ["cookie0059", "cookie0515", "cookie0037", "cookie4003", "cookie4019", "cookie0136", "cookie0126", "cookie3001", "cookie0181", "cookie0040", "cookie4024", "cookie0063"],
    pets: ["pet4004", "pet0184", "pet4001"],
  },
  {
    id: "three-boss",
    name: "Three-Boss Team",
    kicker: "Spread damage, keep the core",
    description: "Use this when three or more bosses share the field. It keeps Rye and Scorpion for focused damage, then adds wider pressure and sturdy supports; if the opening hit is the problem, keep Ion rather than squeezing in another attacker.",
    cookies: ["cookie0059", "cookie0515", "cookie0126", "cookie4019", "cookie0136", "cookie0103", "cookie0181", "cookie0037", "cookie4003", "cookie4024", "cookie0063", "cookie0003"],
    pets: ["pet4004", "pet4001", "pet0184"],
  },
  {
    id: "aoe-stages",
    name: "AoE Stages",
    kicker: "Clear waves before they pile up",
    description: "Use this on regular non-checkpoint stages and crowded waves. Wind Archer and Milky Way erase groups, Milky Way's knockback keeps adds away, and Scorpion handles tougher lieutenants; switch teams for the harder -10, -20, and -30 boss stages.",
    cookies: ["cookie0070", "cookie0573", "cookie0037", "cookie4003", "cookie4019", "cookie0063", "cookie0059", "cookie0181", "cookie0126", "cookie0040", "cookie4024", "cookie0103"],
    pets: ["pet0029", "pet4001", "pet4004"],
  },
  {
    id: "cool-mint",
    name: "Cool Mint Cookie",
    kicker: "Park in the top-left",
    description: "Move the team to the top-left and reset if Cool Mint's summons ruin your targeting. This setup leans into single-target pressure; replace one damage slot with Ion or Herb when the opener is too volatile.",
    cookies: ["cookie0059", "cookie0515", "cookie0037", "cookie0023", "cookie0040", "cookie4024", "cookie0181", "cookie3001", "cookie0126", "cookie4003", "cookie4019", "cookie4006"],
    pets: ["pet4004", "pet0029", "pet4001"],
  },
  {
    id: "plaque-tower",
    name: "Plaque Tower",
    kicker: "Full AoE for packed floors",
    description: "A broad AoE lineup for climbing crowded tower floors. If the damage is fine but the team keeps collapsing, replace the weakest attacker with Ion or Herb; Cool Mint is not required for this version.",
    cookies: ["cookie0070", "cookie0573", "cookie0126", "cookie0018", "cookie0513", "cookie4024", "cookie0059", "cookie0037", "cookie0035", "cookie4003", "cookie4019", "cookie0511"],
    pets: ["pet4004", "pet0029", "pet4001"],
  },
  {
    id: "coin-dungeon",
    name: "Coin Dungeon",
    kicker: "Fast clears, fewer reruns",
    description: "This daily lineup favors quick wave clear without dropping its safety net. Milky Way, Espresso, and Skating Queen handle groups while the defense and support core keeps auto runs stable; only cut a frontliner when clear speed is the real bottleneck.",
    cookies: ["cookie0059", "cookie0037", "cookie0035", "cookie4003", "cookie4019", "cookie4006", "cookie0573", "cookie0126", "cookie0018", "cookie0513", "cookie4024", "cookie0511"],
    pets: ["pet4004", "pet0029", "pet4001"],
  },
  {
    id: "exp-dungeon",
    name: "EXP Dungeon",
    kicker: "Prepare for the single target",
    description: "EXP Dungeon ends in a single-target check, so Scorpion and Devil stay focused while Macaron, Cheesecake, and Grapevine amplify and sustain them. If Devil dies before contributing, use the safest defensive replacement rather than gambling on repeated resets.",
    cookies: ["cookie0059", "cookie0037", "cookie0023", "cookie0054", "cookie4024", "cookie0063", "cookie0181", "cookie0126", "cookie4003", "cookie4019", "cookie0136", "cookie0003"],
    pets: ["pet4004", "pet0029", "pet0052"],
  },
  {
    id: "innovite-dungeon",
    name: "Innovite Dungeon",
    kicker: "Bring wide damage and staying power",
    description: "An AoE-heavy daily setup: Wind Archer, Milky Way, Espresso, and Cool Mint clear clustered enemies while Grapevine and Milk stabilize the longer waves. Keep the universal pet trio unless survival is forcing a defensive pet swap.",
    cookies: ["cookie0070", "cookie0573", "cookie0126", "cookie0018", "cookie0513", "cookie4024", "cookie0059", "cookie0037", "cookie0035", "cookie4003", "cookie4019", "cookie4006"],
    pets: ["pet4004", "pet0029", "pet4001"],
  },
];

export const teamSize = 12;
export const petTeamSize = 3;
