export type RecommendedTeam = {
  id: string;
  name: string;
  kicker: string;
  description: string;
  cookies: string[];
  pets: string[];
};

export const recommendedTeams: RecommendedTeam[] = [
  {
    id: "best-overall",
    name: "Best Overall",
    kicker: "Set it and cruise",
    description: "A flexible auto team built around Cool Mint and Licorice. Good for pushing regular stages without swapping every five minutes.",
    cookies: ["cookie0070", "cookie0573", "cookie0103", "cookie0126", "cookie4006", "cookie4019", "cookie0181", "cookie4024", "cookie0515", "cookie0040", "cookie0503", "cookie0059"],
    pets: ["pet4003", "pet4001", "pet0517"],
  },
  {
    id: "f2p",
    name: "F2P Starter",
    kicker: "No whale noises",
    description: "A practical SR and lower-rarity core. Replace one slot at a time as your SSR roster grows.",
    cookies: ["cookie0503", "cookie0063", "cookie0515", "cookie0040", "cookie0059", "cookie0101", "cookie0107", "cookie0056", "cookie0069", "cookie0522", "cookie0106", "cookie0001"],
    pets: ["pet0001", "pet0012", "pet0017"],
  },
  {
    id: "boss",
    name: "Single Boss Poison",
    kicker: "One target, no mercy",
    description: "Stacks strong single-target damage with a poison-friendly shell for boss stages.",
    cookies: ["cookie0070", "cookie0103", "cookie0126", "cookie4019", "cookie0181", "cookie4024", "cookie0515", "cookie0503", "cookie0063", "cookie0040", "cookie4003", "cookie0003"],
    pets: ["pet0134", "pet0183", "pet0243"],
  },
];

export const teamSize = 12;
export const petTeamSize = 3;
