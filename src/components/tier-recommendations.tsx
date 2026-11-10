import Image from "next/image";
import { cookieById } from "@/data/cookies";
import { tierList } from "@/data/tier-list";
import { recommendationRanks, recommendationText, tierRecommendations } from "@/data/tier-recommendations";
import { localizedPath, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/dictionaries";
import { cookieDetailPathById } from "@/lib/cookie-detail-paths";

const title = ["Why these Cookies rank high", "角色推薦理由", "上位クッキーのおすすめ理由", "상위 쿠키 추천 이유", "เหตุผลที่แนะนำคุกกี้อันดับสูง"] as const;
const intro = [
  "Start with the fight you want to win. Here’s where each S- and A-tier Cookie shines, and what to check before you upgrade.",
  "先看你想打贏哪一關。下面整理 S、A 檔每位角色的拿手場景，以及升級前可以先確認的事。",
  "まずは勝ちたいステージから。S・Aランクの各クッキーが活躍する場面と、育成前に確認したい点をまとめました。",
  "먼저 이기고 싶은 전투부터 고르세요. S·A 등급 쿠키가 활약하는 곳과 육성 전에 확인할 점을 정리했습니다.",
  "เริ่มจากด่านที่อยากชนะ มาดูว่าคุกกี้ระดับ S และ A แต่ละตัวเด่นที่ไหน และควรเช็กอะไรก่อนอัป",
] as const;
const rankTitles = {
  S: ["S tier", "S 檔", "Sランク", "S 등급", "ระดับ S"],
  A: ["A tier", "A 檔", "Aランク", "A 등급", "ระดับ A"],
} as const;
const guideLabel = ["Read the guide", "看攻略", "攻略を見る", "공략 보기", "อ่านคู่มือ"] as const;
const teamLabel = ["See team setups", "看配隊", "編成を見る", "조합 보기", "ดูทีมแนะนำ"] as const;

export function TierRecommendationSection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <section className="tier-recommendations" aria-labelledby="tier-recommendations-title">
      <header className="tier-recommendations__intro">
        <h2 id="tier-recommendations-title">{recommendationText(title, locale)}</h2>
        <p>{recommendationText(intro, locale)}</p>
        <div className="tier-recommendations__jump">
          {recommendationRanks.map((rank) => (
            <a key={rank} href={`#tier-reasons-${rank.toLowerCase()}`}>{recommendationText(rankTitles[rank], locale)}</a>
          ))}
        </div>
      </header>
      {recommendationRanks.map((rank) => {
        const headingId = `tier-reasons-${rank.toLowerCase()}`;
        return (
          <section className={`tier-recommendations__group tier-recommendations__group--${rank.toLowerCase()}`} key={rank} aria-labelledby={headingId}>
            <h3 id={headingId}>{recommendationText(rankTitles[rank], locale)}</h3>
            <ol role="list">
              {tierList[rank].map((id) => {
                const cookie = cookieById.get(id);
                const profile = cookieDetailPathById.get(id);
                const recommendation = tierRecommendations[id];
                if (!cookie || !profile || !recommendation) return null;
                const name = messages[cookie.name] ?? cookie.name;
                const sourceLabel = recommendationText(recommendation.source.startsWith("/guides/") ? guideLabel : teamLabel, locale);
                return (
                  <li className="tier-recommendations__entry" key={id} data-cookie-id={id}>
                    <Image src={cookie.image} alt="" width={50} height={50} />
                    <div>
                      <h4><a href={localizedPath(profile, locale)}>{name}</a></h4>
                      <p>{recommendationText(recommendation.reason, locale)}</p>
                      <a className="tier-recommendations__source" href={localizedPath(recommendation.source, locale)} aria-label={`${sourceLabel}: ${name}`}>{sourceLabel}</a>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </section>
  );
}
