import Image from "next/image";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import type { Cookie } from "@/data/cookies";

export function CookieMiniCard({ cookie }: { cookie: Cookie }) {
  return (
    <article className={`entity-card entity-card--compact rarity-${cookie.rarity.toLowerCase()}`}>
      <div className="entity-card__art">
        <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
        <Image src={cookie.image} alt={cookie.name} width={160} height={160} sizes="112px" />
      </div>
      <div className="entity-card__copy"><h3>{cookie.name}</h3></div>
    </article>
  );
}
