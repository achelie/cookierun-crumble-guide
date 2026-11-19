import { DirectAnswer } from "@/components/direct-answer";
import { LastUpdated } from "@/components/last-updated";
import { cookieAnswer } from "@/lib/direct-answers";
import { getTranslator } from "@/i18n/dictionaries";
import Image from "next/image";
import { AdSlot } from "@/components/ads/ad-slot";
import { SkillMetrics } from "@/components/cookie-skill-metrics";
import { CookieStarUpgrades } from "@/components/cookie-star-upgrades";
import { AppIcon } from "@/components/ui/icon";
import { SynergyBadge } from "@/components/synergy-badge";
import { buffDefinitions, elementDefinitions, roleDefinitions, synergyDefinitions, type Synergy } from "@/data/cookies";
import { I18nElement, LocaleLink } from "@/i18n/elements";
import { cookieDetailGameVersion, cookieDetailsUpdatedAt, cookiePageUpdatedAt, maxCookieStars, type CookieDetailEntry } from "@/lib/cookie-details";
import styles from "./cookie-detail.module.css";

const statLabels: Record<string, string> = {
  baseAttackPoint: "ATK",
  baseDefensePoint: "DEF",
  baseHealthPoint: "HP",
  baseAccuracy: "Accuracy",
  baseAvoidance: "Evasion",
  baseFocus: "Focus",
  baseResist: "Resistance",
  baseCriticalRate: "CRIT Chance",
  baseCriticalDamageRate: "CRIT DMG",
  speed: "Movement Speed",
};

const sugarRuneIcon = "/images/tools/icon_contentsunlock_sugarrune__83c8269639db.png";

function SynergyGroup({ values, direction }: { values: Synergy[]; direction: "granted" | "received" }) {
  if (values.length === 0) return <I18nElement as="span" className={styles.empty}>None</I18nElement>;

  return (
    <ul className={styles.synergies}>
      {values.map((value) => (
        <li key={value}>
          <span aria-hidden="true"><SynergyBadge value={value} direction={direction} /></span>
          <I18nElement as="span">{synergyDefinitions[value].label}</I18nElement>
        </li>
      ))}
    </ul>
  );
}

function CollectionRewards({ rewards, locale }: {
  rewards: CookieDetailEntry["profile"]["codexRewards"];
  locale: CookieDetailEntry["locale"];
}) {
  if (rewards.length === 0) {
    return (
      <section id="collection-rewards" className={styles.rewards} aria-labelledby="collection-rewards-title">
        <I18nElement as="h2" id="collection-rewards-title">Collection Rewards</I18nElement>
        <I18nElement as="p" className={styles.rewardNote}>This Cookie has no Collection entry in this game version.</I18nElement>
      </section>
    );
  }

  const format = new Intl.NumberFormat(locale);
  const rows: (typeof rewards[number] & { lastStar: number })[] = [];
  const totals = new Map<string, typeof rewards[number]>();
  for (const reward of rewards) {
    const previous = rows.at(-1);
    if (previous && previous.stars > 0 && previous.lastStar + 1 === reward.stars
      && previous.amount === reward.amount && previous.name === reward.name && previous.image === reward.image) {
      previous.lastStar = reward.stars;
    } else {
      rows.push({ ...reward, lastStar: reward.stars });
    }

    const item = `${reward.image}:${reward.name}`;
    const total = totals.get(item);
    totals.set(item, { ...reward, amount: (total?.amount ?? 0) + reward.amount });
  }
  const multipleItems = totals.size > 1;
  const lastStar = Math.max(...rewards.map(({ stars }) => stars));

  return (
    <section id="collection-rewards" className={styles.rewards} aria-labelledby="collection-rewards-title">
      <div className={styles.rewardHeader}>
        {multipleItems
          ? <AppIcon name="ticket" size={32} />
          : <Image src={rewards[0].image} alt="" width={44} height={44} />}
        <div>
          <I18nElement as="h2" id="collection-rewards-title">Collection Rewards</I18nElement>
          <I18nElement as="p" className={styles.rewardNote}>Claim each milestone once.</I18nElement>
        </div>
      </div>

      <dl className={styles.rewardRows}>
        {rows.map(({ stars, lastStar, amount, name, image }) => (
          <div key={`${stars}:${image}:${name}`}>
            {stars === 0 ? <I18nElement as="dt">First unlock</I18nElement>
              : lastStar === stars ? <dt>{format.format(stars)}★</dt>
              : <I18nElement as="dt">{`Each promotion (${format.format(stars)}–${format.format(lastStar)}★)`}</I18nElement>}
            <dd>
              {multipleItems ? <Image src={image} alt="" width={22} height={22} /> : null}
              <strong>{format.format(amount)}</strong> <span>{name}</span>
            </dd>
          </div>
        ))}
        <div className={styles.rewardTotal}>
          <I18nElement as="dt">{`Total through ${format.format(lastStar)}★`}</I18nElement>
          {[...totals].map(([key, { amount, name, image }]) => (
            <dd key={key}>
              {multipleItems ? <Image src={image} alt="" width={22} height={22} /> : null}
              <strong>{format.format(amount)}</strong> <span>{name}</span>
            </dd>
          ))}
        </div>
      </dl>
    </section>
  );
}

