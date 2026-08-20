import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { TeamBuilderSkeleton } from "@/components/team-builder-skeleton";
import { ToolsWorkspace } from "@/components/tools-workspace";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Team Builder and Tier List Maker",
  "Build a 12-Cookie team with 3 Pets or make your own CookieRun: Crumble tier list, then share a link or watermarked PNG.",
  "/tools/",
);

export default function ToolsPage() {
  return (
    <div className="page-shell page-shell--tools">
      <PageIntro eyebrow="Tools" title="Build it. Drag it. Share it." description="Arrange a full team or rank the roster, then turn your build into a clean shareable image." icon="tools" />
      <Suspense fallback={<TeamBuilderSkeleton />}><ToolsWorkspace /></Suspense>
    </div>
  );
}
