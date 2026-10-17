export const locales = ["en", "zh-Hant", "ja", "ko", "th"] as const;
export type Locale = (typeof locales)[number];
export const localeConfig: Record<Locale, { prefix: string; label: string; og: string; gameName: string }> = {
  en: { prefix: "", label: "English", og: "en_US", gameName: "CookieRun: Crumble" },
  "zh-Hant": { prefix: "/zh-tw", label: "繁體中文", og: "zh_TW", gameName: "薑餅人放置大戰爭" },
  ja: { prefix: "/ja", label: "日本語", og: "ja_JP", gameName: "クッキーラン：クランブル" },
  ko: { prefix: "/ko", label: "한국어", og: "ko_KR", gameName: "쿠키런 키우기" },
  th: { prefix: "/th", label: "ไทย", og: "th_TH", gameName: "CookieRun: Crumble" },
};
export const translatedLocales = locales.filter((locale) => locale !== "en");
export function localeFromSegment(segment: string): Locale | undefined {
  return translatedLocales.find((locale) => localeConfig[locale].prefix === `/${segment}`);
}
export function localeFromPath(path: string): Locale {
  return localeFromSegment(path.split("/")[1]) ?? "en";
}
export function unlocalizedPath(path: string): string {
  const locale = localeFromPath(path);
  return locale === "en" ? path : path.slice(localeConfig[locale].prefix.length) || "/";
}
const pagePath = /^\/(?:$|cookies(?:\/|$)|pets(?:\/|$)|tier-list(?:\/|$)|teams(?:\/|$)|codes(?:\/|$)|guides(?:\/|$)|tools(?:\/(?:$|team-builder(?:\/|$)|tier-builder(?:\/|$)|sugar-runes(?:\/|$)|stellar-link(?:\/|$)|plate-enhancement(?:\/|$)))|about(?:\/|$)|contact(?:\/|$)|privacy(?:\/|$)|disclaimer(?:\/|$))/;
export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const value = unlocalizedPath(path);
  const pathname = value.split(/[?#]/)[0];
  if (!pagePath.test(pathname)) return path;
  return `${localeConfig[locale].prefix}${value}`;
}
export function alternateLanguages(path: string, origin: string) {
  return Object.fromEntries([
    ...locales.map((locale) => [locale, origin + localizedPath(path, locale)]),
    ["x-default", origin + localizedPath(path, "en")],
  ]);
}
