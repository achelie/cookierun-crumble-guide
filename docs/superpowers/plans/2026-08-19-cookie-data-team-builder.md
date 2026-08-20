# Cookie Data and Team Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete Cookie combat metadata and local taxonomy assets, then upgrade Teams to 12 ordered Cookie slots, 3 ordered Pet slots, shareable URLs, and calculated Granted/Active synergy summaries.

**Architecture:** Keep all content as build-time TypeScript data and local public assets. Put reusable query and synergy rules in pure utilities, then compose focused Cookie, Pet-slot, and synergy presentation components into the existing pages. Preserve the server-rendered route shells while limiting client state to filters and the Team Builder.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind CSS 4, Iconify/Lucide glyphs, Vitest, OpenNext Cloudflare

---

## File Map

- Modify `package.json` — test scripts and Vitest dependency.
- Create `vitest.config.ts` — TypeScript path alias and Node test environment.
- Create `src/data/cookies.test.ts` — Cookie schema, snapshot, and local asset validation.
- Modify `src/data/cookies.ts` — complete Cookie taxonomy and effect data.
- Modify `src/data/teams.test.ts` — recommended-team formation validation.
- Modify `src/data/teams.ts` — 12 Cookie and 3 Pet recommended formations.
- Create `src/lib/team-synergy.test.ts` — Granted and Active behavior.
- Create `src/lib/team-synergy.ts` — pure synergy calculation.
- Create `src/lib/team-query.test.ts` — query parsing and serialization behavior.
- Create `src/lib/team-query.ts` — ordered Cookie and Pet URL state.
- Create `src/components/cookie-card.tsx` — Cookie-only combat metadata card.
- Modify `src/components/entity-card.tsx` — keep the generic Pet card focused.
- Modify `src/components/entity-codex.tsx` — render Cookie cards and add Cookie taxonomy filters.
- Create `src/components/synergy-badge.tsx` — one accessible local synergy badge.
- Create `src/components/synergy-summary.tsx` — Granted and Active panels.
- Create `src/components/pet-slots.tsx` — shared three-slot Pet lineup.
- Modify `src/components/team-builder.tsx` — 12 + 3 selection, URL state, and synergy summary.
- Modify `src/components/team-builder-skeleton.tsx` — accurate loading formation.
- Modify `src/components/team-showcase.tsx` — Cookies, Pets, and calculated synergy.
- Modify `src/app/globals.css` — responsive Cookie metadata and Teams presentation.
- Modify `README.md`, `src/data/pets.ts`, `src/data/tier-list.ts`, `src/data/codes.ts`, and `src/app/tier-list/page.tsx` — remove research-source references.
- Add local taxonomy images under `public/images/elements/`, `public/images/roles/`, `public/images/synergies/`, `public/images/synergy-badges/`, and `public/images/buffs/`.

The workspace has no `.git` directory. Commit steps are intentionally replaced by verification checkpoints; do not initialize or publish a repository without user authorization.

### Task 1: Read Version-Specific Guidance and Add the Test Harness

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Read the repository and Next.js 16 guidance before code changes**

Run:

```powershell
Get-Content -Raw AGENTS.md
Get-Content -Raw node_modules\next\dist\docs\01-app\02-guides\testing\vitest.md
Get-Content -Raw node_modules\next\dist\docs\01-app\03-api-reference\04-functions\use-search-params.md
Get-Content -Raw node_modules\next\dist\docs\01-app\01-getting-started\12-images.md
Get-Content -Raw node_modules\next\dist\docs\01-app\02-guides\production-checklist.md
```

Expected: the current Next.js 16 instructions are available locally and no deprecated API is planned.

- [ ] **Step 2: Install Vitest**

Run:

```powershell
npm install --save-dev vitest
```

Expected: `vitest` appears in `devDependencies` and the lockfile updates.

- [ ] **Step 3: Add test scripts**

Add to `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Configure Vitest aliases**

Create `vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 5: Verify the empty harness**

Run: `npm test -- --passWithNoTests`

Expected: PASS with no test files found.

### Task 2: Define and Populate the Cookie Combat Schema

