"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PetSlots } from "@/components/pet-slots";
import { SynergySummary } from "@/components/synergy-summary";
import { AppIcon } from "@/components/ui/icon";
import { cookies, cookieById, type Cookie } from "@/data/cookies";
import { pets, petById } from "@/data/pets";
import { copyText } from "@/lib/copy-text";
import { cookieSlotCount, parseTeamQuery, petSlotCount, serializeTeamQuery } from "@/lib/team-query";

const cookieIds = new Set(cookies.map(({ id }) => id));
const petIds = new Set(pets.map(({ id }) => id));

export function TeamBuilder() {
  const params = useSearchParams();
  const router = useRouter();
  const [formation, setFormation] = useState(() => parseTeamQuery(params.get("team"), params.get("pets"), cookieIds, petIds));
  const [cookieQuery, setCookieQuery] = useState("");
  const [petQuery, setPetQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedCookieIds = useMemo(() => new Set(formation.cookies.filter((id): id is string => Boolean(id))), [formation.cookies]);
  const selectedPetIds = useMemo(() => new Set(formation.pets.filter((id): id is string => Boolean(id))), [formation.pets]);
  const selectedCookies = useMemo(
    () => formation.cookies.flatMap((id) => id && cookieById.get(id) ? [cookieById.get(id) as Cookie] : []),
    [formation.cookies],
  );
  const selectedPets = useMemo(() => formation.pets.map((id) => id ? petById.get(id) : null), [formation.pets]);
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
    if (nextQuery.team) search.set("team", nextQuery.team); else search.delete("team");
    if (nextQuery.pets) search.set("pets", nextQuery.pets); else search.delete("pets");
    router.replace(`/teams/${search.size ? `?${search.toString()}` : ""}`, { scroll: false });
    setCopied(false);
  }

  function addCookie(id: string) {
    const slot = formation.cookies.indexOf(null);
    if (slot < 0 || selectedCookieIds.has(id)) return;
    const next = [...formation.cookies];
    next[slot] = id;
    sync(next, formation.pets);
  }

  function addPet(id: string) {
    const slot = formation.pets.indexOf(null);
    if (slot < 0 || selectedPetIds.has(id)) return;
    const next = [...formation.pets];
    next[slot] = id;
    sync(formation.cookies, next);
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

  function clearTeam() {
    sync(Array(cookieSlotCount).fill(null), Array(petSlotCount).fill(null));
  }

  async function copyLink() {
    if (!(await copyText(window.location.href))) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="team-builder" aria-labelledby="builder-title">
      <div className="team-builder__head">
        <div><span className="eyebrow">Build yours</span><h2 id="builder-title">12 Cookies. 3 Pets. One link.</h2><p>Pick from the full roster. Your exact slot order stays in the URL, empty spaces included.</p></div>
        <button className="share-button" type="button" onClick={copyLink} disabled={!selectedCookieIds.size && !selectedPetIds.size} aria-live="polite">
          <AppIcon name={copied ? "check" : "link"} size={18} />{copied ? "Link copied" : "Copy link"}
        </button>
      </div>

      <div className="builder-formation">
        <div>
          <div className="builder-section-label"><span>Cookies</span><b>{selectedCookieIds.size}/{cookieSlotCount}</b></div>
          <div className="builder-slots" aria-label="Selected cookies">
            {formation.cookies.map((id, index) => {
              const cookie = id ? cookieById.get(id) : undefined;
              return cookie ? (
                <button key={`${cookie.id}-${index}`} type="button" className="builder-slot is-filled" onClick={() => removeCookie(index)} aria-label={`Remove ${cookie.name}`} title={cookie.name}>
                  <Image src={cookie.image} alt={cookie.name} width={120} height={120} sizes="80px" />
                  <span><AppIcon name="x" size={14} /></span>
                </button>
              ) : <div className="builder-slot" key={index}><span>{index + 1}</span></div>;
            })}
          </div>
        </div>
        <aside className="builder-pets">
          <div className="builder-section-label"><span>Pets</span><b>{selectedPetIds.size}/{petSlotCount}</b></div>
          <PetSlots pets={selectedPets} onRemove={removePet} />
        </aside>
      </div>

      <SynergySummary cookies={selectedCookies} />

      <div className="builder-pickers">
        <section className="builder-picker" aria-labelledby="cookie-picker-title">
          <div className="builder-picker__title"><h3 id="cookie-picker-title">Cookie roster</h3><span>{availableCookies.length} available</span></div>
          <label className="search-field">
            <AppIcon name="search" size={18} />
            <span className="sr-only">Find a cookie</span>
            <input value={cookieQuery} onChange={(event) => setCookieQuery(event.target.value)} placeholder="Find a cookie" />
          </label>
          <div className="builder-options">
            {availableCookies.map((cookie) => (
              <button type="button" key={cookie.id} onClick={() => addCookie(cookie.id)} disabled={selectedCookieIds.size >= cookieSlotCount}>
                <Image src={cookie.image} alt="" width={72} height={72} sizes="56px" />
                <span><strong>{cookie.name}</strong><small>{cookie.rarity} / {cookie.element} / {cookie.role}</small></span>
                <AppIcon name="plus" size={17} />
              </button>
            ))}
          </div>
        </section>

        <section className="builder-picker builder-picker--pets" aria-labelledby="pet-picker-title">
          <div className="builder-picker__title"><h3 id="pet-picker-title">Pet roster</h3><span>{availablePets.length} available</span></div>
          <label className="search-field">
            <AppIcon name="search" size={18} />
            <span className="sr-only">Find a pet</span>
            <input value={petQuery} onChange={(event) => setPetQuery(event.target.value)} placeholder="Find a pet" />
          </label>
          <div className="builder-options builder-options--pets">
            {availablePets.map((pet) => (
              <button type="button" key={pet.id} onClick={() => addPet(pet.id)} disabled={selectedPetIds.size >= petSlotCount}>
                <Image src={pet.image} alt="" width={72} height={72} sizes="56px" />
                <span><strong>{pet.name}</strong><small>{pet.rarity}</small></span>
                <AppIcon name="plus" size={17} />
              </button>
            ))}
          </div>
        </section>
      </div>

      {(selectedCookieIds.size > 0 || selectedPetIds.size > 0) && <button type="button" className="text-button builder-clear" onClick={clearTeam}>Clear formation</button>}
    </section>
  );
}
