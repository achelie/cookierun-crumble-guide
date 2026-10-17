import type { Metadata } from 'next';
import { ToolPage } from '@/components/tools/tool-page';
import { OriginalTool } from '@/components/tools/original-tool';
import template from '@/data/tools/replica/stellar-link.json';
import { pageMetadata } from '@/lib/metadata';
import { seoPages } from '@/lib/seo';

const page = seoPages.stellarLink;
export const metadata: Metadata = pageMetadata(page);
export default function Page() {
  return <ToolPage page={page} tool="stellar-link" features={["Interactive star positions", "Ten constellations", "Native integer bonuses", "Point budget", "Unlock requirements", "Shareable URL"]}><OriginalTool tool="stellar-link" html={template.html} /></ToolPage>;
}
