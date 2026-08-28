import DynamicGuidePage, { generateMetadata as generateGuideMetadata } from "@/app/guides/[slug]/page";

const slug = "cookie-run-crumble-pinot-noir-cookie-build";
const params = Promise.resolve({ slug });

export function generateMetadata() {
  return generateGuideMetadata({ params });
}

export default function PinotNoirCookieGuidePage() {
  return <DynamicGuidePage params={params} />;
}
