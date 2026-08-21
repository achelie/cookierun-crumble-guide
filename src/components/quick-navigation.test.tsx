import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuickNavigation } from "@/components/quick-navigation";

describe("QuickNavigation", () => {
  it("links each label to its matching section id", () => {
    const html = renderToStaticMarkup(<QuickNavigation items={[
      { id: "first-job", label: "First job" },
      { id: "upgrade-core", label: "Upgrade core" },
    ]} />);
    expect(html).toContain("Quick Navigation");
    expect(html).toContain('href="#first-job"');
    expect(html).toContain('href="#upgrade-core"');
  });
});
