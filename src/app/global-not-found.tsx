import type { Metadata } from "next";
import Link from "next/link";
import { siteName, siteTitle, siteUrl, socialImageUrl } from "@/lib/site-identity";
import "./globals.css";

const title = `Page not found | ${siteTitle}`;
const description = "This page may have moved. Return to Crumble Guide to find what you were looking for.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: false, follow: true },
  openGraph: { title, description, siteName, images: [{ url: socialImageUrl, alt: siteName }] },
  twitter: { card: "summary_large_image", title, description, images: [socialImageUrl] },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="page-shell">
          <h1 style={{ fontSize: "var(--text-title)" }}>404 · Page not found</h1>
          <p>{description}</p>
          <Link href="/">Back to {siteName}</Link>
        </main>
      </body>
    </html>
  );
}
