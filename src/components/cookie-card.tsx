import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { SynergyBadge } from "@/components/synergy-badge";
import {
  buffDefinitions,
  type Cookie,
  type Synergy,
} from "@/data/cookies";

function SynergyList({ values, direction }: { values: Synergy[]; direction: "granted" | "received" }) {
  if (!values.length) return <I18nElement as="span" className="cookie-card__none">None</I18nElement>;
  return <I18nElement as="span" className="cookie-card__synergies">{values.map((value) => <SynergyBadge key={value} value={value} direction={direction} />)}</I18nElement>;
}

export function CookieCard({ cookie, eager = false }: { cookie: Cookie; eager?: boolean }) {
  return (
    <I18nElement as="article" className={`cookie-card rarity-${cookie.rarity.toLowerCase()}`}>
      <I18nElement as="div" className="cookie-card__art">
        <CookieTaxonomyBadges element={cookie.element} role={cookie.role} />
        <Image src={cookie.image} alt={cookie.name} width={280} height={280} loading={eager ? "eager" : "lazy"} sizes="(max-width: 640px) 43vw, (max-width: 1024px) 29vw, 210px" />
      </I18nElement>
      <I18nElement as="div" className="cookie-card__body">
        <I18nElement as="div" className="cookie-card__identity"><I18nElement as="h3">{cookie.name}</I18nElement><I18nElement as="span" className="cookie-card__rarity">{cookie.rarity}</I18nElement></I18nElement>
        <I18nElement as="dl" className="cookie-card__details">
          <I18nElement as="div"><I18nElement as="dt">Granted</I18nElement><I18nElement as="dd"><SynergyList values={cookie.grantedSynergies} direction="granted" /></I18nElement></I18nElement>
          <I18nElement as="div"><I18nElement as="dt">Received</I18nElement><I18nElement as="dd"><SynergyList values={cookie.receivedSynergies} direction="received" /></I18nElement></I18nElement>
          <I18nElement as="div" className="cookie-card__buffs">
            <I18nElement as="dt">Buff</I18nElement>
            <I18nElement as="dd">{cookie.buffs.length ? cookie.buffs.map((buff) => <I18nElement as="span" key={buff}>{buffDefinitions[buff].label}</I18nElement>) : <I18nElement as="span" className="cookie-card__none">None</I18nElement>}</I18nElement>
          </I18nElement>
        </I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
