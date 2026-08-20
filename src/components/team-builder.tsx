"use client";

import { DragDropProvider, DragOverlay, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { CookieTaxonomyBadges } from "@/components/cookie-taxonomy-badges";
import { TeamShareCard } from "@/components/share-image-cards";
import { SynergySummary } from "@/components/synergy-summary";
import { AppIcon } from "@/components/ui/icon";
import { cookies, cookieById, type Cookie } from "@/data/cookies";
import { pets, petById, type Pet } from "@/data/pets";
import { copyText } from "@/lib/copy-text";
import { shareNodeAsPng } from "@/lib/share-image";
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
};
type BuilderDropData = { entity: BuilderEntity; slot: number };

function TeamDropSlot({ entity, index, member, onRemove }: {
  entity: BuilderEntity;
  index: number;
  member?: Cookie | Pet;
  onRemove: (index: number) => void;
}) {
  const drop = useDroppable<BuilderDropData>({ id: `team-${entity}-slot-${index}`, accept: entity, data: { entity, slot: index } });
  const drag = useDraggable<BuilderDragData>({
    id: member ? `team-${entity}-member-${member.id}` : `team-${entity}-empty-${index}`,
    type: entity,
    disabled: !member,
    data: member ? { entity, id: member.id, source: "slot", slot: index, name: member.name, image: member.image } : undefined,
  });
  const setRef = useCallback((node: Element | null) => {
    drop.ref(node);
    drag.ref(node);
  }, [drag, drop]);

  if (!member) {
    return <div ref={drop.ref} className={`builder-slot${drop.isDropTarget ? " is-drop-target" : ""}`}><span>{index + 1}</span></div>;
  }

  const cookie = entity === "cookie" ? member as Cookie : undefined;
  return (
    <button
      ref={setRef}
      type="button"
      className={`builder-slot is-filled builder-slot--${entity}${drop.isDropTarget ? " is-drop-target" : ""}${drag.isDragging ? " is-dragging" : ""}`}
      onClick={() => onRemove(index)}
      aria-label={`Remove ${member.name}. Drag to reorder.`}
      title={`${member.name} - drag to reorder or click to remove`}
    >
      {cookie && <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />}
      <Image src={member.image} alt={member.name} width={150} height={150} sizes="(max-width: 720px) 25vw, 150px" />
      <span className="builder-slot__number">{index + 1}</span>
      <span className="builder-slot__remove"><AppIcon name="x" size={16} /></span>
    </button>
  );
}

