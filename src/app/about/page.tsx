import type { Metadata } from "next";
import Link from "next/link";
import { TrustPage, type TrustSection } from "@/components/trust-page";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";

const page = seoPages.about;
export const metadata: Metadata = pageMetadata(page);

const sections: TrustSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: <><p>Crumble Guide is an independent player reference maintained by the Crumble Guide Editorial Team. We built it because checking twelve Cookies, three Pets, Synergy, Power, and stage mechanics in separate menus gets old fast.</p><p>We are not Devsisters, and Devsisters does not operate, sponsor, or endorse this site.</p></>,
  },
  {
    id: "how-we-work",
    title: "How we build a guide",
    content: <><p>We compare in-game descriptions, repeat stages with controlled lineup changes, and check results against current patch behavior. A measured result is presented as a measurement. A working estimate stays labeled as an estimate instead of dressing up as a secret official formula.</p><p>Tier rankings combine PvE and PvP usefulness, team fit, investment cost, and how consistently a Cookie performs. The <Link href="/tier-list/">tier list</Link> explains its ranking scope, while the <Link href="/teams/">teams page</Link> shows where those Cookies actually fit.</p></>,
  },
  {
    id: "updates",
    title: "Updates and corrections",
    content: <><p>Guides display a last-updated date. We review high-impact pages when balance patches, new Cookies, Pets, or progression systems change the answer.</p><p>If a number looks wrong, send the page URL, the value you saw, and the game version to <a href="mailto:contact@cookieruncrumbles.com">contact@cookieruncrumbles.com</a>. A useful correction beats a dramatic “everything is wrong” email every time.</p></>,
  },
  {
    id: "independence",
    title: "Independence and game assets",
    content: <><p>The site does not sell rankings or accept payment for favorable placement. CookieRun names, characters, artwork, and trademarks belong to Devsisters. Fan Kit material is used to help players recognize the game content being discussed.</p><p>Read the full <Link href="/disclaimer/">fan guide disclaimer</Link> or contact us about a rights concern.</p></>,
  },
];

export default function AboutPage() {
  return <TrustPage page={page} icon="info" updatedLabel="Updated August 28, 2026" note={<p>Independent guides, practical testing, and corrections without the corporate fog machine.</p>} sections={sections} />;
}
