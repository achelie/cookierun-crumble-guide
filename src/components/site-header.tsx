import Image from "next/image";
import Link from "next/link";
import { MobileNavigation, type MobileNavigationItem } from "@/components/mobile-navigation";
import { AppIcon } from "@/components/ui/icon";

const nav: MobileNavigationItem[] = [
  { href: "/cookies/", label: "Cookies", icon: "cookie" },
  { href: "/pets/", label: "Pets", icon: "paw" },
  { href: "/tier-list/", label: "Tier List", icon: "trophy" },
  { href: "/teams/", label: "Teams", icon: "users" },
  { href: "/guides/", label: "Guides", icon: "book" },
  { href: "/tools/", label: "Tools", icon: "tools" },
  { href: "/codes/", label: "Codes", icon: "ticket" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-mark" aria-label="CookieRun Crumble Guide home">
          <span className="brand-mark__chip"><Image src="/favicon.png" alt="" width={42} height={42} priority /></span>
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
        <MobileNavigation items={nav} />
      </div>
    </header>
  );
}
