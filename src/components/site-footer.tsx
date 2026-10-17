import { I18nElement } from "@/i18n/elements";
import { LocaleLink as Link } from "@/i18n/elements";

export function SiteFooter() {
  return (
    <I18nElement as="footer" className="site-footer">
      <I18nElement as="div" className="site-footer__intro">
        <I18nElement as="strong">CookieRun: Crumble Guide</I18nElement>
        <I18nElement as="p">Fast answers for cookies, pets, teams, tiers, guides, and codes.</I18nElement>
      </I18nElement>
      <I18nElement as="nav" aria-label="Guide navigation" className="site-footer__nav">
        <Link href="/cookies/">Cookies</Link>
        <Link href="/tier-list/">Tier List</Link>
        <Link href="/guides/">Guides</Link>
        <Link href="/tools/">Tools</Link>
        <Link href="/codes/">Codes</Link>
      </I18nElement>
      <I18nElement as="nav" aria-label="Trust and legal navigation" className="site-footer__nav site-footer__nav--trust">
        <Link href="/about/">About</Link>
        <Link href="/contact/">Contact</Link>
        <Link href="/privacy/">Privacy</Link>
        <Link href="/disclaimer/">Disclaimer</Link>
      </I18nElement>
      <I18nElement as="div" className="site-footer__legal">
        <I18nElement as="a" href="mailto:contact@cookieruncrumbles.com">contact@cookieruncrumbles.com</I18nElement>
        <I18nElement as="p">Unofficial fan guide. CookieRun names, characters, artwork, and trademarks belong to Devsisters.</I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
