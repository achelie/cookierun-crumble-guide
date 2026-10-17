"use client";
import { useLocale, useTranslator } from "@/i18n/provider";
import { translateSchema } from "@/i18n/translate";
import { siteUrl } from "@/lib/seo";

export function StructuredData({ data }: { data: unknown }) {
  const locale = useLocale();
  const t = useTranslator();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(translateSchema(data, t, locale, siteUrl)).replace(/</g, "\\u003c") }}
    />
  );
}
