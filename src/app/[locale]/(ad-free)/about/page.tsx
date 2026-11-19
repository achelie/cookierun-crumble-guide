import { AboutView as View } from "@/app/(ad-free)/about/page";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/about/",getGuideLocale((await params).locale));}
export default async function Page({params}: Props) {return <View locale={getGuideLocale((await params).locale)} />;}
