import Image from "next/image";
import type { ReactNode } from "react";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { PetSlots } from "@/components/pet-slots";
import { SynergySummary } from "@/components/synergy-summary";
import { cookieById, type Cookie } from "@/data/cookies";
import { petById } from "@/data/pets";

export function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="guide-section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function GuideTip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="guide-tip">
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function GuideTeamFormation({
  title,
  description,
  cookieIds,
  petIds,
}: {
  title: string;
  description: string;
  cookieIds: string[];
  petIds: string[];
}) {
  const selectedCookies = cookieIds.map((id) => cookieById.get(id)).filter((cookie): cookie is Cookie => Boolean(cookie));
  const selectedPets = petIds.map((id) => petById.get(id));

  return (
    <figure className="guide-team">
      <figcaption className="guide-team__caption">
        <span>Recommended lineup</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </figcaption>
      <div className="guide-team__lineup" aria-label={`${title} Cookie lineup`}>
        {selectedCookies.map((cookie, slot) => (
          <div className="team-unit" key={`${cookie.id}-${slot}`} title={cookie.name}>
            <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
            <Image src={cookie.image} alt={cookie.name} width={120} height={120} sizes="(max-width: 720px) 30vw, 118px" />
            <span className="team-unit__slot">{slot + 1}</span>
          </div>
        ))}
      </div>
      <div className="guide-team__support">
        <PetSlots pets={selectedPets} />
        <SynergySummary cookies={selectedCookies} />
      </div>
    </figure>
  );
}
