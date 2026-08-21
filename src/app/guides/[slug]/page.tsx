import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/guide-card";
import { GuideCover } from "@/components/guide-cover";
import { QuickNavigation } from "@/components/quick-navigation";
import { AppIcon } from "@/components/ui/icon";
import { getGuideBySlug, getGuideCategory, guides } from "@/data/guides";
import { loadGuideContent } from "@/lib/guide-content";
import { getRelatedGuides } from "@/lib/guides";

const siteUrl = "https://www.cookieruncrumbles.com";
const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

type GuidePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides
    .filter((guide) => guide.slug !== "cookie-run-crumble-beginner-progression-guide")
    .map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const url = `${siteUrl}/guides/${guide.slug}/`;

  return {
    title: guide.title,
    description: guide.excerpt,
    keywords: ["CookieRun Crumble beginner guide", "CookieRun Crumble progression", ...guide.tags],
    authors: [{ name: guide.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.excerpt,
      url,
      siteName: "CookieRun: Crumble Guide",
      publishedTime: `${guide.publishedAt}T00:00:00Z`,
      modifiedTime: `${guide.updatedAt}T00:00:00Z`,
      authors: [guide.author],
      tags: guide.tags,
      images: [{ url: "/opengraph-image" }],
    },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.excerpt, images: ["/opengraph-image"] },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  const Content = await loadGuideContent(guide.slug);
  if (!Content) notFound();
  const category = getGuideCategory(guide.category);
  const related = getRelatedGuides(guide, guides);
  const canonical = `${siteUrl}/guides/${guide.slug}/`;
  const articleJsonLd = {
    "@type": "BlogPosting",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: guide.author },
    publisher: { "@type": "Organization", name: "CookieRun: Crumble Guide", url: siteUrl },
    image: `${siteUrl}/opengraph-image`,
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
    <div className="page-shell guide-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Link className="guide-back" href="/guides/"><AppIcon name="chevron-left" size={17} />All guides</Link>

      <header className="guide-hero">
        <div className="guide-hero__copy">
          <Link className="guide-card__category" href={`/guides/?category=${category.slug}`}>{category.label}</Link>
          <h1>{guide.title}</h1>
          <p>{guide.excerpt}</p>
          <div className="guide-hero__meta">
            <span><AppIcon name="calendar" size={16} />Updated {dateFormatter.format(new Date(`${guide.updatedAt}T00:00:00Z`))}</span>
            <span><AppIcon name="clock" size={16} />{guide.readingMinutes} min read</span>
            <span>By {guide.author}</span>
          </div>
        </div>
        <GuideCover cookieIds={guide.coverCookieIds} priority />
      </header>

      <div className="guide-reading-layout">
        <QuickNavigation items={guide.toc} />
        <article className="guide-prose">
          <Content />
        </article>
      </div>

      {related.length > 0 && (
        <section className="related-guides">
          <div className="section-heading"><span className="eyebrow">Keep going</span><h2>Related guides</h2></div>
          <div className="related-guides__grid">{related.map((item) => <GuideCard key={item.slug} guide={item} />)}</div>
        </section>
      )}
    </div>
  );
}
