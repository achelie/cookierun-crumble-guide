import { SiteDocument, metadata as siteMetadata, viewport as siteViewport } from "@/components/site-document";

export const metadata = siteMetadata;
export const viewport = siteViewport;

// Separate root layouts force a document navigation across the ad boundary.
// Removing a script after client navigation would not stop an initialized AdSense runtime.
export default function AdFreeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument>{children}</SiteDocument>;
}
