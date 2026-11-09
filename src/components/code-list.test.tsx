import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CodeList } from "@/components/code-list";
import { codes } from "@/data/codes";

describe("code list", () => {
  it("shows the active code and preserves expired coupon details", () => {
    const html = renderToStaticMarkup(<CodeList items={codes} />);

    expect(html).toContain("CAINECOOKIEKNOWS");
    expect(html).toContain("Red Doors");
    expect(html).toContain("digital-circus-ticket.png");
    expect(html).toContain("Expiry date unknown");
    expect(html).not.toContain("No active codes right now.");
    expect(html).toContain("COOKIERUNCRUMBLENO1");
    expect(html).toContain("COOKIERUNCRUMBLE1ST");
    expect(html).toContain("Expired Aug 25, 2026 at 23:59 KST");
    expect(html).not.toContain("Grab these before Aug 25");
    expect(html).not.toContain("Copy COOKIERUNCRUMBLENO1");
    expect(html).not.toContain("Copy COOKIERUNCRUMBLE1ST");
  });
});
