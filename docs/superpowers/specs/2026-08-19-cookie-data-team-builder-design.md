# Cookie Data and Team Builder Design

## Goal

Extend the existing CookieRun: Crumble guide MVP without adding pages, a backend, accounts, or remote runtime dependencies. Cookie cards will expose the complete combat taxonomy requested by the user, and the Teams page will support the in-game 12 Cookie and 3 Pet formation with calculated synergy summaries.

The finished project must not contain the name, URL, branding, or runtime references of the research website. All imported visual assets are stored locally.

## Scope

### Included

- Refresh the Cookie snapshot against the current public catalog.
- Add `element`, `role`, `grantedSynergies`, `receivedSynergies`, and `buffs` to every Cookie record.
- Download Element, Role, Synergy, direction-badge, and Buff assets into `public/images/`.
- Display the new fields on non-clickable Cookie cards.
- Keep the complete Cookie collection searchable and filterable.
- Add 3 Pet slots to recommended teams and the Team Builder.
- Preserve 12 ordered Cookie slots.
- Calculate and display Granted and Active synergy summaries.
- Encode Cookie and Pet selections in shareable URL query parameters.
- Remove all research-site names, links, comments, metadata, and documentation references from the project.
- Verify responsive layouts, accessibility, static rendering, and the Cloudflare production build.

### Excluded

- Cookie or Pet detail pages
- More than 12 active Cookie slots
- Drag and drop
- Database, authentication, APIs, CMS, likes, comments, or public team sharing
- Runtime requests to the research website

## Data Model

`src/data/cookies.ts` remains the source of truth for Cookie data. Its records use stable local IDs and contain:

- `id`
- `name`
- `rarity`
- `image`
- `element`
- `role`
- `grantedSynergies`
- `receivedSynergies`
- `buffs`

The file also exports the supported Element, Role, Synergy, and Buff label sets or mappings required by Cookie filters and presentation. All image values are local `/images/...` paths.

`src/data/teams.ts` continues to define recommended teams. Every team has exactly 12 ordered Cookie IDs and 3 ordered Pet IDs. Invalid IDs are rejected by development-time data validation tests.

The public snapshot is authoritative. The current bundle contains 70 unique Cookie records, so all 70 are retained even if a stale visible counter reports one fewer.

## Asset Layout

- `public/images/cookies/` — Cookie portraits
- `public/images/pets/` — Pet portraits
- `public/images/elements/` — Element icons
- `public/images/roles/` — Role icons
- `public/images/synergies/` — Synergy icons
- `public/images/synergy-badges/` — granted and received direction layers
- `public/images/buffs/` — Buff and debuff icons when available

No component renders a remote URL. Download scripts, temporary responses, and source URLs are not shipped with the project.

## Component Boundaries

### Cookie Card

The card keeps its portrait, rarity, and name hierarchy. A compact information rail shows Element and Role with an icon and readable label. Two synergy rows show Granted and Received icons with direction cues. A final Buff row lists combat effects and explicitly displays `None` when empty.

The full card remains non-interactive and is not linked to a detail route. On small screens every field remains visible; spacing and icon sizes compress instead of hiding information.

### Synergy Summary

`SynergySummary` receives selected Cookie records and renders two neighboring panels:

- Granted: the ordered union of all `grantedSynergies`.
- Active: a Granted synergy for which at least one selected Cookie lists the same value in `receivedSynergies`.

Granted uses a deep teal treatment. Active uses warm orange with a restrained glow. Icon badges retain text labels for accessibility through visible captions or accessible names.

The calculation lives in a pure utility rather than inside the visual component, allowing deterministic unit tests.

### Team Builder

The builder has 12 Cookie slots and 3 Pet slots. It provides separate Cookie and Pet candidate areas with search and existing rarity filters. Selection order matches slot order. Users can remove one member or clear the full team.

The existing `team` query parameter remains for backward compatibility. Pet selections use `pets`. Both parameters preserve order and empty slots so a refreshed or shared URL reconstructs the same formation. Unknown and duplicate IDs are handled defensively without crashing the page.

Recommended team cards use the same formation and synergy components as the builder so presentation and calculation cannot drift.

## Data Flow

1. Static TypeScript files provide Cookies, Pets, and recommended teams at build time.
2. Server-rendered route shells provide the indexable page copy and initial content.
3. The Team Builder reads validated query parameters on the client.
4. Selection changes update local state and replace the URL without a navigation reload.
5. The pure synergy utility derives Granted and Active values from selected Cookies.
6. Sharing copies the current canonical URL.

No API, persistence layer, or runtime content fetch is introduced.

## Visual and Motion Direction

The existing CookieRun-inspired visual language is extended rather than replaced. Layouts remain asymmetrical and textured, avoiding equal-column dashboard patterns and flat backgrounds. Teal and orange synergy panels follow the supplied reference's information hierarchy without copying its exact UI.

State changes use short non-linear transitions, primarily opacity and transform. `prefers-reduced-motion` disables nonessential motion. No emoji is used as a functional icon; Iconify remains the interface-icon system while game taxonomy uses local game assets.

## Error Handling

- Unknown query IDs are ignored or rendered as empty slots.
- Duplicate query IDs are normalized according to the builder's current unique-selection rule.
- Missing optional synergy or Buff data renders `None`.
- Broken local image paths keep useful alternative text and are caught by asset validation tests.
- Clipboard failure falls back to a selectable URL rather than silently failing.

## Testing and Verification

Implementation follows test-driven development:

1. Add failing tests for the expanded Cookie schema and complete local asset paths.
2. Add failing tests for the 12 Cookie and 3 Pet team invariant.
3. Add failing unit tests for Granted and Active synergy calculation, including empty and duplicate inputs.
4. Add failing tests for query parsing and serialization, including empty slots and invalid IDs.
5. Implement the smallest production changes required to pass each test group.
6. Run lint, TypeScript checks, the Next.js production build, and the OpenNext Cloudflare build.
7. Search the complete project, excluding generated dependencies and build output, for the forbidden research-site name and URL.
8. Run desktop and mobile browser checks for Cookie cards, recommended teams, the builder, URL restoration, keyboard use, and reduced motion.

## Acceptance Criteria

- Every current Cookie has the five requested combat-data categories.
- Every taxonomy and character image is served locally.
- Cookie cards remain readable on mobile without opening a detail view.
- Recommended teams and the builder show 12 Cookie slots and 3 Pet slots.
- Granted and Active panels match the requested semantic distinction.
- Shared URLs restore ordered Cookie and Pet formations.
- No shipped project file or rendered page mentions or links to the research website.
- All scoped tests and production builds pass.
