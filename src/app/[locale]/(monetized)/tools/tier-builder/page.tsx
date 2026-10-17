import View from "@/app/(monetized)/tools/tier-builder/page";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/tools/tier-builder/",getGuideLocale((await params).locale));}
export default function Page() {return <View />;}