function RosterDragButton({ entity, member, disabled, children, onClick }: {
  entity: BuilderEntity;
  member: { id: string; name: string; image: string };
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const drag = useDraggable<BuilderDragData>({
    id: `roster-${entity}-${member.id}`,
    type: entity,
    disabled,
    data: { entity, id: member.id, source: "roster", name: member.name, image: member.image },
  });

  return (
    <button ref={drag.ref} type="button" onClick={onClick} disabled={disabled} className={drag.isDragging ? "is-dragging" : ""} aria-label={`Add or drag ${member.name}`}>
      {children}
    </button>
  );
}

function TeamDragPreview({ data }: { data: BuilderDragData }) {
  const cookie = data.entity === "cookie" ? cookieById.get(data.id) : undefined;
  return (
    <div className={`builder-drag-preview builder-drag-preview--${data.entity}`}>
      {cookie && <CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact />}
      <Image src={data.image} alt="" width={130} height={130} />
      <strong>{data.name}</strong>
    </div>
  );
}

export function TeamBuilder() {
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
    return cookies.filter((cookie) => !selectedCookieIds.has(cookie.id) && (!needle || cookie.name.toLowerCase().includes(needle)));
  }, [cookieQuery, selectedCookieIds]);
  const availablePets = useMemo(() => {
    const needle = petQuery.trim().toLowerCase();
    return pets.filter((pet) => !selectedPetIds.has(pet.id) && (!needle || pet.name.toLowerCase().includes(needle)));
  }, [petQuery, selectedPetIds]);

  function sync(nextCookies: (string | null)[], nextPets: (string | null)[]) {
    setFormation({ cookies: nextCookies, pets: nextPets });
    const nextQuery = serializeTeamQuery(nextCookies, nextPets);
    const search = new URLSearchParams(params.toString());
    search.set("tool", "team");
    if (nextQuery.team) search.set("team", nextQuery.team); else search.delete("team");
    if (nextQuery.pets) search.set("pets", nextQuery.pets); else search.delete("pets");
    router.replace(`/tools/?${search.toString()}#team-builder`, { scroll: false });
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

  async function shareImage() {
    if (!exportRef.current || shareState === "working") return;
    setShareState("working");
    setShareMessage("Building your PNG...");
    try {
      const result = await shareNodeAsPng(exportRef.current, "cookierun-crumble-team.png");
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
      <section className="team-builder" id="team-builder" aria-labelledby="builder-title">
        <div className="team-builder__head">
          <div><span className="eyebrow">Build team</span><h2 id="builder-title">Drag a lineup into place.</h2><p>Fill 12 Cookie slots and 3 Pet slots. Drag to an exact position, or tap a roster card to use the next empty slot.</p></div>
          <div className="builder-share-actions">
            <button className="secondary-button" type="button" onClick={copyLink} aria-live="polite"><AppIcon name={copied ? "check" : "link"} size={18} />{copied ? "Link copied" : "Copy link"}</button>
            <button className="share-button" type="button" onClick={shareImage} disabled={shareState === "working"}><AppIcon name="image" size={18} />{shareState === "working" ? "Making PNG" : "Share image"}</button>
          </div>
        </div>
        <p className={`builder-share-status${shareState === "error" ? " is-error" : ""}`} aria-live="polite">{shareMessage}</p>

        <div className="builder-formation">
          <div>
            <div className="builder-section-label"><span>Cookies</span><b>{selectedCookieIds.size}/{cookieSlotCount}</b></div>
            <div className="builder-slots" aria-label="Selected cookies">
              {formation.cookies.map((id, index) => <TeamDropSlot key={`cookie-${index}`} entity="cookie" index={index} member={id ? cookieById.get(id) : undefined} onRemove={removeCookie} />)}
            </div>
          </div>
          <aside className="builder-pets">
            <div className="builder-section-label"><span>Pets</span><b>{selectedPetIds.size}/{petSlotCount}</b></div>
            <div className="pet-slots" aria-label="Selected pets">
              {formation.pets.map((id, index) => <TeamDropSlot key={`pet-${index}`} entity="pet" index={index} member={id ? petById.get(id) : undefined} onRemove={removePet} />)}
            </div>
          </aside>
        </div>

        <SynergySummary cookies={selectedCookies} />

        <div className="builder-pickers">
          <section className="builder-picker" aria-labelledby="cookie-picker-title">
            <div className="builder-picker__title"><h3 id="cookie-picker-title">Cookie roster</h3><span>{availableCookies.length} available</span></div>
            <label className="search-field"><AppIcon name="search" size={18} /><span className="sr-only">Find a cookie</span><input value={cookieQuery} onChange={(event) => setCookieQuery(event.target.value)} placeholder="Find a cookie" /></label>
            <div className="builder-options">
              {availableCookies.map((cookie) => (
                <RosterDragButton entity="cookie" member={cookie} key={cookie.id} onClick={() => addCookie(cookie.id)} disabled={selectedCookieIds.size >= cookieSlotCount}>
                  <span className="builder-option__portrait"><CookieTaxonomyBadges element={cookie.element} role={cookie.role} compact /><Image src={cookie.image} alt="" width={72} height={72} sizes="56px" /></span>
                  <span><strong>{cookie.name}</strong><small>{cookie.rarity} / {cookie.element} / {cookie.role}</small></span><AppIcon name="grip" size={17} />
                </RosterDragButton>
              ))}
            </div>
          </section>

          <section className="builder-picker builder-picker--pets" aria-labelledby="pet-picker-title">
            <div className="builder-picker__title"><h3 id="pet-picker-title">Pet roster</h3><span>{availablePets.length} available</span></div>
            <label className="search-field"><AppIcon name="search" size={18} /><span className="sr-only">Find a pet</span><input value={petQuery} onChange={(event) => setPetQuery(event.target.value)} placeholder="Find a pet" /></label>
            <div className="builder-options builder-options--pets">
              {availablePets.map((pet) => (
                <RosterDragButton entity="pet" member={pet} key={pet.id} onClick={() => addPet(pet.id)} disabled={selectedPetIds.size >= petSlotCount}>
                  <Image src={pet.image} alt="" width={72} height={72} sizes="56px" /><span><strong>{pet.name}</strong><small>{pet.rarity}</small></span><AppIcon name="grip" size={17} />
                </RosterDragButton>
              ))}
            </div>
          </section>
        </div>

        {(selectedCookieIds.size > 0 || selectedPetIds.size > 0) && <button type="button" className="text-button builder-clear" onClick={clearTeam}>Clear formation</button>}
        <TeamShareCard ref={exportRef} cookieIds={formation.cookies} petIds={formation.pets} />
      </section>
      <DragOverlay>{(source) => {
        const data = source?.data as BuilderDragData | undefined;
        return data ? <TeamDragPreview data={data} /> : null;
      }}</DragOverlay>
    </DragDropProvider>
  );
}
