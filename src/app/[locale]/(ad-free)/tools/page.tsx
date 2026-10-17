import View from "@/app/(ad-free)/tools/page";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/tools/",getGuideLocale((await params).locale));}
export default function Page() {return <View />;}
