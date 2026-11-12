import { BuilderView as View } from "@/app/(ad-free)/tools/tier-builder/page";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/tools/tier-builder/",getGuideLocale((await params).locale));}
export default async function Page({params}: Props) {return <View locale={getGuideLocale((await params).locale)} />;}
