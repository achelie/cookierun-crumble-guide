import { I18nElement } from "@/i18n/elements";
import type { ReactNode } from 'react';
import { LocaleLink as Link } from "@/i18n/elements";
import { StructuredData } from '@/components/structured-data';
import { webApplicationSchema } from '@/lib/structured-data';
import type { SeoPageDefinition } from '@/lib/seo';

export function ToolPage({ page, tool, features, children }: { page: SeoPageDefinition; tool: 'sugar-runes' | 'stellar-link' | 'plate-enhancement'; features: string[]; children: ReactNode }) {
  return <><StructuredData data={webApplicationSchema(page, features)} /><I18nElement as="link" rel="stylesheet" href="/tools/replica/tools.css" /><I18nElement as="nav" className="sr-only" aria-label="Breadcrumb"><Link href="/">Home</Link><I18nElement as="span">/</I18nElement><Link href="/tools/">Tools</Link><I18nElement as="span">/</I18nElement><I18nElement as="span" aria-current="page">{page.breadcrumb}</I18nElement></I18nElement>{children}</>;
}
