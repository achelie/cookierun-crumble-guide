import Image from "next/image";
import { elementDefinitions, roleDefinitions, type Element, type Role } from "@/data/cookies";

export function CookieTaxonomyBadges({ element, role, compact = false }: { element: Element; role: Role; compact?: boolean }) {
  const elementDefinition = elementDefinitions[element];
  const roleDefinition = roleDefinitions[role];

  return (
    <div className={`cookie-taxonomy-badges${compact ? " cookie-taxonomy-badges--compact" : ""}`}>
      <span className="cookie-taxonomy-badge cookie-taxonomy-badge--element" role="img" aria-label={`${elementDefinition.label} element`} title={`${elementDefinition.label} element`}>
        <Image src={elementDefinition.image} alt="" width={28} height={28} />
      </span>
      <span className="cookie-taxonomy-badge cookie-taxonomy-badge--role" role="img" aria-label={`${roleDefinition.label} role`} title={`${roleDefinition.label} role`}>
        <Image src={roleDefinition.image} alt="" width={28} height={28} />
      </span>
    </div>
  );
}
