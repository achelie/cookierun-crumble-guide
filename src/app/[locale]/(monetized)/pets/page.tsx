import View from "@/app/(monetized)/pets/page";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/pets/",getGuideLocale((await params).locale));}
export default function Page() {return <View />;}
