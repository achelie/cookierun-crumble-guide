import Image from "next/image";
import { synergyBadgeImages, synergyDefinitions, type Synergy } from "@/data/cookies";

type SynergyDirection = "granted" | "received" | "active";

export function SynergyBadge({ value, direction }: { value: Synergy; direction: SynergyDirection }) {
  const definition = synergyDefinitions[value];
  const arrow = direction === "received" ? synergyBadgeImages.receivedArrow : synergyBadgeImages.grantedArrow;

  return (
    <span className={`synergy-badge synergy-badge--${direction}`} role="img" aria-label={`${direction} ${definition.label} synergy`} title={definition.label}>
      <Image className="synergy-badge__icon" src={definition.image} alt="" width={34} height={34} />
      <Image className="synergy-badge__arrow" src={arrow} alt="" width={14} height={14} />
    </span>
  );
}
