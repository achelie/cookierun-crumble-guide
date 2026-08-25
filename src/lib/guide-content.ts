import type { ComponentType } from "react";

type GuideModule = { default: ComponentType };

const guideLoaders: Record<string, () => Promise<GuideModule>> = {
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
