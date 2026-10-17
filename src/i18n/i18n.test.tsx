import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { alternateLanguages, localizedPath } from "./config";
import { LocaleProvider } from "./provider";
import { I18nElement, LocaleLink } from "./elements";
import { createTranslator, formatMessage, translateHtml, translateSchema } from "./translate";
import { filterCookies } from "@/lib/filter-cookies";
import { cookies } from "@/data/cookies";
import { getTranslator } from "./dictionaries";

describe("language routing", () => {
  it("preserves a shared formation, filters and anchor across language switches", () => {
    expect(localizedPath("/ja/tools/team-builder/?team=cookie0001,,chardonnay&pets=pet0001#formation", "zh-Hant"))
      .toBe("/zh-tw/tools/team-builder/?team=cookie0001,,chardonnay&pets=pet0001#formation");
    expect(localizedPath("/ko/teams/?category=arena&page=2", "en")).toBe("/teams/?category=arena&page=2");
    expect(localizedPath("/th/", "ja")).toBe("/ja/");
  });
  it("keeps assets, evidence downloads and external URLs unchanged", () => {
    for (const url of ["/data/tools/en/sugar-runes.json", "/images/cookies/cookie0001.webp", "/tools/replica/sugar-runes.mjs", "https://example.com/teams/", "//example.com/teams/", "#formation"]) expect(localizedPath(url, "ko")).toBe(url);
  });
  it("produces reciprocal alternate sets including the same English fallback", () => {
    expect(alternateLanguages("/ja/teams/", "https://example.com")).toEqual(alternateLanguages("/teams/", "https://example.com"));
    expect(alternateLanguages("/teams/", "https://example.com")["x-default"]).toBe("https://example.com/teams/");
  });
});

