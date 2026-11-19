import type { Metadata } from "next";
import { absoluteUrl, siteName, type SeoPageDefinition } from "@/lib/seo";
import { alternateLanguages, localeConfig, localizedPath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/dictionaries";
import { siteUrl } from "@/lib/seo";
import { socialImageUrl } from "@/lib/site-identity";
import { dataMethod } from "@/data/data-method";

export function pageMetadata(page: SeoPageDefinition, locale: Locale = "en"): Metadata {
  const t = getTranslator(locale);
  const url = absoluteUrl(localizedPath(page.path, locale));
  const image = locale === "en" ? socialImageUrl : absoluteUrl(`/images/social/${locale}.png`);
  const description = page.path === "/about/" && locale !== "en" ? dataMethod[locale].description : t(page.description);
  return {
    metadataBase: new URL(siteUrl),
    title: { absolute: t(page.title) },
    description,
    alternates: { canonical: url, languages: alternateLanguages(page.path, siteUrl) },
    openGraph: {
      title: t(page.title),
      description,
      url,
      siteName,
      type: "website",
      locale: localeConfig[locale].og,
      images: [{ url: image, alt: t(page.h1) }],
    },
    twitter: {
      card: "summary_large_image",
      title: t(page.title),
      description,
      images: [image],
    },
  };
}
