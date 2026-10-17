import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import type { ReactNode } from "react";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { PetSlots } from "@/components/pet-slots";
import { SynergySummary } from "@/components/synergy-summary";
import { cookieById, type Cookie } from "@/data/cookies";
import { petById } from "@/data/pets";

export function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <I18nElement as="section" className="guide-section" id={id}>
      <I18nElement as="h2">{title}</I18nElement>
      {children}
    </I18nElement>
  );
}

export function GuideTip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <I18nElement as="aside" className="guide-tip">
      <I18nElement as="strong">{title}</I18nElement>
      <I18nElement as="div">{children}</I18nElement>
    </I18nElement>
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
    <I18nElement as="figure" className="guide-team">
      <I18nElement as="figcaption" className="guide-team__caption">
        <I18nElement as="span">Recommended lineup</I18nElement>
        <I18nElement as="h3">{title}</I18nElement>
        <I18nElement as="p">{description}</I18nElement>
      </I18nElement>
      <I18nElement as="div" className="guide-team__lineup" aria-label={`${title} Cookie lineup`}>
        {selectedCookies.map((cookie, slot) => (
          <I18nElement as="div" className="team-unit" key={`${cookie.id}-${slot}`} title={cookie.name}>
            <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
            <Image src={cookie.image} alt={cookie.name} width={120} height={120} sizes="(max-width: 720px) 30vw, 118px" />
            <I18nElement as="span" className="team-unit__slot">{slot + 1}</I18nElement>
          </I18nElement>
        ))}
      </I18nElement>
      <I18nElement as="div" className="guide-team__support">
        <PetSlots pets={selectedPets} />
        <SynergySummary cookies={selectedCookies} />
      </I18nElement>
    </I18nElement>
  );
}
