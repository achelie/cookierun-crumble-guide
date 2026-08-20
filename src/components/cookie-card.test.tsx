import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { Cookie } from "@/data/cookies";
import { CookieCard } from "./cookie-card";

const cookie: Cookie = {
  id: "cookie-test",
  name: "Test Cookie",
  rarity: "SSR",
  image: "/images/cookies/cookie0001.webp",
  element: "Fire",
  role: "Charge",
  grantedSynergies: ["Chain"],
  receivedSynergies: ["Pierce"],
  buffs: ["ATK Up"],
};

describe("CookieCard", () => {
  it("renders the five requested combat categories without a link", () => {
    const html = renderToStaticMarkup(<CookieCard cookie={cookie} />);
    expect(html).toContain("Test Cookie");
    expect(html).toContain("Fire");
    expect(html).toContain("Charge");
    expect(html).toContain("Granted");
    expect(html).toContain("Received");
    expect(html).toContain("ATK Up");
    expect(html).not.toContain("href=");
  });

  it("shows None for empty combat lists", () => {
    const html = renderToStaticMarkup(
      <CookieCard cookie={{ ...cookie, grantedSynergies: [], receivedSynergies: [], buffs: [] }} />,
    );
    expect(html.match(/None/g)).toHaveLength(3);
  });
});
