"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/i18n/provider";
import { localizedPath } from "@/i18n/config";
import { useEffect } from "react";

export function LegacyTeamQueryRedirect() {
  const locale = useLocale();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!params.has("team") && !params.has("pets")) return;
    const next = new URLSearchParams(params.toString());
    next.delete("tool");
    router.replace(localizedPath(`/tools/team-builder/?${next.toString()}`, locale));
  }, [params, router, locale]);

  return null;
}
