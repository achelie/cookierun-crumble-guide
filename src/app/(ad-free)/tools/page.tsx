import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { LocaleImage as Image } from "@/i18n/elements";
import { LocaleLink as Link } from "@/i18n/elements";
import { Suspense } from "react";
import { LegacyToolsQueryRedirect } from "@/components/legacy-tools-query-redirect";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { AppIcon } from "@/components/ui/icon";
import { cookieById } from "@/data/cookies";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, seoPages } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";
import runeUi from "@/data/tools/sugar-rune-ui.json";
import stellarUi from "@/data/tools/stellar-link-ui.json";
import plateUi from "@/data/tools/plate-enhancement-ui.json";

const page = seoPages.tools;
const calculators = [
  { page: seoPages.sugarRunes, name: "Sugar Rune Calculator", image: runeUi.runes.SSR.src, description: "Set eight Rune slots. Compare lock strategies, Rune Crystal costs and crafting chances." },
  { page: seoPages.stellarLink, name: "Stellar Link Calculator", image: stellarUi.currency.src, description: "Arrange Starshards, keep good positions and budget Stellar Points across ten constellations." },
  { page: seoPages.plateEnhancement, name: "Plating Enhancement Calculator", image: plateUi.equipment.SWORD.src, description: "Compare protection, estimate materials and track all twelve Plating grades." },
];
export const metadata: Metadata = pageMetadata(page);

export default function ToolsPage() {
  const teamCookies = ["cookie0070", "cookie0181", "cookie3001"].flatMap((id) => {
    const cookie = cookieById.get(id);
    return cookie ? [cookie] : [];
  });
  const tierCookies = ["cookie4019", "cookie0126", "cookie0573"].flatMap((id) => {
    const cookie = cookieById.get(id);
    return cookie ? [cookie] : [];
  });

  return (
    <I18nElement as="div" className="page-shell page-shell--tools">
      <StructuredData data={collectionPageSchema(page, [
        ...calculators.map(({ page }) => ({ "@type": "WebApplication", name: page.h1, url: absoluteUrl(page.path), description: page.description, applicationCategory: "GameApplication", operatingSystem: "Any", isAccessibleForFree: true })),
        { "@type": "WebApplication", name: seoPages.teamBuilder.h1, url: absoluteUrl(seoPages.teamBuilder.path), description: seoPages.teamBuilder.description, applicationCategory: "GameApplication", operatingSystem: "Any", isAccessibleForFree: true },
        { "@type": "WebApplication", name: seoPages.tierBuilder.h1, url: absoluteUrl(seoPages.tierBuilder.path), description: seoPages.tierBuilder.description, applicationCategory: "GameApplication", operatingSystem: "Any", isAccessibleForFree: true },
      ])} />
      <Suspense fallback={null}><LegacyToolsQueryRedirect /></Suspense>
      <SeoPageHeader page={page} icon="tools" />
      <I18nElement as="section" className="calculator-directory" aria-label="Game calculators">
        {calculators.map(tool => <Link key={tool.page.path} href={tool.page.path}><Image src={tool.image} alt="" width={74} height={80} /><I18nElement as="span"><I18nElement as="strong">{tool.name}</I18nElement><I18nElement as="small">{tool.description}</I18nElement></I18nElement><I18nElement as="b">Open calculator<AppIcon name="chevron" size={17} /></I18nElement></Link>)}
      </I18nElement>
      <I18nElement as="section" className="tools-directory" aria-label="Builder tools">
        <Link className="tool-directory-card tool-directory-card--team" href="/tools/team-builder/">
          <I18nElement as="span" className="tool-directory-card__copy">
            <I18nElement as="small">12 Cookies + 3 Pets</I18nElement>
            <I18nElement as="strong">Team Builder</I18nElement>
            <I18nElement as="span">Drag a complete formation into exact slots.</I18nElement>
            <I18nElement as="b">Open builder <AppIcon name="chevron" size={18} /></I18nElement>
          </I18nElement>
          <I18nElement as="span" className="tool-directory-card__art" aria-hidden="true">
            {teamCookies.map((cookie) => <Image key={cookie.id} src={cookie.image} alt="" width={210} height={210} />)}
          </I18nElement>
        </Link>
        <Link className="tool-directory-card tool-directory-card--tier" href="/tools/tier-builder/">
          <I18nElement as="span" className="tool-directory-card__copy">
            <I18nElement as="small">S through D</I18nElement>
            <I18nElement as="strong">Tier List Builder</I18nElement>
            <I18nElement as="span">Start empty or load the current combined PvP and PvE ranking.</I18nElement>
            <I18nElement as="b">Open builder <AppIcon name="chevron" size={18} /></I18nElement>
          </I18nElement>
          <I18nElement as="span" className="tool-directory-card__tiers" aria-hidden="true">
            <I18nElement as="i">S</I18nElement>
            <I18nElement as="span">{tierCookies.map((cookie) => <Image key={cookie.id} src={cookie.image} alt="" width={110} height={110} />)}</I18nElement>
          </I18nElement>
        </Link>
      </I18nElement>
    </I18nElement>
  );
}
