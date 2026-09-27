import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import PrivacyPage from "@/app/(ad-free)/privacy/page";

vi.mock("next/font/google", () => ({
  Fredoka: () => ({ variable: "font-display" }),
  Nunito_Sans: () => ({ variable: "font-body" }),
}));

describe("AdSense page boundaries", () => {
  it("loads the publisher bootstrap on content pages", async () => {
    const { default: AdSenseContentLayout } = await import("@/app/(monetized)/layout");
    const html = renderToStaticMarkup(<AdSenseContentLayout><p>Guide content</p></AdSenseContentLayout>);

    expect(html).toContain("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
    expect(html).toContain("client=ca-pub-7443237558968985");
    expect(html).toContain('crossorigin="anonymous"');
  });

  it("keeps the privacy-policy page free of the AdSense bootstrap", () => {
    const html = renderToStaticMarkup(<PrivacyPage />);

    expect(html).not.toContain("pagead2.googlesyndication.com");
    expect(html).not.toContain("ca-pub-7443237558968985");
  });

  it("renders an independent ad-free document for directories and legal pages", async () => {
    const { default: AdFreeLayout } = await import("@/app/(ad-free)/layout");
    const html = renderToStaticMarkup(<AdFreeLayout><p>No guide fits that search.</p></AdFreeLayout>);

    expect(html).toContain('<html lang="en"');
    expect(html).toContain("No guide fits that search.");
    expect(html).toContain("analytics.ahrefs.com/analytics.js");
    expect(html).not.toContain("pagead2.googlesyndication.com");
    expect(html).not.toContain("ca-pub-7443237558968985");
  });
});
