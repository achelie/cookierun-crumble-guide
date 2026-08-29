import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";

describe("site header", () => {
  it("keeps desktop links and exposes an accessible mobile drawer trigger", () => {
    const html = renderToStaticMarkup(<SiteHeader />);

    expect(html).toContain('aria-label="Primary navigation"');
    expect(html).toContain('aria-label="Open navigation menu"');
    expect(html).toContain('aria-controls="mobile-navigation"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-label="Mobile navigation"');

    for (const href of ["/cookies/", "/pets/", "/tier-list/", "/teams/", "/guides/", "/tools/", "/codes/"]) {
      const normalizedHref = href.replace(/\/$/, "");
      expect(html.split(`href="${normalizedHref}"`).length - 1).toBe(2);
    }
  });
});
