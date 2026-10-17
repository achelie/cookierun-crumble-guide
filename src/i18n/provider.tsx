"use client";

import { createContext, createElement, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import { createTranslator, type Messages, type Translator } from "./translate";

const Context = createContext<{ locale: Locale; t: Translator }>({ locale: "en", t: (value) => value });
export function LocaleProvider({ locale, messages, children }: { locale: Locale; messages: Messages; children: ReactNode }) {
  const value = useMemo(() => ({ locale, t: createTranslator(messages, locale) }), [locale, messages]);
  return createElement(Context.Provider, { value }, children);
}
export function useLocale() { return useContext(Context).locale; }
export function useTranslator() { return useContext(Context).t; }
