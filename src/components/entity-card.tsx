import Image from "next/image";
import type { Rarity } from "@/data/cookies";

export function EntityCard({ name, rarity, image, compact = false }: { name: string; rarity: Rarity | Exclude<Rarity, "TSSR">; image: string; compact?: boolean }) {
  return (
    <article className={`entity-card rarity-${rarity.toLowerCase()}${compact ? " entity-card--compact" : ""}`}>
      <div className="entity-card__art">
        <Image src={image} alt={name} width={280} height={280} sizes={compact ? "96px" : "(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 180px"} />
      </div>
      <div className="entity-card__copy">
        <span>{rarity}</span>
        <h3>{name}</h3>
      </div>
    </article>
  );
}