**Files:**
- Create: `src/data/cookies.test.ts`
- Modify: `src/data/cookies.ts`
- Add: `public/images/elements/*.webp`
- Add: `public/images/roles/*.webp`
- Add: `public/images/synergies/*.webp`
- Add: `public/images/synergy-badges/*.webp`
- Add: `public/images/buffs/*.webp`

- [ ] **Step 1: Write failing schema and asset tests**

Create `src/data/cookies.test.ts`:

```ts
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buffDefinitions,
  cookies,
  elementDefinitions,
  roleDefinitions,
  synergyDefinitions,
} from "./cookies";

describe("cookie catalog", () => {
  it("contains one unique local record for every current cookie", () => {
    expect(cookies.length).toBe(70);
    expect(new Set(cookies.map(({ id }) => id)).size).toBe(cookies.length);
    expect(cookies.every(({ image }) => image.startsWith("/images/cookies/"))).toBe(true);
  });

  it("defines every requested combat field", () => {
    for (const cookie of cookies) {
      expect(elementDefinitions[cookie.element]).toBeDefined();
      expect(roleDefinitions[cookie.role]).toBeDefined();
      expect(Array.isArray(cookie.grantedSynergies)).toBe(true);
      expect(Array.isArray(cookie.receivedSynergies)).toBe(true);
      expect(Array.isArray(cookie.buffs)).toBe(true);
      cookie.grantedSynergies.forEach((value) => expect(synergyDefinitions[value]).toBeDefined());
      cookie.receivedSynergies.forEach((value) => expect(synergyDefinitions[value]).toBeDefined());
      cookie.buffs.forEach((value) => expect(buffDefinitions[value]).toBeDefined());
    }
  });

  it("ships every referenced image locally", () => {
    const paths = [
      ...cookies.map(({ image }) => image),
      ...Object.values(elementDefinitions).map(({ image }) => image),
      ...Object.values(roleDefinitions).map(({ image }) => image),
      ...Object.values(synergyDefinitions).map(({ image }) => image),
      ...Object.values(buffDefinitions).map(({ image }) => image),
    ];
    for (const image of paths) {
      expect(existsSync(join(process.cwd(), "public", image))).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/data/cookies.test.ts`

Expected: FAIL because taxonomy exports and Cookie fields do not exist.

- [ ] **Step 3: Add strict types and local definition maps**

Use these public contracts in `src/data/cookies.ts`:

```ts
export const elements = ["Fire", "Water", "Grass", "Light", "Dark", "Neutral"] as const;
export const roles = ["Charge", "Ranged", "Defense", "Support"] as const;
export const synergies = ["Area", "Chain", "Duration", "Multi-shot", "Multi-strike", "Pierce", "Projectile Speed"] as const;
export const buffs = ["ATK Up", "DEF Down", "Move Speed Up", "Skill Amp Up", "Healing", "Shield", "Stun"] as const;

export type Element = (typeof elements)[number];
export type Role = (typeof roles)[number];
export type Synergy = (typeof synergies)[number];
export type Buff = (typeof buffs)[number];

type TaxonomyDefinition = { label: string; image: string };

export type Cookie = {
  id: string;
  name: string;
  rarity: Rarity;
  image: string;
  element: Element;
  role: Role;
  grantedSynergies: Synergy[];
  receivedSynergies: Synergy[];
  buffs: Buff[];
};
```

Definition maps must use local paths such as `/images/elements/fire.webp`, `/images/roles/charge.webp`, and `/images/synergies/chain.webp`.

- [ ] **Step 4: Import the complete approved snapshot**

Replace the three-column `raw` tuples with typed Cookie objects for all 70 current records. Map the source semantics exactly:

```ts
{
  id: "cookie0070",
  name: "Wind Archer Cookie",
  rarity: "TSSR",
  image: "/images/cookies/cookie0070.webp",
  element: "Grass",
  role: "Ranged",
  grantedSynergies: [],
  receivedSynergies: ["Pierce"],
  buffs: [],
}
```

Do not infer missing values. Empty source arrays remain empty arrays.

