import { arraySwap } from "@dnd-kit/helpers";

export function placeFormationMember(
  slots: (string | null)[],
  id: string,
  targetIndex: number,
  sourceIndex?: number,
) {
  if (targetIndex < 0 || targetIndex >= slots.length) return slots;

  const next = [...slots];
  const currentIndex = sourceIndex ?? next.indexOf(id);

  if (currentIndex >= 0) {
    if (currentIndex === targetIndex) return slots;
    return arraySwap(next, currentIndex, targetIndex);
  }

  if (!next[targetIndex]) {
    next[targetIndex] = id;
    return next;
  }

  const emptyIndex = next.indexOf(null);
  if (emptyIndex < 0) return slots;
  next[emptyIndex] = next[targetIndex];
  next[targetIndex] = id;
  return next;
}
