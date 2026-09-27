import { describe, expect, it } from "vitest";
import { cookieById } from "./cookies";
import * as petData from "./pets";
import { recommendedTeams, teamsUpdatedAt } from "./teams";

const addedTeams = [
  {
    id: "pinot-noir-multistrike-boss",
    cookies: ["cookie0070", "cookie4013", "cookie3001", "cookie0126", "cookie4019", "cookie0063", "cookie0059", "cookie0515", "cookie4010", "cookie0018", "cookie4024", "cookie0103"],
    pets: ["pet0069", "pet4005", "pet4001"],
    updatedAt: "2026-09-04",
  },
  {
    id: "strawberry-crepe-rapid-aoe",
    cookies: ["cookie0059", "cookie0181", "cookie3001", "cookie0126", "cookie4024", "cookie0063", "cookie4013", "cookie0515", "cookie4010", "cookie4019", "cookie0518", "cookie0103"],
    pets: ["pet4005", "pet4001", "pet0111"],
    updatedAt: "2026-09-05",
  },
  {
    id: "wind-archer-guild-conquest",
    cookies: ["cookie0070", "cookie0181", "cookie0040", "cookie0126", "cookie3001", "cookie4024", "cookie0059", "cookie0515", "cookie4010", "cookie0018", "cookie4019", "cookie0103"],
    pets: ["pet4001", "pet0111", "pet0069"],
    updatedAt: "2026-09-02",
  },
] as const;

describe("recommended teams", () => {
  it("contains 12 valid cookies and 3 valid pets per team", () => {
    const petById = (petData as typeof petData & { petById?: Map<string, unknown> }).petById;
    expect(petById).toBeInstanceOf(Map);
    for (const team of recommendedTeams) {
      const record = team as typeof team & { pets?: string[] };
      expect(team.cookies).toHaveLength(12);
      expect(record.pets).toHaveLength(3);
      team.cookies.forEach((id) => expect(cookieById.has(id), id).toBe(true));
      record.pets?.forEach((id) => expect(petById?.has(id), id).toBe(true));
    }
  });

  it("puts the newly added formations first with the latest date", () => {
    expect(teamsUpdatedAt).toBe("2026-09-27");
    expect(recommendedTeams.slice(11, 14).map((team) => team.id)).toEqual([
      "bari-cherry-cola-story", "story-knock-up-resistance", "bari-gingercraven-power",
    ]);
    expect(recommendedTeams.slice(-3).map((team) => team.id)).toEqual([
      "strawberry-crepe-rapid-aoe", "pinot-noir-multistrike-boss", "wind-archer-guild-conquest",
    ]);

    for (const expected of addedTeams) {
      const team = recommendedTeams.find((candidate) => candidate.id === expected.id);
      expect(team?.cookies).toEqual(expected.cookies);
      expect(team?.pets).toEqual(expected.pets);
      expect(team?.updatedAt).toBe(expected.updatedAt);
    }
  });

  it("replaces August 31 teams with the seven ordered September formations", () => {
    expect(recommendedTeams).toHaveLength(26);
    expect(recommendedTeams.some((team) => team.updatedAt === "2026-08-31")).toBe(false);
    const expected = [
    {
        "id": "september-general-purpose",
        "cookies": [
            "cookie0059",
            "cookie0181",
            "cookie3001",
            "cookie0126",
            "cookie4024",
            "cookie0063",
            "cookie4013",
            "cookie0515",
            "cookie4010",
            "cookie4019",
            "cookie0518",
            "cookie0103"
        ],
        "pets": [
            "pet4005",
            "pet4001",
            "pet0111"
        ]
    },
    {
        "id": "september-gingercraven",
        "cookies": [
            "cookie0059",
            "cookie0181",
            "cookie0126",
            "cookie4003",
            "cookie4024",
            "cookie0063",
            "cookie4013",
            "cookie0515",
            "cookie0023",
            "cookie4019",
            "cookie0136",
            "cookie0003"
        ],
        "pets": [
            "pet4001",
            "pet0230",
            "pet0111"
        ]
    },
    {
        "id": "september-cool-mint-choco-werehound",
        "cookies": [
            "cookie0059",
            "cookie0181",
            "cookie3001",
            "cookie0126",
            "cookie4019",
            "cookie0518",
            "cookie4013",
            "cookie0515",
            "cookie4010",
            "cookie0023",
            "cookie4024",
            "cookie0063"
        ],
        "pets": [
            "pet0069",
            "pet0111",
            "pet4005"
        ]
    },
    {
        "id": "september-rune-crystal-exp",
        "cookies": [
            "cookie0059",
            "cookie0181",
            "cookie0126",
            "cookie4003",
            "cookie4024",
            "cookie0063",
            "cookie4013",
            "cookie0515",
            "cookie0023",
            "cookie4019",
            "cookie0136",
            "cookie0003"
        ],
        "pets": [
            "pet0110",
            "pet4001",
            "pet0111"
        ]
    },
    {
        "id": "september-coin-dough",
        "cookies": [
            "cookie0070",
            "cookie0573",
            "cookie0126",
            "cookie4003",
            "cookie4024",
            "cookie0063",
            "cookie0059",
            "cookie3001",
            "cookie0018",
            "cookie4019",
            "cookie0518",
            "cookie0103"
        ],
        "pets": [
            "pet4004",
            "pet0111",
            "pet4001"
        ]
    },
    {
        "id": "september-plaque-tower",
        "cookies": [
            "cookie0070",
            "cookie0573",
            "cookie0126",
            "cookie4003",
            "cookie4024",
            "cookie0063",
            "cookie0059",
            "cookie3001",
            "cookie0018",
            "cookie4019",
            "cookie0518",
            "cookie0103"
        ],
        "pets": [
            "pet4004",
            "pet4001",
            "pet0111"
        ]
    },
    {
        "id": "september-arena",
        "cookies": [
            "cookie0059",
            "cookie4013",
            "cookie4018",
            "cookie0126",
            "cookie4024",
            "cookie0063",
            "cookie0573",
            "cookie0515",
            "cookie4010",
            "cookie4019",
            "cookie0518",
            "cookie0103"
        ],
        "pets": [
            "pet4001",
            "pet0230",
            "pet0111"
        ]
    }
];
    const septemberTeams = recommendedTeams.filter((team) => team.updatedAt === "2026-09-06");
    expected.forEach((formation, index) => {
      expect(septemberTeams[index]).toMatchObject({ ...formation, updatedAt: "2026-09-06" });
    });
  });

  it("uses distinct ids and copy without long dash characters", () => {
    expect(new Set(recommendedTeams.map((team) => team.id)).size).toBe(recommendedTeams.length);
    recommendedTeams.forEach((team) => {
      expect(`${team.name} ${team.kicker} ${team.description}`).not.toMatch(/[—–]/);
    });
  });
});

