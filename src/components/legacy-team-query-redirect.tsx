"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function LegacyTeamQueryRedirect() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!params.has("team") && !params.has("pets")) return;
    const next = new URLSearchParams(params.toString());
    next.delete("tool");
    router.replace(`/tools/team-builder/?${next.toString()}`);
  }, [params, router]);

  return null;
}