- [ ] **Step 5: Download taxonomy assets outside runtime code**

Download the approved snapshot's 6 Element, 4 Role, 7 Synergy, 4 direction-badge, and available Buff images directly into the directories listed in the file map. Confirm every output file is WebP and nonzero length. Do not retain a fetch script, response bundle, source hostname, or download URL inside the project.

- [ ] **Step 6: Run the focused test and verify GREEN**

Run: `npm test -- src/data/cookies.test.ts`

Expected: PASS for count, schema, taxonomy values, and every local asset path.

### Task 3: Implement the Pure Synergy Model

**Files:**
- Create: `src/lib/team-synergy.test.ts`
- Create: `src/lib/team-synergy.ts`

- [ ] **Step 1: Write failing behavior tests**

Create `src/lib/team-synergy.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import type { Cookie } from "@/data/cookies";
import { calculateTeamSynergies } from "./team-synergy";

const cookie = (overrides: Partial<Cookie>): Cookie => ({
  id: "cookie-test",
  name: "Test Cookie",
  rarity: "C",
  image: "/images/cookies/test.webp",
  element: "Neutral",
  role: "Support",
  grantedSynergies: [],
  receivedSynergies: [],
  buffs: [],
  ...overrides,
});

describe("calculateTeamSynergies", () => {
  it("returns ordered unique granted and active synergies", () => {
    const result = calculateTeamSynergies([
      cookie({ grantedSynergies: ["Chain", "Pierce"] }),
      cookie({ id: "receiver", grantedSynergies: ["Chain"], receivedSynergies: ["Pierce"] }),
    ]);
    expect(result).toEqual({ granted: ["Chain", "Pierce"], active: ["Pierce"], activeApplications: 1 });
  });

  it("returns empty values for an empty team", () => {
    expect(calculateTeamSynergies([])).toEqual({ granted: [], active: [], activeApplications: 0 });
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/lib/team-synergy.test.ts`

Expected: FAIL because `calculateTeamSynergies` does not exist.

- [ ] **Step 3: Implement the minimal pure function**

Create `src/lib/team-synergy.ts`:

```ts
import type { Cookie, Synergy } from "@/data/cookies";

export function calculateTeamSynergies(team: Cookie[]) {
  const granted = Array.from(new Set(team.flatMap((cookie) => cookie.grantedSynergies)));
  const grantedSet = new Set(granted);
  const active = granted.filter((value) => team.some((cookie) => cookie.receivedSynergies.includes(value)));
  const activeSet = new Set(active);
  const activeApplications = team.reduce(
    (total, cookie) => total + cookie.receivedSynergies.filter((value) => activeSet.has(value)).length,
    0,
  );
  return { granted: granted as Synergy[], active: active as Synergy[], activeApplications };
}
```

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run: `npm test -- src/lib/team-synergy.test.ts`

Expected: 2 tests PASS.

### Task 4: Preserve Ordered Team State in the URL

**Files:**
- Create: `src/lib/team-query.test.ts`
- Create: `src/lib/team-query.ts`

- [ ] **Step 1: Write failing parser and serializer tests**

Create `src/lib/team-query.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { parseTeamQuery, serializeTeamQuery } from "./team-query";

const cookieIds = new Set(["cookie-a", "cookie-b"]);
const petIds = new Set(["pet-a", "pet-b"]);

describe("team query", () => {
  it("preserves slot order and empty slots", () => {
    expect(parseTeamQuery("cookie-a,,cookie-b", "pet-b,,pet-a", cookieIds, petIds)).toEqual({
      cookies: ["cookie-a", null, "cookie-b", ...Array(9).fill(null)],
      pets: ["pet-b", null, "pet-a"],
    });
  });

  it("removes unknown and duplicate members", () => {
    expect(parseTeamQuery("cookie-a,missing,cookie-a", "pet-a,pet-a", cookieIds, petIds)).toEqual({
      cookies: ["cookie-a", null, null, ...Array(9).fill(null)],
      pets: ["pet-a", null, null],
    });
  });

  it("serializes both formations", () => {
    expect(serializeTeamQuery(["cookie-a", null], [null, "pet-b"])).toEqual({
      team: "cookie-a",
      pets: ",pet-b",
    });
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/lib/team-query.test.ts`

