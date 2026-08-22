export const guideCategories = [
  { slug: "getting-started", label: "Getting Started" },
  { slug: "team-building", label: "Team Building" },
  { slug: "cookies", label: "Cookies" },
  { slug: "pets", label: "Pets" },
  { slug: "stages-bosses", label: "Stages & Bosses" },
  { slug: "events-codes", label: "Events & Codes" },
] as const;

export type GuideCategorySlug = (typeof guideCategories)[number]["slug"];

export type GuideTocItem = {
  id: string;
  label: string;
};

export type GuideFaqItem = {
  question: string;
  answer: string;
};

export type GuideSummary = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  category: GuideCategorySlug;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  author: string;
  coverCookieIds: [string, string, string];
  toc: GuideTocItem[];
  faq: GuideFaqItem[];
};

export const guidePageSize = 6;

export const guides: GuideSummary[] = [
  {
    slug: "cookie-run-crumble-beginner-progression-guide",
    title: "CookieRun: Crumble Beginner Guide: Fix Your Progression Route",
    seoTitle: "CookieRun: Crumble Beginner Guide | Progress Faster",
    seoDescription: "A practical CookieRun: Crumble beginner guide for faster progression: crystals, Gacha, Oven gear, dungeons, Resolve, teams, Pets, guilds, and Auto Hunt.",
    excerpt: "Stop burning crystals and upgrade materials on the wrong systems. This beginner route covers summons, gear, dungeons, teams, Pets, and idle rewards.",
    category: "getting-started",
    tags: ["Beginner Guide", "Progression", "Free to Play", "Team Building"],
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    readingMinutes: 14,
    author: "Crumble Guide",
    coverCookieIds: ["cookie4012", "cookie0053", "cookie0037"],
    toc: [
      { id: "protect-your-crystals", label: "Protect your crystals" },
      { id: "use-the-quest-loop", label: "Use the quest loop" },
      { id: "level-the-oven", label: "Level the Oven without gear panic" },
      { id: "push-dungeons", label: "Push dungeons before farming" },
      { id: "build-permanent-power", label: "Build permanent account power" },
      { id: "move-cookies-in-combat", label: "Move Cookies in combat" },
      { id: "build-a-lineup", label: "Build a lineup that works" },
      { id: "pick-pets", label: "Pick Pets for the team" },
      { id: "join-a-guild", label: "Join a guild early" },
      { id: "use-idle-rewards", label: "Use idle rewards correctly" },
      { id: "daily-route", label: "A practical daily route" },
      { id: "beginner-faq", label: "Beginner FAQ" },
    ],
    faq: [
      { question: "Should beginners spend crystals on the regular Cookie banner?", answer: "Pickup banners are usually the better crystal target because their pull milestones can add rewards and extra copies. Pulls there still raise Cookie Gacha EXP. Save Pet pulls for tickets earned through quests and other free rewards." },
      { question: "What should I upgrade first when I get stuck?", answer: "Raise your main lineup to its current level cap, spend available Resolve coins with attack first, equip higher power Oven gear, unlock the main Sugar Rune on each active Cookie, and claim collection bonuses. Then try the stage again before changing the whole team." },
      { question: "Should I farm an easy Daily Dungeon stage?", answer: "Push the highest new stage you can clear before repeating an older one. First clears and milestone floors pay extra rewards, and every fifth level can add summons. Use lower farming stages only after the next push stops working." },
      { question: "How many tanks and supports should a beginner team use?", answer: "Start with one Defense Cookie if the team survives comfortably. Move toward two when enemies begin deleting the front line. Two Supports is a dependable baseline, while the remaining slots can carry damage and complete useful Synergy matches." },
      { question: "Why do my Auto Hunt rewards look empty while I am online?", answer: "Online Auto Hunt income goes directly into your inventory instead of building up in the offline claim window. Offline rewards store for up to eight hours before research upgrades extend that cap." },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuideCategory(category: GuideCategorySlug) {
  return guideCategories.find((item) => item.slug === category)!;
}
