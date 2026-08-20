"use client";

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
    <span className="export-taxonomy" aria-hidden="true">
      <span><img src={elementDefinitions[element].image} alt="" /></span>
      <span><img src={roleDefinitions[role].image} alt="" /></span>
    </span>
  );
}

function ExportSynergyBadge({ value, active = false }: { value: Synergy; active?: boolean }) {
  return (
    <span className={`export-synergy-badge${active ? " is-active" : ""}`} title={synergyDefinitions[value].label}>
      <img src={synergyDefinitions[value].image} alt="" />
      <img src={synergyBadgeImages.grantedArrow} alt="" />
    </span>
  );
}

export const TeamShareCard = forwardRef<HTMLDivElement, { cookieIds: (string | null)[]; petIds: (string | null)[] }>(
  function TeamShareCard({ cookieIds, petIds }, ref) {
    const selectedCookies = cookieIds.flatMap((id) => id && cookieById.get(id) ? [cookieById.get(id) as Cookie] : []);
    const summary = calculateTeamSynergies(selectedCookies);

    return (
      <div className="export-stage" aria-hidden="true" inert>
        <div className="team-share-card" ref={ref}>
          <header className="share-card__header">
            <div><span>My formation</span><strong>CookieRun: Crumble Team</strong></div>
            <b>{selectedCookies.length}/12 Cookies</b>
          </header>

          <div className="team-share-card__cookies">
            {cookieIds.map((id, index) => {
              const cookie = id ? cookieById.get(id) : undefined;
              return (
                <div className={`team-share-slot${cookie ? ` is-filled rarity-${cookie.rarity.toLowerCase()}` : ""}`} key={index}>
                  {cookie ? <>
                    <ExportBadges element={cookie.element} role={cookie.role} />
                    <span className="export-rarity">{cookie.rarity}</span>
                    <img className="team-share-slot__portrait" src={cookie.image} alt="" />
                    <span className="team-share-slot__number">{index + 1}</span>
                    <small>{cookie.name}</small>
                  </> : <span className="team-share-slot__empty">{index + 1}</span>}
                </div>
              );
            })}
          </div>

          <div className="team-share-card__support">
            <section>
              <div className="share-card__section-label"><span>Pets</span><b>{petIds.filter(Boolean).length}/3</b></div>
              <div className="team-share-pets">
                {petIds.map((id, index) => {
                  const pet = id ? petById.get(id) : undefined;
                  return <div className={`team-share-pet${pet ? " is-filled" : ""}`} key={index}>
                    {pet ? <><img src={pet.image} alt="" /><small>{pet.name}</small></> : <span>{index + 1}</span>}
                  </div>;
                })}
              </div>
            </section>

            <section className="team-share-synergies">
              <div className="team-share-synergy is-granted">
                <span>Granted</span>
                <div>{summary.granted.length ? summary.granted.map((value) => <ExportSynergyBadge key={value} value={value} />) : <small>None yet</small>}</div>
              </div>
              <div className="team-share-synergy is-active">
                <span>Active</span>
                <div>{summary.active.length ? summary.active.map((value) => <ExportSynergyBadge key={value} value={value} active />) : <small>Needs a matching receiver</small>}</div>
                <b>{summary.activeApplications} matches</b>
              </div>
            </section>
          </div>

          <footer className="share-card__watermark" data-export-watermark="true">www.cookieruncrumbles.com</footer>
        </div>
      </div>
    );
  },
);

export const TierShareCard = forwardRef<HTMLDivElement, { state: TierBuilderState }>(function TierShareCard({ state }, ref) {
  const rankedCount = tierRanks.reduce((count, rank) => count + state[rank].length, 0);

  return (
    <div className="export-stage" aria-hidden="true" inert>
      <div className="tier-share-card" ref={ref}>
        <header className="share-card__header">
          <div><span>My ranking</span><strong>CookieRun: Crumble Tier List</strong></div>
          <b>{rankedCount} Cookies ranked</b>
        </header>
        <div className="tier-share-card__board">
          {tierRanks.map((rank) => (
            <section className={`tier-share-row tier-share-row--${rank.toLowerCase()}`} key={rank}>
              <div className="tier-share-rank"><strong>{rank}</strong><span>Tier</span></div>
              <div className="tier-share-units">
                {state[rank].map((id) => {
                  const cookie = cookieById.get(id);
                  return cookie ? <div className={`tier-share-cookie rarity-${cookie.rarity.toLowerCase()}`} key={id}>
                    <ExportBadges element={cookie.element} role={cookie.role} />
                    <span className="export-rarity">{cookie.rarity}</span>
                    <img src={cookie.image} alt="" />
                    <small>{cookie.name}</small>
                  </div> : null;
                })}
                {!state[rank].length && <span className="tier-share-empty">No Cookies placed</span>}
              </div>
            </section>
          ))}
        </div>
        <footer className="share-card__watermark" data-export-watermark="true">www.cookieruncrumbles.com</footer>
      </div>
    </div>
  );
});
