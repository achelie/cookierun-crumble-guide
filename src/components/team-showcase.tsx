import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import { LocaleLink as Link } from "@/i18n/elements";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { PetSlots } from "@/components/pet-slots";
import { SynergySummary } from "@/components/synergy-summary";
import { AppIcon } from "@/components/ui/icon";
import { cookieById, type Cookie } from "@/data/cookies";
import { petById } from "@/data/pets";
import { teamCategories, type RecommendedTeam } from "@/data/teams";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function TeamShowcase({ team }: { team: RecommendedTeam }) {
  const selectedCookies = team.cookies.map((id) => cookieById.get(id)).filter((cookie): cookie is Cookie => Boolean(cookie));
  const selectedPets = team.pets.map((id) => petById.get(id));

  return (
    <I18nElement as="article" className="team-showcase">
      <I18nElement as="div" className="team-showcase__copy">
        <I18nElement as="span">{team.kicker}</I18nElement>
        <I18nElement as="h2">{team.name}</I18nElement>
        <I18nElement as="p">
          {team.description}
          {team.guideReference && (
            <> <I18nElement as="span">{team.guideReference.leadIn}<Link href={team.guideReference.href}>{team.guideReference.anchor}</Link>{team.guideReference.followUp}</I18nElement></>
          )}
        </I18nElement>
        <I18nElement as="div" className="team-showcase__meta">
          <I18nElement as="span" className="team-category-badge">{teamCategories.find((category) => category.slug === team.category)?.label}</I18nElement>
          <AppIcon name="calendar" size={15} />
          <I18nElement as="span">Updated {dateFormatter.format(new Date(`${team.updatedAt}T00:00:00Z`))}</I18nElement>
        </I18nElement>
      </I18nElement>
      <I18nElement as="div" className="team-showcase__formation">
        <I18nElement as="div" className="team-lineup" aria-label={`${team.name} lineup`}>
          {selectedCookies.map((cookie, slot) => (
              <I18nElement as="div" className="team-unit" key={`${cookie.id}-${slot}`} title={cookie.name}>
                <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
                <Image src={cookie.image} alt={cookie.name} width={120} height={120} sizes="80px" />
                <I18nElement as="span" className="team-unit__slot">{slot + 1}</I18nElement>
              </I18nElement>
          ))}
        </I18nElement>
        <I18nElement as="div" className="team-showcase__support"><PetSlots pets={selectedPets} /><SynergySummary cookies={selectedCookies} /></I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
