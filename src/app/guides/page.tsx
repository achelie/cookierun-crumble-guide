import type { Metadata } from "next";
import { Suspense } from "react";
import { GuidesExplorer, GuidesExplorerFallback } from "@/components/guides-explorer";
import { AppIcon } from "@/components/ui/icon";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "CookieRun: Crumble Guides",
  "Practical CookieRun: Crumble guides for first teams, Synergy, Cookies, Pets, stages, bosses, events, and codes.",
  "/guides/",
);

export default function GuidesPage() {
  return (
    <div className="page-shell guides-page">
      <header className="guides-heading">
        <div className="guides-heading__icon"><AppIcon name="book" size={26} /></div>
        <div>
          <span className="eyebrow">Field notes</span>
          <h1>Guides</h1>
          <p>Clear builds, smarter upgrades, and quick fixes for the run in front of you.</p>
        </div>
      </header>
      <Suspense fallback={<GuidesExplorerFallback guides={guides} />}>
        <GuidesExplorer guides={guides} />
      </Suspense>
    </div>
  );
}
