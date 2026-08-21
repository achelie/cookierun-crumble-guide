import { CookieMiniCard } from "@/components/cookie-mini-card";
import { cookieById } from "@/data/cookies";
import { tierList, tierRanks } from "@/data/tier-list";

export function TierBoard() {
  return (
    <section className="tier-shell" aria-label="Combined PvP and PvE Cookie tier list">
      <div className="tier-board">
        {tierRanks.map((rank) => (
          <section className={`tier-row tier-row--${rank.toLowerCase()}`} key={rank}>
            <div className="tier-rank"><strong>{rank}</strong><span>Tier</span></div>
            <div className="tier-units">
              {tierList[rank].map((id) => {
                const cookie = cookieById.get(id);
                return cookie ? <CookieMiniCard key={id} cookie={cookie} /> : null;
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
