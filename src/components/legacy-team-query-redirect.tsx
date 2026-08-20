"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function LegacyTeamQueryRedirect() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!params.has("team") && !params.has("pets")) return;
    const next = new URLSearchParams(params.toString());
    next.set("tool", "team");
    router.replace(`/tools/?${next.toString()}#team-builder`);
  }, [params, router]);

  return null;
}
