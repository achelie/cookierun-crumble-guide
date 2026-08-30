import { codes, codesUpdatedAt } from "@/data/codes";
import { cookies, cookiesUpdatedAt } from "@/data/cookies";
import { guides } from "@/data/guides";
import { pets, petsUpdatedAt } from "@/data/pets";
import { recommendedTeams, teamsUpdatedAt } from "@/data/teams";
import { tierList, tierRanks, tierUpdatedAt } from "@/data/tier-list";

export const siteUrl = "https://www.cookieruncrumbles.com";
export const siteName = "CookieRun: Crumble Guide";
export const siteUpdatedAt = "2026-08-30";

export type SeoPageDefinition = {
  path: string;
  title: string;
  h1: string;
  summary: string;
  description: string;
  breadcrumb: string;
  updatedAt: string;
};

function formatMonthYear(value: string) {
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${value}T00:00:00Z`));
}

function formatFullDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${value}T00:00:00Z`));
}

const activeCodes = codes.filter((code) => code.status === "active");
const codesSummary = activeCodes.length
  ? `Copy ${activeCodes.length} active ${activeCodes.length === 1 ? "code" : "codes"}, check every reward and expiry time, then open the official redemption page.`
  : "No active CookieRun: Crumble codes are available right now. Check the expired codes and return after the next coupon update.";
const codesDescription = activeCodes.length
  ? `All active CookieRun: Crumble codes for ${formatMonthYear(codesUpdatedAt)}, including rewards, expiry times, one-click copy, expired codes, and the official redemption link.`
  : `CookieRun: Crumble codes checked in ${formatMonthYear(codesUpdatedAt)}. No active codes are available right now; review expired coupons and the official redemption link.`;
const rankedCookieCount = tierRanks.reduce((count, rank) => count + tierList[rank].length, 0);
const guideUpdatedAt = guides.reduce(
  (latest, guide) => guide.updatedAt > latest ? guide.updatedAt : latest,
  "1970-01-01",
);

