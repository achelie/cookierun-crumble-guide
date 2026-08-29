import Image from "next/image";
import Link from "next/link";
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
    <div className="home-page">
      <StructuredData data={homeSchema(seoPages.home)} />
      <section className="home-hero">
        <div className="home-hero__copy">
          <span className="eyebrow">Unofficial player guide</span>
          <h1><span>CookieRun:</span><span><strong>Crumble Guide</strong></span></h1>
          <p>{seoPages.home.summary}</p>
          <div className="hero-actions">
            <Link href="/tier-list/">View {tierMonth} Tier List <AppIcon name="chevron" size={18} /></Link>
            <Link href={`/guides/${beginnerGuide.slug}/`} className="secondary-link">Start the Beginner Guide</Link>
          </div>
        </div>
        <div className="cookie-stack" aria-label="Featured CookieRun Crumble cookies">
          {["cookie0035", "cookie0070", "cookie4019"].map((id, index) => {
            const cookie = cookies.find((item) => item.id === id)!;
            return <div className={`cookie-stack__card cookie-stack__card--${index + 1}`} key={id}><span>{cookie.rarity}</span><Image src={cookie.image} alt={cookie.name} width={420} height={420} priority sizes="(max-width: 768px) 54vw, 340px" /></div>;
          })}
        </div>
      </section>

      <section className="home-explore" aria-labelledby="browse-guide">
        <div className="home-explore__heading">
          <h2 id="browse-guide">Browse the guide</h2>
          <p>Choose the page that matches what is stopping your run.</p>
        </div>
        <div className="explore-grid">
          {destinations.map((item) => (
            <Link href={item.href} className={`explore-card explore-card--${item.area}`} key={item.href}>
              <div className="explore-card__icon"><AppIcon name={item.icon} size={28} /></div>
              {item.area === "tier" && <Image className="explore-card__art" src={tierFeatureCookie.image} alt="" width={340} height={340} sizes="(max-width: 720px) 0px, 260px" />}
              <div className="explore-card__copy">
                <span>{item.stat}</span>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </div>
              <b>{item.action} <AppIcon name="chevron" size={17} /></b>
            </Link>
          ))}
        </div>
      </section>

      <section className="builder-shortcuts" aria-labelledby="builder-shortcuts-title">
        <div className="builder-shortcuts__heading">
          <div>
            <h2 id="builder-shortcuts-title">Build your own</h2>
            <p>Drag the roster into place, keep the share link, or download a clean PNG.</p>
          </div>
          <Link href="/tools/" className="builder-shortcuts__all">View all tools <AppIcon name="chevron" size={16} /></Link>
        </div>
        <div className="builder-shortcuts__list">
          <Link href="/tools/team-builder/" className="builder-shortcut">
            <div className="builder-shortcut__icon"><AppIcon name="users" size={26} /></div>
            <div>
              <span>12 Cookies + 3 Pets</span>
              <h3>Team Builder</h3>
              <p>Place every Cookie and Pet in an exact slot, then check the Synergy.</p>
            </div>
            <b>Open builder <AppIcon name="chevron" size={17} /></b>
          </Link>
          <Link href="/tools/tier-builder/" className="builder-shortcut">
            <div className="builder-shortcut__icon"><AppIcon name="trophy" size={26} /></div>
            <div>
              <span>S to D ranking</span>
              <h3>Tier List Maker</h3>
              <p>Move all {cookies.length} Cookies into your own ranking and save the result.</p>
            </div>
            <b>Open maker <AppIcon name="chevron" size={17} /></b>
          </Link>
        </div>
      </section>
    </div>
  );
}
