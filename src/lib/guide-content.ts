import type { ComponentType } from "react";

type GuideModule = { default: ComponentType };

const guideLoaders: Record<string, () => Promise<GuideModule>> = {
  "cookie-run-crumble-fast-account-growth-guide": () => import("@/content/guides/cookie-run-crumble-fast-account-growth-guide.mdx"),
  "cookie-run-crumble-strawberry-crepe-cookie-build-team": () => import("@/content/guides/cookie-run-crumble-strawberry-crepe-cookie-build-team.mdx"),
  "cookie-run-crumble-guild-conquest-team-guide": () => import("@/content/guides/cookie-run-crumble-guild-conquest-team-guide.mdx"),
  "cookie-run-crumble-gingercraven-boss-guide": () => import("@/content/guides/cookie-run-crumble-gingercraven-boss-guide.mdx"),
  "cookie-run-crumble-brightseeker-cookie-build-team": () => import("@/content/guides/cookie-run-crumble-brightseeker-cookie-build-team.mdx"),
  "cookie-run-crumble-skill-amp-fix-rune-refund": () => import("@/content/guides/cookie-run-crumble-skill-amp-fix-rune-refund.mdx"),
  "cookie-run-crumble-pinot-noir-cookie-build": () => import("@/content/guides/cookie-run-crumble-pinot-noir-cookie-build.mdx"),
  "cookie-run-crumble-resource-guide-account-traps": () => import("@/content/guides/cookie-run-crumble-resource-guide-account-traps.mdx"),
  "cookie-run-crumble-tips-hidden-mechanics": () => import("@/content/guides/cookie-run-crumble-tips-hidden-mechanics.mdx"),
  "cookie-run-crumble-power-guide-stage-damage": () => import("@/content/guides/cookie-run-crumble-power-guide-stage-damage.mdx"),
  "cookie-run-crumble-accuracy-focus-guide": () => import("@/content/guides/cookie-run-crumble-accuracy-focus-guide.mdx"),
  "cookie-run-crumble-rye-cookie-build-team": () => import("@/content/guides/cookie-run-crumble-rye-cookie-build-team.mdx"),
  "cookie-run-crumble-cool-mint-cookie-build-team": () => import("@/content/guides/cookie-run-crumble-cool-mint-cookie-build-team.mdx"),
  "cookie-run-crumble-gear-sugar-rune-stats-guide": () => import("@/content/guides/cookie-run-crumble-gear-sugar-rune-stats-guide.mdx"),
  "cookie-run-crumble-beginner-progression-guide": () => import("@/content/guides/cookie-run-crumble-beginner-progression-guide.mdx"),
};

export async function loadGuideContent(slug: string) {
  const loader = guideLoaders[slug];
  if (!loader) return undefined;
  const module = await loader();
  return module.default;
}
