"use client";

import { I18nElement } from "@/i18n/elements";
import { forwardRef } from "react";
import {
  cookieById,
  elementDefinitions,
  roleDefinitions,
  synergyBadgeImages,
  synergyDefinitions,
  type Cookie,
  type Element,
  type Role,
  type Synergy,
} from "@/data/cookies";
import { petById } from "@/data/pets";
import { tierRanks } from "@/data/tier-list";
import { calculateTeamSynergies } from "@/lib/team-synergy";
import type { TierBuilderState } from "@/lib/tier-builder-state";

function ExportBadges({ element, role }: { element: Element; role: Role }) {
  return (
    <I18nElement as="span" className="export-taxonomy" aria-hidden="true">
      <I18nElement as="span"><I18nElement as="img" src={elementDefinitions[element].image} alt="" /></I18nElement>
      <I18nElement as="span"><I18nElement as="img" src={roleDefinitions[role].image} alt="" /></I18nElement>
    </I18nElement>
  );
}

function ExportSynergyBadge({ value, active = false }: { value: Synergy; active?: boolean }) {
  return (
    <I18nElement as="span" className={`export-synergy-badge${active ? " is-active" : ""}`} title={synergyDefinitions[value].label}>
      <I18nElement as="img" src={synergyDefinitions[value].image} alt="" />
      <I18nElement as="img" src={synergyBadgeImages.grantedArrow} alt="" />
    </I18nElement>
  );
}

export const TeamShareCard = forwardRef<HTMLDivElement, { cookieIds: (string | null)[]; petIds: (string | null)[] }>(
  function TeamShareCard({ cookieIds, petIds }, ref) {
    const selectedCookies = cookieIds.flatMap((id) => id && cookieById.get(id) ? [cookieById.get(id) as Cookie] : []);
    const summary = calculateTeamSynergies(selectedCookies);

    return (
      <I18nElement as="div" className="export-stage" aria-hidden="true" inert>
        <I18nElement as="div" className="team-share-card" ref={ref}>
          <I18nElement as="header" className="share-card__header">
            <I18nElement as="div"><I18nElement as="span">My formation</I18nElement><I18nElement as="strong">CookieRun: Crumble Team</I18nElement></I18nElement>
            <I18nElement as="b">{selectedCookies.length}/12 Cookies</I18nElement>
          </I18nElement>

          <I18nElement as="div" className="team-share-card__cookies">
            {cookieIds.map((id, index) => {
              const cookie = id ? cookieById.get(id) : undefined;
              return (
                <I18nElement as="div" className={`team-share-slot${cookie ? ` is-filled rarity-${cookie.rarity.toLowerCase()}` : ""}`} key={index}>
                  {cookie ? <>
                    <ExportBadges element={cookie.element} role={cookie.role} />
                    <I18nElement as="span" className="export-rarity">{cookie.rarity}</I18nElement>
                    <I18nElement as="img" className="team-share-slot__portrait" src={cookie.image} alt="" />
                    <I18nElement as="span" className="team-share-slot__number">{index + 1}</I18nElement>
                    <I18nElement as="small">{cookie.name}</I18nElement>
                  </> : <I18nElement as="span" className="team-share-slot__empty">{index + 1}</I18nElement>}
                </I18nElement>
              );
            })}
          </I18nElement>

          <I18nElement as="div" className="team-share-card__support">
            <I18nElement as="section">
              <I18nElement as="div" className="share-card__section-label"><I18nElement as="span">Pets</I18nElement><I18nElement as="b">{petIds.filter(Boolean).length}/3</I18nElement></I18nElement>
              <I18nElement as="div" className="team-share-pets">
                {petIds.map((id, index) => {
                  const pet = id ? petById.get(id) : undefined;
                  return <I18nElement as="div" className={`team-share-pet${pet ? " is-filled" : ""}`} key={index}>
                    {pet ? <><I18nElement as="img" src={pet.image} alt="" /><I18nElement as="small">{pet.name}</I18nElement></> : <I18nElement as="span">{index + 1}</I18nElement>}
                  </I18nElement>;
                })}
              </I18nElement>
            </I18nElement>

            <I18nElement as="section" className="team-share-synergies">
              <I18nElement as="div" className="team-share-synergy is-granted">
                <I18nElement as="span">Granted</I18nElement>
                <I18nElement as="div">{summary.granted.length ? summary.granted.map((value) => <ExportSynergyBadge key={value} value={value} />) : <I18nElement as="small">None yet</I18nElement>}</I18nElement>
              </I18nElement>
              <I18nElement as="div" className="team-share-synergy is-active">
                <I18nElement as="span">Active</I18nElement>
                <I18nElement as="div">{summary.active.length ? summary.active.map((value) => <ExportSynergyBadge key={value} value={value} active />) : <I18nElement as="small">Needs a matching receiver</I18nElement>}</I18nElement>
                <I18nElement as="b">{summary.activeApplications} matches</I18nElement>
              </I18nElement>
            </I18nElement>
          </I18nElement>

          <I18nElement as="footer" className="share-card__watermark" data-export-watermark="true">www.cookieruncrumbles.com</I18nElement>
        </I18nElement>
      </I18nElement>
    );
  },
);

export const TierShareCard = forwardRef<HTMLDivElement, { state: TierBuilderState }>(function TierShareCard({ state }, ref) {
  const rankedCount = tierRanks.reduce((count, rank) => count + state[rank].length, 0);

  return (
    <I18nElement as="div" className="export-stage" aria-hidden="true" inert>
      <I18nElement as="div" className="tier-share-card" ref={ref}>
        <I18nElement as="header" className="share-card__header">
          <I18nElement as="div"><I18nElement as="span">My ranking</I18nElement><I18nElement as="strong">CookieRun: Crumble Tier List</I18nElement></I18nElement>
          <I18nElement as="b">{rankedCount} Cookies ranked</I18nElement>
        </I18nElement>
        <I18nElement as="div" className="tier-share-card__board">
          {tierRanks.map((rank) => (
            <I18nElement as="section" className={`tier-share-row tier-share-row--${rank.toLowerCase()}`} key={rank}>
              <I18nElement as="div" className="tier-share-rank"><I18nElement as="strong">{rank}</I18nElement><I18nElement as="span">Tier</I18nElement></I18nElement>
              <I18nElement as="div" className="tier-share-units">
                {state[rank].map((id) => {
                  const cookie = cookieById.get(id);
                  return cookie ? <I18nElement as="div" className={`tier-share-cookie rarity-${cookie.rarity.toLowerCase()}`} key={id}>
                    <ExportBadges element={cookie.element} role={cookie.role} />
                    <I18nElement as="span" className="export-rarity">{cookie.rarity}</I18nElement>
                    <I18nElement as="img" src={cookie.image} alt="" />
                    <I18nElement as="small">{cookie.name}</I18nElement>
                  </I18nElement> : null;
                })}
                {!state[rank].length && <I18nElement as="span" className="tier-share-empty">No Cookies placed</I18nElement>}
              </I18nElement>
            </I18nElement>
          ))}
        </I18nElement>
        <I18nElement as="footer" className="share-card__watermark" data-export-watermark="true">www.cookieruncrumbles.com</I18nElement>
      </I18nElement>
    </I18nElement>
  );
});
