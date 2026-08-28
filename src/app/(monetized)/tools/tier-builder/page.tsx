import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SeoPageHeader } from "@/components/seo-page-header";
import { StructuredData } from "@/components/structured-data";
import { TierListBuilder } from "@/components/tier-list-builder";
import { TeamBuilderSkeleton } from "@/components/team-builder-skeleton";
import { AppIcon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";
import { webApplicationSchema } from "@/lib/structured-data";

const page = seoPages.tierBuilder;
export const metadata: Metadata = pageMetadata(page);

export default function TierBuilderPage() {
  return (
    <div className="page-shell page-shell--builder">
      <StructuredData data={webApplicationSchema(page, ["S-to-D Cookie ranking", "Drag-and-drop ordering", "Current ranking preset", "Shareable URL", "PNG download"])} />
      <SeoPageHeader page={page} icon="trophy" parent={{ label: "Tools", href: "/tools/" }} />
      <nav className="builder-route-nav" aria-label="Builder navigation">
        <Link href="/tools/"><AppIcon name="tools" size={17} />All tools</Link>
        <Link href="/tools/team-builder/">Open Team Builder<AppIcon name="chevron" size={17} /></Link>
      </nav>
      <Suspense fallback={<TeamBuilderSkeleton />}><TierListBuilder /></Suspense>
    </div>
  );
}
