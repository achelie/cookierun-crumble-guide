import { I18nElement } from "@/i18n/elements";
import { LocaleLink as Link } from "@/i18n/elements";
import { AppIcon, type IconName } from "@/components/ui/icon";
import type { SeoPageDefinition } from "@/lib/seo";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function SeoPageHeader({
  page,
  icon,
  parent,
  showUpdatedAt = false,
}: {
  page: SeoPageDefinition;
  icon: IconName;
  parent?: { label: string; href: string };
  showUpdatedAt?: boolean;
}) {
  return (
    <I18nElement as="header" className="seo-page-heading">
      <I18nElement as="div" className="seo-page-heading__icon" aria-hidden="true"><AppIcon name={icon} size={23} /></I18nElement>
      <I18nElement as="div">
        <I18nElement as="nav" className="seo-page-heading__crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {parent && <><I18nElement as="span">/</I18nElement><Link href={parent.href}>{parent.label}</Link></>}
          <I18nElement as="span">/</I18nElement><I18nElement as="span" aria-current="page">{page.breadcrumb}</I18nElement>
        </I18nElement>
        <I18nElement as="h1">{page.h1}</I18nElement>
        {showUpdatedAt && (
          <I18nElement as="p">Last updated: <I18nElement as="time" dateTime={page.updatedAt}>{dateFormatter.format(new Date(`${page.updatedAt}T00:00:00Z`))}</I18nElement></I18nElement>
        )}
        <I18nElement as="p">{page.summary}</I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
