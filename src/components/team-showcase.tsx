import Image from "next/image";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { PetSlots } from "@/components/pet-slots";
import { SynergySummary } from "@/components/synergy-summary";
import { AppIcon } from "@/components/ui/icon";
import { cookieById, type Cookie } from "@/data/cookies";
import { petById } from "@/data/pets";
import type { RecommendedTeam } from "@/data/teams";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function TeamShowcase({ team }: { team: RecommendedTeam; index: number }) {
  const selectedCookies = team.cookies.map((id) => cookieById.get(id)).filter((cookie): cookie is Cookie => Boolean(cookie));
  const selectedPets = team.pets.map((id) => petById.get(id));

  return (
    <article className="team-showcase">
      <div className="team-showcase__copy">
        <span>{team.kicker}</span>
        <h2>{team.name}</h2>
        <p>{team.description}</p>
        <div className="team-showcase__meta">
          <AppIcon name="calendar" size={15} />
          <span>Updated {dateFormatter.format(new Date(`${team.updatedAt}T00:00:00Z`))}</span>
        </div>
      </div>
      <div className="team-showcase__formation">
        <div className="team-lineup" aria-label={`${team.name} lineup`}>
          {selectedCookies.map((cookie, slot) => (
              <div className="team-unit" key={`${cookie.id}-${slot}`} title={cookie.name}>
                <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
                <Image src={cookie.image} alt={cookie.name} width={120} height={120} sizes="80px" />
                <span className="team-unit__slot">{slot + 1}</span>
              </div>
          ))}
        </div>
        <div className="team-showcase__support"><PetSlots pets={selectedPets} /><SynergySummary cookies={selectedCookies} /></div>
      </div>
    </article>
  );
}
