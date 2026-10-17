'use client';

import { I18nElement } from "@/i18n/elements";
import { useLocale, useTranslator } from "@/i18n/provider";
import { translateHtml } from "@/i18n/translate";
import type { Locale } from "@/i18n/config";
import { useEffect, useRef } from 'react';

type OriginalModule = { mount: (root: HTMLElement, options?: {locale: Locale; t: (text: string) => string}) => () => void };

// The imported DOM owns its controls. React only owns this mount boundary.
export function OriginalTool({ tool, html }: { tool: string; html: string }) {
  const locale = useLocale();
  const t = useTranslator();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const url = `/tools/replica/${tool}.mjs`;
    void (import(/* webpackIgnore: true */ url) as Promise<OriginalModule>).then(module => {
      if (!disposed) cleanup = module.mount(root, {locale, t});
    }).catch(() => {
      if (disposed) return;
      const loading = root.querySelector('[role="status"]');
      if (loading) loading.textContent = t('Could not load the tool. Please reload the page.');
    });
    return () => { disposed = true; cleanup?.(); };
  }, [tool, locale, t]);
  return <I18nElement as="div" ref={ref} className="tool-replica" lang={locale} dangerouslySetInnerHTML={{ __html: translateHtml(html, t, locale) }} />;
}
