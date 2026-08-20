import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { EntityCodex } from "@/components/entity-codex";
import { cookies } from "@/data/cookies";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Cookie Index", "Browse every CookieRun: Crumble cookie by name and rarity.", "/cookies/");

export default function CookiesPage() {
  return <div className="page-shell"><PageIntro eyebrow="Cookie index" title="All cookies. No mystery meat." description="Search the current roster by name or trim it down by rarity. Cards stay put because detail pages can wait." icon="cookie" /><EntityCodex items={cookies} kind="cookie" /></div>;
}
