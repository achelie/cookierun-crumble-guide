import type { Metadata } from 'next';
import { ToolPage } from '@/components/tools/tool-page';
import type { Locale } from '@/i18n/config';
import template from '@/data/tools/replica/plate-enhancement.json';
import { pageMetadata } from '@/lib/metadata';
import { seoPages } from '@/lib/seo';

const page = seoPages.plateEnhancement;
export const metadata: Metadata = pageMetadata(page);
export function ToolView({ locale }: { locale: Locale }) {
  return <ToolPage page={page} tool="plate-enhancement" html={template.html} locale={locale} />;
}
export default function Page() { return <ToolView locale="en" />; }
