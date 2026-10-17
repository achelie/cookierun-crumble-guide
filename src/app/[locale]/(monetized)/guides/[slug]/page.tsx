import View, { generateMetadata as guideMetadata } from "@/app/(monetized)/guides/[slug]/page";
import { getGuideLocale } from "@/i18n/server";
export { generateStaticParams } from "@/app/(monetized)/guides/[slug]/page";
export const dynamicParams = false;
type Props = {params: Promise<{locale:string;slug:string}>};
export async function generateMetadata({params}:Props) {const p=await params;getGuideLocale(p.locale);return guideMetadata({params:Promise.resolve(p)});}
export default async function Page({params}:Props) {const p=await params;getGuideLocale(p.locale);return <View params={Promise.resolve(p)} />;}
