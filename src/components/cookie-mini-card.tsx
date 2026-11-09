import { I18nElement, LocaleImage as Image, LocaleLink } from "@/i18n/elements";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { AppIcon } from "@/components/ui/icon";
import type { Cookie } from "@/data/cookies";
import { cookieDetailPathById } from "@/lib/cookie-detail-paths";

export function CookieMiniCard({ cookie }: { cookie: Cookie }) {
  const href = cookieDetailPathById.get(cookie.id);
  const className = `entity-card entity-card--compact rarity-${cookie.rarity.toLowerCase()}`;
  const content = (
    <>
      <I18nElement as="div" className="entity-card__art">
        <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
        <Image src={cookie.image} alt={href ? "" : cookie.name} width={160} height={160} sizes="112px" />
        {href && <span className="entity-card__detail-icon"><AppIcon name="chevron" size={14} /></span>}
      </I18nElement>
      <I18nElement as="div" className="entity-card__copy"><I18nElement as="h3">{cookie.name}</I18nElement></I18nElement>
    </>
  );

  return href ? (
    <LocaleLink href={href} prefetch={false} className={className} aria-label={cookie.name}>{content}</LocaleLink>
  ) : (
    <I18nElement as="article" className={className}>{content}</I18nElement>
  );
}
