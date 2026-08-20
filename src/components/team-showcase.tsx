import Image from "next/image";
import { PetSlots } from "@/components/pet-slots";
import { SynergySummary } from "@/components/synergy-summary";
import { cookieById, type Cookie } from "@/data/cookies";
import { petById } from "@/data/pets";
import type { RecommendedTeam } from "@/data/teams";

export function TeamShowcase({ team }: { team: RecommendedTeam; index: number }) {
  const selectedCookies = team.cookies.map((id) => cookieById.get(id)).filter((cookie): cookie is Cookie => Boolean(cookie));
  const selectedPets = team.pets.map((id) => petById.get(id));

  return (
    <article className="team-showcase">
      <div className="team-showcase__copy">
        <span>{team.kicker}</span>
        <h2>{team.name}</h2>
        <p>{team.description}</p>
      </div>
      <div className="team-showcase__formation">
        <div className="team-lineup" aria-label={`${team.name} lineup`}>
          {selectedCookies.map((cookie, slot) => (
              <div className="team-unit" key={`${cookie.id}-${slot}`} title={cookie.name}>
                <Image src={cookie.image} alt={cookie.name} width={120} height={120} sizes="80px" />
                <span>{slot + 1}</span>
              </div>
          ))}
        </div>
        <div className="team-showcase__support"><PetSlots pets={selectedPets} /><SynergySummary cookies={selectedCookies} /></div>
      </div>
    </article>
  );
}
