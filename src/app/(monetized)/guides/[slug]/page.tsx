import { I18nElement } from "@/i18n/elements";
import { GuideAds } from "@/components/ads/guide-ads";
import { guideAdRules } from "@/lib/ads/config";
import type { Metadata } from "next";
import { LocaleLink as Link } from "@/i18n/elements";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/guide-card";
import { GuideCover } from "@/components/guide-cover";
import { QuickNavigation } from "@/components/quick-navigation";
import { StructuredData } from "@/components/structured-data";
import { DirectAnswer } from "@/components/direct-answer";
import { LastUpdated } from "@/components/last-updated";
import { getGuideAnswer } from "@/data/guide-answers";
import { guideFaqFromMdx } from "@/lib/guide-faq";
import { organizationRef, schemaGraph, websiteRef } from "@/lib/structured-data";
import { siteTitle } from "@/lib/site-identity";
import { contentDate } from "@/lib/direct-answers";
import { AppIcon } from "@/components/ui/icon";
import { cookieById } from "@/data/cookies";
import { getGuideBySlug, getGuideCategory, guides } from "@/data/guides";
import { loadGuideContent } from "@/lib/guide-content";
import { getRelatedGuides } from "@/lib/guides";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";
import { alternateLanguages, localeConfig, localeFromSegment, localizedPath } from "@/i18n/config";
import { getTranslator } from "@/i18n/dictionaries";
import { guideSupportsLocale } from "@/i18n/guide-availability";

const publishedLabel = { en: "Published:", "zh-Hant": "發布：", ja: "公開：", ko: "게시:", th: "เผยแพร่:" };

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
  const title = `${t(guide.seoTitle).split(" | ")[0]} | ${siteTitle}`;

  return {
    title: { absolute: title },
    description: t(guide.seoDescription),
    authors: [{ name: siteName }],
    alternates: { canonical: url, languages: alternateLanguages(path, siteUrl) },
    openGraph: {
      type: "article",
      title,
      description: t(guide.seoDescription),
      locale: localeConfig[locale].og,
      url,
      siteName,
      publishedTime: `${guide.publishedAt}T00:00:00Z`,
      modifiedTime: `${guide.updatedAt}T00:00:00Z`,
      authors: [siteName],
      tags: guide.tags.map(t),
      images: [{ url: socialImage, alt: t(coverCookie?.name ?? guide.title) }],
    },
    twitter: { card: "summary_large_image", title, description: t(guide.seoDescription), images: [socialImage] },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug, locale: segment } = await params;
  const locale = segment ? localeFromSegment(segment) : "en";
  if (!locale) notFound();
  const guide = getGuideBySlug(slug);
  if (!guide || !guideSupportsLocale(slug, locale)) notFound();
  const [Content, faq] = await Promise.all([loadGuideContent(guide.slug, locale), guideFaqFromMdx(guide.slug, locale)]);
  if (!Content) notFound();
  const category = getGuideCategory(guide.category);
  const { minimumMinutes, minimumSections, longMinutes, longSections } = guideAdRules;
  const answer = guide.readingMinutes >= minimumMinutes && guide.toc.length >= minimumSections ? guide.toc[0]?.id : undefined;
  const middle = answer && guide.readingMinutes >= longMinutes && guide.toc.length >= longSections
    ? guide.toc[Math.floor(guide.toc.length / 2) - 1]?.id : undefined;
  const related = getRelatedGuides(guide, guides.filter((item) => guideSupportsLocale(item.slug, locale)));
  const directAnswer = getGuideAnswer(guide.slug, locale);
  if (!directAnswer) throw new Error(`Missing direct answer for ${guide.slug} (${locale})`);
  const t = getTranslator(locale);
  const canonical = absoluteUrl(localizedPath(`/guides/${guide.slug}/`, locale));
  const socialImage = absoluteUrl(cookieById.get(guide.coverCookieIds[0])?.image ?? "/opengraph-image");
  const jsonLd = schemaGraph([
    {
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: t(guide.title),
      description: t(guide.excerpt),
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      author: organizationRef,
      publisher: organizationRef,
      isPartOf: websiteRef,
      image: socialImage,
      mainEntityOfPage: canonical,
      url: canonical,
      inLanguage: locale,
      isAccessibleForFree: true,
    },
    ...(faq.length ? [{
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      url: canonical,
      inLanguage: locale,
      mainEntity: faq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    }] : []),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t("Home"), item: absoluteUrl(localizedPath("/", locale)) },
        { "@type": "ListItem", position: 2, name: t("Guides"), item: absoluteUrl(localizedPath("/guides/", locale)) },
        { "@type": "ListItem", position: 3, name: t(guide.title), item: canonical },
      ],
    },
  ], locale);

  return (
    <I18nElement as="div" className="page-shell guide-detail">
      <StructuredData data={jsonLd} localized />
      <Link className="guide-back" href="/guides/"><AppIcon name="chevron-left" size={17} />All guides</Link>

      <I18nElement as="header" className="guide-hero">
        <I18nElement as="div" className="guide-hero__copy">
          <Link className="guide-card__category" href={`/guides/?category=${category.slug}`}>{category.label}</Link>
          <I18nElement as="h1">{guide.title}</I18nElement>
          <DirectAnswer date={guide.updatedAt} locale={locale} cutoff>{directAnswer}</DirectAnswer>
          <I18nElement as="p">{guide.excerpt}</I18nElement>
          <I18nElement as="div" className="guide-hero__meta">
            <LastUpdated date={guide.updatedAt} />
            <span>{publishedLabel[locale]} <time dateTime={guide.publishedAt}>{contentDate(guide.publishedAt, locale)}</time></span>
            <I18nElement as="span"><AppIcon name="clock" size={16} />{guide.readingMinutes} min read</I18nElement>
            <I18nElement as="span">By <span>{siteName}</span></I18nElement>
          </I18nElement>
        </I18nElement>
        <GuideCover cookieIds={guide.coverCookieIds} compact priority />
      </I18nElement>

      <I18nElement as="div" className="guide-reading-layout">
        <QuickNavigation items={guide.toc} />
        <I18nElement as="article" className="guide-prose">
          <GuideAds sections={{ answer, middle }}><Content /></GuideAds>
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
