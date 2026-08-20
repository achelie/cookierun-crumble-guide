import { tierRanks, type TierRank } from "@/data/tier-list";

export type TierBuilderState = Record<TierRank, string[]>;
export type TierDropTarget = TierRank | "unranked";

export function emptyTierBuilderState(): TierBuilderState {
  return { S: [], A: [], B: [], C: [], D: [] };
}

export function parseTierBuilderQuery(params: Pick<URLSearchParams, "get">, validIds: Set<string>): TierBuilderState {
  const state = emptyTierBuilderState();
  const seen = new Set<string>();

  tierRanks.forEach((rank) => {
    const value = params.get(rank.toLowerCase());
    state[rank] = (value?.split(",") ?? []).filter((id) => {
      if (!id || !validIds.has(id) || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  });

  return state;
}

export function serializeTierBuilderState(state: TierBuilderState) {
  return Object.fromEntries(tierRanks.map((rank) => [rank.toLowerCase(), state[rank].join(",")])) as Record<Lowercase<TierRank>, string>;
}

export function getUnrankedCookieIds(allIds: string[], state: TierBuilderState) {
  const ranked = new Set(tierRanks.flatMap((rank) => state[rank]));
  return allIds.filter((id) => !ranked.has(id));
}

export function moveTierCookie(
  state: TierBuilderState,
  cookieId: string,
  targetRank: TierDropTarget,
  beforeCookieId?: string,
) {
  const next = Object.fromEntries(tierRanks.map((rank) => [rank, state[rank].filter((id) => id !== cookieId)])) as TierBuilderState;
  if (targetRank === "unranked") return next;

  const target = next[targetRank];
  const targetIndex = beforeCookieId ? target.indexOf(beforeCookieId) : -1;
  target.splice(targetIndex >= 0 ? targetIndex : target.length, 0, cookieId);
  return next;
}

export function normalizeTierPreset(preset: TierBuilderState, validIds: Set<string>) {
  const seen = new Set<string>();
  return Object.fromEntries(tierRanks.map((rank) => [rank, preset[rank].filter((id) => {
    if (!validIds.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  })])) as TierBuilderState;
}
