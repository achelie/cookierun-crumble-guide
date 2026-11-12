import gameData from "@/data/cookie-details.generated.json";
import { cookieRuneRecommendations } from "@/data/cookie-runes";
import { cookieById, cookiesUpdatedAt, type Cookie } from "@/data/cookies";
import { tierUpdatedAt } from "@/data/tier-list";
import type { Locale } from "@/i18n/config";
import { cookieDetailRoutes } from "@/lib/cookie-detail-paths";

export const cookieDetailGameVersion = "1.6.102";
export const cookieDetailsUpdatedAt = cookiesUpdatedAt;
export const cookiePageUpdatedAt = cookiesUpdatedAt > tierUpdatedAt ? cookiesUpdatedAt : tierUpdatedAt;

type LocalizedText = Record<Locale, string>;
type GameCodexReward = {
  stars: number;
  amount: number;
  names: LocalizedText;
  image: string;
};

type GameSkillMetric = {
  id: string;
  labels: LocalizedText;
  values: (LocalizedText | null)[];
  group: number;
  block: number;
  passive: boolean;
};

export type CookieSkillMetric = Omit<GameSkillMetric, "labels" | "values"> & {
  label: string;
  values: (string | null)[];
};

export type CookiePromotion = {
  stars: number;
  copies: number;
  skillStep: number;
  stats: { key: string; value: number; unit: string }[];
};

type GameSkill = {
  id: string;
  names: LocalizedText;
  descriptions: LocalizedText;
  icon: string | null;
  metrics: GameSkillMetric[];
};

type GameProfile = {
  names: LocalizedText;
  descriptions: LocalizedText;
  rarityRaw: string;
  inCodex: boolean;
  portrait: string;
  head: string;
  stats: { key: string; value: number; unit: string }[];
  skills: GameSkill[];
};

type CookieProfile = Omit<GameProfile, "names" | "descriptions" | "skills" | "rarityRaw" | "inCodex"> & {
  name: string;
  description: string;
  skills: { id: string; name: string; description: string; icon: string | null; metrics: CookieSkillMetric[] }[];
  promotions: CookiePromotion[];
  codexRewards: (Omit<GameCodexReward, "names"> & { name: string })[];
  runeRecommendations: ReturnType<typeof cookieRuneRecommendations>;
};

export type CookieDetailEntry = (typeof cookieDetailRoutes)[number] & {
  cookie: Cookie;
  locale: Locale;
  profile: CookieProfile;
};

export function maxCookieStars(profile: CookieDetailEntry["profile"]) {
  return Math.max(0, ...profile.promotions.map(({ stars }) => stars));
}

const profiles: Record<string, GameProfile> = gameData.profiles;
const promotions: Record<string, CookiePromotion[]> = gameData.promotions;
const codexRewards: Record<string, GameCodexReward[]> = gameData.codexRewards;
const routesBySlug = new Map(cookieDetailRoutes.map((route) => [route.slug, route]));

export function getCookieDetail(slug: string, locale: Locale): CookieDetailEntry | undefined {
  const route = routesBySlug.get(slug);
  if (!route) return undefined;

  const cookie = cookieById.get(route.id);
  const profile = profiles[route.id];
  if (!cookie || !profile) throw new Error(`Missing Cookie profile data for ${route.id}`);

  const { names, descriptions, skills, rarityRaw, inCodex, ...rest } = profile;
  const promotionCurve = promotions[rarityRaw];
  if (!promotionCurve) throw new Error(`Missing Cookie promotion curve for ${rarityRaw}`);
  const rewards = inCodex ? codexRewards[rarityRaw] : [];
  if (!rewards) throw new Error(`Missing Cookie Collection rewards for ${rarityRaw}`);
  return {
    ...route,
    cookie,
    locale,
    profile: {
      ...rest,
      name: names[locale],
      description: descriptions[locale],
      promotions: promotionCurve,
      codexRewards: rewards.map(({ names, ...reward }) => ({ ...reward, name: names[locale] })),
      runeRecommendations: cookieRuneRecommendations(route.id),
      skills: skills.map(({ id, names, descriptions, icon, metrics }) => ({
        id,
        name: names[locale],
        description: descriptions[locale],
        icon,
        metrics: metrics.map(({ labels, values, ...metric }) => ({
          ...metric,
          label: labels[locale],
          values: values.map((value) => value?.[locale] ?? null),
        })),
      })),
    },
  };
}
