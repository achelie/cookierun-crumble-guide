import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { Cookie } from "@/data/cookies";
import type { Pet } from "@/data/pets";
import { PetSlots } from "./pet-slots";
import { SynergySummary } from "./synergy-summary";

const cookie = (id: string, granted: Cookie["grantedSynergies"], received: Cookie["receivedSynergies"]): Cookie => ({
  id,
  name: id,
  rarity: "C",
  image: "/images/cookies/cookie0001.webp",
  element: "Fire",
  role: "Charge",
  grantedSynergies: granted,
  receivedSynergies: received,
  buffs: [],
});

const pet: Pet = { id: "pet0001", name: "Choco Drop", rarity: "C", image: "/images/pets/pet0001.webp" };

describe("team presentation", () => {
  it("shows distinct Granted and Active synergy panels", () => {
    const html = renderToStaticMarkup(<SynergySummary cookies={[cookie("giver", ["Chain"], []), cookie("receiver", [], ["Chain"])]} />);
    expect(html).toContain("Granted");
    expect(html).toContain("Active");
    expect(html).toContain("active Chain synergy");
  });

  it("always renders three pet slots", () => {
    const html = renderToStaticMarkup(<PetSlots pets={[pet]} />);
    expect(html).toContain("Choco Drop");
    expect(html.match(/class="pet-slot/g)).toHaveLength(4);
  });
});
