import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import type { Cookie } from "@/data/cookies";

export function CookieMiniCard({ cookie }: { cookie: Cookie }) {
  return (
    <I18nElement as="article" className={`entity-card entity-card--compact rarity-${cookie.rarity.toLowerCase()}`}>
      <I18nElement as="div" className="entity-card__art">
        <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
        <Image src={cookie.image} alt={cookie.name} width={160} height={160} sizes="112px" />
      </I18nElement>
      <I18nElement as="div" className="entity-card__copy"><I18nElement as="h3">{cookie.name}</I18nElement></I18nElement>
    </I18nElement>
  );
}
