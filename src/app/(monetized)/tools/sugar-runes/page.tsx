import type { Metadata } from 'next';
import { ToolPage } from '@/components/tools/tool-page';
import { OriginalTool } from '@/components/tools/original-tool';
import template from '@/data/tools/replica/sugar-runes.json';
import { pageMetadata } from '@/lib/metadata';
import { seoPages } from '@/lib/seo';

const page = seoPages.sugarRunes;
export const metadata: Metadata = pageMetadata(page);
export default function Page() {
  return <ToolPage page={page} tool="sugar-runes" features={["Eight-slot Rune wheel", "Fixed-lock and keep-match forecasts", "Per-Cookie saved plans", "Shareable URL", "Full outcome tables"]}><OriginalTool tool="sugar-runes" html={template.html} /></ToolPage>;
}
