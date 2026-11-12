import { CodesView } from "@/app/(ad-free)/codes/page";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/codes/",getGuideLocale((await params).locale));}
export default async function Page({params}: Props) {return <CodesView locale={getGuideLocale((await params).locale)} />;}
