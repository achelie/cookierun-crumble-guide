import { localizedPath, type Locale } from "./config";

export type Messages = Record<string, string>;
export type Translator = (text: string) => string;
export function formatMessage(t: Translator, key: string, ...values: (string | number)[]): string {
  return t(key).replace(/\{(\d+)\}/g, (token, index: string) => {
    const value = values[Number(index)];
    return value === undefined ? token : typeof value === "string" ? t(value) : String(value);
  });
}
const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const htmlEscape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const htmlDecode = (value: string) => value.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
export function translateHtml(html: string, t: Translator, locale: Locale): string {
  if (locale === "en") return html;
  const text = (value: string) => { const translated = t(htmlDecode(value)); return translated === htmlDecode(value) ? value : htmlEscape(translated); };
  return html.replace(/(^|>)([^<>]+)(?=<|$)/g, (_, before: string, value: string) => before + text(value))
    .replace(/((?:alt|title|placeholder|aria-label|aria-description)=")([^"]*)(")/g, (_, before: string, value: string, after: string) => before + text(value) + after)
    .replace(/(href=")([^"#]+)(")/g, (_, before: string, value: string, after: string) => before + localizedPath(value, locale) + after);
}

export function createTranslator(messages: Messages, locale: Locale): Translator {
  if (locale === "en") return (text) => text;
  const patterns = Object.entries(messages)
    .filter(([key]) => /\{\d+\}/.test(key) && key.replace(/\{\d+\}/g, "").length >= 5)
    .sort(([a], [b]) => Number(a.startsWith("{")) - Number(b.startsWith("{")) || b.length - a.length)
    .map(([key, value]) => {
      const tokens: string[] = [];
      const rich = key === "Read {0}" || (!key.startsWith("{") && key.replace(/\{\d+\}/g, "").length >= 30);
      const parts = key.split(/(\{\d+\})/).map((part) => {
        if (/^\{\d+\}$/.test(part)) {
          tokens.push(part);
          // Dynamic labels contain an inline node, a number or a short name.
          // Never let a loose label template consume an unrelated paragraph.
          return rich ? "([^<>]{0,400}?)" : "(\\uE000\\d+\\uE001|[+-]?[0-9][0-9,.%+/-]*|[^.!?;\\r\\n<>]{0,160}?)";
        }
        return escape(part).replace(/^ +| +$/g, "\\s*");
      });
      return { match: new RegExp(`^${parts.join("")}$`), value, tokens };
    });
  const cache = new Map<string, string>();
  function translate(text: string, depth = 0): string {
    if (!text) return text;
    const source = normalize(text);
    const exact = messages[source];
    if (exact !== undefined) return text.replace(/\S[\s\S]*\S|\S/, exact);
    // Cover descriptions join several sourced names. Translate only when every
    // item is a known term, so ordinary prose and numeric lists stay intact.
    const knownItem = (item: string) => {
      if (messages[item] !== undefined) return messages[item];
      const amount = item.match(/^([\d,.]+) (.+)$/);
      if (amount && messages[amount[2]] !== undefined) return `${amount[1]} ${messages[amount[2]]}`;
    };
    const numbered = source.match(/^[\d,.]+ /) ? knownItem(source) : undefined;
    if (numbered !== undefined) return text.replace(/\S[\s\S]*\S|\S/, numbered);
    for (const separator of ["; ", ", "]) {
      const list = source.split(separator);
      const translated = list.map(knownItem);
      if (list.length > 1 && translated.every((item) => item !== undefined)) {
        return text.replace(/\S[\s\S]*\S|\S/, translated.join(separator));
      }
    }
    if (!/[A-Za-z]/.test(text)) return text;
    if (cache.has(text)) return cache.get(text)!;
    if (depth < 2) for (const pattern of patterns) {
      const values = source.match(pattern.match);
      if (!values) continue;
      // An icon/index next to a complete label is not part of a count or noun.
      // Let the element translate that label on its own instead of swallowing
      // its English prefix into a loose "{0} Cookies" style template.
      if (values.slice(1).some((value) => /\uE000\d+\uE001/.test(value) && value.replace(/\uE000\d+\uE001/g, "").trim())) continue;
      const translated = pattern.value.replace(/\{\d+\}/g, (token) => {
        const index = pattern.tokens.indexOf(token);
        return index < 0 ? token : translate(values[index + 1], depth + 1);
      });
      const result = text.replace(/\S[\s\S]*\S|\S/, translated);
      cache.set(text, result);
      return result;
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months.indexOf(source);
    if (month >= 0) return new Intl.DateTimeFormat(locale, { month: "long", calendar: "gregory", timeZone: "UTC" }).format(new Date(Date.UTC(2026, month, 1)));
    const monthYear = source.match(/^([A-Z][a-z]+) (\d{4})$/);
    if (monthYear && months.includes(monthYear[1])) return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", calendar: "gregory", timeZone: "UTC" }).format(new Date(Date.UTC(Number(monthYear[2]), months.indexOf(monthYear[1]), 1)));
    // Preserve the calendar year while localizing the visible date format.
    if (/^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(source)) {
      const date = new Date(`${source} 00:00:00 GMT`);
      if (!Number.isNaN(date.getTime())) return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric", calendar: "gregory", timeZone: "UTC" }).format(date);
    }
    return text;
  }
  return (text) => translate(text);
}

// Localize schema/user-visible data without ever translating IDs, enum values,
// numeric inputs, query state, component names or downloaded evidence records.
export function translateSchema(value: unknown, t: Translator, locale: Locale, origin: string, key = ""): unknown {
  if (Array.isArray(value)) return value.map((item) => translateSchema(item, t, locale, origin, key));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, translateSchema(item, t, locale, origin, name)]));
  if (typeof value !== "string") return value;
  if (key === "inLanguage") return locale;
  if (value.startsWith(origin + "/") && ["url", "@id", "item", "isPartOf", "mainEntityOfPage"].includes(key)) return origin + localizedPath(value.slice(origin.length), locale);
  if (["name", "headline", "description", "text", "keywords", "featureList", "browserRequirements"].includes(key)) return t(value);
  return value;
}