describe("localized rendering", () => {
  const messages = { "All": "全部", "Accuracy": "命中", "Page {0} of {1}": "第 {0} 頁，共 {1} 頁", "Tier List": "強度排行", "Remove {0}": "移除{0}", "GingerBrave": "勇敢餅乾" };
  const t = createTranslator(messages, "zh-Hant");
  it("translates templates and native entity names while preserving formation values", () => {
    expect(t("Remove GingerBrave")).toBe("移除勇敢餅乾");
    const html = renderToStaticMarkup(<LocaleProvider locale="zh-Hant" messages={messages}>
      <I18nElement as="select" defaultValue="All"><I18nElement as="option">All</I18nElement><I18nElement as="option" value="Accuracy">Accuracy</I18nElement></I18nElement>
      <LocaleLink href="/tier-list/">Tier List</LocaleLink>
    </LocaleProvider>);
    expect(html).toContain('value="All" selected=""');
    expect(html).toContain('value="Accuracy">命中');
    expect(html).toContain('href="/zh-tw/tier-list"');
    expect(html).toContain("強度排行");
  });
  it("reorders a full translated sentence around an embedded element", () => {
    const html = renderToStaticMarkup(<LocaleProvider locale="zh-Hant" messages={messages}><I18nElement as="p">Page <strong>2</strong> of {4}</I18nElement></LocaleProvider>);
    expect(html).toContain("第 <strong>2</strong> 頁，共 4 頁");
  });
  it("keeps navigation icons outside complete translated guide labels", () => {
    const messages = { "Build the best Sugar Runes": "配好糖符文", "{0} Sugar Runes": "{0} 張糖符文", "Read guides": "閱讀攻略", "Read guide {0}": "閱讀攻略 {0}" };
    const html = renderToStaticMarkup(<LocaleProvider locale="zh-Hant" messages={messages}>
      <LocaleLink href="#runes"><span>06</span>Build the best Sugar Runes</LocaleLink>
      <I18nElement as="b">Read guides <span aria-hidden="true" /></I18nElement>
    </LocaleProvider>);
    expect(html).toContain("<span>06</span>配好糖符文");
    expect(html).not.toContain("Build the best");
    expect(html).not.toContain("閱讀攻略 s");
  });
  it("localizes punctuated reading labels and joined entity names in every new language", () => {
    const title = "CookieRun: Crumble EXP Guide: Who Deserves Your First Level 100?";
    for (const locale of ["zh-Hant", "ja", "ko", "th"] as const) {
      const t = getTranslator(locale);
      expect(t(`Read ${title}`)).toContain(t(title));
      expect(t(`Read ${title}`)).not.toContain("Read ");
      const names = "Scorpion Cookie, Devil Cookie, Macaron Cookie";
      expect(t(`${names} cover art`)).not.toContain("Cookie");
      expect(t("granted Multi-strike synergy")).not.toMatch(/granted|Multi-strike|synergy/);
      expect(t("28 guides")).not.toContain("guides");
    }
  });
  it("translates a sourced non-English label and rejects unrelated paragraph matches", () => {
    const translate = createTranslator({ "勇敢餅乾": "용감한 쿠키", "{0} active {1}": "활성 {0} {1}" }, "ko");
    expect(translate("勇敢餅乾")).toBe("용감한 쿠키");
    const paragraph = "Weights are normalized across the current pool, assuming independent slots and crafts. Targets use active slots; all slots count toward lock fees.";
    expect(translate(paragraph)).toBe(paragraph);
  });
  it("handles an optional empty HTML fragment in a tool result", () => {
    const translate = createTranslator({ "Expected {0} crafts. {1}": "預計製作 {0} 次。{1}", "{0}Recorded result": "{0}觀察結果" }, "zh-Hant");
    expect(translate("Expected 12.1 crafts.")).toBe("預計製作 12.1 次。");
    expect(translate("Recorded result")).toBe("觀察結果");
  });
  it("formats the hero month and keeps the source calendar year", () => {
    expect(createTranslator({}, "ja")("October")).toBe("10月");
    expect(createTranslator({}, "ko")("October 2026")).toBe("2026년 10월");
    expect(createTranslator({}, "th")("October 17, 2026")).toContain("2026");
  });
  it("localizes imported tool HTML without changing option keys or numeric inputs", () => {
    const html = translateHtml('<select><option value="Accuracy">Accuracy</option></select><input value="700"/><a href="/tier-list/">Tier List</a>', t, "zh-Hant");
    expect(html).toContain('value="Accuracy">命中');
    expect(html).toContain('value="700"');
    expect(html).toContain('href="/zh-tw/tier-list/"');
    expect(translateHtml('Accuracy<a href="/tier-list/">Tier List</a>Accuracy', t, "zh-Hant"))
      .toBe('命中<a href="/zh-tw/tier-list/">強度排行</a>命中');
  });
  it("localizes schema language and page URLs while retaining dates, math and images", () => {
    expect(translateSchema({ inLanguage: "en", url: "https://example.com/teams/", name: "Tier List", dateModified: "2026-10-16", image: "https://example.com/images/a.webp", count: 700 }, t, "zh-Hant", "https://example.com"))
      .toEqual({ inLanguage: "zh-Hant", url: "https://example.com/zh-tw/teams/", name: "強度排行", dateModified: "2026-10-16", image: "https://example.com/images/a.webp", count: 700 });
  });
  it("localizes composed reward and Pet descriptions in structured data", () => {
    for (const locale of ["zh-Hant", "ja", "ko", "th"] as const) {
      const t = getTranslator(locale);
      expect(t("10,000 Crystals, 1,000 Flames of Bravery, 1,000 Rune Crystals. Expires Aug 25, 2026 at 23:59 KST."))
        .not.toMatch(/Crystals|Flames|Bravery|Rune|Expires/);
      expect(t("Grants Chain synergy; Chain receivers gain ATK")).not.toMatch(/Grants|synergy|receivers|gain/);
      expect(t("1,000 Rune Crystals")).toBe(`1,000 ${t("Rune Crystals")}`);
    }
  });
  it("formats builder instructions with punctuated official names without parsing the name", () => {
    for (const locale of ["zh-Hant", "ja", "ko", "th"] as const) {
      const t = getTranslator(locale);
      expect(formatMessage(t, "Add or drag {0}", "Dr. Bones Cookie")).toContain(t("Dr. Bones Cookie"));
      expect(formatMessage(t, "Remove {0}. Drag to reorder.", "Dr. Wasabi Cookie")).not.toMatch(/Remove|reorder|Wasabi/);
      expect(formatMessage(t, "{0}. {1}. Drag to rank.", "Dr. Bones Cookie", "Add to S Tier")).not.toMatch(/Bones|Drag|Add to/);
    }
  });
  it("finds the same Cookie through every source language name", () => {
    const filters = { query: "딸기맛", rarity: "All", role: "All", element: "All" };
    expect(filterCookies(cookies, filters).some(cookie => cookie.id === "cookie0002")).toBe(true);
  });
});
