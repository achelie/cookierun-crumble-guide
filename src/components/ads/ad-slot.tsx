"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { adMode, adPublisher, getAdLayout, getAdPlacement, type AdPlacement } from "@/lib/ads/config";
import { canRequestAds, startAdSense, subscribeToAds } from "@/lib/ads/google";
import { useLocale } from "@/i18n/provider";

type Props = { placement: AdPlacement; eligible?: boolean; sidebar?: boolean };
type Unit = NonNullable<ReturnType<typeof getAdPlacement>>;

const labels = { en: "Advertisements", "zh-Hant": "廣告", ja: "広告", ko: "광고", th: "โฆษณา" };
const serverSnapshot = () => false;

export function AdSlot({ placement, eligible = true, sidebar = false }: Props) {
  const unit = getAdPlacement(placement);
  if (!unit) return null;
  return <ConfiguredAdSlot placement={placement} eligible={eligible} sidebar={sidebar} unit={unit} />;
}

function ConfiguredAdSlot({ placement, eligible, sidebar, unit }: Required<Props> & { unit: Unit }) {
  const label = labels[useLocale()];
  const ready = useSyncExternalStore(subscribeToAds, canRequestAds, serverSnapshot);
  const target = useRef<HTMLDivElement>(null);
  const attempted = useRef(false);
  const [retired, setRetired] = useState(false);
  const allowed = ready && eligible;
  const { format, slot } = unit;

  useEffect(() => {
    if (adMode === "live" && eligible) startAdSense();
  }, [eligible]);

  useEffect(() => {
    const host = target.current;
    if (!allowed) {
      if (attempted.current) setRetired(true);
      return;
    }
    if (!host || attempted.current || retired) return;

    let nearViewport = false;
    let completion: MutationObserver | undefined;
    let deadline: number | undefined;
    const viewport = new IntersectionObserver(([entry]) => {
      nearViewport = entry.isIntersecting;
      requestAd();
    }, { rootMargin: "600px 0px" });
    const size = new ResizeObserver(requestAd);

    function requestAd() {
      if (!host || !host.isConnected || attempted.current || !nearViewport || !canRequestAds()) return;
      const width = host.getBoundingClientRect().width;
      const layout = getAdLayout(window.innerWidth);
      const displayFormat = format === "adaptive" ? (layout === "desktop" && width >= 600 ? "horizontal" : "rectangle") : format;
      const minWidth = sidebar ? 300 : displayFormat === "horizontal" ? 250 : 300;
      if (width < minWidth) return;

      attempted.current = true;
      host.dataset.adDevice = layout;
      viewport.disconnect();
      size.disconnect();
      const ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.dataset.adClient = adPublisher;
      ins.dataset.adSlot = slot;
      if (format === "article") {
        ins.style.textAlign = "center";
        ins.dataset.adLayout = "in-article";
        ins.dataset.adFormat = "fluid";
      } else {
        ins.dataset.adFormat = displayFormat;
        ins.dataset.fullWidthResponsive = String(displayFormat === "horizontal" && !sidebar);
      }

      completion = new MutationObserver(() => {
        const status = ins.dataset.adStatus;
        if (!status) return;
        window.clearTimeout(deadline);
        completion?.disconnect();
        if (status === "unfilled") setRetired(true);
      });
      completion.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });
      host.append(ins);
      try {
        (window.adsbygoogle ??= [] as Record<string, never>[]).push({});
        deadline = window.setTimeout(() => {
          if (!ins.dataset.adStatus) setRetired(true);
        }, 12_000);
      } catch {
        setRetired(true);
      }
    }

    viewport.observe(host);
    size.observe(host);
    return () => {
      viewport.disconnect();
      size.disconnect();
      completion?.disconnect();
      window.clearTimeout(deadline);
    };
  }, [allowed, format, retired, sidebar, slot]);

  if (!eligible || retired || (adMode === "live" && !ready)) return null;
  return (
    <div className="ad-slot" data-ad-placement={placement} data-ad-shape={format} data-ad-preview={adMode === "preview" ? "" : undefined}>
      <span className="ad-slot__label">{label}{adMode === "preview" ? " · DEV" : ""}</span>
      <div className="ad-slot__unit" ref={target} />
    </div>
  );
}
