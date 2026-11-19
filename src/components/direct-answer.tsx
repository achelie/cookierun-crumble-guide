import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { asOfLabels, contentDate, updatedLabels } from "@/lib/direct-answers";

export function DirectAnswer({ children, date, locale = "en", cutoff = false }: { children: ReactNode; date: string; locale?: Locale; cutoff?: boolean }) {
  return (
    <p className="direct-answer" data-direct-answer="">
      {children}{" "}
      {cutoff
        ? <span className="content-date">{asOfLabels[locale]} <time dateTime={date}>{contentDate(date, locale)}</time></span>
        : <span className="content-date" data-last-updated="">{updatedLabels[locale]} <time dateTime={date}>{contentDate(date, locale)}</time></span>}
    </p>
  );
}
