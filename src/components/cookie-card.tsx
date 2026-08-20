import Image from "next/image";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { SynergyBadge } from "@/components/synergy-badge";
import {
  buffDefinitions,
  type Cookie,
  type Synergy,
} from "@/data/cookies";

function SynergyList({ values, direction }: { values: Synergy[]; direction: "granted" | "received" }) {
  if (!values.length) return <span className="cookie-card__none">None</span>;
  return <span className="cookie-card__synergies">{values.map((value) => <SynergyBadge key={value} value={value} direction={direction} />)}</span>;
}

export function CookieCard({ cookie, eager = false }: { cookie: Cookie; eager?: boolean }) {
  return (
    <article className={`cookie-card rarity-${cookie.rarity.toLowerCase()}`}>
      <div className="cookie-card__art">
        <CookieTaxonomyBadges element={cookie.element} role={cookie.role} />
        <Image src={cookie.image} alt={cookie.name} width={280} height={280} loading={eager ? "eager" : "lazy"} sizes="(max-width: 640px) 43vw, (max-width: 1024px) 29vw, 210px" />
      </div>
      <div className="cookie-card__body">
        <div className="cookie-card__identity"><h3>{cookie.name}</h3><span className="cookie-card__rarity">{cookie.rarity}</span></div>
        <dl className="cookie-card__details">
          <div><dt>Granted</dt><dd><SynergyList values={cookie.grantedSynergies} direction="granted" /></dd></div>
          <div><dt>Received</dt><dd><SynergyList values={cookie.receivedSynergies} direction="received" /></dd></div>
          <div className="cookie-card__buffs">
            <dt>Buff</dt>
            <dd>{cookie.buffs.length ? cookie.buffs.map((buff) => <span key={buff}>{buffDefinitions[buff].label}</span>) : <span className="cookie-card__none">None</span>}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
