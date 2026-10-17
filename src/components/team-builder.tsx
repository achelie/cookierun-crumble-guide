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
import { TeamShareCard } from "@/components/share-image-cards";
import { SynergySummary } from "@/components/synergy-summary";
import { AppIcon } from "@/components/ui/icon";
import { cookies, cookieById, type Cookie } from "@/data/cookies";
import { pets, petById, type Pet } from "@/data/pets";
import { copyText } from "@/lib/copy-text";
import { sortByRarityHighToLow } from "@/lib/rarity-order";
import { downloadNodeAsPng } from "@/lib/share-image";
import { placeFormationMember } from "@/lib/team-formation";
import { cookieSlotCount, parseTeamQuery, petSlotCount, serializeTeamQuery } from "@/lib/team-query";

const cookieIds = new Set(cookies.map(({ id }) => id));
const petIds = new Set(pets.map(({ id }) => id));

type BuilderEntity = "cookie" | "pet";
type BuilderDragData = {
  entity: BuilderEntity;
  id: string;
  source: "roster" | "slot";
  slot?: number;
  name: string;
  image: string;
  rarity: string;
};
type BuilderDropData = { entity: BuilderEntity; slot: number };

function TeamDropSlot({ entity, index, member, onRemove }: {
  entity: BuilderEntity;
  index: number;
  member?: Cookie | Pet;
  onRemove: (index: number) => void;
}) {
  const t = useTranslator();
  const drop = useDroppable<BuilderDropData>({ id: `team-${entity}-slot-${index}`, accept: entity, data: { entity, slot: index } });
  const drag = useDraggable<BuilderDragData>({
    id: member ? `team-${entity}-member-${member.id}` : `team-${entity}-empty-${index}`,
    type: entity,
    disabled: !member,
    data: member ? { entity, id: member.id, source: "slot", slot: index, name: member.name, image: member.image, rarity: member.rarity } : undefined,
  });
  const setRef = useCallback((node: Element | null) => {
    drop.ref(node);
    drag.ref(node);
  }, [drag, drop]);

  if (!member) {
    return <I18nElement as="div" ref={drop.ref} className={`builder-slot${drop.isDropTarget ? " is-drop-target" : ""}`}><I18nElement as="span">{index + 1}</I18nElement></I18nElement>;
  }

  const cookie = entity === "cookie" ? member as Cookie : undefined;
  return (
    <I18nElement as="button"
      ref={setRef}
      type="button"
      className={`builder-slot is-filled builder-slot--${entity} rarity-${member.rarity.toLowerCase()}${drop.isDropTarget ? " is-drop-target" : ""}${drag.isDragging ? " is-dragging" : ""}`}
      onClick={() => onRemove(index)}
      aria-label={formatMessage(t, "Remove {0}. Drag to reorder.", member.name)}
      title={formatMessage(t, "{0} - drag to reorder or click to remove", member.name)}
    >
      {cookie && <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />}
      <I18nElement as="span" className="builder-slot__rarity">{member.rarity}</I18nElement>
      <Image src={member.image} alt={member.name} width={150} height={150} sizes="(max-width: 720px) 25vw, 150px" />
      <I18nElement as="span" className="builder-slot__number">{index + 1}</I18nElement>
      <I18nElement as="span" className="builder-slot__remove"><AppIcon name="x" size={16} /></I18nElement>
    </I18nElement>
  );
}

