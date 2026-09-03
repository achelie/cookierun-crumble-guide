import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const componentSource = readFileSync(new URL("./mobile-navigation.tsx", import.meta.url), "utf8");
const cssSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

describe("mobile navigation drawer", () => {
  it("uses an explicit open state and preserves interaction safeguards", () => {
    expect(componentSource).toContain('isVisible ? " is-open" : ""');
    expect(componentSource).toContain("window.requestAnimationFrame");
    expect(componentSource).toContain('prefers-reduced-motion: reduce');
    expect(componentSource).toContain('document.body.style.overflow = "hidden"');
    expect(componentSource).toContain("triggerRef.current?.focus()");
    expect(componentSource).toContain("event.preventDefault()");
  });

  it("moves in from the right with the site palette and disables reduced motion", () => {
    expect(cssSource).toMatch(/\.mobile-nav-drawer__panel[^}]*transform: translateX\(100%\)/);
    expect(cssSource).toMatch(/\.mobile-nav-drawer\.is-open \.mobile-nav-drawer__panel[^}]*transform: translateX\(0\)/);
    expect(cssSource).toMatch(/\.mobile-nav-drawer__head[^}]*linear-gradient\(135deg, var\(--accent-dark\), var\(--accent\)\)/);
    expect(cssSource).toContain(".mobile-nav-drawer, .mobile-nav-drawer::backdrop, .mobile-nav-drawer__panel { transition: none !important; }");
  });
});
