"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/i18n/provider";
import { localizedPath } from "@/i18n/config";
import { useEffect } from "react";

const tierKeys = ["s", "a", "b", "c", "d"];

export function LegacyToolsQueryRedirect() {
  const locale = useLocale();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const mode = params.get("tool");
    const isTeam = mode === "team" || params.has("team") || params.has("pets");
    const isTier = mode === "tier" || tierKeys.some((key) => params.has(key));
    if (!isTeam && !isTier) return;

    const next = new URLSearchParams(params.toString());
    next.delete("tool");
    const query = next.size ? `?${next.toString()}` : "";
    router.replace(localizedPath(`/tools/${isTeam ? "team-builder" : "tier-builder"}/${query}`, locale));
  }, [params, router, locale]);

  return null;
}
