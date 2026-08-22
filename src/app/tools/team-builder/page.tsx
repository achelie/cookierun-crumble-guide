import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { TeamBuilder } from "@/components/team-builder";
import { TeamBuilderSkeleton } from "@/components/team-builder-skeleton";
import { AppIcon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";
import { webApplicationSchema } from "@/lib/structured-data";

const page = seoPages.teamBuilder;
export const metadata: Metadata = pageMetadata(page);

export default function TeamBuilderPage() {
  return (
    <div className="page-shell page-shell--builder">
      <StructuredData data={webApplicationSchema(page, ["12 Cookie slots", "3 Pet slots", "Drag-and-drop ordering", "Synergy summary", "Shareable URL", "PNG download"])} />
      <SeoPageHeader page={page} icon="users" parent={{ label: "Tools", href: "/tools/" }} />
      <nav className="builder-route-nav" aria-label="Builder navigation">
        <Link href="/tools/"><AppIcon name="tools" size={17} />All tools</Link>
        <Link href="/tools/tier-builder/">Open Tier List Builder<AppIcon name="chevron" size={17} /></Link>
      </nav>
      <Suspense fallback={<TeamBuilderSkeleton />}><TeamBuilder /></Suspense>
    </div>
  );
}
