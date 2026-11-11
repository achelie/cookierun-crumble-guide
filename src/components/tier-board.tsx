import { Fragment, type ReactNode } from "react";
import { I18nElement } from "@/i18n/elements";
import { AdSlot } from "@/components/ads/ad-slot";
import { CookieMiniCard } from "@/components/cookie-mini-card";
import { cookieById } from "@/data/cookies";
import { tierList, tierRanks } from "@/data/tier-list";
import { cookieDetailRoutes } from "@/lib/cookie-detail-paths";

const unrankedCookies = cookieDetailRoutes.flatMap(({ id, rank }) => {
  const cookie = cookieById.get(id);
  return !rank && cookie ? [cookie] : [];
});

export function TierBoard({ children }: { children?: ReactNode }) {
  return (
    <I18nElement as="section" className="tier-shell" aria-label="Combined PvP and PvE Cookie tier list">
      <I18nElement as="div" className="tier-board">
        {tierRanks.map((rank) => (
          <Fragment key={rank}>
            <I18nElement as="section" className={`tier-row tier-row--${rank.toLowerCase()}`}>
              <I18nElement as="div" className="tier-rank"><I18nElement as="strong">{rank}</I18nElement><I18nElement as="span">Tier</I18nElement></I18nElement>
              <I18nElement as="div" className="tier-units">
                {tierList[rank].map((id) => {
                  const cookie = cookieById.get(id);
                  return cookie ? <CookieMiniCard key={id} cookie={cookie} /> : null;
                })}
              </I18nElement>
            </I18nElement>
            {rank === "S" ? <AdSlot placement="tier-between-s-and-a" eligible={tierList.S.length > 0 && tierList.A.length > 0} /> : null}
          </Fragment>
        ))}
      </I18nElement>
      {children}
      {unrankedCookies.length > 0 ? (
        <section id="unranked-cookies" className="tier-unranked" aria-labelledby="unranked-cookies-title">
          <I18nElement as="h2" id="unranked-cookies-title" className="tier-unranked__title">Unranked Cookies</I18nElement>
          <div className="tier-units">
            {unrankedCookies.map((cookie) => <CookieMiniCard key={cookie.id} cookie={cookie} />)}
          </div>
        </section>
      ) : null}
    </I18nElement>
  );
}
