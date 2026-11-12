"use client";

import { useLocale } from "@/i18n/provider";
import { contentDate, updatedLabels } from "@/lib/direct-answers";

export function LastUpdated({ date }: { date: string }) {
  const locale = useLocale();
  return <span className="content-date" data-last-updated="">{updatedLabels[locale]} <time dateTime={date}>{contentDate(date, locale)}</time></span>;
}
