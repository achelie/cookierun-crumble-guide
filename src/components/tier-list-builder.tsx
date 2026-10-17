"use client";

import { I18nElement } from "@/i18n/elements";
import { useLocale, useTranslator } from "@/i18n/provider";
import { formatMessage } from "@/i18n/translate";
import { localizedPath } from "@/i18n/config";
import { entitySearchText } from "@/i18n/entities";
import { DragDropProvider, DragOverlay, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/react";
import { LocaleImage as Image } from "@/i18n/elements";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { TierShareCard } from "@/components/share-image-cards";
import { AppIcon } from "@/components/ui/icon";
import { cookies, cookieById, type Cookie } from "@/data/cookies";
import { tierList, tierRanks, type TierRank } from "@/data/tier-list";
import { copyText } from "@/lib/copy-text";
import { sortByRarityHighToLow } from "@/lib/rarity-order";
import { downloadNodeAsPng } from "@/lib/share-image";
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
  return <I18nElement as="div" ref={drop.ref} className={`${className}${drop.isDropTarget ? " is-drop-target" : ""}`} role="group" aria-label={label}>{children}</I18nElement>;
}

function TierCookieItem({ cookie, rank, onClick }: { cookie: Cookie; rank: TierDropTarget; onClick: () => void }) {
  const t = useTranslator();
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
    <I18nElement as="button"
      ref={setRef}
      type="button"
      className={`tier-builder-cookie rarity-${cookie.rarity.toLowerCase()}${drop.isDropTarget ? " is-drop-target" : ""}${drag.isDragging ? " is-dragging" : ""}`}
      onClick={onClick}
      aria-label={formatMessage(t, "{0}. {1}. Drag to rank.", cookie.name, rank === "unranked" ? t("Add to S Tier") : formatMessage(t, "Remove from {0} Tier", rank))}
      title={formatMessage(t, "{0} - drag to rank", cookie.name)}
    >
      <I18nElement as="span" className="tier-builder-cookie__portrait">
        <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
        <I18nElement as="span" className="tier-builder-cookie__rarity">{cookie.rarity}</I18nElement>
        <Image src={cookie.image} alt="" width={104} height={104} sizes="92px" />
      </I18nElement>
      <I18nElement as="strong">{cookie.name}</I18nElement>
      <I18nElement as="small">{cookie.rarity} / {cookie.element} / {cookie.role}</I18nElement>
    </I18nElement>
  );
}

function TierDragPreview({ cookie }: { cookie: Cookie }) {
  return (
    <I18nElement as="div" className={`builder-drag-preview builder-drag-preview--tier rarity-${cookie.rarity.toLowerCase()}`}>
      <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />
      <I18nElement as="span" className="builder-drag-preview__rarity">{cookie.rarity}</I18nElement>
      <Image src={cookie.image} alt="" width={130} height={130} />
      <I18nElement as="strong">{cookie.name}</I18nElement>
    </I18nElement>
  );
}

