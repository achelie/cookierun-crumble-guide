import type { Metadata } from 'next';
import { ToolPage } from '@/components/tools/tool-page';
import { OriginalTool } from '@/components/tools/original-tool';
import template from '@/data/tools/replica/plate-enhancement.json';
import { pageMetadata } from '@/lib/metadata';
import { seoPages } from '@/lib/seo';

const page = seoPages.plateEnhancement;
export const metadata: Metadata = pageMetadata(page);
export default function Page() {
  return <ToolPage page={page} tool="plate-enhancement" features={["Twelve plate inventories", "Protection and repair strategies", "Expected material inputs", "Limited-attempt forecasts", "Shareable URL", "JSON export"]}><OriginalTool tool="plate-enhancement" html={template.html} /></ToolPage>;
}