Expected: FAIL because the query module does not exist.

- [ ] **Step 3: Implement fixed-size parsing and serialization**

Create `src/lib/team-query.ts` with exported `cookieSlotCount = 12`, `petSlotCount = 3`, `parseTeamQuery`, and `serializeTeamQuery`. Parsing must split on commas, retain indexes, replace invalid or repeated IDs with `null`, truncate to the fixed count, and pad with `null`. Serialization must trim only trailing empty slots and retain interior empty fields.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run: `npm test -- src/lib/team-query.test.ts`

Expected: 3 tests PASS.

### Task 5: Render Complete Cookie Cards

**Files:**
- Create: `src/components/cookie-card.tsx`
- Create: `src/components/synergy-badge.tsx`
- Modify: `src/components/entity-card.tsx`
- Modify: `src/components/entity-codex.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add Cookie-specific rendering without weakening Pet types**

Create a `CookieCard({ cookie }: { cookie: Cookie })` component. It must render the portrait, rarity, name, Element icon and label, Role icon and label, Granted badges, Received badges, and Buff labels. Empty arrays render the text `None`; the root remains an `article` with no link or click handler.

Create `SynergyBadge({ value, direction, active? })` using the local synergy image plus the local send or receive direction asset. Give the wrapper an accessible name such as `Granted Chain synergy`.

- [ ] **Step 2: Route Cookie and Pet collections to focused cards**

Change `EntityCodex` to a discriminated union:

```ts
type EntityCodexProps =
  | { kind: "cookie"; items: Cookie[] }
  | { kind: "pet"; items: Pet[] };
```

For `kind === "cookie"`, render `CookieCard`; for Pets, retain `EntityCard`. Add Element and Role selects only for Cookies while preserving name and rarity filters.

- [ ] **Step 3: Add responsive, textured card styling**

In `src/app/globals.css`, add asymmetrical metadata rows, a dark baked-brown gradient with the existing noise treatment, 28–36 px taxonomy icons, and compact mobile spacing. Avoid equal-height dashboard boxes, Tailwind default palette values, purple/indigo, fluorescent green, and emoji icons.

Use short opacity/transform transitions with a custom cubic Bézier. Add a `prefers-reduced-motion: reduce` rule that removes nonessential transitions.

- [ ] **Step 4: Run TypeScript and production compilation**

Run:

```powershell
npx tsc --noEmit
npm run build
```

Expected: both commands exit 0 and `/cookies/` remains statically generated.

### Task 6: Add Three Pets and Synergy Summaries to Teams

**Files:**
- Create: `src/data/teams.test.ts`
- Modify: `src/data/teams.ts`
- Create: `src/components/pet-slots.tsx`
- Create: `src/components/synergy-summary.tsx`
- Modify: `src/components/team-showcase.tsx`
- Modify: `src/components/team-builder.tsx`
- Modify: `src/components/team-builder-skeleton.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write failing recommended-team tests**

Create `src/data/teams.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { cookieById } from "./cookies";
import { petById } from "./pets";
import { recommendedTeams } from "./teams";

describe("recommended teams", () => {
  it("contains 12 valid cookies and 3 valid pets per team", () => {
    for (const team of recommendedTeams) {
      expect(team.cookies).toHaveLength(12);
      expect(team.pets).toHaveLength(3);
      team.cookies.forEach((id) => expect(cookieById.has(id)).toBe(true));
      team.pets.forEach((id) => expect(petById.has(id)).toBe(true));
    }
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/data/teams.test.ts`

Expected: FAIL because `pets` and `petById` are missing.

- [ ] **Step 3: Complete team data contracts**

Export `petById` from `src/data/pets.ts`. Add `pets: string[]` to `RecommendedTeam` and assign three valid Pet IDs to Best Overall, F2P Starter, and Single Boss Poison. Replace `teamSize` with named `cookieSlotCount` and `petSlotCount`, or re-export the constants from `team-query.ts` without introducing a circular import.

