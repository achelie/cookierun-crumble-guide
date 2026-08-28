import DynamicGuidePage, { generateMetadata as generateGuideMetadata } from "@/app/(monetized)/guides/[slug]/page";

const slug = "cookie-run-crumble-gear-sugar-rune-stats-guide";
const params = Promise.resolve({ slug });

export function generateMetadata() {
  return generateGuideMetadata({ params });
}

export default function GearSugarRuneGuidePage() {
  return <DynamicGuidePage params={params} />;
}