function SugarRuneRecommendations({ recommendations }: {
  recommendations: CookieDetailEntry["profile"]["runeRecommendations"];
}) {
  return (
    <section id="sugar-runes" aria-labelledby="sugar-runes-title">
      <div className={styles.runeHeading}>
        <Image src={sugarRuneIcon} alt="" width={36} height={36} />
        <I18nElement as="h2" id="sugar-runes-title">Recommended Sugar Runes</I18nElement>
      </div>
      <I18nElement as="p" className={styles.progressionNote}>Three effects to target when crafting Sugar Runes.</I18nElement>
      <ol className={styles.runeList} role="list">
        {recommendations.map(({ id, name, reason, image }, index) => (
          <li key={id} className={styles.runeRecommendation}>
            <div className={styles.runeIcon} aria-hidden="true">
              {image ? <Image src={image} alt="" width={36} height={36} /> : <AppIcon name="sparkles" size={24} />}
              <span>{index + 1}</span>
            </div>
            <div>
              <I18nElement as="h3">{name}</I18nElement>
              <I18nElement as="p">{reason}</I18nElement>
            </div>
          </li>
        ))}
      </ol>
      <LocaleLink className={styles.relatedLink} href="/tools/sugar-runes/" prefetch={false}>
        <AppIcon name="tools" size={18} />
        <I18nElement as="span">Open Sugar Rune Planner</I18nElement>
        <AppIcon name="chevron" size={15} />
      </LocaleLink>
    </section>
  );
}