- [ ] **Step 4: Render the shared static formation**

Create `PetSlots` to render exactly three ordered Pet portraits or numbered empty slots. Create `SynergySummary` to call `calculateTeamSynergies` and render adjacent `Granted` and `Active` panels. Active badges use orange, a restrained glow, and an accessible active label; Granted badges use deep teal.

Update `TeamShowcase` to resolve all Cookie and Pet IDs, render the 12 Cookie formation, the 3 Pet formation, and the shared summary.

- [ ] **Step 5: Upgrade the Team Builder**

Store fixed arrays of `(string | null)[]` for Cookies and Pets. Initialize them through `parseTeamQuery(params.get("team"), params.get("pets"), cookieIds, petIds)`. Place a selection into the first empty slot, remove by setting the clicked index to `null`, and update both query parameters through `serializeTeamQuery` and `router.replace`.

Render:

- 12 Cookie slots
- 3 Pet slots
- the live `SynergySummary`
- separate Cookie and Pet search fields and candidate lists
- one Clear team action
- the existing share-link action with clipboard fallback

Keep the complete candidate catalog available; only selected IDs are excluded.

- [ ] **Step 6: Match the supplied formation visual**

In `src/app/globals.css`, use an asymmetrical desktop formation with the three Pet slots visibly separated from the Cookie grid. Stack cleanly on small screens. Style the two synergy panels as dark inset surfaces with teal Granted badges and orange Active badges. Avoid perfect centering and equal-width generic columns.

- [ ] **Step 7: Update the loading skeleton**

Render 12 Cookie placeholders, 3 Pet placeholders, and two synergy-panel placeholders so Suspense does not cause layout shift.

- [ ] **Step 8: Run focused and full tests**

Run:

```powershell
npm test -- src/data/teams.test.ts src/lib/team-query.test.ts src/lib/team-synergy.test.ts
npm test
```

Expected: all tests PASS.

### Task 7: Remove Source References and Verify the Release

**Files:**
- Modify: `README.md`
- Modify: `src/data/pets.ts`
- Modify: `src/data/tier-list.ts`
- Modify: `src/data/codes.ts`
- Modify: `src/app/tier-list/page.tsx`
- Verify: all changed source, data, documentation, and public assets

- [ ] **Step 1: Remove forbidden project references**

Delete source-name and source-URL mentions from comments, visible copy, README prose, metadata, and data files. Use neutral wording such as `Public game-data snapshot checked on 2026-08-19` only when a comment is useful.

- [ ] **Step 2: Search the shippable project**

Run:

```powershell
$forbiddenName = 'crumble' + 'hub'
rg -n -i "$forbiddenName|$forbiddenName\.co" src public README.md package.json next.config.ts open-next.config.ts wrangler.jsonc docs
```

Expected: no matches. If the design and plan documents are included in the search, they must also remain free of the forbidden name and URL.

- [ ] **Step 3: Run static verification**

Run:

```powershell
npm test
npx tsc --noEmit
npm run build
npx opennextjs-cloudflare build
```

Expected: every command exits 0; `/`, `/cookies/`, `/pets/`, `/tier-list/`, `/teams/`, and `/codes/` are generated successfully.

- [ ] **Step 4: Run browser verification**

Start the development server and verify at desktop and mobile widths:

- all Cookie fields and local images render
- Cookie name, rarity, Element, and Role filters work together
- recommended teams show 12 Cookies and 3 Pets
- selected members restore after reloading a shared URL
- interior empty URL slots retain their position
- Granted and Active values update correctly
- keyboard users can add, remove, clear, and copy
- reduced-motion mode removes nonessential motion
- no runtime request targets the research source

- [ ] **Step 5: Record final workspace status**

Run:

```powershell
Get-ChildItem public\images\elements,public\images\roles,public\images\synergies,public\images\synergy-badges,public\images\buffs -File | Select-Object DirectoryName,Name,Length
rg -n "team=|pets=" src\components src\lib
```

Expected: all taxonomy images have nonzero sizes and both query parameters are wired through the pure URL utility and Team Builder.
