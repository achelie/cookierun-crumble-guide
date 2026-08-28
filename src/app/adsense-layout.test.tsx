import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PrivacyPage from "@/app/privacy/page";

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
});
