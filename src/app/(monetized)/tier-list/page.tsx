import type { Metadata } from "next";
import { TierListView } from "@/components/tier-list-view";
import { pageMetadata } from "@/lib/metadata";
import { seoPages } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seoPages.tierList);

export default function TierListPage() {
  return <TierListView locale="en" />;
}
