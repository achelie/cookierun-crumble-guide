import type { Metadata } from "next";
import { EntityCodex } from "@/components/entity-codex";
import { pets } from "@/data/pets";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Pet Index", "Browse CookieRun: Crumble pets by name and rarity.", "/pets/");

export default function PetsPage() {
  return <div className="page-shell"><h1 className="sr-only">Pet Index</h1><EntityCodex items={pets} kind="pet" /></div>;
}
