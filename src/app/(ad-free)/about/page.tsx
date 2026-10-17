import { I18nElement } from "@/i18n/elements";
import type { Metadata } from "next";
import { LocaleLink as Link } from "@/i18n/elements";
import { TrustPage, type TrustSection } from "@/components/trust-page";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";

const page = seoPages.about;
export const metadata: Metadata = pageMetadata(page);

const sections: TrustSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: <><I18nElement as="p">Crumble Guide is an independent player reference maintained by the Crumble Guide Editorial Team. We built it because checking twelve Cookies, three Pets, Synergy, Power, and stage mechanics in separate menus gets old fast.</I18nElement><I18nElement as="p">We are not Devsisters, and Devsisters does not operate, sponsor, or endorse this site.</I18nElement></>,
  },
  {
    id: "how-we-work",
    title: "How we build a guide",
    content: <><I18nElement as="p">We compare in-game descriptions, repeat stages with controlled lineup changes, and check results against current patch behavior. A measured result is presented as a measurement. A working estimate stays labeled as an estimate instead of dressing up as a secret official formula.</I18nElement><I18nElement as="p">Tier rankings combine PvE and PvP usefulness, team fit, investment cost, and how consistently a Cookie performs. The <Link href="/tier-list/">tier list</Link> explains its ranking scope, while the <Link href="/teams/">teams page</Link> shows where those Cookies actually fit.</I18nElement></>,
  },
  {
    id: "updates",
    title: "Updates and corrections",
    content: <><I18nElement as="p">Guides display a last-updated date. We review high-impact pages when balance patches, new Cookies, Pets, or progression systems change the answer.</I18nElement><I18nElement as="p">If a number looks wrong, send the page URL, the value you saw, and the game version to <I18nElement as="a" href="mailto:contact@cookieruncrumbles.com">contact@cookieruncrumbles.com</I18nElement>. A useful correction beats a dramatic “everything is wrong” email every time.</I18nElement></>,
  },
  {
    id: "independence",
    title: "Independence and game assets",
    content: <><I18nElement as="p">The site does not sell rankings or accept payment for favorable placement. CookieRun names, characters, artwork, and trademarks belong to Devsisters. Fan Kit material is used to help players recognize the game content being discussed.</I18nElement><I18nElement as="p">Read the full <Link href="/disclaimer/">fan guide disclaimer</Link> or contact us about a rights concern.</I18nElement></>,
  },
];

export default function AboutPage() {
  return <TrustPage page={page} icon="info" updatedLabel="Updated August 28, 2026" note={<I18nElement as="p">Independent guides, practical testing, and corrections without the corporate fog machine.</I18nElement>} sections={sections} />;
}
