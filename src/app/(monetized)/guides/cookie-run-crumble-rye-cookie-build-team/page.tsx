import DynamicGuidePage, { generateMetadata as generateGuideMetadata } from "@/app/(monetized)/guides/[slug]/page";

const slug = "cookie-run-crumble-rye-cookie-build-team";
const params = Promise.resolve({ slug });

export function generateMetadata() {
  return generateGuideMetadata({ params });
}

export default function RyeCookieGuidePage() {
  return <DynamicGuidePage params={params} />;
}
