import Image from "next/image";
import type { Pet } from "@/data/pets";

export function EntityCard({ name, rarity, image, effects }: Pet) {
  return (
    <article className={`entity-card pet-card rarity-${rarity.toLowerCase()}`}>
      <div className="entity-card__art">
        <Image src={image} alt={name} width={280} height={280} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px" />
      </div>
      <div className="entity-card__copy">
        <span>{rarity}</span>
        <h3>{name}</h3>
        <div className={`pet-card__effects${effects.length ? "" : " is-empty"}`}>
          <small>Effect</small>
          {effects.length ? <ul>{effects.map((effect) => <li key={effect}>{effect}</li>)}</ul> : <p>No registered effect</p>}
        </div>
      </div>
    </article>
  );
}
