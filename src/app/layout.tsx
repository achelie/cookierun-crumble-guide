import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { seoPages, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const display = Fredoka({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Nunito_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "600", "700", "800"] });
const ahrefsAnalyticsSrc = "https://analytics.ahrefs.com/analytics.js";
const ahrefsAnalyticsKey = "9FgL6cL8Tu31DN6c7YYLRQ";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seoPages.home.title, template: "%s" },
  description: seoPages.home.description,
  alternates: { canonical: "/" },
  applicationName: "Crumble Guide",
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "96x96" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: seoPages.home.title,
    description: seoPages.home.description,
    url: "/",
    siteName,
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", alt: seoPages.home.h1 }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoPages.home.title,
    description: seoPages.home.description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#d94f3f", colorScheme: "light dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          src={ahrefsAnalyticsSrc}
          data-key={ahrefsAnalyticsKey}
          async
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