export function TierListBuilder() {
  const locale = useLocale();
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
    return sortByRarityHighToLow(unrankedIds.flatMap((id) => {
      const cookie = cookieById.get(id);
      return cookie && (!needle || `${cookie.name.toLowerCase()} ${entitySearchText(cookie.id)}`.includes(needle)) ? [cookie] : [];
    }));
  }, [query, unrankedIds]);
  const rankedCount = allCookieIds.length - unrankedIds.length;

  function sync(next: TierBuilderState) {
    setState(next);
    const serialized = serializeTierBuilderState(next);
    const search = new URLSearchParams(params.toString());
    search.delete("tool");
    tierRanks.forEach((rank) => {
      const key = rank.toLowerCase() as Lowercase<TierRank>;
      if (serialized[key]) search.set(key, serialized[key]); else search.delete(key);
    });
    const query = search.size ? `?${search.toString()}` : "";
    router.replace(localizedPath(`/tools/tier-builder/${query}`, locale), { scroll: false });
    setCopied(false);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return;
    const source = event.operation.source?.data as TierDragData | undefined;
    const target = event.operation.target?.data as TierTargetData | undefined;
    if (!source || !target || target.beforeCookieId === source.cookieId) return;
    sync(moveTierCookie(state, source.cookieId, target.targetRank, target.beforeCookieId));
  }

  function loadPreset() {
    sync(normalizeTierPreset(tierList, validCookieIds));
  }

  async function copyLink() {
    if (!(await copyText(window.location.href))) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function downloadImage() {
    if (!exportRef.current || shareState === "working") return;
    setShareState("working");
    setShareMessage("Preparing your PNG...");
    try {
      await downloadNodeAsPng(exportRef.current, "cookierun-crumble-tier-list.png");
      setShareState("done");
      setShareMessage("PNG downloaded.");
    } catch {
      setShareState("error");
      setShareMessage("Image export failed. Try once more.");
    }
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <I18nElement as="section" className="tier-builder" id="tier-builder" aria-labelledby="tier-builder-title">
        <I18nElement as="div" className="tier-builder__head">
          <I18nElement as="div"><I18nElement as="span" className="eyebrow">Build tier list</I18nElement><I18nElement as="h2" id="tier-builder-title">Rank every Cookie your way.</I18nElement><I18nElement as="p">Drag Cookies between S and D, reorder them inside a row, or drop them back into Unranked.</I18nElement></I18nElement>
          <I18nElement as="div" className="builder-share-actions">
            <I18nElement as="button" className="secondary-button" type="button" onClick={copyLink}><AppIcon name={copied ? "check" : "link"} size={18} />{copied ? "Link copied" : "Copy link"}</I18nElement>
            <I18nElement as="button" className="share-button" type="button" onClick={downloadImage} disabled={shareState === "working"}><AppIcon name="download" size={18} />{shareState === "working" ? "Making PNG" : "Download PNG"}</I18nElement>
          </I18nElement>
        </I18nElement>
        <I18nElement as="p" className={`builder-share-status${shareState === "error" ? " is-error" : ""}`} aria-live="polite">{shareMessage}</I18nElement>

        <I18nElement as="div" className="tier-builder__controls" aria-label="Tier list presets">
          <I18nElement as="div"><I18nElement as="b">{rankedCount}</I18nElement><I18nElement as="span">Cookies ranked</I18nElement></I18nElement>
          <I18nElement as="button" type="button" onClick={loadPreset}>Load current ranking</I18nElement>
          <I18nElement as="button" type="button" onClick={() => sync(emptyTierBuilderState())}>Clear list</I18nElement>
        </I18nElement>

        <I18nElement as="div" className="tier-builder__board">
          {tierRanks.map((rank) => (
            <I18nElement as="section" className={`tier-builder-row tier-builder-row--${rank.toLowerCase()}`} key={rank}>
              <I18nElement as="div" className="tier-builder-rank"><I18nElement as="strong">{rank}</I18nElement><I18nElement as="span">Tier</I18nElement></I18nElement>
              <TierDropZone rank={rank} className="tier-builder-units">
                {state[rank].map((id) => {
                  const cookie = cookieById.get(id);
                  return cookie ? <TierCookieItem key={id} cookie={cookie} rank={rank} onClick={() => sync(moveTierCookie(state, id, "unranked"))} /> : null;
                })}
                {!state[rank].length && <I18nElement as="p">Drop Cookies here</I18nElement>}
              </TierDropZone>
            </I18nElement>
          ))}
        </I18nElement>

        <I18nElement as="section" className="tier-unranked" aria-labelledby="unranked-title">
          <I18nElement as="div" className="tier-unranked__head">
            <I18nElement as="div"><I18nElement as="h3" id="unranked-title">Unranked Cookies</I18nElement><I18nElement as="span">{unrankedIds.length} waiting</I18nElement></I18nElement>
            <I18nElement as="label" className="search-field"><AppIcon name="search" size={18} /><I18nElement as="span" className="sr-only">Find an unranked Cookie</I18nElement><I18nElement as="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find an unranked Cookie" /></I18nElement>
          </I18nElement>
          <TierDropZone rank="unranked" className="tier-unranked__grid">
            {visibleUnranked.map((cookie) => <TierCookieItem key={cookie.id} cookie={cookie} rank="unranked" onClick={() => sync(moveTierCookie(state, cookie.id, "S"))} />)}
            {!visibleUnranked.length && <I18nElement as="p" className="tier-unranked__empty">No unranked Cookies match that search.</I18nElement>}
          </TierDropZone>
        </I18nElement>

        <TierShareCard ref={exportRef} state={state} />
      </I18nElement>
      <DragOverlay dropAnimation={null}>{(source) => {
        const data = source?.data as TierDragData | undefined;
        const cookie = data ? cookieById.get(data.cookieId) : undefined;
        return cookie ? <TierDragPreview cookie={cookie} /> : null;
      }}</DragOverlay>
    </DragDropProvider>
  );
}
