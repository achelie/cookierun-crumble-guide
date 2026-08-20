"use client";

import { DragDropProvider, DragOverlay, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { TierShareCard } from "@/components/share-image-cards";
import { AppIcon } from "@/components/ui/icon";
import { cookies, cookieById, type Cookie } from "@/data/cookies";
import { tierList, tierRanks, type TierRank } from "@/data/tier-list";
import { copyText } from "@/lib/copy-text";
import { shareNodeAsPng } from "@/lib/share-image";
import {
  emptyTierBuilderState,
  getUnrankedCookieIds,
  moveTierCookie,
  normalizeTierPreset,
  parseTierBuilderQuery,
  serializeTierBuilderState,
  type TierBuilderState,
  type TierDropTarget,
} from "@/lib/tier-builder-state";

const allCookieIds = cookies.map((cookie) => cookie.id);
const validCookieIds = new Set(allCookieIds);

type TierDragData = { cookieId: string; sourceRank: TierDropTarget };
type TierTargetData = { targetRank: TierDropTarget; beforeCookieId?: string };

function TierDropZone({ rank, children, className = "" }: { rank: TierDropTarget; children: React.ReactNode; className?: string }) {
  const drop = useDroppable<TierTargetData>({
    id: `tier-zone-${rank}`,
    accept: "tier-cookie",
    collisionPriority: 0,
    data: { targetRank: rank },
  });
  const label = rank === "unranked" ? "Unranked Cookie drop zone" : `${rank} Tier drop zone`;
  return <div ref={drop.ref} className={`${className}${drop.isDropTarget ? " is-drop-target" : ""}`} role="group" aria-label={label}>{children}</div>;
}

function TierCookieItem({ cookie, rank, onClick }: { cookie: Cookie; rank: TierDropTarget; onClick: () => void }) {
  const drop = useDroppable<TierTargetData>({
    id: `tier-target-${cookie.id}`,
    accept: "tier-cookie",
    collisionPriority: 3,
    data: { targetRank: rank, beforeCookieId: cookie.id },
  });
  const drag = useDraggable<TierDragData>({
    id: `tier-cookie-${cookie.id}`,
    type: "tier-cookie",
    data: { cookieId: cookie.id, sourceRank: rank },
  });
  const setRef = useCallback((node: Element | null) => {
    drop.ref(node);
    drag.ref(node);
  }, [drag, drop]);

  return (
    <button
      ref={setRef}
      type="button"
      className={`tier-builder-cookie${drop.isDropTarget ? " is-drop-target" : ""}${drag.isDragging ? " is-dragging" : ""}`}
      onClick={onClick}
      aria-label={`${cookie.name}. ${rank === "unranked" ? "Add to S Tier" : `Remove from ${rank} Tier`}. Drag to rank.`}
      title={`${cookie.name} - drag to rank`}
    >
      <span className="tier-builder-cookie__portrait">
        <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
        <Image src={cookie.image} alt="" width={104} height={104} sizes="92px" />
      </span>
      <strong>{cookie.name}</strong>
      <small>{cookie.rarity} / {cookie.element} / {cookie.role}</small>
    </button>
  );
}

function TierDragPreview({ cookie }: { cookie: Cookie }) {
  return (
    <div className="builder-drag-preview builder-drag-preview--tier">
      <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
      <Image src={cookie.image} alt="" width={130} height={130} />
      <strong>{cookie.name}</strong>
    </div>
  );
}

export function TierListBuilder() {
  const params = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<TierBuilderState>(() => parseTierBuilderQuery(params, validCookieIds));
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "working" | "done" | "error">("idle");
  const [shareMessage, setShareMessage] = useState("");
  const exportRef = useRef<HTMLDivElement>(null);

  const unrankedIds = useMemo(() => getUnrankedCookieIds(allCookieIds, state), [state]);
  const visibleUnranked = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return unrankedIds.flatMap((id) => {
      const cookie = cookieById.get(id);
      return cookie && (!needle || cookie.name.toLowerCase().includes(needle)) ? [cookie] : [];
    });
  }, [query, unrankedIds]);
  const rankedCount = allCookieIds.length - unrankedIds.length;

  function sync(next: TierBuilderState) {
    setState(next);
    const serialized = serializeTierBuilderState(next);
    const search = new URLSearchParams(params.toString());
    search.set("tool", "tier");
    tierRanks.forEach((rank) => {
      const key = rank.toLowerCase() as Lowercase<TierRank>;
      if (serialized[key]) search.set(key, serialized[key]); else search.delete(key);
    });
    router.replace(`/tools/?${search.toString()}#tier-builder`, { scroll: false });
    setCopied(false);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return;
    const source = event.operation.source?.data as TierDragData | undefined;
    const target = event.operation.target?.data as TierTargetData | undefined;
    if (!source || !target || target.beforeCookieId === source.cookieId) return;
    sync(moveTierCookie(state, source.cookieId, target.targetRank, target.beforeCookieId));
  }

  function loadPreset(mode: "pve" | "pvp") {
    sync(normalizeTierPreset(tierList[mode], validCookieIds));
  }

  async function copyLink() {
    if (!(await copyText(window.location.href))) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function shareImage() {
    if (!exportRef.current || shareState === "working") return;
    setShareState("working");
    setShareMessage("Building your PNG...");
    try {
      const result = await shareNodeAsPng(exportRef.current, "cookierun-crumble-tier-list.png");
      if (result === "cancelled") {
        setShareState("idle");
        setShareMessage("");
        return;
      }
      setShareState("done");
      setShareMessage(result === "shared" ? "Image shared." : "PNG downloaded.");
    } catch {
      setShareState("error");
      setShareMessage("Image export failed. Try once more.");
    }
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <section className="tier-builder" id="tier-builder" aria-labelledby="tier-builder-title">
        <div className="tier-builder__head">
          <div><span className="eyebrow">Build tier list</span><h2 id="tier-builder-title">Rank every Cookie your way.</h2><p>Drag Cookies between S and D, reorder them inside a row, or drop them back into Unranked.</p></div>
          <div className="builder-share-actions">
            <button className="secondary-button" type="button" onClick={copyLink}><AppIcon name={copied ? "check" : "link"} size={18} />{copied ? "Link copied" : "Copy link"}</button>
            <button className="share-button" type="button" onClick={shareImage} disabled={shareState === "working"}><AppIcon name="image" size={18} />{shareState === "working" ? "Making PNG" : "Share image"}</button>
          </div>
        </div>
        <p className={`builder-share-status${shareState === "error" ? " is-error" : ""}`} aria-live="polite">{shareMessage}</p>

        <div className="tier-builder__controls" aria-label="Tier list presets">
          <div><b>{rankedCount}</b><span>Cookies ranked</span></div>
          <button type="button" onClick={() => loadPreset("pve")}>Load PvE</button>
          <button type="button" onClick={() => loadPreset("pvp")}>Load PvP</button>
          <button type="button" onClick={() => sync(emptyTierBuilderState())}>Clear list</button>
        </div>

        <div className="tier-builder__board">
          {tierRanks.map((rank) => (
            <section className={`tier-builder-row tier-builder-row--${rank.toLowerCase()}`} key={rank}>
              <div className="tier-builder-rank"><strong>{rank}</strong><span>Tier</span></div>
              <TierDropZone rank={rank} className="tier-builder-units">
                {state[rank].map((id) => {
                  const cookie = cookieById.get(id);
                  return cookie ? <TierCookieItem key={id} cookie={cookie} rank={rank} onClick={() => sync(moveTierCookie(state, id, "unranked"))} /> : null;
                })}
                {!state[rank].length && <p>Drop Cookies here</p>}
              </TierDropZone>
            </section>
          ))}
        </div>

        <section className="tier-unranked" aria-labelledby="unranked-title">
          <div className="tier-unranked__head">
            <div><h3 id="unranked-title">Unranked Cookies</h3><span>{unrankedIds.length} waiting</span></div>
            <label className="search-field"><AppIcon name="search" size={18} /><span className="sr-only">Find an unranked Cookie</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find an unranked Cookie" /></label>
          </div>
          <TierDropZone rank="unranked" className="tier-unranked__grid">
            {visibleUnranked.map((cookie) => <TierCookieItem key={cookie.id} cookie={cookie} rank="unranked" onClick={() => sync(moveTierCookie(state, cookie.id, "S"))} />)}
            {!visibleUnranked.length && <p className="tier-unranked__empty">No unranked Cookies match that search.</p>}
          </TierDropZone>
        </section>

        <TierShareCard ref={exportRef} state={state} />
      </section>
      <DragOverlay>{(source) => {
        const data = source?.data as TierDragData | undefined;
        const cookie = data ? cookieById.get(data.cookieId) : undefined;
        return cookie ? <TierDragPreview cookie={cookie} /> : null;
      }}</DragOverlay>
    </DragDropProvider>
  );
}
