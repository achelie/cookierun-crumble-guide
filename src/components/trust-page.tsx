import { I18nElement } from "@/i18n/elements";
import type { ReactNode } from "react";
import { LocaleLink as Link } from "@/i18n/elements";
import { SeoPageHeader } from "@/components/seo-page-header";
import type { IconName } from "@/components/ui/icon";
import type { SeoPageDefinition } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { informationPageSchema } from "@/lib/structured-data";

export type TrustSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function TrustPage({
  page,
  icon,
  updatedLabel,
  note,
  sections,
}: {
  page: SeoPageDefinition;
  icon: IconName;
  updatedLabel: string;
  note: ReactNode;
  sections: TrustSection[];
}) {
  return (
    <I18nElement as="div" className="page-shell trust-page">
      <StructuredData data={informationPageSchema(page)} />
      <SeoPageHeader page={page} icon={icon} />
      <I18nElement as="div" className="trust-page__layout">
        <I18nElement as="aside" className="trust-page__rail">
          <I18nElement as="span">{updatedLabel}</I18nElement>
          <I18nElement as="div">{note}</I18nElement>
          <I18nElement as="nav" aria-label="On this page">
            {sections.map((section) => <Link key={section.id} href={`#${section.id}`}>{section.title}</Link>)}
          </I18nElement>
        </I18nElement>
        <I18nElement as="article" className="trust-page__content">
          {sections.map((section, index) => (
            <I18nElement as="section" id={section.id} key={section.id} className="trust-page__section">
              <I18nElement as="span" aria-hidden="true">{String(index + 1).padStart(2, "0")}</I18nElement>
              <I18nElement as="div">
                <I18nElement as="h2">{section.title}</I18nElement>
                {section.content}
              </I18nElement>
            </I18nElement>
          ))}
        </I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
