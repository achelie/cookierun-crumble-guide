import DynamicGuidePage, { generateMetadata as generateGuideMetadata } from "@/app/(monetized)/guides/[slug]/page";

const slug = "cookie-run-crumble-power-guide-stage-damage";
const params = Promise.resolve({ slug });

export function generateMetadata() {
  return generateGuideMetadata({ params });
}

export default function PowerGuidePage() {
  return <DynamicGuidePage params={params} />;
}
