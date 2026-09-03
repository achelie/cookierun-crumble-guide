import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const componentSource = readFileSync(new URL("./mobile-navigation.tsx", import.meta.url), "utf8");
const cssSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

describe("mobile navigation drawer", () => {
  it("commits one explicit start state and preserves interaction safeguards", () => {
    expect(componentSource).toContain('dialog.classList.remove("is-open")');
    expect(componentSource).toContain("void dialog.offsetWidth");
    expect(componentSource).toContain('dialog.classList.add("is-open")');
    expect(componentSource.match(/window\.requestAnimationFrame/g)).toHaveLength(1);
    expect(componentSource).not.toMatch(/requestAnimationFrame\(\(\) => \{[\s\S]*requestAnimationFrame/);
    expect(componentSource).toContain('prefers-reduced-motion: reduce');
    expect(componentSource).toContain('document.body.style.overflow = "hidden"');
    expect(componentSource).toContain("triggerRef.current?.focus()");
    expect(componentSource).toContain("event.preventDefault()");
  });

  it("moves in from the right with the site palette and disables reduced motion", () => {
    expect(cssSource).toMatch(/\.mobile-nav-drawer[^}]*inset-inline-start: auto[^}]*inset-inline-end: 0/);
    expect(cssSource).toMatch(/\.mobile-nav-drawer[^}]*transform: translate3d\(100%, 0, 0\)/);
    expect(cssSource).toMatch(/\.mobile-nav-drawer\.is-open[^}]*transform: translate3d\(0, 0, 0\)/);
    expect(cssSource).toMatch(/\.mobile-nav-drawer__head[^}]*linear-gradient\(135deg, var\(--accent-dark\), var\(--accent\)\)/);
    expect(cssSource).toContain(".mobile-nav-drawer, .mobile-nav-drawer::backdrop, .mobile-nav-drawer__panel { transition: none !important; }");
  });
});
