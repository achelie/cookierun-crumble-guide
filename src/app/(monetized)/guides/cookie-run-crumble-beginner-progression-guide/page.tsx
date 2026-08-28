import DynamicGuidePage, { generateMetadata as generateGuideMetadata } from "@/app/(monetized)/guides/[slug]/page";

const slug = "cookie-run-crumble-beginner-progression-guide";
const params = Promise.resolve({ slug });

export function generateMetadata() {
  return generateGuideMetadata({ params });
}

export default function BeginnerProgressionGuidePage() {
  return <DynamicGuidePage params={params} />;
}
