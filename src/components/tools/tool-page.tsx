import type { ReactNode } from 'react';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { webApplicationSchema } from '@/lib/structured-data';
import type { SeoPageDefinition } from '@/lib/seo';

export function ToolPage({ page, tool, features, children }: { page: SeoPageDefinition; tool: 'sugar-runes' | 'stellar-link' | 'plate-enhancement'; features: string[]; children: ReactNode }) {
  return <><StructuredData data={webApplicationSchema(page, features)} /><link rel="stylesheet" href="/tools/replica/tools.css" /><nav className="sr-only" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/tools/">Tools</Link><span>/</span><span aria-current="page">{page.breadcrumb}</span></nav>{children}</>;
}
