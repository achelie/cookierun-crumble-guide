import View from "@/app/(monetized)/tier-list/page";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/tier-list/",getGuideLocale((await params).locale));}
export default function Page() {return <View />;}
