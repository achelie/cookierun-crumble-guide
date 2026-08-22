import type { Metadata } from "next";
import { absoluteUrl, siteName, type SeoPageDefinition } from "@/lib/seo";

export function pageMetadata(page: SeoPageDefinition): Metadata {
  const url = absoluteUrl(page.path);
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image", alt: page.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/opengraph-image"],
    },
  };
}
