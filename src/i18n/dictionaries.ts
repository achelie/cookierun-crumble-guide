import zh from "./messages/zh-Hant.json";
import ja from "./messages/ja.json";
import ko from "./messages/ko.json";
import th from "./messages/th.json";
import type { Locale } from "./config";
import { createTranslator, type Messages } from "./translate";

const packs: Record<Locale, Messages> = { en: {}, "zh-Hant": zh.messages, ja: ja.messages, ko: ko.messages, th: th.messages };
export function getMessages(locale: Locale): Messages { return packs[locale]; }
export function getTranslator(locale: Locale) { return createTranslator(getMessages(locale), locale); }
