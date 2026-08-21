import type { ComponentType } from "react";

type GuideModule = { default: ComponentType };

const guideLoaders: Record<string, () => Promise<GuideModule>> = {
  "cookie-run-crumble-beginner-progression-guide": () => import("@/content/guides/cookie-run-crumble-beginner-progression-guide.mdx"),
};

export async function loadGuideContent(slug: string) {
  const loader = guideLoaders[slug];
  if (!loader) return undefined;
  const module = await loader();
  return module.default;
}
