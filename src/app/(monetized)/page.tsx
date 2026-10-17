import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import { LocaleLink as Link } from "@/i18n/elements";
import { StructuredData } from "@/components/structured-data";
import { AppIcon, type IconName } from "@/components/ui/icon";
import { codes } from "@/data/codes";
import { cookies } from "@/data/cookies";
import { guides } from "@/data/guides";
import { pets } from "@/data/pets";
import { recommendedTeams } from "@/data/teams";
import { tierUpdatedAt } from "@/data/tier-list";
import { seoPages } from "@/lib/seo";
import { homeSchema } from "@/lib/structured-data";
import { GameTitle } from "@/components/game-title";

type Destination = {
  href: string;
  icon: IconName;
  label: string;
  text: string;
  stat: string;
  action: string;
  area: "tier" | "teams" | "codes" | "cookies" | "pets" | "guides";
};

const activeCodeCount = codes.filter((code) => code.status === "active").length;
const tierMonth = new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" })
  .format(new Date(`${tierUpdatedAt}T00:00:00Z`));
const beginnerGuide = guides.find((guide) => guide.slug === "cookie-run-crumble-beginner-progression-guide")!;
const tierFeatureCookie = cookies.find((cookie) => cookie.id === "cookie0070")!;

const destinations: Destination[] = [
  {
    href: "/tier-list/",
    icon: "trophy",
    label: "Tier List",
    text: "See the combined PvP and PvE ranking before you spend another upgrade.",
    stat: `${cookies.length} Cookies ranked`,
    action: "View rankings",
    area: "tier",
  },
  {
    href: "/teams/",
    icon: "users",
    label: "Best Teams",
    text: "Copy lineups for F2P progress, bosses, stages, tower floors, and dungeons.",
    stat: `${recommendedTeams.length} tested teams`,
    action: "See team setups",
    area: "teams",
  },
  {
    href: "/codes/",
    icon: "ticket",
    label: "Codes",
    text: activeCodeCount
      ? "Grab every current reward before it expires."
      : "See the expired launch coupons and check whether a new code is live.",
    stat: `${activeCodeCount} active ${activeCodeCount === 1 ? "code" : "codes"}`,
    action: activeCodeCount ? "Copy codes" : "Check code status",
    area: "codes",
  },
  {
    href: "/cookies/",
    icon: "cookie",
    label: "Cookies",
    text: "Compare rarity, element, role, Synergy, and buffs.",
    stat: `${cookies.length} Cookies`,
    action: "Browse Cookies",
    area: "cookies",
  },
  {
    href: "/pets/",
    icon: "paw",
    label: "Pets",
    text: "Check every Pet effect before filling your three slots.",
    stat: `${pets.length} Pets`,
    action: "Browse Pets",
    area: "pets",
  },
  {
    href: "/guides/",
    icon: "book",
    label: "Guides",
    text: "Fix progression mistakes and learn the systems that matter first.",
    stat: `${guides.length} ${guides.length === 1 ? "guide" : "guides"}`,
    action: "Read guides",
    area: "guides",
  },
];

export default function Home() {
  return (
    <I18nElement as="div" className="home-page">
      <StructuredData data={homeSchema(seoPages.home)} />
      <I18nElement as="section" className="home-hero">
        <I18nElement as="div" className="home-hero__copy">
          <I18nElement as="span" className="eyebrow">Unofficial player guide</I18nElement>
          <GameTitle />
          <I18nElement as="p">{seoPages.home.summary}</I18nElement>
          <I18nElement as="div" className="hero-actions">
            <Link href="/tier-list/">View {tierMonth} Tier List <AppIcon name="chevron" size={18} /></Link>
            <Link href={`/guides/${beginnerGuide.slug}/`} className="secondary-link">Start the Beginner Guide</Link>
          </I18nElement>
        </I18nElement>
        <I18nElement as="div" className="cookie-stack" aria-label="Featured CookieRun Crumble cookies">
          {["cookie0035", "cookie0070", "cookie4019"].map((id, index) => {
            const cookie = cookies.find((item) => item.id === id)!;
            return <I18nElement as="div" className={`cookie-stack__card cookie-stack__card--${index + 1}`} key={id}><I18nElement as="span">{cookie.rarity}</I18nElement><Image src={cookie.image} alt={cookie.name} width={420} height={420} priority sizes="(max-width: 768px) 54vw, 340px" /></I18nElement>;
          })}
        </I18nElement>
      </I18nElement>

      <I18nElement as="section" className="home-explore" aria-labelledby="browse-guide">
        <I18nElement as="div" className="home-explore__heading">
          <I18nElement as="h2" id="browse-guide">Browse the guide</I18nElement>
          <I18nElement as="p">Choose the page that matches what is stopping your run.</I18nElement>
        </I18nElement>
        <I18nElement as="div" className="explore-grid">
          {destinations.map((item) => (
            <Link href={item.href} className={`explore-card explore-card--${item.area}`} key={item.href}>
              <I18nElement as="div" className="explore-card__icon"><AppIcon name={item.icon} size={28} /></I18nElement>
              {item.area === "tier" && <Image className="explore-card__art" src={tierFeatureCookie.image} alt="" width={340} height={340} sizes="(max-width: 720px) 0px, 260px" />}
              <I18nElement as="div" className="explore-card__copy">
                <I18nElement as="span">{item.stat}</I18nElement>
                <I18nElement as="h3">{item.label}</I18nElement>
                <I18nElement as="p">{item.text}</I18nElement>
              </I18nElement>
              <I18nElement as="b">{item.action} <AppIcon name="chevron" size={17} /></I18nElement>
            </Link>
          ))}
        </I18nElement>
      </I18nElement>

      <I18nElement as="section" className="builder-shortcuts" aria-labelledby="builder-shortcuts-title">
        <I18nElement as="div" className="builder-shortcuts__heading">
          <I18nElement as="div">
            <I18nElement as="h2" id="builder-shortcuts-title">Build your own</I18nElement>
            <I18nElement as="p">Drag the roster into place, keep the share link, or download a clean PNG.</I18nElement>
          </I18nElement>
          <Link href="/tools/" className="builder-shortcuts__all">View all tools <AppIcon name="chevron" size={16} /></Link>
        </I18nElement>
        <I18nElement as="div" className="builder-shortcuts__list">
          <Link href="/tools/team-builder/" className="builder-shortcut">
            <I18nElement as="div" className="builder-shortcut__icon"><AppIcon name="users" size={26} /></I18nElement>
            <I18nElement as="div">
              <I18nElement as="span">12 Cookies + 3 Pets</I18nElement>
              <I18nElement as="h3">Team Builder</I18nElement>
              <I18nElement as="p">Place every Cookie and Pet in an exact slot, then check the Synergy.</I18nElement>
            </I18nElement>
            <I18nElement as="b">Open builder <AppIcon name="chevron" size={17} /></I18nElement>
          </Link>
          <Link href="/tools/tier-builder/" className="builder-shortcut">
            <I18nElement as="div" className="builder-shortcut__icon"><AppIcon name="trophy" size={26} /></I18nElement>
            <I18nElement as="div">
              <I18nElement as="span">S to D ranking</I18nElement>
              <I18nElement as="h3">Tier List Maker</I18nElement>
              <I18nElement as="p">Move all {cookies.length} Cookies into your own ranking and save the result.</I18nElement>
            </I18nElement>
            <I18nElement as="b">Open maker <AppIcon name="chevron" size={17} /></I18nElement>
          </Link>
        </I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
