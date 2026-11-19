import { locales, localeConfig, localizedPath } from "@/i18n/config";
import { absoluteUrl, seoPages, type SeoPageKey } from "@/lib/seo";
import { gameDeveloper, gameName, siteDescription, siteName } from "@/lib/site-identity";

export const dynamic = "force-static";

const sections = ["tierList", "cookies", "pets", "teams", "guides", "codes", "tools"] as const satisfies readonly SeoPageKey[];

export function GET() {
  const lines = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    `Game: [${gameName} - Idle RPG](https://www.devsisters.com/en/games), by ${gameDeveloper}.`,
    "",
    "## Main sections",
    "",
    ...sections.map((key) => {
      const page = seoPages[key];
      const summary = page.summary.replace(/^Updated [^.]+\. /, "");
      return `- [${page.breadcrumb}](${absoluteUrl(page.path)}): ${summary} Data or content date: ${page.updatedAt}.`;
    }),
    "",
    "## Update schedule",
    "",
    "The catalog and rankings are reviewed when patches change game data or balance. Codes are checked when coupon information changes. Teams, guides, and tools are revised when their sources, game rules, or recommendations change.",
    `See [data sources and verification](${absoluteUrl("/about/#data-sources")}) and the [sitemap](${absoluteUrl("/sitemap.xml")}).`,
    "",
    "## Languages",
    "",
    ...locales.map((locale) => `- [${localeConfig[locale].label}](${absoluteUrl(localizedPath("/", locale))}) (${locale})`),
    "",
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
