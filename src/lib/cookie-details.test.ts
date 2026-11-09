import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { cookieDetailRoutes } from "@/lib/cookie-detail-paths";
import { getCookieDetail } from "@/lib/cookie-details";
import runePlanner from "../../public/data/tools/en/sugar-runes.json";

describe("Cookie detail game data", () => {
  it("has a complete star curve and localized skill values for every Cookie", () => {
    for (const { slug } of cookieDetailRoutes) {
      const entry = getCookieDetail(slug, "zh-Hant")!;
      expect(entry.profile.promotions.map(({ stars }) => stars), slug).toEqual(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      );
      for (const locale of locales) {
        const localized = getCookieDetail(slug, locale)!;
        const metrics = localized.profile.skills.flatMap((skill) => skill.metrics);
        expect(metrics.length, `${slug}/${locale}`).toBeGreaterThan(0);
        const complete = metrics.every((metric) =>
          metric.label && metric.values.length === 11 && metric.values.every(Boolean),
        );
        expect(complete, `${slug}/${locale}`).toBe(true);
      }
    }
  });

  it("lists the one-time Crystal rewards for Cookies with Collection entries", () => {
    const expected = Array.from({ length: 11 }, (_, stars) => ({
      stars, amount: 100, name: "水晶", image: "/images/rewards/crystal.webp",
    }));
    for (const { slug } of cookieDetailRoutes) {
      const { profile } = getCookieDetail(slug, "zh-Hant")!;
      expect(profile.codexRewards, slug).toEqual(slug === "readyberry-cookie" ? [] : expected);
    }
  });

  it("recommends three distinct craftable Sugar Rune effects for every Cookie", () => {
    const effects = new Map(runePlanner.effects.map(({ id, name }) => [String(id), name]));
    for (const { slug } of cookieDetailRoutes) {
      const { profile } = getCookieDetail(slug, "en")!;
      expect(new Set(profile.runeRecommendations.map(({ id }) => id)).size, slug).toBe(3);
      for (const { id, name, reason } of profile.runeRecommendations) {
        expect(effects.get(id), slug).toBe(name);
        expect(reason, slug).not.toBe("");
      }
    }
  });

  it("prioritizes HP for Readyberry's HP-based shield and omits Skill AMP for Pinot Noir's debuff build", () => {
    const readyberry = getCookieDetail("readyberry-cookie", "en")!;
    const pinot = getCookieDetail("pinot-noir-cookie", "en")!;
    expect(readyberry.profile.runeRecommendations[0].name).toBe("HP AMP");
    expect(pinot.profile.runeRecommendations.map(({ name }) => name)).not.toContain("Skill AMP");
  });

  it.each([
    ["caine-cookie", "ATK Increase", "48%", "52%", 3],
    ["jax-cookie", "Bat DMG", "567% of ATK", "598% of ATK", 3],
    ["princess-bari-cookie", "Guided Souls", "1", "2", 5],
    ["rye-cookie", "Shot Count", "x4", "x6", 50],
    ["oven-wanderer-cookie", "Explosion Damage", "69.6% of ATK", "74.6% of ATK", 5],
  ])("resolves %s from its battle configuration at the five-star breakpoint",
    (slug, label, fourStars, fiveStars, copies) => {
      const { profile } = getCookieDetail(slug, "en")!;
      const metric = profile.skills.flatMap((skill) => skill.metrics).find((item) => item.label === label);
      expect(metric?.values.slice(4, 7)).toEqual([fourStars, fiveStars, fiveStars]);
      expect(profile.promotions[5].copies).toBe(copies);
    },
  );
});
