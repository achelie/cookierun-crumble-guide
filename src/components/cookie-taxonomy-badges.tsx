import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import { elementDefinitions, roleDefinitions, type Element, type Role } from "@/data/cookies";

export function CookieTaxonomyBadges({ element, role, compact = false }: { element: Element; role: Role; compact?: boolean }) {
  const elementDefinition = elementDefinitions[element];
  const roleDefinition = roleDefinitions[role];

  return (
    <I18nElement as="div" className={`cookie-taxonomy-badges${compact ? " cookie-taxonomy-badges--compact" : ""}`}>
      <I18nElement as="span" className="cookie-taxonomy-badge cookie-taxonomy-badge--element" role="img" aria-label={`${elementDefinition.label} element`} title={`${elementDefinition.label} element`}>
        <Image src={elementDefinition.image} alt="" width={28} height={28} />
      </I18nElement>
      <I18nElement as="span" className="cookie-taxonomy-badge cookie-taxonomy-badge--role" role="img" aria-label={`${roleDefinition.label} role`} title={`${roleDefinition.label} role`}>
        <Image src={roleDefinition.image} alt="" width={28} height={28} />
      </I18nElement>
    </I18nElement>
  );
}
