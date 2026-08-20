export const cookieSlotCount = 12;
export const petSlotCount = 3;

function parseSlots(value: string | null, validIds: Set<string>, count: number) {
  const requested = value?.split(",") ?? [];
  const seen = new Set<string>();

  return Array.from({ length: count }, (_, index): string | null => {
    const id = requested[index];
    if (!id || !validIds.has(id) || seen.has(id)) return null;
    seen.add(id);
    return id;
  });
}

export function parseTeamQuery(
  teamValue: string | null,
  petValue: string | null,
  cookieIds: Set<string>,
  petIds: Set<string>,
) {
  return {
    cookies: parseSlots(teamValue, cookieIds, cookieSlotCount),
    pets: parseSlots(petValue, petIds, petSlotCount),
  };
}

function serializeSlots(slots: (string | null)[]) {
  let finalIndex = slots.length - 1;
  while (finalIndex >= 0 && !slots[finalIndex]) finalIndex -= 1;
  return slots.slice(0, finalIndex + 1).map((id) => id ?? "").join(",");
}

export function serializeTeamQuery(cookies: (string | null)[], pets: (string | null)[]) {
  return {
    team: serializeSlots(cookies),
    pets: serializeSlots(pets),
  };
}
