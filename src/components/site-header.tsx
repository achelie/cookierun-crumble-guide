import Link from "next/link";
import { AppIcon, type IconName } from "@/components/ui/icon";

const nav: { href: string; label: string; icon: IconName }[] = [
  { href: "/cookies/", label: "Cookies", icon: "cookie" },
  { href: "/pets/", label: "Pets", icon: "paw" },
  { href: "/tier-list/", label: "Tier List", icon: "trophy" },
  { href: "/teams/", label: "Teams", icon: "users" },
  { href: "/codes/", label: "Codes", icon: "ticket" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-mark" aria-label="CookieRun Crumble Guide home">
          <span className="brand-mark__chip"><AppIcon name="cookie" size={20} /></span>
          <span>CRUMBLE<span>GUIDE</span></span>
        </Link>
        <nav aria-label="Primary navigation" className="site-nav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              <AppIcon name={item.icon} size={17} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
