"use client";

import { useEffect, useState, type ReactNode } from "react";
import { adOptions, adWidths, getAdPlacement } from "@/lib/ads/config";
import { AdSlot } from "./ad-slot";

export function CookieProfileAd({ eligible, sidebarClassName, children }: { eligible: boolean; sidebarClassName: string; children: ReactNode }) {
  const optionalSidebar = eligible && adOptions.cookieSidebar && Boolean(getAdPlacement("cookie-sidebar"));
  const [sidebar, setSidebar] = useState<boolean | null>(null);
  useEffect(() => {
    if (optionalSidebar) setSidebar(window.innerWidth >= adWidths.desktop);
  }, [optionalSidebar]);

  const showInline = eligible && (!optionalSidebar || sidebar === false);
  return <>
    <div className={sidebarClassName}>
      {children}
      {sidebar ? <AdSlot placement="cookie-sidebar" sidebar /> : null}
    </div>
    {showInline ? <div className="cookie-profile-ad"><AdSlot placement="cookie-after-profile" /></div> : null}
  </>;
}
