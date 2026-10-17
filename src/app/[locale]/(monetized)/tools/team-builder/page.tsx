import View from "@/app/(monetized)/tools/team-builder/page";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/tools/team-builder/",getGuideLocale((await params).locale));}
export default function Page() {return <View />;}
