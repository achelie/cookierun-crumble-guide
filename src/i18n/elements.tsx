"use client";

import { createElement, type ComponentProps, type JSX, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslator } from "./provider";
import { localizedPath, type Locale } from "./config";
import type { Translator } from "./translate";

function translatedChildren(children: ReactNode, t: Translator): ReactNode {
  if (!Array.isArray(children)) return typeof children === "string" ? t(children) : children;
  const nodes: ReactNode[] = [];
  const source = children.map((child) => {
    if (typeof child === "string" || typeof child === "number") return String(child);
    if (child === null || child === undefined || typeof child === "boolean") return "";
    const index = nodes.push(child) - 1;
    return `\uE000${index}\uE001`;
  }).join("");
  const translated = t(source);
  if (translated !== source) return translated.split(/(\uE000\d+\uE001)/).map((part) => /^\uE000\d+\uE001$/.test(part) ? nodes[Number(part.slice(1, -1))] : part);
  return children.map((child) => typeof child === "string" ? t(child) : child);
}

function localizedProps<Props extends object>(props: Props, t: Translator, locale: Locale, option = false): Props {
  const result = { ...props } as Record<string, unknown>;
  if (option && result.value === undefined && typeof result.children === "string") result.value = result.children;
  for (const key of ["title", "alt", "placeholder", "aria-label", "aria-description"]) if (typeof result[key] === "string") result[key] = t(result[key]);
  if (typeof result.href === "string") result.href = localizedPath(result.href, locale);
  result.children = translatedChildren(result.children as ReactNode, t);
  return result as Props;
}

// Each text-bearing element owns its translation. This also works for deferred
// Server Component children, without relying on walking opaque RSC payloads.
export function I18nElement<Tag extends keyof JSX.IntrinsicElements>(props: { as: Tag } & JSX.IntrinsicElements[Tag]) {
  const locale = useLocale();
  const t = useTranslator();
  const { as, ...rest } = props;
  return createElement(as, localizedProps(rest, t, locale, as === "option"));
}
export function LocaleLink(props: ComponentProps<typeof Link>) {
  const locale = useLocale();
  const t = useTranslator();
  return createElement(Link, localizedProps(props, t, locale));
}
export function LocaleImage(props: ComponentProps<typeof Image>) {
  const locale = useLocale();
  const t = useTranslator();
  return createElement(Image, localizedProps(props, t, locale));
}
