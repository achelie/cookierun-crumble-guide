import Link from "next/link";
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
    <article className={`guide-card${featured ? " guide-card--featured" : ""}${compact ? " guide-card--related" : ""}`}>
      <Link href={`/guides/${guide.slug}/`} className="guide-card__cover" aria-label={`Read ${guide.title}`}>
        <GuideCover cookieIds={guide.coverCookieIds} compact={!featured || compact} priority={featured} />
      </Link>
      <div className="guide-card__copy">
        <Link className="guide-card__category" href={`/guides/?category=${category.slug}`}>{category.label}</Link>
        <Heading><Link href={`/guides/${guide.slug}/`}>{guide.title}</Link></Heading>
        {!compact && <p>{guide.excerpt}</p>}
        <div className="guide-card__meta">
          {!compact && <span><AppIcon name="calendar" size={15} />Updated {dateFormatter.format(new Date(`${guide.updatedAt}T00:00:00Z`))}</span>}
          <span><AppIcon name="clock" size={15} />{guide.readingMinutes} min read</span>
        </div>
        <Link className="guide-card__read" href={`/guides/${guide.slug}/`}>Read guide <AppIcon name="chevron" size={16} /></Link>
      </div>
    </article>
  );
}
