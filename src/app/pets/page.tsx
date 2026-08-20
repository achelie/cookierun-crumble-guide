import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { EntityCodex } from "@/components/entity-codex";
import { pets } from "@/data/pets";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Pet Index", "Browse CookieRun: Crumble pets by name and rarity.", "/pets/");

export default function PetsPage() {
  return <div className="page-shell"><PageIntro eyebrow="Pet index" title="Tiny sidekicks. Big stat problems." description="Search all current pets and filter by rarity. No hidden detail screens and no five-click detour." icon="paw" /><EntityCodex items={pets} kind="pet" /></div>;
}
