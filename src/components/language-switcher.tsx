"use client";

import { usePathname } from "next/navigation";
import { locales, localeConfig, localizedPath } from "@/i18n/config";
import { useLocale, useTranslator } from "@/i18n/provider";
import { AppIcon } from "@/components/ui/icon";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslator();
  const pathname = usePathname();
  return <nav className="language-switcher" aria-label={t("Language")}>
    <details>
      <summary>{localeConfig[locale].label}<AppIcon name="chevron" size={14} /></summary>
      <div className="language-switcher__menu">
        {locales.map((target) => <a key={target} href={localizedPath(pathname || "/", target)} lang={target} hrefLang={target} aria-current={target === locale ? "true" : undefined}
          onClick={(event) => { event.preventDefault(); window.location.assign(localizedPath(window.location.pathname, target) + window.location.search + window.location.hash); }}>
          {localeConfig[target].label}
        </a>)}
      </div>
    </details>
  </nav>;
}
