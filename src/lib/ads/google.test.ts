import { afterEach, describe, expect, it, vi } from "vitest";
import { allowsEuropeanAds, isGppReady } from "./google";

const consent = {
  cmpStatus: "loaded",
  eventStatus: "tcloaded",
  gdprApplies: true,
  tcString: "mock-tc-string",
  purpose: { consents: { 1: true, 3: true, 4: true } },
  vendor: { consents: { 755: true } },
};

describe("AdSense consent and configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("blocks pending and unknown TCF states", () => {
    expect(allowsEuropeanAds(consent, false)).toBe(false);
    expect(allowsEuropeanAds({ ...consent, cmpStatus: "stub" }, true)).toBe(false);
    expect(allowsEuropeanAds({ ...consent, eventStatus: "cmpuishown" }, true)).toBe(false);
    expect(allowsEuropeanAds({ ...consent, gdprApplies: undefined }, true)).toBe(false);
  });

  it("requires the Google vendor and all configured purposes in Europe", () => {
    expect(allowsEuropeanAds(consent, true)).toBe(true);
    expect(allowsEuropeanAds({ ...consent, vendor: { consents: {} } }, true)).toBe(false);
    expect(allowsEuropeanAds({ ...consent, purpose: { consents: { 1: true, 3: true, 4: false } } }, true)).toBe(false);
    expect(allowsEuropeanAds({ cmpStatus: "loaded", gdprApplies: false }, true)).toBe(true);
  });

  it("waits for GPP to report applicable sections and their signals", () => {
    const outside = { cmpStatus: "loaded", signalStatus: "ready", applicableSections: [-1] };
    expect(isGppReady(outside, true)).toBe(true);
    expect(isGppReady({ ...outside, signalStatus: "not ready" }, true)).toBe(false);
    expect(isGppReady({ ...outside, applicableSections: [] }, true)).toBe(false);
    expect(isGppReady({ ...outside, applicableSections: [7] }, true)).toBe(false);
    expect(isGppReady({ ...outside, applicableSections: [7], gppString: "mock-gpp-string" }, true)).toBe(true);
  });

  it("requires both production switches", async () => {
    vi.resetModules();
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_GOOGLE_CMP_READY", "false");
    const { adMode, getAdPlacement } = await import("./config");
    expect(adMode).toBe("off");
    expect(getAdPlacement("home-after-browse")).toBeNull();
  });

  it("keeps formats separate and removes disabled or missing slot IDs", async () => {
    vi.resetModules();
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_GOOGLE_CMP_READY", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_DISABLED_SLOTS", "tier-after-ranks");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_SLOT_OVERRIDES", "teams-after-second=");
    const { adMode, getAdPlacement } = await import("./config");
    expect(adMode).toBe("live");
    expect(getAdPlacement("home-after-browse")).toEqual({ format: "horizontal", slot: "6498064854" });
    expect(getAdPlacement("guide-after-answer")).toEqual({ format: "article", slot: "2512707489" });
    expect(getAdPlacement("tier-after-ranks")).toBeNull();
    expect(getAdPlacement("teams-after-second")).toBeNull();
  });
});
