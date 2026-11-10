import { TierListView } from "@/components/tier-list-view";
import { metadataForPath, getGuideLocale } from "@/i18n/server";
type Props = {params: Promise<{locale:string}>};
export async function generateMetadata({params}:Props) {return metadataForPath("/tier-list/",getGuideLocale((await params).locale));}
export default async function Page({ params }: Props) {
  return <TierListView locale={getGuideLocale((await params).locale)} />;
}
