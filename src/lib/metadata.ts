import type { Metadata } from "next";

const siteName = "CookieRun: Crumble Guide";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `https://www.cookieruncrumbles.com${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
