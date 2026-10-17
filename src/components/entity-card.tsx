import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import type { Pet } from "@/data/pets";

export function EntityCard({ name, rarity, image, effects }: Pet) {
  return (
    <I18nElement as="article" className={`entity-card pet-card rarity-${rarity.toLowerCase()}`}>
      <I18nElement as="div" className="entity-card__art">
        <Image src={image} alt={name} width={280} height={280} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px" />
      </I18nElement>
      <I18nElement as="div" className="entity-card__copy">
        <I18nElement as="span">{rarity}</I18nElement>
        <I18nElement as="h3">{name}</I18nElement>
        <I18nElement as="div" className={`pet-card__effects${effects.length ? "" : " is-empty"}`}>
          <I18nElement as="small">Effect</I18nElement>
          {effects.length ? <I18nElement as="ul">{effects.map((effect) => <I18nElement as="li" key={effect}>{effect}</I18nElement>)}</I18nElement> : <I18nElement as="p">No registered effect</I18nElement>}
        </I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
