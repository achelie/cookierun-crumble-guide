import type { Metadata } from 'next';
import { ToolPage } from '@/components/tools/tool-page';
import type { Locale } from '@/i18n/config';
import template from '@/data/tools/replica/stellar-link.json';
import { pageMetadata } from '@/lib/metadata';
import { seoPages } from '@/lib/seo';

const page = seoPages.stellarLink;
export const metadata: Metadata = pageMetadata(page);
export function ToolView({ locale }: { locale: Locale }) {
  return <ToolPage page={page} tool="stellar-link" html={template.html} locale={locale} />;
}
export default function Page() { return <ToolView locale="en" />; }
