import DynamicGuidePage, { generateMetadata as generateGuideMetadata } from "@/app/guides/[slug]/page";

const slug = "cookie-run-crumble-accuracy-focus-guide";
const params = Promise.resolve({ slug });

export function generateMetadata() {
  return generateGuideMetadata({ params });
}

export default function AccuracyFocusGuidePage() {
  return <DynamicGuidePage params={params} />;
}
