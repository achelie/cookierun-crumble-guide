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
    slug: "cookie-run-crumble-cool-mint-cookie-build-team",
    title: "CookieRun: Crumble Cool Mint Build: Fix Her Fragile Summons",
    seoTitle: "CookieRun: Crumble Cool Mint Cookie Build & Best Team",
    seoDescription: "Build Cool Mint Cookie with Licorice and Witchberry, choose the best Sugar Rune stats, activate both synergies, and avoid boss fights that punish summons.",
    excerpt: "Cool Mint feels unreliable alone. Pair her with Licorice and Witchberry, activate Multi-shot and Duration, then use the core where split bosses make it matter.",
    category: "team-building",
    tags: ["Cool Mint Cookie", "Team Building", "Summons", "Sugar Runes", "Boss Teams"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    readingMinutes: 7,
    author: "Crumble Guide",
    coverCookieIds: ["cookie4006", "cookie0503", "cookie2006"],
    toc: [
      { id: "why-cool-mint-fails", label: "Why Cool Mint feels weak" },
      { id: "summon-core", label: "Build the three-Cookie core" },
      { id: "synergy-providers", label: "Activate both synergies" },
      { id: "sugar-rune-stats", label: "Choose Sugar Rune stats" },
      { id: "best-content", label: "Use the team's best matchups" },
      { id: "bad-matchups", label: "Know when to bench it" },
      { id: "quick-build", label: "Follow the quick build" },
      { id: "cool-mint-faq", label: "Cool Mint Cookie FAQ" },
    ],
    faq: [
      { question: "What is the best Cool Mint Cookie team core?", answer: "Use Cool Mint Cookie, Licorice Cookie, and Witchberry Cookie. Licorice adds summons that absorb pressure, while Witchberry punishes split or grouped enemies with wide block damage." },
      { question: "Which synergies does Cool Mint Cookie need?", answer: "Cool Mint receives Multi-shot and Duration. Use Cheesecake Cookie, Herb Cookie, or Tiger Lily Cookie for Multi-shot, then add Milk Cookie's Crunchy Strong Pediatrician for Duration." },
      { question: "What are the best Sugar Rune stats for Cool Mint Cookie?", answer: "Start with ATK% because her summons scale with ATK. Skill Amp and Skill Haste are good follow-ups. Keep a defensive stat when she dies before getting another summon cycle." },
      { question: "Is Skill Haste good on Witchberry Cookie?", answer: "It is usable, but her blocks already last 5.5 seconds on a 4-second cooldown. ATK, CRIT Chance, CRIT DMG, and Skill Amp usually deserve priority." },
      { question: "Is Cool Mint Cookie good for every boss?", answer: "No. She performs best against split targets, crowded waves, and enemies that waste attacks on summons. Frequent area damage and strict single-target checks can make a focused damage team safer." },
    ],
  },
  {
    slug: "cookie-run-crumble-gear-sugar-rune-stats-guide",
    title: "CookieRun: Crumble Gear Guide: Stop Letting Bad Stats Fake Your Power",
    seoTitle: "CookieRun: Crumble Gear & Sugar Rune Guide | Best Stats",
    seoDescription: "CookieRun: Crumble gear and Sugar Rune guide with the best stats for supports, DPS, tanks, and debuffers, plus reroll rules that protect rare materials.",
    excerpt: "A bigger power number can still make your team worse. Learn which Oven gear and Sugar Rune stats deserve a lock, and which rolls only look expensive.",
    category: "cookies",
    tags: ["Gear", "Sugar Runes", "Stats", "Cookie Builds", "Progression"],
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    readingMinutes: 7,
    author: "Crumble Guide",
    coverCookieIds: ["cookie0181", "cookie0023", "cookie0059"],
    toc: [
      { id: "check-the-failure", label: "Check why the team failed" },
      { id: "stat-glossary", label: "Know what every stat buys" },
      { id: "power-breakpoints", label: "Respect power breakpoints" },
      { id: "judge-oven-gear", label: "Judge Oven gear in 20 seconds" },
      { id: "runes-by-role", label: "Build Sugar Runes by role" },
      { id: "focus-debuffers", label: "Use Focus on debuffers" },
      { id: "upgrade-budget", label: "Control upgrades and rerolls" },
      { id: "quick-build-sheet", label: "Use the quick build sheet" },
      { id: "gear-rune-faq", label: "Gear and Sugar Rune FAQ" },
    ],
    faq: [
      { question: "What are the best general gear stats in CookieRun: Crumble?", answer: "Skill Amp and Skill Haste are the safest general gear stats because damage dealers, supports, and tanks all rely on skills. Add ATK and CRIT stats for damage, Damage Reduction for fragile tanks, and Focus for debuff consistency." },
      { question: "Should I always equip the item with higher combat power?", answer: "Use the higher-power item when it crosses a stage damage breakpoint. After the penalty is gone, compare the substats and the actual clear because Accuracy or Evasion can raise displayed power without fixing the team's problem." },
      { question: "What should I lock on support Sugar Runes?", answer: "Lock strong Skill Amp and Skill Haste lines on supports used across several modes. Consider ATK when the Cookie's healing or support effect scales with it, and stop when the increasing lock cost threatens the rest of the main team." },
      { question: "Does Scorpion Cookie need Focus?", answer: "Focus makes Venom Sting applications more consistent against Resistance. A full offense build can still clear bosses by restarting until the applications land, so choose Focus for repeatable clears and offense for a one-clear push." },
      { question: "When is an SSR Sugar Rune worth keeping?", answer: "Keep an SSR Sugar Rune when its stat fits the Cookie, the roll is strong enough to matter, and the Cookie stays in your active teams. Rarity alone does not make a poor-fit stat useful." },
    ],
  },
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