export const seoPages = {
  home: {
    path: "/",
    title: "CookieRun: Crumble Guide, Tier List, Codes & Teams",
    h1: "CookieRun: Crumble Guide",
    summary: "Tier list, all Cookies and Pets, best teams, active codes, beginner tips, and free builders in one quick fan guide.",
    description: `CookieRun: Crumble guide with the latest tier list, all ${cookies.length} Cookies, ${pets.length} Pets, best teams, active codes, beginner tips, and free team-building tools.`,
    breadcrumb: "Home",
    updatedAt: siteUpdatedAt,
  },
  cookies: {
    path: "/cookies/",
    title: `CookieRun: Crumble Cookies List | All ${cookies.length} Cookies`,
    h1: "CookieRun: Crumble Cookies List",
    summary: `Search all ${cookies.length} Cookies by rarity, element, role, Synergy, and buff.`,
    description: `Browse all ${cookies.length} CookieRun: Crumble Cookies with rarity, element, role, Granted and Received Synergy, buffs, images, search, and filters.`,
    breadcrumb: "Cookies",
    updatedAt: cookiesUpdatedAt,
  },
  pets: {
    path: "/pets/",
    title: `CookieRun: Crumble Pets List | All ${pets.length} Pet Effects`,
    h1: "CookieRun: Crumble Pets List",
    summary: `Search all ${pets.length} Pets and compare rarity and companion effects.`,
    description: `Browse all ${pets.length} CookieRun: Crumble Pets with rarity, companion effects, images, search, and filters for faster team planning.`,
    breadcrumb: "Pets",
    updatedAt: petsUpdatedAt,
  },
  tierList: {
    path: "/tier-list/",
    title: `CookieRun: Crumble Tier List (${formatMonthYear(tierUpdatedAt)}) | Best Cookies`,
    h1: "CookieRun: Crumble Tier List",
    summary: `Updated ${formatFullDate(tierUpdatedAt)}: ${rankedCookieCount} Cookies ranked from S to D for combined PvP and PvE value.`,
    description: `Updated ${formatFullDate(tierUpdatedAt)}. Rank ${rankedCookieCount} CookieRun: Crumble Cookies from S to D for combined PvP and PvE value, with rarity, element, and role.`,
    breadcrumb: "Tier List",
    updatedAt: tierUpdatedAt,
  },
  teams: {
    path: "/teams/",
    title: "CookieRun: Crumble Best Teams | Story, Boss & F2P",
    h1: "CookieRun: Crumble Best Teams",
    summary: `Copy ${recommendedTeams.length} teams for F2P progression, bosses, AoE stages, tower floors, and daily dungeons.`,
    description: "Copy CookieRun: Crumble best teams for F2P progression, boss fights, AoE stages, Plaque Tower, and daily dungeons, with Pets and Synergy.",
    breadcrumb: "Teams",
    updatedAt: teamsUpdatedAt,
  },
  codes: {
    path: "/codes/",
    title: `CookieRun: Crumble Codes (${formatMonthYear(codesUpdatedAt)}) | Active Codes`,
    h1: "CookieRun: Crumble Codes",
    summary: codesSummary,
    description: codesDescription,
    breadcrumb: "Codes",
    updatedAt: codesUpdatedAt,
  },
  tools: {
    path: "/tools/",
    title: "CookieRun: Crumble Tools | Team Builder & Tier Maker",
    h1: "CookieRun: Crumble Tools",
    summary: "Build a team or make a tier list, save the URL, and download a clean PNG.",
    description: "Free CookieRun: Crumble tools: build a 12-Cookie, 3-Pet team or make a custom S-to-D tier list, then copy the link or download a PNG.",
    breadcrumb: "Tools",
    updatedAt: siteUpdatedAt,
  },
  teamBuilder: {
    path: "/tools/team-builder/",
    title: "CookieRun: Crumble Team Builder | 12 Cookies & 3 Pets",
    h1: "CookieRun: Crumble Team Builder",
    summary: "Drag 12 Cookies and 3 Pets into exact slots, check Synergy, and save the formation.",
    description: "Build a free CookieRun: Crumble team with 12 Cookie slots and 3 Pets. Drag to reorder, check Synergy, share the URL, and download a PNG.",
    breadcrumb: "Team Builder",
    updatedAt: siteUpdatedAt,
  },
  tierBuilder: {
    path: "/tools/tier-builder/",
    title: "CookieRun: Crumble Tier List Maker | Rank All Cookies",
    h1: "CookieRun: Crumble Tier List Maker",
    summary: `Drag all ${cookies.length} Cookies from S to D, load the current ranking, and download the result.`,
    description: `Make a free CookieRun: Crumble tier list. Drag all ${cookies.length} Cookies from S to D, load the current ranking, share the URL, and download a PNG.`,
    breadcrumb: "Tier List Maker",
    updatedAt: siteUpdatedAt,
  },
  guides: {
    path: "/guides/",
    title: "CookieRun: Crumble Guides | Tips, Teams & Progression",
    h1: "CookieRun: Crumble Guides",
    summary: "Beginner, progression, team, Synergy, Pet, stage, boss, event, and code guides.",
    description: "CookieRun: Crumble guides for beginners, progression, teams, Synergy, Cookies, Pets, bosses, dungeons, events, and active codes.",
    breadcrumb: "Guides",
    updatedAt: guideUpdatedAt,
  },
  about: {
    path: "/about/",
    title: "About Crumble Guide | How We Test and Update",
    h1: "About Crumble Guide",
    summary: "Meet the independent editorial team behind the guides, rankings, and tools on this site.",
    description: "Meet the Crumble Guide Editorial Team and learn how we test CookieRun: Crumble mechanics, mark estimates, update guides, and correct mistakes.",
    breadcrumb: "About",
    updatedAt: siteUpdatedAt,
  },
  contact: {
    path: "/contact/",
    title: "Contact Crumble Guide | Corrections & Copyright",
    h1: "Contact Crumble Guide",
    summary: "Report a bad number, flag an outdated guide, ask a privacy question, or send a copyright request.",
    description: "Contact the Crumble Guide Editorial Team about guide corrections, outdated CookieRun: Crumble data, privacy questions, or copyright requests.",
    breadcrumb: "Contact",
    updatedAt: siteUpdatedAt,
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy Policy | CookieRun: Crumble Guide",
    h1: "Privacy Policy",
    summary: "A plain-English account of the limited data used to run, measure, protect, and fund this site.",
    description: "Read how CookieRun: Crumble Guide uses Cloudflare, Ahrefs Web Analytics, email, cookies, identifiers, consent choices, and Google AdSense.",
    breadcrumb: "Privacy",
    updatedAt: siteUpdatedAt,
  },
  disclaimer: {
    path: "/disclaimer/",
    title: "Disclaimer | CookieRun: Crumble Unofficial Fan Guide",
    h1: "Fan Guide Disclaimer",
    summary: "The short version: this is an independent player guide, not an official Devsisters website.",
    description: "Read the independence, Fan Kit, intellectual property, accuracy, external-link, and no-endorsement notices for this unofficial player guide.",
    breadcrumb: "Disclaimer",
    updatedAt: siteUpdatedAt,
  },
} as const satisfies Record<string, SeoPageDefinition>;

export type SeoPageKey = keyof typeof seoPages;

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
