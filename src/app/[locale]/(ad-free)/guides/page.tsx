import View from "@/app/(ad-free)/guides/page";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/guides/",getGuideLocale((await params).locale));}
export default async function Page({params}:Props) {getGuideLocale((await params).locale);return <View params={params} />;}
