import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Locale } from "@/i18n/config";

// The rendered MDX is the source of truth. The FAQ convention is one H3 and
// one plain-text paragraph per entry inside a GuideSection with "faq" in its ID.
export async function guideFaqFromMdx(slug: string, locale: Locale) {
  const directory = locale === "en" ? [] : [locale];
  const source = await readFile(join(process.cwd(), "src", "content", "guides", ...directory, `${slug}.mdx`), "utf8");
  const sections = source.matchAll(/<GuideSection\b[^>]*\bid="([^"]*faq[^"]*)"[^>]*>([\s\S]*?)<\/GuideSection>/g);
  return Array.from(sections).flatMap(([, , body]) => {
    const rows = body.trim().split(/^###\s+/m);
    // A new, richer format stays visible in MDX but does not get guessed at in schema.
    if (rows.shift() !== "") return [];
    const faq = rows.map((row) => {
      const match = row.trim().match(/^([^\n\r]+)\r?\n\s*\r?\n([^\n\r]+)$/);
      if (!match || /[<>`*\[\]\\]|^[-|]/.test(match[1]) || /[<>`*\[\]\\]|^[-|]/.test(match[2])) return undefined;
      return { question: match[1].trim(), answer: match[2].trim() };
    });
    return faq.every((row) => row !== undefined) ? faq : [];
  });
}
