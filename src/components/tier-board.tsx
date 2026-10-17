import { I18nElement } from "@/i18n/elements";
import { CookieMiniCard } from "@/components/cookie-mini-card";
import { cookieById } from "@/data/cookies";
import { tierList, tierRanks } from "@/data/tier-list";

export function TierBoard() {
  return (
    <I18nElement as="section" className="tier-shell" aria-label="Combined PvP and PvE Cookie tier list">
      <I18nElement as="div" className="tier-board">
        {tierRanks.map((rank) => (
          <I18nElement as="section" className={`tier-row tier-row--${rank.toLowerCase()}`} key={rank}>
            <I18nElement as="div" className="tier-rank"><I18nElement as="strong">{rank}</I18nElement><I18nElement as="span">Tier</I18nElement></I18nElement>
            <I18nElement as="div" className="tier-units">
              {tierList[rank].map((id) => {
                const cookie = cookieById.get(id);
                return cookie ? <CookieMiniCard key={id} cookie={cookie} /> : null;
              })}
            </I18nElement>
          </I18nElement>
        ))}
      </I18nElement>
    </I18nElement>
  );
}
