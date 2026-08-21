import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>CookieRun: Crumble Guide</strong>
        <p>Fast answers for cookies, pets, teams, tiers, guides, and codes.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/cookies/">Cookies</Link>
        <Link href="/tier-list/">Tier List</Link>
        <Link href="/guides/">Guides</Link>
        <Link href="/tools/">Tools</Link>
        <Link href="/codes/">Codes</Link>
      </nav>
      <p className="site-footer__legal">Unofficial fan guide. Game names and artwork belong to Devsisters.</p>
    </footer>
  );
}
