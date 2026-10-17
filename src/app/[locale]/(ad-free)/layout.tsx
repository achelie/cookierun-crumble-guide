import { notFound } from "next/navigation";
import { SiteDocument, metadata as baseMetadata, viewport } from "@/components/site-document";
import { localeFromSegment, localeConfig, translatedLocales } from "@/i18n/config";
export { viewport };
export const metadata = baseMetadata;
export const dynamicParams = false;
export function generateStaticParams() { return translatedLocales.map(locale => ({locale: localeConfig[locale].prefix.slice(1)})); }
export default async function Layout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const locale = localeFromSegment((await params).locale);
  if (!locale) notFound();
  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
