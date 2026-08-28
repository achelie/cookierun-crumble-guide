import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__intro">
        <strong>CookieRun: Crumble Guide</strong>
        <p>Fast answers for cookies, pets, teams, tiers, guides, and codes.</p>
      </div>
      <nav aria-label="Guide navigation" className="site-footer__nav">
        <Link href="/cookies/">Cookies</Link>
        <Link href="/tier-list/">Tier List</Link>
        <Link href="/guides/">Guides</Link>
        <Link href="/tools/">Tools</Link>
        <Link href="/codes/">Codes</Link>
      </nav>
      <nav aria-label="Trust and legal navigation" className="site-footer__nav site-footer__nav--trust">
        <Link href="/about/">About</Link>
        <Link href="/contact/">Contact</Link>
        <Link href="/privacy/">Privacy</Link>
        <Link href="/disclaimer/">Disclaimer</Link>
      </nav>
      <div className="site-footer__legal">
        <a href="mailto:contact@cookieruncrumbles.com">contact@cookieruncrumbles.com</a>
        <p>Unofficial fan guide. CookieRun names, characters, artwork, and trademarks belong to Devsisters.</p>
      </div>
    </footer>
  );
}
