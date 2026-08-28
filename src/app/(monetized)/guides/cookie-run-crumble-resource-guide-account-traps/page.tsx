import DynamicGuidePage, { generateMetadata as generateGuideMetadata } from "@/app/(monetized)/guides/[slug]/page";

const slug = "cookie-run-crumble-resource-guide-account-traps";
const params = Promise.resolve({ slug });

export function generateMetadata() {
  return generateGuideMetadata({ params });
}

export default function ResourceGuidePage() {
  return <DynamicGuidePage params={params} />;
}
