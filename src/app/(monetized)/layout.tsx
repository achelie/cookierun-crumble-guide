import { SiteDocument, metadata as siteMetadata, viewport as siteViewport } from "@/components/site-document";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function AdSenseContentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument advertising>{children}</SiteDocument>;
}
