import { describe, expect, it } from "vitest";
import {
  emptyTierBuilderState,
  getUnrankedCookieIds,
  moveTierCookie,
  parseTierBuilderQuery,
  serializeTierBuilderState,
} from "./tier-builder-state";

describe("tier builder state", () => {
  it("parses ranks while removing unknown and duplicate cookies", () => {
    const params = new URLSearchParams("s=cookie-a,missing&a=cookie-b,cookie-a");
    expect(parseTierBuilderQuery(params, new Set(["cookie-a", "cookie-b"]))).toEqual({
      S: ["cookie-a"], A: ["cookie-b"], B: [], C: [], D: [],
    });
  });

  it("moves a cookie between ranks and inserts before a target", () => {
    const state = { ...emptyTierBuilderState(), S: ["cookie-a"], A: ["cookie-b", "cookie-c"] };
    expect(moveTierCookie(state, "cookie-a", "A", "cookie-c")).toEqual({
      S: [], A: ["cookie-b", "cookie-a", "cookie-c"], B: [], C: [], D: [],
    });
  });

  it("returns ranked cookies to the unranked pool", () => {
    const state = { ...emptyTierBuilderState(), S: ["cookie-a"] };
    const next = moveTierCookie(state, "cookie-a", "unranked");
    expect(next.S).toEqual([]);
    expect(getUnrankedCookieIds(["cookie-a", "cookie-b"], next)).toEqual(["cookie-a", "cookie-b"]);
  });

  it("serializes every rank", () => {
    expect(serializeTierBuilderState({ ...emptyTierBuilderState(), S: ["cookie-a"], D: ["cookie-d"] })).toEqual({
      s: "cookie-a", a: "", b: "", c: "", d: "cookie-d",
    });
  });
});
