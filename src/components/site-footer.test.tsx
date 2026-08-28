import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site-footer";

describe("SiteFooter", () => {
  it("keeps every trust page and the public contact address reachable", () => {
    const html = renderToStaticMarkup(<SiteFooter />);

    for (const href of ["/about", "/contact", "/privacy", "/disclaimer"]) {
      expect(html).toContain(`href="${href}"`);
    }

    expect(html).toContain("mailto:contact@cookieruncrumbles.com");
    expect(html).toContain("Unofficial fan guide");
  });
});
