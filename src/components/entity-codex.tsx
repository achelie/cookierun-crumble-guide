"use client";

import { I18nElement } from "@/i18n/elements";
import { useMemo, useState } from "react";
import { CookieCard } from "@/components/cookie-card";
import { EntityCard } from "@/components/entity-card";
import { AppIcon } from "@/components/ui/icon";
import { elements, rarities, roles, type Cookie } from "@/data/cookies";
import type { Pet } from "@/data/pets";
import { filterCookies } from "@/lib/filter-cookies";
import { sortByRarityHighToLow } from "@/lib/rarity-order";
import { entitySearchText } from "@/i18n/entities";
import { useTranslator } from "@/i18n/provider";

type EntityCodexProps =
  | { kind: "cookie"; items: Cookie[] }
  | { kind: "pet"; items: Pet[] };

export function EntityCodex(props: EntityCodexProps) {
  const t = useTranslator();
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("All");
  const [element, setElement] = useState("All");
  const [role, setRole] = useState("All");
  const rarityOptions = useMemo(() => {
    const availableRarities = new Set(props.items.map((item) => item.rarity));
    return ["All", ...rarities.filter((option) => availableRarities.has(option))];
  }, [props.items]);
  const filtered = useMemo(() => {
    if (props.kind === "cookie") return sortByRarityHighToLow(filterCookies(props.items, { query, rarity, element, role }));
    const needle = query.trim().toLowerCase();
    return sortByRarityHighToLow(props.items.filter((item) => {
      const searchable = [item.name, entitySearchText(item.id), ...item.effects.map(t)].join(" ").toLowerCase();
      return (!needle || searchable.includes(needle)) && (rarity === "All" || item.rarity === rarity);
    }));
  }, [props, query, rarity, element, role, t]);

  function resetFilters() {
    setQuery("");
    setRarity("All");
    setElement("All");
    setRole("All");
  }

  return (
    <I18nElement as="section" className={`codex codex--${props.kind}`} aria-label={`${props.kind} collection`}>
      <I18nElement as="div" className="codex-toolbar">
        <I18nElement as="label" className="search-field">
          <AppIcon name="search" size={19} />
          <I18nElement as="span" className="sr-only">Search by name</I18nElement>
          <I18nElement as="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${props.kind} name`} />
          {query && <I18nElement as="button" type="button" aria-label="Clear search" onClick={() => setQuery("")}><AppIcon name="x" size={17} /></I18nElement>}
        </I18nElement>
        <I18nElement as="div" className="codex-toolbar__filters">
          <I18nElement as="label" className="filter-field">
            <I18nElement as="span">Rarity</I18nElement>
            <I18nElement as="select" value={rarity} onChange={(event) => setRarity(event.target.value)}>
              {rarityOptions.map((option) => <I18nElement as="option" key={option}>{option}</I18nElement>)}
            </I18nElement>
          </I18nElement>
          {props.kind === "cookie" && (
            <>
              <I18nElement as="label" className="filter-field">
                <I18nElement as="span">Element</I18nElement>
                <I18nElement as="select" value={element} onChange={(event) => setElement(event.target.value)}>
                  <I18nElement as="option">All</I18nElement>
                  {elements.map((option) => <I18nElement as="option" key={option}>{option}</I18nElement>)}
                </I18nElement>
              </I18nElement>
              <I18nElement as="label" className="filter-field">
                <I18nElement as="span">Role</I18nElement>
                <I18nElement as="select" value={role} onChange={(event) => setRole(event.target.value)}>
                  <I18nElement as="option">All</I18nElement>
                  {roles.map((option) => <I18nElement as="option" key={option}>{option}</I18nElement>)}
                </I18nElement>
              </I18nElement>
            </>
          )}
        </I18nElement>
        <I18nElement as="p" className="result-count"><I18nElement as="strong">{filtered.length}</I18nElement> of {props.items.length}</I18nElement>
      </I18nElement>

      {filtered.length ? (
        <I18nElement as="div" className={props.kind === "cookie" ? "cookie-grid" : "entity-grid"}>
          {props.kind === "cookie"
            ? (filtered as Cookie[]).map((item, index) => <CookieCard key={item.id} cookie={item} eager={index < 4} />)
            : (filtered as Pet[]).map((item) => <EntityCard key={item.id} {...item} />)}
        </I18nElement>
      ) : (
        <I18nElement as="div" className="empty-state">
          <AppIcon name="search" size={28} />
          <I18nElement as="strong">No crumbs found.</I18nElement>
          <I18nElement as="p">Try a shorter name or loosen one filter.</I18nElement>
          <I18nElement as="button" type="button" onClick={resetFilters}>Reset filters</I18nElement>
        </I18nElement>
      )}
    </I18nElement>
  );
}
