import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = Fredoka({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Nunito_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cookieruncrumbles.com"),
  title: { default: "CookieRun: Crumble Guide", template: "%s | Crumble Guide" },
  description: "CookieRun: Crumble cookies, pets, current tier lists, team ideas, and active coupon codes in one fast fan guide.",
  applicationName: "Crumble Guide",
  keywords: ["CookieRun Crumble", "CookieRun Crumble tier list", "CookieRun Crumble codes", "CookieRun Crumble cookies"],
  openGraph: { siteName: "CookieRun: Crumble Guide", type: "website", locale: "en_US", images: [{ url: "/opengraph-image" }] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#d94f3f", colorScheme: "light dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
