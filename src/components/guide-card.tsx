import { I18nElement } from "@/i18n/elements";
import { LocaleLink as Link } from "@/i18n/elements";
import { GuideCover } from "@/components/guide-cover";
import { AppIcon } from "@/components/ui/icon";
import { getGuideCategory, type GuideSummary } from "@/data/guides";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function GuideCard({
  guide,
  featured = false,
  compact = false,
}: {
  guide: GuideSummary;
  featured?: boolean;
  compact?: boolean;
}) {
  const category = getGuideCategory(guide.category);
  const Heading = compact ? "h3" : "h2";

  return (
    <I18nElement as="article" className={`guide-card${featured ? " guide-card--featured" : ""}${compact ? " guide-card--related" : ""}`}>
      <Link href={`/guides/${guide.slug}/`} className="guide-card__cover" aria-label={`Read ${guide.title}`}>
        <GuideCover cookieIds={guide.coverCookieIds} compact={!featured || compact} priority={featured} />
      </Link>
      <I18nElement as="div" className="guide-card__copy">
        <Link className="guide-card__category" href={`/guides/?category=${category.slug}`}>{category.label}</Link>
        <Heading><Link href={`/guides/${guide.slug}/`}>{guide.title}</Link></Heading>
        {!compact && <I18nElement as="p">{guide.excerpt}</I18nElement>}
        <I18nElement as="div" className="guide-card__meta">
          {!compact && <I18nElement as="span"><AppIcon name="calendar" size={15} />Updated {dateFormatter.format(new Date(`${guide.updatedAt}T00:00:00Z`))}</I18nElement>}
          <I18nElement as="span"><AppIcon name="clock" size={15} />{guide.readingMinutes} min read</I18nElement>
        </I18nElement>
        <Link className="guide-card__read" href={`/guides/${guide.slug}/`}>Read guide <AppIcon name="chevron" size={16} /></Link>
      </I18nElement>
    </I18nElement>
  );
}