export function CookieDetail({ entry }: { entry: CookieDetailEntry }) {
  const { cookie, locale, profile, rank } = entry;
  const element = elementDefinitions[cookie.element];
  const role = roleDefinitions[cookie.role];
  const t = getTranslator(locale);
  const answer = cookieAnswer(profile.name, cookie.rarity, t(element.label), t(role.label), maxCookieStars(profile))[locale];
  const numberFormat = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const percentFormat = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 3 });
  const baseStats = profile.stats.filter(({ key, unit }) => Object.hasOwn(statLabels, key) && (unit === "" || unit === "%"));
  const hasProfileAd = profile.runeRecommendations.length > 0 && profile.promotions.length > 0
    && baseStats.length > 0 && profile.skills.some((skill) => skill.description && skill.metrics.length > 0);
  return (
    <article className={`page-shell ${styles.page}`} data-screen-label="Cookie profile" data-element={cookie.element}>
      <I18nElement as="nav" className={styles.crumbs} aria-label="Breadcrumb">
        <LocaleLink href="/">Home</LocaleLink>
        <AppIcon name="chevron" size={13} />
        <LocaleLink href="/cookies/">Cookies</LocaleLink>
        <AppIcon name="chevron" size={13} />
        <span aria-current="page">{profile.name}</span>
      </I18nElement>

      <header className={styles.hero}>
        <div className={styles.intro}>
          <div className={styles.identity}>
            <Image className={styles.head} src={profile.head} alt="" width={60} height={60} />
            <div>
              <I18nElement as="p" className={styles.kicker}>Cookie profile</I18nElement>
              <h1>{profile.name}</h1>
            </div>
          </div>
          <DirectAnswer date={cookieDetailsUpdatedAt} locale={locale} cutoff>{answer}</DirectAnswer>
          <LastUpdated date={cookiePageUpdatedAt} />
          <ul className={styles.taxonomy}>
            <li><I18nElement as="span">{cookie.rarity}</I18nElement></li>
            <li><Image src={element.image} alt="" width={24} height={24} /><I18nElement as="span">{element.label}</I18nElement></li>
            <li><Image src={role.image} alt="" width={24} height={24} /><I18nElement as="span">{role.label}</I18nElement></li>
          </ul>
          {profile.description ? <p className={styles.story}>{profile.description}</p> : null}
        </div>
        <div className={styles.stage}>
          <LocaleLink href={rank ? "/tier-list/" : "/tier-list/#unranked-cookies"} className={styles.rank} data-rank={rank}>
            {rank ? <strong>{rank}</strong> : null}
            <I18nElement as="span">{rank ? "Tier List" : "Unranked"}</I18nElement>
            <AppIcon name="chevron" size={14} />
          </LocaleLink>
          <Image
            className={styles.portrait}
            src={profile.portrait}
            alt={profile.name}
            width={720}
            height={720}
            sizes="(max-width: 700px) 85vw, 480px"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </header>

      <I18nElement as="nav" className={styles.sectionNav} aria-label="On this page">
        {profile.skills.length > 0 ? <I18nElement as="a" href="#skills"><AppIcon name="sparkles" size={16} /><I18nElement as="span">Skills</I18nElement></I18nElement> : null}
        <I18nElement as="a" href="#sugar-runes"><AppIcon name="tools" size={16} /><I18nElement as="span">Recommended Sugar Runes</I18nElement></I18nElement>
        {profile.promotions.length > 0 ? <I18nElement as="a" href="#star-upgrades"><AppIcon name="trophy" size={16} /><I18nElement as="span">Star upgrades</I18nElement></I18nElement> : null}
        <I18nElement as="a" href="#base-stats"><AppIcon name="scale" size={16} /><I18nElement as="span">Base stats</I18nElement></I18nElement>
        <I18nElement as="a" href="#combat-profile"><AppIcon name="users" size={16} /><I18nElement as="span">Combat profile</I18nElement></I18nElement>
        <I18nElement as="a" href="#collection-rewards"><AppIcon name="ticket" size={16} /><I18nElement as="span">Collection Rewards</I18nElement></I18nElement>
      </I18nElement>

      <div className={styles.reference}>
        <div className={styles.skillReference}>
          {profile.skills.length > 0 ? (
            <section id="skills" aria-labelledby="skills-title">
              <I18nElement as="h2" id="skills-title">Skills</I18nElement>
              <I18nElement as="p" className={styles.progressionNote}>Skill values come from the game configuration before gear and synergy.</I18nElement>
              <ul className={styles.skillList}>
                {profile.skills.map((skill) => (
                  <li key={skill.id} className={styles.skill}>
                    <div className={styles.skillHeader}>
                      <div className={styles.skillIcon} aria-hidden="true">
                        {skill.icon ? <Image src={skill.icon} alt="" width={60} height={60} /> : <AppIcon name="sparkles" size={23} />}
                      </div>
                      <div>
                        <h3>{skill.name}</h3>
                        {skill.description ? <p className={styles.skillDescription}>{skill.description}</p> : null}
                      </div>
                    </div>
                    {skill.metrics.length > 0 ? (
                      <div className={styles.baseMetrics}>
                        <I18nElement as="p" className={styles.metricTitle}>Base skill values</I18nElement>
                        <SkillMetrics metrics={skill.metrics} star={0} />
                      </div>
                    ) : (
                      <I18nElement as="p" className={styles.progressionNote}>No skill values available for this Cookie.</I18nElement>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <SugarRuneRecommendations recommendations={profile.runeRecommendations} />
          {hasProfileAd ? <AdSlot placement="cookie-after-profile" /> : null}
          <CookieStarUpgrades
            promotions={profile.promotions}
            skills={profile.skills.map(({ id, name, metrics }) => ({ id, name, metrics }))}
            locale={locale}
            statLabels={statLabels}
          />
        </div>

        <div className={styles.sidebar}>
          <div className={styles.combat}>
            <section id="base-stats" aria-labelledby="base-stats-title">
              <I18nElement as="h2" id="base-stats-title">Base stats</I18nElement>
              <dl className={styles.stats}>
                {baseStats.map(({ key, value, unit }) => (
                  <div key={key}>
                    <I18nElement as="dt">{statLabels[key]}</I18nElement>
                    <dd>{unit === "%" ? percentFormat.format(value / 100) : numberFormat.format(value)}</dd>
                  </div>
                ))}
              </dl>
              <I18nElement as="p" className={styles.source}>{`Game data ${cookieDetailGameVersion}`}</I18nElement>
            </section>

            <section id="combat-profile" aria-labelledby="combat-title">
              <I18nElement as="h2" id="combat-title">Combat profile</I18nElement>
              <dl className={styles.combatList}>
                <div>
                  <I18nElement as="dt">Granted</I18nElement>
                  <dd><SynergyGroup values={cookie.grantedSynergies} direction="granted" /></dd>
                </div>
                <div>
                  <I18nElement as="dt">Received</I18nElement>
                  <dd><SynergyGroup values={cookie.receivedSynergies} direction="received" /></dd>
                </div>
                <div>
                  <I18nElement as="dt">Buff</I18nElement>
                  <dd className={styles.buffs}>
                    {cookie.buffs.length > 0 ? cookie.buffs.map((buff) => (
                      <I18nElement as="span" key={buff}>{buffDefinitions[buff].label}</I18nElement>
                    )) : <I18nElement as="span" className={styles.empty}>None</I18nElement>}
                  </dd>
                </div>
              </dl>
              <LocaleLink className={styles.relatedLink} href="/teams/">
                <AppIcon name="users" size={18} />
                <I18nElement as="span">Teams</I18nElement>
                <AppIcon name="chevron" size={15} />
              </LocaleLink>
            </section>
          </div>
          <CollectionRewards rewards={profile.codexRewards} locale={locale} />
        </div>
      </div>
    </article>
  );
}
