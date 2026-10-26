// Restrict a guide only while its localized pages are unpublished.
const englishOnlyGuides = new Set<string>();

export function guideSupportsLocale(slug: string, locale: string) {
  return locale === "en" || !englishOnlyGuides.has(slug);
}

export function guidePathSupportsLocale(path: string, locale: string) {
  const slug = /^\/guides\/([^/?#]+)\/?(?:[?#]|$)/.exec(path)?.[1];
  return !slug || guideSupportsLocale(slug, locale);
}
