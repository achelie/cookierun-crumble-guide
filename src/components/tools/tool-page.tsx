import { I18nElement } from "@/i18n/elements";
import { AdSlot } from "@/components/ads/ad-slot";
import { LocaleLink as Link } from "@/i18n/elements";
import { StructuredData } from '@/components/structured-data';
import { webApplicationSchema } from '@/lib/structured-data';
import type { SeoPageDefinition } from '@/lib/seo';
import type { Locale } from "@/i18n/config";
import { asOfLabels, contentDate, updatedLabels } from "@/lib/direct-answers";
import { calculatorSnapshotDate, toolAnswers } from "@/lib/tool-answers";
import { OriginalTool } from "@/components/tools/original-tool";

const escapeHtml = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export function ToolPage({ page, tool, html, locale }: { page: SeoPageDefinition; tool: 'sugar-runes' | 'stellar-link' | 'plate-enhancement'; html: string; locale: Locale }) {
  const answerHtml = `<p class="direct-answer" data-direct-answer="">${escapeHtml(toolAnswers[tool][locale])} <span class="content-date">${asOfLabels[locale]} <time datetime="${calculatorSnapshotDate}">${contentDate(calculatorSnapshotDate, locale)}</time></span></p><span class="content-date" data-last-updated="">${updatedLabels[locale]} <time datetime="${page.updatedAt}">${contentDate(page.updatedAt, locale)}</time></span>`;
  return (
    <>
      <StructuredData data={webApplicationSchema(page)} />
      <I18nElement as="link" rel="stylesheet" href="/tools/replica/tools.css" />
      <I18nElement as="nav" className="sr-only" aria-label="Breadcrumb">
        <Link href="/">Home</Link><I18nElement as="span">/</I18nElement>
        <Link href="/tools/">Tools</Link><I18nElement as="span">/</I18nElement>
        <I18nElement as="span" aria-current="page">{page.breadcrumb}</I18nElement>
      </I18nElement>
      <OriginalTool tool={tool} html={html} answerHtml={answerHtml} />
      <div className="page-shell tool-reference-ad"><AdSlot placement={`${tool}-after-reference`} /></div>
    </>
  );
}
