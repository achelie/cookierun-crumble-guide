import Image from "next/image";
import Link from "next/link";
import { AppIcon, type IconName } from "@/components/ui/icon";
import { cookies } from "@/data/cookies";
import { pets } from "@/data/pets";
import { codes } from "@/data/codes";

const explore: { href: string; icon: IconName; label: string; text: string; stat: string }[] = [
  { href: "/cookies/", icon: "cookie", label: "Cookie Index", text: "Search the full launch roster by name or rarity.", stat: `${cookies.length} cookies` },
  { href: "/tier-list/", icon: "trophy", label: "Current Tier List", text: "Switch between stage PvE and arena PvP rankings.", stat: "2 modes" },
  { href: "/teams/", icon: "users", label: "Teams + Builder", text: "Start with a proven lineup, then make your own share link.", stat: "12 slots" },
  { href: "/codes/", icon: "ticket", label: "Active Codes", text: "Copy every live coupon without hunting through posts.", stat: `${codes.filter((code) => code.status === "active").length} live now` },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <span className="eyebrow">Unofficial player guide</span>
          <h1><span>Less guessing.</span><span><strong>More crumbling.</strong></span></h1>
          <p>Cookies, pets, teams, tiers, and coupon codes. The useful bits are up front, because nobody opens a guide for a motivational speech.</p>
          <div className="hero-actions">
            <Link href="/tier-list/">See the tier list <AppIcon name="chevron" size={18} /></Link>
            <Link href="/teams/" className="secondary-link">Build a team</Link>
          </div>
        </div>
        <div className="cookie-stack" aria-label="Featured CookieRun Crumble cookies">
          {["cookie0035", "cookie0070", "cookie4019"].map((id, index) => {
            const cookie = cookies.find((item) => item.id === id)!;
            return <div className={`cookie-stack__card cookie-stack__card--${index + 1}`} key={id}><span>{cookie.rarity}</span><Image src={cookie.image} alt={cookie.name} width={420} height={420} priority sizes="(max-width: 768px) 54vw, 340px" /></div>;
          })}
        </div>
      </section>

      <section className="home-ticker" aria-label="Guide coverage">
        <p><strong>{cookies.length}</strong> cookies catalogued</p>
        <p><strong>{pets.length}</strong> pets catalogued</p>
        <p><strong>Aug 19</strong> data check</p>
      </section>

      <section className="home-explore">
        <div className="section-heading"><span>Pick your shortcut</span><h2>Get the answer. Get back in game.</h2></div>
        <div className="explore-grid">
          {explore.map((item, index) => (
            <Link href={item.href} className={`explore-card explore-card--${index + 1}`} key={item.href}>
              <div className="explore-card__icon"><AppIcon name={item.icon} size={28} /></div>
              <span>{item.stat}</span>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
              <b>Open guide <AppIcon name="chevron" size={17} /></b>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-note">
        <div><AppIcon name="sparkles" size={28} /><span>Fresh crumbs only</span></div>
        <h2>The roster moves fast.<br />This guide says when it was checked.</h2>
        <p>Core data is stored in the site, so the pages stay quick even if another guide goes offline.</p>
        <Link href="/cookies/">Browse every cookie <AppIcon name="chevron" size={18} /></Link>
      </section>
    </div>
  );
}
