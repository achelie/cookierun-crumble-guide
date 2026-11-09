import type { ReactNode } from "react";
import { AppIcon } from "@/components/ui/icon";
import { I18nElement } from "@/i18n/elements";
import type { CookieSkillMetric } from "@/lib/cookie-details";
import styles from "./cookie-detail.module.css";

export function ValueComparison({ current, previous }: { current: ReactNode; previous?: ReactNode }) {
  return (
    <span className={styles.comparison}>
      {previous !== undefined ? (
        <>
          <span className={styles.previousValue}>
            <I18nElement as="span" className="sr-only">Previous star</I18nElement>
            {previous}
          </span>
          <AppIcon name="chevron" size={13} />
          <I18nElement as="span" className="sr-only">Selected star</I18nElement>
        </>
      ) : null}
      <strong>{current}</strong>
    </span>
  );
}

function metricValue(value: string | null | undefined) {
  return value ?? <I18nElement as="span" className={styles.unavailable}>Unavailable</I18nElement>;
}

export function SkillMetrics({
  metrics,
  star,
  previousStar,
}: {
  metrics: CookieSkillMetric[];
  star: number;
  previousStar?: number;
}) {
  const groups = new Map<string, { index: number; passive: boolean; blocks: Map<number, CookieSkillMetric[]> }>();
  for (const metric of metrics) {
    const key = `${metric.passive}:${metric.group}`;
    let group = groups.get(key);
    if (!group) {
      group = { index: metric.group, passive: metric.passive, blocks: new Map() };
      groups.set(key, group);
    }
    const block = group.blocks.get(metric.block);
    if (block) block.push(metric);
    else group.blocks.set(metric.block, [metric]);
  }

  return (
    <div className={styles.metricGroups}>
      {[...groups].map(([key, group]) => {
        const visibleBlocks = [...group.blocks].map(([block, all]) => ({
          block,
          all,
          shown: previousStar === undefined ? all : all.filter(({ values }) => values[star] !== values[previousStar]),
        })).filter(({ shown }) => shown.length > 0);
        if (visibleBlocks.length === 0) return null;

        return (
          <div key={key}>
            {groups.size > 1 || group.passive ? (
              <I18nElement as="p" className={styles.metricGroupLabel}>
                {group.passive ? "Passive skill" : `Skill ${group.index + 1}`}
              </I18nElement>
            ) : null}
            {visibleBlocks.map(({ block, all, shown }) => (
              <div className={styles.metricBlock} key={block}>
                {group.blocks.size > 1 ? (
                  <I18nElement as="p" className={styles.metricBlockLabel}>{`Effect ${block + 1}`}</I18nElement>
                ) : null}
                <dl className={styles.metricRows}>
                  {shown.map((metric) => {
                    const duplicateLabels = all.filter(({ label }) => label === metric.label);
                    const position = duplicateLabels.indexOf(metric) + 1;
                    return (
                      <div key={metric.id}>
                        <dt>{metric.label}{duplicateLabels.length > 1 ? ` (${position})` : null}</dt>
                        <dd>
                          <ValueComparison
                            current={metricValue(metric.values[star])}
                            previous={previousStar === undefined ? undefined : metricValue(metric.values[previousStar])}
                          />
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
