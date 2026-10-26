import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { LocaleLink as Link } from "@/i18n/elements";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/guide-card";
import { GuideCover } from "@/components/guide-cover";
import { QuickNavigation } from "@/components/quick-navigation";
import { StructuredData } from "@/components/structured-data";
import { AppIcon } from "@/components/ui/icon";
import { cookieById } from "@/data/cookies";
import { getGuideBySlug, getGuideCategory, guides } from "@/data/guides";
import { loadGuideContent } from "@/lib/guide-content";
import { getRelatedGuides } from "@/lib/guides";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";
import { alternateLanguages, localeConfig, localeFromSegment, localizedPath } from "@/i18n/config";
import { getTranslator } from "@/i18n/dictionaries";
import { guideSupportsLocale } from "@/i18n/guide-availability";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

type GuidePageProps = { params: Promise<{ slug: string; locale?: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug, locale: segment } = await params;
  const locale = segment ? localeFromSegment(segment) : "en";
  if (!locale) return {};
  const t = getTranslator(locale);
  const guide = getGuideBySlug(slug);
  if (!guide || !guideSupportsLocale(slug, locale)) return {};
  const path = `/guides/${guide.slug}/`;
  const url = siteUrl + localizedPath(path, locale);
  const coverCookie = cookieById.get(guide.coverCookieIds[0]);
  const socialImage = absoluteUrl(coverCookie?.image ?? "/opengraph-image");

  return {
    title: { absolute: t(guide.seoTitle) },
    description: t(guide.seoDescription),
    authors: [{ name: guide.author }],
    alternates: { canonical: url, languages: alternateLanguages(path, siteUrl) },
    openGraph: {
      type: "article",
      title: t(guide.seoTitle),
      description: t(guide.seoDescription),
      locale: localeConfig[locale].og,
      url,
      siteName,
      publishedTime: `${guide.publishedAt}T00:00:00Z`,
      modifiedTime: `${guide.updatedAt}T00:00:00Z`,
      authors: [guide.author],
      tags: guide.tags.map(t),
      images: [{ url: socialImage, alt: t(coverCookie?.name ?? guide.title) }],
    },
    twitter: { card: "summary_large_image", title: t(guide.seoTitle), description: t(guide.seoDescription), images: [socialImage] },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug, locale: segment } = await params;
  const locale = segment ? localeFromSegment(segment) : "en";
  if (!locale) notFound();
  const guide = getGuideBySlug(slug);
  if (!guide || !guideSupportsLocale(slug, locale)) notFound();
  const Content = await loadGuideContent(guide.slug, locale);
  if (!Content) notFound();
  const category = getGuideCategory(guide.category);
  const related = getRelatedGuides(guide, guides.filter((item) => guideSupportsLocale(item.slug, locale)));
  const canonical = `${siteUrl}/guides/${guide.slug}/`;
  const socialImage = absoluteUrl(cookieById.get(guide.coverCookieIds[0])?.image ?? "/opengraph-image");
  const articleJsonLd = {
    "@type": "BlogPosting",
    headline: guide.title,
    description: guide.seoDescription,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: guide.author },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.png"), width: 96, height: 96 },
    },
    image: socialImage,
    mainEntityOfPage: canonical,
    url: canonical,
    keywords: guide.tags.join(", "),
    inLanguage: "en",
    isAccessibleForFree: true,
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      articleJsonLd,
      {
        "@type": "FAQPage",
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides/` },
          { "@type": "ListItem", position: 3, name: guide.title, item: canonical },
        ],
      },
    ],
  };

  return (
    <I18nElement as="div" className="page-shell guide-detail">
      <StructuredData data={jsonLd} />
      <Link className="guide-back" href="/guides/"><AppIcon name="chevron-left" size={17} />All guides</Link>

      <I18nElement as="header" className="guide-hero">
        <I18nElement as="div" className="guide-hero__copy">
          <Link className="guide-card__category" href={`/guides/?category=${category.slug}`}>{category.label}</Link>
          <I18nElement as="h1">{guide.title}</I18nElement>
          <I18nElement as="p">{guide.excerpt}</I18nElement>
          <I18nElement as="div" className="guide-hero__meta">
            <I18nElement as="span"><AppIcon name="calendar" size={16} />Updated {dateFormatter.format(new Date(`${guide.updatedAt}T00:00:00Z`))}</I18nElement>
            <I18nElement as="span"><AppIcon name="clock" size={16} />{guide.readingMinutes} min read</I18nElement>
            <I18nElement as="span">By {guide.author}</I18nElement>
          </I18nElement>
        </I18nElement>
        <GuideCover cookieIds={guide.coverCookieIds} compact priority />
      </I18nElement>

      <I18nElement as="div" className="guide-reading-layout">
        <QuickNavigation items={guide.toc} />
        <I18nElement as="article" className="guide-prose">
          <Content />
        </I18nElement>
      </I18nElement>

      {related.length > 0 && (
        <I18nElement as="section" className="related-guides">
          <I18nElement as="div" className="section-heading"><I18nElement as="h2">Related guides</I18nElement></I18nElement>
          <I18nElement as="div" className="related-guides__grid">{related.map((item) => <GuideCard key={item.slug} guide={item} compact />)}</I18nElement>
        </I18nElement>
      )}
    </I18nElement>
  );
}
