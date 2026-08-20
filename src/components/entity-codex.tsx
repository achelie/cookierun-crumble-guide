"use client";

import { useMemo, useState } from "react";
import { CookieCard } from "@/components/cookie-card";
import { EntityCard } from "@/components/entity-card";
import { AppIcon } from "@/components/ui/icon";
import { elements, roles, type Cookie } from "@/data/cookies";
import type { Pet } from "@/data/pets";
import { filterCookies } from "@/lib/filter-cookies";

type EntityCodexProps =
  | { kind: "cookie"; items: Cookie[] }
  | { kind: "pet"; items: Pet[] };

export function EntityCodex(props: EntityCodexProps) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("All");
  const [element, setElement] = useState("All");
  const [role, setRole] = useState("All");
  const rarityOptions = useMemo(() => ["All", ...Array.from(new Set(props.items.map((item) => item.rarity)))], [props.items]);
  const filtered = useMemo(() => {
    if (props.kind === "cookie") return filterCookies(props.items, { query, rarity, element, role });
    const needle = query.trim().toLowerCase();
    return props.items.filter((item) => (!needle || item.name.toLowerCase().includes(needle)) && (rarity === "All" || item.rarity === rarity));
  }, [props, query, rarity, element, role]);

  function resetFilters() {
    setQuery("");
    setRarity("All");
    setElement("All");
    setRole("All");
  }

  return (
    <section className={`codex codex--${props.kind}`} aria-label={`${props.kind} collection`}>
      <div className="codex-toolbar">
        <label className="search-field">
          <AppIcon name="search" size={19} />
          <span className="sr-only">Search by name</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${props.kind} name`} />
          {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><AppIcon name="x" size={17} /></button>}
        </label>
        <div className="codex-toolbar__filters">
          <label className="filter-field">
            <span>Rarity</span>
            <select value={rarity} onChange={(event) => setRarity(event.target.value)}>
              {rarityOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          {props.kind === "cookie" && (
            <>
              <label className="filter-field">
                <span>Element</span>
                <select value={element} onChange={(event) => setElement(event.target.value)}>
                  <option>All</option>
                  {elements.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label className="filter-field">
                <span>Role</span>
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                  <option>All</option>
                  {roles.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            </>
          )}
        </div>
        <p className="result-count"><strong>{filtered.length}</strong> of {props.items.length}</p>
      </div>

      {filtered.length ? (
        <div className={props.kind === "cookie" ? "cookie-grid" : "entity-grid"}>
          {props.kind === "cookie"
            ? (filtered as Cookie[]).map((item, index) => <CookieCard key={item.id} cookie={item} eager={index < 4} />)
            : (filtered as Pet[]).map((item) => <EntityCard key={item.id} {...item} />)}
        </div>
      ) : (
        <div className="empty-state">
          <AppIcon name="search" size={28} />
          <strong>No crumbs found.</strong>
          <p>Try a shorter name or loosen one filter.</p>
          <button type="button" onClick={resetFilters}>Reset filters</button>
        </div>
      )}
    </section>
  );
}
