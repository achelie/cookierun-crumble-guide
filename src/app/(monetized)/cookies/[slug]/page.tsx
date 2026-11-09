import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CookieDetail } from "@/components/cookie-detail";
import { StructuredData } from "@/components/structured-data";
import { alternateLanguages, localeConfig, localeFromSegment, localizedPath } from "@/i18n/config";
import { cookieDetailRoutes } from "@/lib/cookie-detail-paths";
import { getCookieDetail } from "@/lib/cookie-details";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";
import { breadcrumbNode, schemaGraph } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string; locale?: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cookieDetailRoutes.map(({ slug }) => ({ slug }));
}

async function findEntry(params: Props["params"]) {
  const { slug, locale: segment } = await params;
  const locale = segment ? localeFromSegment(segment) : "en";
  return locale && getCookieDetail(slug, locale);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = await findEntry(params);
  if (!entry) return {};

  const { locale, path, profile } = entry;
  const url = absoluteUrl(localizedPath(path, locale));
  const title = `${profile.name} | ${localeConfig[locale].gameName}`;
  const words = profile.description.replace(/\s+/g, " ").trim();
  const characters = Array.from(words);
  const description = characters.length > 160 ? `${characters.slice(0, 159).join("").trimEnd()}…` : words;
  const image = absoluteUrl(profile.portrait);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: alternateLanguages(path, siteUrl) },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName,
      locale: localeConfig[locale].og,
      images: [{ url: image, alt: profile.name }],
    },
    twitter: { card: "summary", title, description, images: [image] },
  };
}

export default async function CookieDetailPage({ params }: Props) {
  const entry = await findEntry(params);
  if (!entry) notFound();

  const { locale, path, profile } = entry;
  const url = absoluteUrl(path);
  const data = schemaGraph([
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: profile.name,
      description: profile.description,
      inLanguage: locale,
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: {
        "@type": "Thing",
        name: profile.name,
        image: absoluteUrl(profile.portrait),
      },
    },
    breadcrumbNode({ path, breadcrumb: profile.name }, { path: "/cookies/", name: "Cookies" }),
  ]);

  return (
    <>
      <StructuredData data={data} />
      <CookieDetail entry={entry} />
    </>
  );
}
