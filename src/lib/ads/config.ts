const publisher = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER ?? "ca-pub-7443237558968985";
const display = process.env.NEXT_PUBLIC_ADSENSE_DISPLAY ?? "6498064854";
const inArticle = process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE ?? "2512707489";
const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED;

function getAdMode() {
  if (enabled === "false") return "off";
  if (process.env.NODE_ENV === "development") return "preview";
  const confirmed = enabled === "true" && process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_CMP_READY === "true";
  return confirmed && /^ca-pub-\d{16}$/.test(publisher) ? "live" : "off";
}

export const adMode = getAdMode();

export const adPublisher = publisher;
export const adWidths = { compact: 768, desktop: 1200 } as const;

export function getAdLayout(viewport: number) {
  if (viewport < adWidths.compact) return "mobile";
  return viewport < adWidths.desktop ? "compact" : "desktop";
}

const placements = {
  "home-after-browse": "horizontal",
  "tools-after-directory": "horizontal",
  "cookies-after-first-rows": "adaptive",
  "pets-after-first-rows": "adaptive",
  "cookie-after-profile": "adaptive",
  "tier-between-s-and-a": "adaptive",
  "tier-after-ranks": "adaptive",
  "teams-after-second": "adaptive",
  "teams-after-fourth": "adaptive",
  "teams-after-sixth": "adaptive",
  "guides-after-first-rows": "adaptive",
  "guide-after-answer": "article",
  "guide-mid-article": "article",
  "sugar-runes-after-reference": "horizontal",
  "stellar-link-after-reference": "horizontal",
  "plate-enhancement-after-reference": "horizontal",
} as const;

export type AdPlacement = keyof typeof placements;
const overrides = new Map((process.env.NEXT_PUBLIC_ADSENSE_SLOT_OVERRIDES ?? "").split(",").map((entry) => {
  const [key, slot = ""] = entry.split("=");
  return [key.trim(), slot.trim()] as const;
}));
const disabled = new Set((process.env.NEXT_PUBLIC_ADSENSE_DISABLED_SLOTS ?? "").split(",").map((value) => value.trim()));

export const guideSecondAdEnabled = process.env.NEXT_PUBLIC_ADSENSE_GUIDE_SECOND === "inline";

export const guideAdRules = {
  minimumMinutes: 4,
  minimumSections: 3,
  longMinutes: 8,
  longSections: 6,
};

export function getAdPlacement(placement: AdPlacement) {
  const format = placements[placement];
  const slot = overrides.get(placement) ?? (format === "article" ? inArticle : display);
  if (adMode === "off" || disabled.has(placement) || !/^\d{10}$/.test(slot)) return null;
  return { slot, format };
}
