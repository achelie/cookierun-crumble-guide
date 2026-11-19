import { LastUpdated } from "@/components/last-updated";
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
import { cookieDetailPathById } from "@/lib/cookie-detail-paths";
import styles from "./team-showcase.module.css";

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
          <I18nElement as="span"><LastUpdated date={team.updatedAt} /></I18nElement>
        </I18nElement>
      </I18nElement>
      <I18nElement as="div" className="team-showcase__formation">
        <I18nElement as="div" className="team-lineup" aria-label={`${team.name} lineup`}>
          {selectedCookies.map((cookie, slot) => {
            const href = cookieDetailPathById.get(cookie.id);
            const key = `${cookie.id}-${slot}`;
            const unit = (
              <>
                <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
                <Image src={cookie.image} alt={href ? "" : cookie.name} width={120} height={120} sizes="80px" />
                <I18nElement as="span" className="team-unit__slot">{slot + 1}</I18nElement>
              </>
            );
            return href ? (
              <Link href={href} prefetch={false} className={`team-unit ${styles.cookieLink}`} key={key} title={cookie.name} aria-label={cookie.name}>
                {unit}
                <span className={styles.detailIcon} aria-hidden="true"><AppIcon name="chevron" size={12} /></span>
              </Link>
            ) : (
              <I18nElement as="div" className="team-unit" key={key} title={cookie.name}>{unit}</I18nElement>
            );
          })}
        </I18nElement>
        <I18nElement as="div" className="team-showcase__support"><PetSlots pets={selectedPets} /><SynergySummary cookies={selectedCookies} /></I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
