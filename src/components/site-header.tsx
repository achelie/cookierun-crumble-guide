import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import { LocaleLink as Link } from "@/i18n/elements";
import { MobileNavigation, type MobileNavigationItem } from "@/components/mobile-navigation";
import { AppIcon } from "@/components/ui/icon";
import { LanguageSwitcher } from "@/components/language-switcher";

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
    <I18nElement as="header" className="site-header">
      <I18nElement as="div" className="site-header__inner">
        <Link href="/" className="brand-mark" aria-label="CookieRun Crumble Guide home">
          <I18nElement as="span" className="brand-mark__chip"><Image src="/favicon.png" alt="" width={42} height={42} priority /></I18nElement>
          <I18nElement as="span">CRUMBLE<I18nElement as="span">GUIDE</I18nElement></I18nElement>
        </Link>
        <I18nElement as="nav" aria-label="Primary navigation" className="site-nav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              <AppIcon name={item.icon} size={17} />
              <I18nElement as="span">{item.label}</I18nElement>
            </Link>
          ))}
        </I18nElement>
        <MobileNavigation items={nav} />
        <LanguageSwitcher />
      </I18nElement>
    </I18nElement>
  );
}