// Ordered lineup slots and pets from the eleven approved formations.
const latestFormations = [
  [
    "moon-rabbit-general-purpose",
    "story",
    "0059 0181 3001 0126 0518 0103 4013 0515 4010 4019 0063 4025",
    "4005 4001 0111"
  ],
  [
    "bari-general-purpose-aoe",
    "story",
    "0059 0126 0081 4024 0250 0103 4010 0018 4019 0518 0063 4025",
    "0111 4001 4005"
  ],
  [
    "moon-rabbit-gingercraven",
    "bosses",
    "0059 0181 0126 4003 4024 0103 4013 0515 0018 4019 0063 4025",
    "4001 0230 0111"
  ],
  [
    "moon-rabbit-cool-mint",
    "bosses",
    "0059 0181 4010 0023 4019 0063 4013 0515 0126 0018 4024 4025",
    "0228 0111 4005"
  ],
  [
    "rowdy-bikers-three-target-summons",
    "bosses",
    "0059 0181 0503 4003 4024 0063 4013 0515 0126 4019 4006 0103",
    "0111 4001 0110"
  ],
  [
    "moon-rabbit-exp-dungeon",
    "dungeons",
    "4013 0037 4003 4019 0136 0103 4010 0126 0054 4024 0063 4025",
    "0230 4001 0228"
  ],
  [
    "bari-other-dungeons",
    "dungeons",
    "0059 3001 4003 4019 0518 0063 0573 0126 0081 4024 0250 0103",
    "4005 0111 4001"
  ],
  [
    "moon-rabbit-rune-crystal",
    "dungeons",
    "0059 0181 0126 4003 4024 0063 4013 0515 0023 4019 0250 4025",
    "0110 4001 0111"
  ],
  [
    "moon-rabbit-arena",
    "pvp",
    "0059 4018 0126 4024 0518 0103 0515 4010 4019 0136 0063 4025",
    "4005 4001 0111"
  ],
  [
    "bari-rumble-arena",
    "pvp",
    "0059 0037 0081 4024 0518 0063 4010 0126 4019 0136 0250 4025",
    "0230 0111 4001"
  ],
  [
    "espresso-witchberry-plaque-tower",
    "dungeons",
    "0059 0126 4003 0513 4024 0063 0515 0018 2006 4019 0518 0103",
    "4004 0111 4001"
  ]
] as const;

describe("September 27 formations", () => {
  it("preserves all eleven ordered lineups and their categories", () => {
    latestFormations.forEach(([id, category, cookies, pets], index) => {
      expect(recommendedTeams[index]).toMatchObject({
        id, category, updatedAt: "2026-09-27",
        cookies: cookies.split(" ").map((code) => `cookie${code}`),
        pets: pets.split(" ").map((code) => `pet${code}`),
      });
    });
  });
});
