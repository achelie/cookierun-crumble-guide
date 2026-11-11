"use client";

import { useEffect } from "react";
import { useLocale } from "@/i18n/provider";
import { localizedPath } from "@/i18n/config";
import { adMode } from "@/lib/ads/config";
import { openPrivacySettings, startAdSense } from "@/lib/ads/google";

const hash = "#privacy-cookie-settings";
const labels = {
  en: "Privacy and cookie settings", "zh-Hant": "隱私與 Cookie 設定", ja: "プライバシーと Cookie の設定",
  ko: "개인정보 및 쿠키 설정", th: "การตั้งค่าความเป็นส่วนตัวและคุกกี้",
};

export function PrivacySettings() {
  const locale = useLocale();
  const home = localizedPath("/", locale);

  useEffect(() => {
    if (adMode !== "live" || window.location.pathname !== home || window.location.hash !== hash) return;
    startAdSense();
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    window.googlefc?.callbackQueue?.push(openPrivacySettings);
  }, [home]);

  if (adMode !== "live") return null;
  return <a id={hash.slice(1)} href={`${home}${hash}`} onClick={(event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (openPrivacySettings()) {
      event.preventDefault();
    } else if (window.location.pathname === home) {
      event.preventDefault();
      startAdSense();
      window.googlefc?.callbackQueue?.push(openPrivacySettings);
    }
  }}>{labels[locale]}</a>;
}
