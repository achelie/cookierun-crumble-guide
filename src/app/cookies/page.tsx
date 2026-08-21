import type { Metadata } from "next";
import { EntityCodex } from "@/components/entity-codex";
import { cookies } from "@/data/cookies";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Cookie Index", "Browse every CookieRun: Crumble cookie by name and rarity.", "/cookies/");

export default function CookiesPage() {
  return <div className="page-shell"><h1 className="sr-only">Cookie Index</h1><EntityCodex items={cookies} kind="cookie" /></div>;
}