function RosterDragButton({ entity, member, disabled, children, onClick }: {
  entity: BuilderEntity;
  member: { id: string; name: string; image: string; rarity: string };
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const t = useTranslator();
  const drag = useDraggable<BuilderDragData>({
    id: `roster-${entity}-${member.id}`,
    type: entity,
    disabled,
    data: { entity, id: member.id, source: "roster", name: member.name, image: member.image, rarity: member.rarity },
  });

  return (
    <I18nElement as="button" ref={drag.ref} type="button" onClick={onClick} disabled={disabled} className={`rarity-${member.rarity.toLowerCase()}${drag.isDragging ? " is-dragging" : ""}`} aria-label={formatMessage(t, "Add or drag {0}", member.name)}>
      {children}
    </I18nElement>
  );
}

function TeamDragPreview({ data }: { data: BuilderDragData }) {
  const cookie = data.entity === "cookie" ? cookieById.get(data.id) : undefined;
  return (
    <I18nElement as="div" className={`builder-drag-preview builder-drag-preview--${data.entity} rarity-${data.rarity.toLowerCase()}`}>
      {cookie && <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />}
      <I18nElement as="span" className="builder-drag-preview__rarity">{data.rarity}</I18nElement>
      <Image src={data.image} alt="" width={130} height={130} />
      <I18nElement as="strong">{data.name}</I18nElement>
    </I18nElement>
  );
}

export function TeamBuilder() {
  const locale = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const [formation, setFormation] = useState(() => parseTeamQuery(params.get("team"), params.get("pets"), cookieIds, petIds));
  const [cookieQuery, setCookieQuery] = useState("");
  const [petQuery, setPetQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "working" | "done" | "error">("idle");
  const [shareMessage, setShareMessage] = useState("");
  const exportRef = useRef<HTMLDivElement>(null);

  const selectedCookieIds = useMemo(() => new Set(formation.cookies.filter((id): id is string => Boolean(id))), [formation.cookies]);
  const selectedPetIds = useMemo(() => new Set(formation.pets.filter((id): id is string => Boolean(id))), [formation.pets]);
  const selectedCookies = useMemo(() => formation.cookies.flatMap((id) => id && cookieById.get(id) ? [cookieById.get(id) as Cookie] : []), [formation.cookies]);
  const availableCookies = useMemo(() => {
    const needle = cookieQuery.trim().toLowerCase();
    return sortByRarityHighToLow(cookies.filter((cookie) => !selectedCookieIds.has(cookie.id) && (!needle || `${cookie.name.toLowerCase()} ${entitySearchText(cookie.id)}`.includes(needle))));
  }, [cookieQuery, selectedCookieIds]);
  const availablePets = useMemo(() => {
    const needle = petQuery.trim().toLowerCase();
    return sortByRarityHighToLow(pets.filter((pet) => !selectedPetIds.has(pet.id) && (!needle || `${pet.name.toLowerCase()} ${entitySearchText(pet.id)}`.includes(needle))));
  }, [petQuery, selectedPetIds]);

  function sync(nextCookies: (string | null)[], nextPets: (string | null)[]) {
    setFormation({ cookies: nextCookies, pets: nextPets });
    const nextQuery = serializeTeamQuery(nextCookies, nextPets);
    const search = new URLSearchParams(params.toString());
    search.delete("tool");
    if (nextQuery.team) search.set("team", nextQuery.team); else search.delete("team");
    if (nextQuery.pets) search.set("pets", nextQuery.pets); else search.delete("pets");
    const query = search.size ? `?${search.toString()}` : "";
    router.replace(localizedPath(`/tools/team-builder/${query}`, locale), { scroll: false });
    setCopied(false);
  }

  function addCookie(id: string) {
    const slot = formation.cookies.indexOf(null);
    if (slot < 0 || selectedCookieIds.has(id)) return;
    sync(placeFormationMember(formation.cookies, id, slot), formation.pets);
  }

  function addPet(id: string) {
    const slot = formation.pets.indexOf(null);
    if (slot < 0 || selectedPetIds.has(id)) return;
    sync(formation.cookies, placeFormationMember(formation.pets, id, slot));
  }

  function removeCookie(index: number) {
    const next = [...formation.cookies];
    next[index] = null;
    sync(next, formation.pets);
  }

  function removePet(index: number) {
    const next = [...formation.pets];
    next[index] = null;
    sync(formation.cookies, next);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return;
    const source = event.operation.source?.data as BuilderDragData | undefined;
    const target = event.operation.target?.data as BuilderDropData | undefined;
    if (!source || !target || source.entity !== target.entity) return;
    if (source.entity === "cookie") sync(placeFormationMember(formation.cookies, source.id, target.slot, source.slot), formation.pets);
    else sync(formation.cookies, placeFormationMember(formation.pets, source.id, target.slot, source.slot));
  }

  function clearTeam() {
    sync(Array(cookieSlotCount).fill(null), Array(petSlotCount).fill(null));
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
      await downloadNodeAsPng(exportRef.current, "cookierun-crumble-team.png");
      setShareState("done");
      setShareMessage("PNG downloaded.");
    } catch {
      setShareState("error");
      setShareMessage("Image export failed. Try once more.");
    }
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <I18nElement as="section" className="team-builder" id="team-builder" aria-labelledby="builder-title">
        <I18nElement as="div" className="team-builder__head">
          <I18nElement as="div"><I18nElement as="span" className="eyebrow">Build team</I18nElement><I18nElement as="h2" id="builder-title">Drag a lineup into place.</I18nElement><I18nElement as="p">Fill 12 Cookie slots and 3 Pet slots. Drag to an exact position, or tap a roster card to use the next empty slot.</I18nElement></I18nElement>
          <I18nElement as="div" className="builder-share-actions">
            <I18nElement as="button" className="secondary-button" type="button" onClick={copyLink} aria-live="polite"><AppIcon name={copied ? "check" : "link"} size={18} />{copied ? "Link copied" : "Copy link"}</I18nElement>
            <I18nElement as="button" className="share-button" type="button" onClick={downloadImage} disabled={shareState === "working"}><AppIcon name="download" size={18} />{shareState === "working" ? "Making PNG" : "Download PNG"}</I18nElement>
          </I18nElement>
        </I18nElement>
        <I18nElement as="p" className={`builder-share-status${shareState === "error" ? " is-error" : ""}`} aria-live="polite">{shareMessage}</I18nElement>

        <I18nElement as="div" className="builder-formation">
          <I18nElement as="div">
            <I18nElement as="div" className="builder-section-label"><I18nElement as="span">Cookies</I18nElement><I18nElement as="b">{selectedCookieIds.size}/{cookieSlotCount}</I18nElement></I18nElement>
            <I18nElement as="div" className="builder-slots" aria-label="Selected cookies">
              {formation.cookies.map((id, index) => <TeamDropSlot key={`cookie-${index}-${id ?? "empty"}`} entity="cookie" index={index} member={id ? cookieById.get(id) : undefined} onRemove={removeCookie} />)}
            </I18nElement>
          </I18nElement>
          <I18nElement as="aside" className="builder-pets">
            <I18nElement as="div" className="builder-section-label"><I18nElement as="span">Pets</I18nElement><I18nElement as="b">{selectedPetIds.size}/{petSlotCount}</I18nElement></I18nElement>
            <I18nElement as="div" className="pet-slots" aria-label="Selected pets">
              {formation.pets.map((id, index) => <TeamDropSlot key={`pet-${index}-${id ?? "empty"}`} entity="pet" index={index} member={id ? petById.get(id) : undefined} onRemove={removePet} />)}
            </I18nElement>
          </I18nElement>
        </I18nElement>

        <SynergySummary cookies={selectedCookies} />

        <I18nElement as="div" className="builder-pickers">
          <I18nElement as="section" className="builder-picker" aria-labelledby="cookie-picker-title">
            <I18nElement as="div" className="builder-picker__title"><I18nElement as="h3" id="cookie-picker-title">Cookie roster</I18nElement><I18nElement as="span">{availableCookies.length} available</I18nElement></I18nElement>
            <I18nElement as="label" className="search-field"><AppIcon name="search" size={18} /><I18nElement as="span" className="sr-only">Find a cookie</I18nElement><I18nElement as="input" value={cookieQuery} onChange={(event) => setCookieQuery(event.target.value)} placeholder="Find a cookie" /></I18nElement>
            <I18nElement as="div" className="builder-options">
              {availableCookies.map((cookie) => (
                <RosterDragButton entity="cookie" member={cookie} key={cookie.id} onClick={() => addCookie(cookie.id)} disabled={selectedCookieIds.size >= cookieSlotCount}>
                  <I18nElement as="span" className="builder-option__portrait"><CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact /><Image src={cookie.image} alt="" width={72} height={72} sizes="56px" /></I18nElement>
                  <I18nElement as="span"><I18nElement as="strong">{cookie.name}</I18nElement><I18nElement as="small">{cookie.rarity} / {cookie.element} / {cookie.role}</I18nElement></I18nElement><AppIcon name="grip" size={17} />
                </RosterDragButton>
              ))}
            </I18nElement>
          </I18nElement>

          <I18nElement as="section" className="builder-picker builder-picker--pets" aria-labelledby="pet-picker-title">
            <I18nElement as="div" className="builder-picker__title"><I18nElement as="h3" id="pet-picker-title">Pet roster</I18nElement><I18nElement as="span">{availablePets.length} available</I18nElement></I18nElement>
            <I18nElement as="label" className="search-field"><AppIcon name="search" size={18} /><I18nElement as="span" className="sr-only">Find a pet</I18nElement><I18nElement as="input" value={petQuery} onChange={(event) => setPetQuery(event.target.value)} placeholder="Find a pet" /></I18nElement>
            <I18nElement as="div" className="builder-options builder-options--pets">
              {availablePets.map((pet) => (
                <RosterDragButton entity="pet" member={pet} key={pet.id} onClick={() => addPet(pet.id)} disabled={selectedPetIds.size >= petSlotCount}>
                  <Image src={pet.image} alt="" width={72} height={72} sizes="56px" /><I18nElement as="span"><I18nElement as="strong">{pet.name}</I18nElement><I18nElement as="small">{pet.rarity}</I18nElement></I18nElement><AppIcon name="grip" size={17} />
                </RosterDragButton>
              ))}
            </I18nElement>
          </I18nElement>
        </I18nElement>

        {(selectedCookieIds.size > 0 || selectedPetIds.size > 0) && <I18nElement as="button" type="button" className="text-button builder-clear" onClick={clearTeam}>Clear formation</I18nElement>}
        <TeamShareCard ref={exportRef} cookieIds={formation.cookies} petIds={formation.pets} />
      </I18nElement>
      <DragOverlay dropAnimation={null}>{(source) => {
        const data = source?.data as BuilderDragData | undefined;
        return data ? <TeamDragPreview data={data} /> : null;
      }}</DragOverlay>
    </DragDropProvider>
  );
}
