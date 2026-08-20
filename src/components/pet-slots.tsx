import Image from "next/image";
import { AppIcon } from "@/components/ui/icon";
import type { Pet } from "@/data/pets";
import { petSlotCount } from "@/lib/team-query";

export function PetSlots({ pets, onRemove }: { pets: (Pet | null | undefined)[]; onRemove?: (index: number) => void }) {
  return (
    <div className="pet-slots" aria-label="Pet lineup">
      {Array.from({ length: petSlotCount }, (_, index) => {
        const pet = pets[index];
        if (pet && onRemove) {
          return (
            <button className="pet-slot is-filled" type="button" key={`${pet.id}-${index}`} onClick={() => onRemove(index)} aria-label={`Remove ${pet.name}`} title={pet.name}>
              <Image src={pet.image} alt={pet.name} width={104} height={104} sizes="72px" />
              <span className="pet-slot__remove"><AppIcon name="x" size={14} /></span>
            </button>
          );
        }
        return (
          <div className={`pet-slot${pet ? " is-filled" : ""}`} key={pet ? `${pet.id}-${index}` : index} title={pet?.name}>
            {pet ? <Image src={pet.image} alt={pet.name} width={104} height={104} sizes="72px" /> : <span>{index + 1}</span>}
          </div>
        );
      })}
    </div>
  );
}
