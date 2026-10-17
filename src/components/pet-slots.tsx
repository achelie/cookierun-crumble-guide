import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import { AppIcon } from "@/components/ui/icon";
import type { Pet } from "@/data/pets";
import { petSlotCount } from "@/lib/team-query";

export function PetSlots({ pets, onRemove }: { pets: (Pet | null | undefined)[]; onRemove?: (index: number) => void }) {
  return (
    <I18nElement as="div" className="pet-slots" aria-label="Pet lineup">
      {Array.from({ length: petSlotCount }, (_, index) => {
        const pet = pets[index];
        if (pet && onRemove) {
          return (
            <I18nElement as="button" className="pet-slot is-filled" type="button" key={`${pet.id}-${index}`} onClick={() => onRemove(index)} aria-label={`Remove ${pet.name}`} title={pet.name}>
              <Image src={pet.image} alt={pet.name} width={104} height={104} sizes="72px" />
              <I18nElement as="span" className="pet-slot__remove"><AppIcon name="x" size={14} /></I18nElement>
            </I18nElement>
          );
        }
        return (
          <I18nElement as="div" className={`pet-slot${pet ? " is-filled" : ""}`} key={pet ? `${pet.id}-${index}` : index} title={pet?.name}>
            {pet ? <Image src={pet.image} alt={pet.name} width={104} height={104} sizes="72px" /> : <I18nElement as="span">{index + 1}</I18nElement>}
          </I18nElement>
        );
      })}
    </I18nElement>
  );
}
