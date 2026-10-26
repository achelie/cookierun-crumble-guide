import View, { generateMetadata as guideMetadata } from "@/app/(monetized)/guides/[slug]/page";
import { getGuideLocale } from "@/i18n/server";
import { guides } from "@/data/guides";
import { guideSupportsLocale } from "@/i18n/guide-availability";
export function generateStaticParams({params}: {params: {locale: string}}) {
  const locale = getGuideLocale(params.locale);
  return guides.filter((guide) => guideSupportsLocale(guide.slug, locale)).map((guide) => ({slug: guide.slug}));
}
export const dynamicParams = false;
type Props = {params: Promise<{locale:string;slug:string}>};
export async function generateMetadata({params}:Props) {const p=await params;getGuideLocale(p.locale);return guideMetadata({params:Promise.resolve(p)});}
export default async function Page({params}:Props) {const p=await params;getGuideLocale(p.locale);return <View params={Promise.resolve(p)} />;}
