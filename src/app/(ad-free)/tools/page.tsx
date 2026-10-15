import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    <div className="page-shell page-shell--tools">
      <StructuredData data={collectionPageSchema(page, [
        { "@type": "WebApplication", name: seoPages.teamBuilder.h1, url: absoluteUrl(seoPages.teamBuilder.path), description: seoPages.teamBuilder.description, applicationCategory: "GameApplication", operatingSystem: "Any", isAccessibleForFree: true },
        { "@type": "WebApplication", name: seoPages.tierBuilder.h1, url: absoluteUrl(seoPages.tierBuilder.path), description: seoPages.tierBuilder.description, applicationCategory: "GameApplication", operatingSystem: "Any", isAccessibleForFree: true },
        ...calculators.map(({ page }) => ({ "@type": "WebApplication", name: page.h1, url: absoluteUrl(page.path), description: page.description, applicationCategory: "GameApplication", operatingSystem: "Any", isAccessibleForFree: true })),
      ])} />
      <Suspense fallback={null}><LegacyToolsQueryRedirect /></Suspense>
      <SeoPageHeader page={page} icon="tools" />
      <section className="tools-directory" aria-label="Builder tools">
        <Link className="tool-directory-card tool-directory-card--team" href="/tools/team-builder/">
          <span className="tool-directory-card__copy">
            <small>12 Cookies + 3 Pets</small>
            <strong>Team Builder</strong>
            <span>Drag a complete formation into exact slots.</span>
            <b>Open builder <AppIcon name="chevron" size={18} /></b>
          </span>
          <span className="tool-directory-card__art" aria-hidden="true">
            {teamCookies.map((cookie) => <Image key={cookie.id} src={cookie.image} alt="" width={210} height={210} />)}
          </span>
        </Link>
        <Link className="tool-directory-card tool-directory-card--tier" href="/tools/tier-builder/">
          <span className="tool-directory-card__copy">
            <small>S through D</small>
            <strong>Tier List Builder</strong>
            <span>Start empty or load the current combined PvP and PvE ranking.</span>
            <b>Open builder <AppIcon name="chevron" size={18} /></b>
          </span>
          <span className="tool-directory-card__tiers" aria-hidden="true">
            <i>S</i>
            <span>{tierCookies.map((cookie) => <Image key={cookie.id} src={cookie.image} alt="" width={110} height={110} />)}</span>
          </span>
        </Link>
      </section>
      <section className="calculator-directory" aria-label="Game calculators">
        {calculators.map(tool => <Link key={tool.page.path} href={tool.page.path}><Image src={tool.image} alt="" width={74} height={80} /><span><strong>{tool.name}</strong><small>{tool.description}</small></span><b>Open calculator<AppIcon name="chevron" size={17} /></b></Link>)}
      </section>
    </div>
  );
}
