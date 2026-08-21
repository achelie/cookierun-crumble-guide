import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LegacyToolsQueryRedirect } from "@/components/legacy-tools-query-redirect";
import { PageIntro } from "@/components/page-intro";
import { AppIcon } from "@/components/ui/icon";
import { cookieById } from "@/data/cookies";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Team Builder and Tier List Tools",
  "Choose a dedicated team builder or tier list maker, save the result in the URL, and download a watermarked PNG.",
  "/tools/",
);

export default function ToolsPage() {
  const teamCookies = ["cookie0070", "cookie0181", "cookie3001"].flatMap((id) => {
    const cookie = cookieById.get(id);
    return cookie ? [cookie] : [];
  });
  const tierCookies = ["cookie4019", "cookie0126", "cookie0573"].flatMap((id) => {
    const cookie = cookieById.get(id);
    return cookie ? [cookie] : [];
  });

  return (
    <div className="page-shell page-shell--tools">
      <Suspense fallback={null}><LegacyToolsQueryRedirect /></Suspense>
      <PageIntro eyebrow="Tools" title="Pick a board. Make it yours." description="Build a team or rank every Cookie, then keep the URL and download a clean PNG." icon="tools" />
      <section className="tools-directory" aria-label="Builder tools">
        <Link className="tool-directory-card tool-directory-card--team" href="/tools/team-builder/">
          <span className="tool-directory-card__copy">
            <small>12 Cookies + 3 Pets</small>
            <strong>Team Builder</strong>
            <span>Drag a complete formation into exact slots.</span>
            <b>Open builder <AppIcon name="chevron" size={18} /></b>
          </span>
          <span className="tool-directory-card__art" aria-hidden="true">
            {teamCookies.map((cookie) => <Image key={cookie.id} src={cookie.image} alt="" width={210} height={210} />)}
          </span>
        </Link>
        <Link className="tool-directory-card tool-directory-card--tier" href="/tools/tier-builder/">
          <span className="tool-directory-card__copy">
            <small>S through D</small>
            <strong>Tier List Builder</strong>
            <span>Start empty or load the current combined PvP and PvE ranking.</span>
            <b>Open builder <AppIcon name="chevron" size={18} /></b>
          </span>
          <span className="tool-directory-card__tiers" aria-hidden="true">
            <i>S</i>
            <span>{tierCookies.map((cookie) => <Image key={cookie.id} src={cookie.image} alt="" width={110} height={110} />)}</span>
          </span>
        </Link>
      </section>
    </div>
  );
}
