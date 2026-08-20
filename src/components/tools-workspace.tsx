"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { TeamBuilder } from "@/components/team-builder";
import { TierListBuilder } from "@/components/tier-list-builder";

type ToolMode = "team" | "tier";

const tools: { id: ToolMode; label: string; detail: string }[] = [
  { id: "team", label: "Build Team", detail: "12 Cookies + 3 Pets" },
  { id: "tier", label: "Build Tier List", detail: "S through D" },
];

export function ToolsWorkspace() {
  const params = useSearchParams();
  const router = useRouter();
  const mode: ToolMode = params.get("tool") === "tier" ? "tier" : "team";
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;
    const active = bar.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    if (!active) return;
    const previous = pill.style.transition;
    pill.style.transition = "none";
    pill.style.transform = `translateX(${active.offsetLeft}px)`;
    pill.style.width = `${active.offsetWidth}px`;
    void pill.offsetWidth;
    pill.style.transition = previous;

    const resize = new ResizeObserver(() => {
      pill.style.transition = "none";
      pill.style.transform = `translateX(${active.offsetLeft}px)`;
      pill.style.width = `${active.offsetWidth}px`;
      void pill.offsetWidth;
      pill.style.transition = previous;
    });
    resize.observe(bar);
    return () => resize.disconnect();
  }, [mode]);

  function selectTool(next: ToolMode, button: HTMLButtonElement) {
    const pill = pillRef.current;
    if (pill) {
      pill.style.transform = `translateX(${button.offsetLeft}px)`;
      pill.style.width = `${button.offsetWidth}px`;
    }
    const search = new URLSearchParams(params.toString());
    search.set("tool", next);
    router.replace(`/tools/?${search.toString()}#${next === "team" ? "team-builder" : "tier-builder"}`, { scroll: false });
  }

  return (
    <div className="tools-workspace">
      <div ref={barRef} className="t-tabs tools-tabs" role="tablist" aria-label="Builder tools">
        <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />
        {tools.map((tool) => (
          <button key={tool.id} className="t-tab" type="button" role="tab" aria-selected={mode === tool.id} onClick={(event) => selectTool(tool.id, event.currentTarget)}>
            <strong>{tool.label}</strong><small>{tool.detail}</small>
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={mode === "team" ? "Team builder" : "Tier list builder"}>
        {mode === "team" ? <TeamBuilder /> : <TierListBuilder />}
      </div>
    </div>
  );
}
