"use client";

import { useId, useState } from "react";
import { SkillMetrics, ValueComparison } from "@/components/cookie-skill-metrics";
import { I18nElement } from "@/i18n/elements";
import type { CookieDetailEntry, CookiePromotion } from "@/lib/cookie-details";
import styles from "./cookie-detail.module.css";

type ProgressionProps = {
  promotions: CookiePromotion[];
  skills: Pick<CookieDetailEntry["profile"]["skills"][number], "id" | "name" | "metrics">[];
  locale: CookieDetailEntry["locale"];
  statLabels: Record<string, string>;
};

export function CookieStarUpgrades({ promotions, skills, locale, statLabels }: ProgressionProps) {
  const groupName = useId();
  const [selectedStar, setSelectedStar] = useState(promotions[1]?.stars ?? 0);
  const promotion = promotions.find(({ stars }) => stars === selectedStar);
  if (!promotion) return null;

  const previousStar = selectedStar > 0 ? selectedStar - 1 : undefined;
  const previousPromotion = promotions.find(({ stars }) => stars === previousStar);
  const previousStats = new Map(previousPromotion?.stats.map((stat) => [stat.key, stat]));
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const signedNumber = new Intl.NumberFormat(locale, { maximumFractionDigits: 3, signDisplay: "exceptZero" });
  const signedPercent = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 3, signDisplay: "exceptZero" });
  const metricAvailable = skills.some(({ metrics }) => metrics.some(({ values }) => values[selectedStar] != null || (previousStar !== undefined && values[previousStar] != null)));
  const skillsWithChanges = previousStar === undefined
    ? skills.filter(({ metrics }) => metrics.some(({ values }) => values[selectedStar] != null))
    : skills.filter(({ metrics }) => metrics.some(({ values }) => values[selectedStar] !== values[previousStar]));

  function formatBonus({ value, unit }: CookiePromotion["stats"][number]) {
    if (unit === "%") return signedPercent.format(value / 100);
    if (unit === "pp") return <>{signedNumber.format(value)} <I18nElement as="span">pp</I18nElement></>;
    return signedNumber.format(value);
  }

  return (
    <section id="star-upgrades" className={styles.starUpgrades} aria-labelledby="star-upgrades-title">
      <I18nElement as="h2" id="star-upgrades-title">Star upgrades</I18nElement>
      <div className={styles.progression}>
        <fieldset className={styles.starPicker}>
          <I18nElement as="legend">Select a star</I18nElement>
          <div className={styles.starOptions}>
            {promotions.map(({ stars }) => (
              <label key={stars} className={styles.starOption}>
                <input type="radio" name={groupName} value={stars} checked={stars === selectedStar} onChange={() => setSelectedStar(stars)} />
                <span>{number.format(stars)}★</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.upgradeBody}>
          <section aria-labelledby="promotion-bonuses-title">
            <I18nElement as="h3" id="promotion-bonuses-title">Promotion bonuses</I18nElement>
            <I18nElement as="p" className={styles.progressionNote}>Bonuses are cumulative from 0 stars.</I18nElement>
            <dl className={styles.metricRows}>
              {selectedStar > 0 ? (
                <div>
                  <I18nElement as="dt">Copies for this star</I18nElement>
                  <dd><strong>{number.format(promotion.copies)}</strong></dd>
                </div>
              ) : null}
              {promotion.stats.filter(({ key }) => Object.hasOwn(statLabels, key)).map((stat) => {
                const previous = previousStats.get(stat.key);
                return (
                  <div key={stat.key}>
                    <I18nElement as="dt">{statLabels[stat.key]}</I18nElement>
                    <dd><ValueComparison current={formatBonus(stat)} previous={previous && previous.value !== stat.value ? formatBonus(previous) : undefined} /></dd>
                  </div>
                );
              })}
            </dl>
          </section>

          <section aria-labelledby="star-skill-values-title">
            <I18nElement as="h3" id="star-skill-values-title">{previousStar === undefined ? "Base skill values" : "Skill changes"}</I18nElement>
            {!metricAvailable ? (
              <I18nElement as="p" className={styles.progressionNote}>No skill values available for this Cookie.</I18nElement>
            ) : skillsWithChanges.length === 0 ? (
              <I18nElement as="p" className={styles.progressionNote}>No skill value changes recorded at this star.</I18nElement>
            ) : (
              <ul className={styles.upgradeSkills}>
                {skillsWithChanges.map((skill) => (
                  <li key={skill.id}>
                    <strong className={styles.upgradeSkillName}>{skill.name}</strong>
                    <SkillMetrics metrics={skill.metrics} star={selectedStar} previousStar={previousStar} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
