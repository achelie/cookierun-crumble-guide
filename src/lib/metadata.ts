import type { Metadata } from "next";
import { absoluteUrl, siteName, type SeoPageDefinition } from "@/lib/seo";
import { alternateLanguages, localeConfig, localizedPath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/dictionaries";
import { siteUrl } from "@/lib/seo";

export function pageMetadata(page: SeoPageDefinition, locale: Locale = "en"): Metadata {
  const t = getTranslator(locale);
  const url = absoluteUrl(localizedPath(page.path, locale));
  return {
    metadataBase: new URL(siteUrl),
    title: { absolute: t(page.title) },
    description: t(page.description),
    alternates: { canonical: url, languages: alternateLanguages(page.path, siteUrl) },
    openGraph: {
      title: t(page.title),
      description: t(page.description),
      url,
      siteName,
      type: "website",
      locale: localeConfig[locale].og,
      images: [{ url: locale === "en" ? "/opengraph-image" : `/images/social/${locale}.png`, alt: t(page.h1) }],
    },
    twitter: {
      card: "summary_large_image",
      title: t(page.title),
      description: t(page.description),
      images: [locale === "en" ? "/opengraph-image" : `/images/social/${locale}.png`],
    },
  };
}
