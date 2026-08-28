import type { ReactNode } from "react";
import Link from "next/link";
import { SeoPageHeader } from "@/components/seo-page-header";
import type { IconName } from "@/components/ui/icon";
import type { SeoPageDefinition } from "@/lib/seo";

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
    <div className="page-shell trust-page">
      <SeoPageHeader page={page} icon={icon} />
      <div className="trust-page__layout">
        <aside className="trust-page__rail">
          <span>{updatedLabel}</span>
          <div>{note}</div>
          <nav aria-label="On this page">
            {sections.map((section) => <Link key={section.id} href={`#${section.id}`}>{section.title}</Link>)}
          </nav>
        </aside>
        <article className="trust-page__content">
          {sections.map((section, index) => (
            <section id={section.id} key={section.id} className="trust-page__section">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
