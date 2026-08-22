import Link from "next/link";
import { AppIcon, type IconName } from "@/components/ui/icon";
import type { SeoPageDefinition } from "@/lib/seo";

export function SeoPageHeader({
  page,
  icon,
  parent,
}: {
  page: SeoPageDefinition;
  icon: IconName;
  parent?: { label: string; href: string };
}) {
  return (
    <header className="seo-page-heading">
      <div className="seo-page-heading__icon" aria-hidden="true"><AppIcon name={icon} size={23} /></div>
      <div>
        <nav className="seo-page-heading__crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {parent && <><span>/</span><Link href={parent.href}>{parent.label}</Link></>}
          <span>/</span><span aria-current="page">{page.breadcrumb}</span>
        </nav>
        <h1>{page.h1}</h1>
        <p>{page.summary}</p>
      </div>
    </header>
  );
}
