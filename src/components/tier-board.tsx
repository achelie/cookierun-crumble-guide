"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { EntityCard } from "@/components/entity-card";
import { cookieById } from "@/data/cookies";
import { tierList, tierRanks, type TierMode } from "@/data/tier-list";

const modes: { id: TierMode; label: string; sub: string }[] = [
  { id: "pve", label: "Stages", sub: "PvE" },
  { id: "pvp", label: "Arena", sub: "PvP" },
];

export function TierBoard() {
  const [mode, setMode] = useState<TierMode>("pve");
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;
    const tabs = [...bar.querySelectorAll<HTMLButtonElement>(".t-tab")];
    const active = () => tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
    const moveTo = (tab: HTMLButtonElement, animate: boolean) => {
      if (!animate) {
        const prev = pill.style.transition;
        pill.style.transition = "none";
        pill.style.transform = `translateX(${tab.offsetLeft}px)`;
        pill.style.width = `${tab.offsetWidth}px`;
        void pill.offsetWidth;
        pill.style.transition = prev;
      } else {
        pill.style.transform = `translateX(${tab.offsetLeft}px)`;
        pill.style.width = `${tab.offsetWidth}px`;
      }
    };
    moveTo(active(), false);
    const resize = new ResizeObserver(() => moveTo(active(), false));
    resize.observe(bar);
    return () => resize.disconnect();
  }, [mode]);

  function selectMode(next: TierMode, target: HTMLButtonElement) {
    setMode(next);
    const pill = pillRef.current;
    if (pill) {
      pill.style.transform = `translateX(${target.offsetLeft}px)`;
      pill.style.width = `${target.offsetWidth}px`;
    }
  }

  return (
    <section className="tier-shell">
      <div ref={barRef} className="t-tabs" role="tablist" aria-label="Tier list mode">
        <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />
        {modes.map((item) => (
          <button key={item.id} className="t-tab" type="button" role="tab" aria-selected={mode === item.id} onClick={(event) => selectMode(item.id, event.currentTarget)}>
            {item.label}<small>{item.sub}</small>
          </button>
        ))}
      </div>
      <div className="tier-board" role="tabpanel">
        {tierRanks.map((rank) => (
          <section className={`tier-row tier-row--${rank.toLowerCase()}`} key={rank}>
            <div className="tier-rank"><strong>{rank}</strong><span>Tier</span></div>
            <div className="tier-units">
              {tierList[mode][rank].length ? tierList[mode][rank].map((id) => {
                const cookie = cookieById.get(id);
                return cookie ? <EntityCard key={id} {...cookie} compact /> : null;
              }) : <p className="tier-pending">Still under review. Nobody gets thrown into D just for decoration.</p>}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
