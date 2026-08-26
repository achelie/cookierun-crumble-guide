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
  relatedGuideSlugs: [string, string, string];
  toc: GuideTocItem[];
  faq: GuideFaqItem[];
};

export const guidePageSize = 6;

export const guides: GuideSummary[] = [
  {
    slug: "cookie-run-crumble-tips-hidden-mechanics",
    title: "CookieRun: Crumble Tips: 9 Mistakes That Quietly Waste Progress",
    seoTitle: "CookieRun: Crumble Tips | 9 Progress Mistakes to Fix",
    seoDescription: "Fix nine CookieRun: Crumble mistakes involving debuff stacks, crystals, Stellar Links, team Power, shop currency, and Auto Hunt rewards.",
    excerpt: "A bigger Power number can still lose, and a harmless Auto Hunt setup can waste hours. Fix nine easy-to-miss systems before they drain your account.",
    category: "getting-started",
    tags: ["Tips", "Hidden Mechanics", "Stellar Links", "Auto Hunt", "Crystals"],
    publishedAt: "2026-08-26",
    updatedAt: "2026-08-26",
    readingMinutes: 8,
    author: "Crumble Guide",
    coverCookieIds: ["cookie0181", "cookie0070", "cookie0063"],
    relatedGuideSlugs: [
      "cookie-run-crumble-beginner-progression-guide",
      "cookie-run-crumble-power-guide-stage-damage",
      "cookie-run-crumble-accuracy-focus-guide",
    ],
    toc: [
      { id: "read-battle-icons", label: "Check whether debuffs landed" },
      { id: "scorpion-five-star", label: "Use Scorpion's five-star jump" },
      { id: "spend-crystals-on-cookies", label: "Stop feeding crystals to Pets" },
      { id: "stop-perfect-stellar-links", label: "Quit chasing perfect Stellar Links" },
      { id: "power-is-not-a-verdict", label: "Judge more than team Power" },
      { id: "shop-for-bottlenecks", label: "Buy the scarce shop currency" },
      { id: "separate-auto-hunt-rewards", label: "Separate both Auto Hunt rewards" },
      { id: "leave-a-survival-farm-team", label: "Leave a team that stays alive" },
      { id: "know-offline-progress", label: "Know what offline play cannot do" },
      { id: "hidden-mechanics-faq", label: "Hidden mechanics FAQ" },
    ],
    faq: [
      { question: "How do I know whether a debuff landed in CookieRun: Crumble?", answer: "Watch the status icons beside the target and the stack counter. If the expected icon or stack does not appear after the hit connects, the debuff failed and the rest of that damage plan may be weaker." },
      { question: "Should I spend crystals on Cookies or Pets?", answer: "Cookie pickup banners are usually the stronger crystal target because Cookie promotions affect more progression systems, including Stellar content. Use free Pet tickets first and spend crystals on a Cookie you plan to promote and keep using." },
      { question: "How much Stellar Link coverage is enough?", answer: "Stop at a result that fits your income. Around 70% can be acceptable for a free account, the 80s suit a light spender, and low 90s or better cost much more. Chasing 100% can erase a huge stockpile for a tiny gain." },
      { question: "Why can a lower-Power team beat me?", answer: "Displayed Power misses important context. Promotion breakpoints, gear effects, active synergies, positioning, and a team built for the mode can beat a slightly larger number." },
      { question: "Does offline Auto Hunt clear new story stages?", answer: "No. Offline Auto Hunt keeps farming the current stage and stores passive rewards. It does not push the campaign forward, even when the account is strong enough to clear the next stage." },
    ],
  },
  {
    slug: "cookie-run-crumble-power-guide-stage-damage",
    title: "CookieRun: Crumble Power Guide: Why Your Damage Suddenly Drops",
    seoTitle: "CookieRun: Crumble Power Guide | Fix Stage Damage Penalties",
    seoDescription: "Learn how CookieRun: Crumble Power affects stage damage, why small Resolve upgrades break walls, and when a better team matters more than raw Power.",
    excerpt: "Your team can be built correctly and still lose damage to a hidden Power gap. Learn why small upgrades suddenly turn a brutal stage into an easy clear.",
    category: "stages-bosses",
    tags: ["Combat Power", "Recommended Power", "Stage Progression", "Resolve", "PvE"],
    publishedAt: "2026-08-26",
    updatedAt: "2026-08-26",
    readingMinutes: 8,
    author: "Crumble Guide",
    coverCookieIds: ["cookie0070", "cookie0573", "cookie0515"],
    relatedGuideSlugs: [
      "cookie-run-crumble-accuracy-focus-guide",
      "cookie-run-crumble-gear-sugar-rune-stats-guide",
      "cookie-run-crumble-beginner-progression-guide",
    ],
    toc: [
      { id: "why-power-walls-happen", label: "Understand sudden Power walls" },
      { id: "read-the-damage-penalty", label: "Read the stage damage penalty" },
      { id: "stage-35-10-example", label: "Use the 35-10 example" },
      { id: "team-versus-power", label: "Balance teams with raw Power" },
      { id: "cheap-power-upgrades", label: "Buy the cheapest useful Power" },
      { id: "gear-power-tradeoff", label: "Judge gear beyond the green arrow" },
      { id: "f2p-power-walls", label: "Plan for the F2P slowdown" },
      { id: "power-failure-checklist", label: "Diagnose the failed run" },
      { id: "power-guide-faq", label: "CookieRun: Crumble Power FAQ" },
    ],
    faq: [
      { question: "Does Power reduce my damage in CookieRun: Crumble story stages?", answer: "Falling below a stage's Recommended Power can reduce the damage your lineup deals. The exact curve is not shown clearly in-game, so compare the Power gap with what happens during the fight." },
      { question: "Should I choose Power or a better team composition?", answer: "Use the right composition first, then raise its Power. Boss mechanics still decide whether you need AoE, single-target damage, healing, or defense, while Power helps that lineup avoid a severe stage penalty." },
      { question: "Why did a small Resolve upgrade make a boss much easier?", answer: "The Resolve stats helped, but the extra team Power may also have crossed a better damage band. That can make a modest upgrade feel much larger than its printed ATK increase." },
      { question: "Is Accuracy gear worth using only for Power?", answer: "It can be worth a temporary test when you are just below a stage threshold. After the lineup reaches a workable multiplier, compare the clear and return to better-fitting stats if the Accuracy is unnecessary." },
      { question: "Can F2P players get past late Power walls?", answer: "Yes, but progress slows. Claim idle rewards, push dungeon first clears, finish cheap research, spend Resolve, and promote the main lineup instead of emptying every resource into one Cookie." },
    ],
  },
  {
    slug: "cookie-run-crumble-accuracy-focus-guide",
    title: "CookieRun: Crumble Accuracy & Focus Guide: Why Your Skills Keep Missing",
    seoTitle: "CookieRun: Crumble Accuracy & Focus Guide | Gear Setup",
    seoDescription: "Fix missed skills and failed debuffs in CookieRun: Crumble with late-stage Accuracy and Focus targets, gear slot priorities, and practical boss checks.",
    excerpt: "Your damage build may be fine. Learn why late stages dodge skills, resist Venom Sting and DEF Down, and which gear slots fix the problem.",
    category: "stages-bosses",
    tags: ["Accuracy", "Focus", "Gear", "Stage Progression", "Boss Teams"],
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    readingMinutes: 7,
    author: "Crumble Guide",
    coverCookieIds: ["cookie0181", "cookie0023", "cookie0103"],
    relatedGuideSlugs: [
      "cookie-run-crumble-power-guide-stage-damage",
      "cookie-run-crumble-gear-sugar-rune-stats-guide",
      "cookie-run-crumble-rye-cookie-build-team",
    ],
    toc: [
      { id: "accuracy-vs-focus", label: "Separate Accuracy from Focus" },
      { id: "late-stage-checks", label: "Prepare for late-stage checks" },
      { id: "diagnose-missed-skills", label: "Read missed skills and debuffs" },
      { id: "gear-slot-setup", label: "Set up each gear group" },
      { id: "scorpion-and-debuffers", label: "Build Scorpion and debuffers" },
      { id: "power-still-matters", label: "Balance Power with consistency" },
      { id: "upgrade-without-perfect-gear", label: "Progress with imperfect gear" },
      { id: "quick-checklist", label: "Use the failure checklist" },
      { id: "accuracy-focus-faq", label: "Accuracy and Focus FAQ" },
    ],
    faq: [
      { question: "What does Accuracy do in CookieRun: Crumble?", answer: "Accuracy counters enemy Evasion. If a Cookie has too little Accuracy for the fight, an attack or skill can miss completely." },
      { question: "What does Focus do in CookieRun: Crumble?", answer: "Focus counters enemy Resistance. It helps poison, DEF Down, and other debuffs land after the skill hits." },
      { question: "How much Accuracy and Focus do I need?", answer: "Match the current stage check instead of using one permanent target. A Chapter 83 example asks for 558 Accuracy and 473 Focus, but earlier stages need less and later stages can ask for more." },
      { question: "What is the best late-stage equipment setup?", answer: "Favor Skill Amp on the top six slots, then add Accuracy to three or four of those pieces. Use Focus and Skill Haste on the bottom-right group, while the other slots cover Power and role-specific needs." },
      { question: "Can I clear a stage below the Accuracy or Focus check?", answer: "Yes. Repeated attempts can produce a run where the important hits and debuffs land. That is acceptable for one clear, but meeting the checks makes farming and repeated boss runs far more consistent." },
    ],
  },
  {
    slug: "cookie-run-crumble-rye-cookie-build-team",
    title: "CookieRun: Crumble Rye Cookie Build: Stop Judging Her Before 5 Stars",
    seoTitle: "CookieRun: Crumble Rye Cookie Build | Best Team & Runes",
    seoDescription: "Build Rye Cookie at her five-star breakpoint with the best Sugar Rune stats, Multi-strike partners, Fire Pets, and practical PvE or PvP team swaps.",
    excerpt: "Rye looks ordinary before five stars. Promote the part that matters, pair her with Orange and Scorpion, then build the stats that make every four-second cast count.",
    category: "cookies",
    tags: ["Rye Cookie", "Cookie Builds", "Sugar Runes", "Multi-strike", "Free to Play"],
    publishedAt: "2026-08-24",
    updatedAt: "2026-08-25",
    readingMinutes: 7,
    author: "Crumble Guide",
    coverCookieIds: ["cookie0515", "cookie0053", "cookie0181"],
    relatedGuideSlugs: [
      "cookie-run-crumble-accuracy-focus-guide",
      "cookie-run-crumble-gear-sugar-rune-stats-guide",
      "cookie-run-crumble-cool-mint-cookie-build-team",
    ],
    toc: [
      { id: "five-star-breakpoint", label: "Reach Rye's five-star breakpoint" },
      { id: "why-the-skill-works", label: "Understand Rye's short cooldown" },
      { id: "orange-multistrike-core", label: "Pair Rye with Orange Cookie" },
      { id: "teams-by-mode", label: "Build for PvE, bosses, and PvP" },
      { id: "recommended-team", label: "Copy the recommended team" },
      { id: "sugar-rune-stats", label: "Choose Rye's Sugar Rune stats" },
      { id: "fire-pets", label: "Pick Pets for the Fire core" },
      { id: "bad-matchups", label: "Know when to swap Rye out" },
      { id: "quick-build", label: "Follow the quick build" },
      { id: "rye-cookie-faq", label: "Rye Cookie FAQ" },
    ],
    faq: [
      { question: "Does Rye Cookie need five stars?", answer: "Five stars is the important breakpoint because it adds two hits and raises the skill from roughly 400% to 600% total damage per cast. She can fill a slot earlier, but the promoted version is the one worth building around." },
      { question: "What are the best Sugar Rune stats for Rye Cookie?", answer: "Prioritize ATK%, CRIT Chance, CRIT DMG, and Skill Amp. Skill Haste is acceptable, but the four-second base cooldown makes it less urgent than a strong offensive roll." },
      { question: "Who is Rye Cookie's best teammate?", answer: "Orange Cookie is the cleanest partner because she grants Multi-strike and CRIT Chance Up with near-continuous uptime. Scorpion Cookie is the best addition when the team needs more single-target boss damage." },
      { question: "Is Rye Cookie good in PvP?", answer: "Yes, especially as a burst finisher. She can remove damaged enemies quickly, although another Cookie may show more total damage over the full fight." },
      { question: "Which Pets work with Rye Cookie?", answer: "Sweet n' Sour, Floral Froglet, and Holy Baby Drop form a strong Fire damage setup by adding CRIT DMG, Fire ally CRIT DMG, and ATK. Hot Doggie or Gold Drop can replace one slot when the account needs Skill Amp or CRIT Chance." },
    ],
  },
  {
    slug: "cookie-run-crumble-cool-mint-cookie-build-team",
    title: "CookieRun: Crumble Cool Mint Build: Fix Her Fragile Summons",
    seoTitle: "CookieRun: Crumble Cool Mint Cookie Build & Best Team",
    seoDescription: "Build Cool Mint Cookie with Licorice and Witchberry, choose the best Sugar Rune stats, activate both synergies, and avoid boss fights that punish summons.",
    excerpt: "Cool Mint feels unreliable alone. Pair her with Licorice and Witchberry, activate Multi-shot and Duration, then use the core where split bosses make it matter.",
    category: "team-building",
    tags: ["Cool Mint Cookie", "Team Building", "Summons", "Sugar Runes", "Boss Teams"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-25",
    readingMinutes: 7,
    author: "Crumble Guide",
    coverCookieIds: ["cookie4006", "cookie0503", "cookie2006"],
    relatedGuideSlugs: [
      "cookie-run-crumble-rye-cookie-build-team",
      "cookie-run-crumble-gear-sugar-rune-stats-guide",
      "cookie-run-crumble-accuracy-focus-guide",
    ],
    toc: [
      { id: "why-cool-mint-fails", label: "Why Cool Mint feels weak" },
      { id: "summon-core", label: "Build the three-Cookie core" },
      { id: "synergy-providers", label: "Activate both synergies" },
      { id: "recommended-team", label: "Copy the recommended team" },
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
    relatedGuideSlugs: [
      "cookie-run-crumble-power-guide-stage-damage",
      "cookie-run-crumble-accuracy-focus-guide",
      "cookie-run-crumble-rye-cookie-build-team",
    ],
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
    relatedGuideSlugs: [
      "cookie-run-crumble-tips-hidden-mechanics",
      "cookie-run-crumble-power-guide-stage-damage",
      "cookie-run-crumble-gear-sugar-rune-stats-guide",
    ],
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
