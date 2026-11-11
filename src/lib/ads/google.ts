import { adPublisher } from "./config";

type TcData = {
  cmpStatus?: string;
  eventStatus?: string;
  gdprApplies?: boolean;
  tcString?: string;
  purpose?: { consents?: Record<number, boolean> };
  vendor?: { consents?: Record<number, boolean> };
};

type GppStatus = {
  cmpStatus?: string;
  signalStatus?: string;
  applicableSections?: number[];
  gppString?: string;
};

type PrivacyCallback =
  | { CONSENT_API_READY: () => void; CONSENT_DATA_READY?: never }
  | { CONSENT_DATA_READY: () => void; CONSENT_API_READY?: never }
  | (() => void);

type GooglePrivacy = {
  callbackQueue?: { push(callback: PrivacyCallback): unknown };
  showRevocationMessage?: () => void;
};

declare global {
  interface Window {
    adsbygoogle?: { push(request: Record<string, never>): unknown };
    googlefc?: GooglePrivacy;
    __tcfapi?: (command: "addEventListener", version: number, callback: (data: TcData, success: boolean) => void) => void;
    __gpp?: (command: "addEventListener", callback: (data: { pingData?: GppStatus }, success: boolean) => void) => void;
  }
}

export function allowsEuropeanAds(data: TcData, success: boolean) {
  if (!success || data?.cmpStatus !== "loaded") return false;
  if (data.gdprApplies === false) return true;
  const hasChoice = data.eventStatus === "tcloaded" || data.eventStatus === "useractioncomplete";
  return data.gdprApplies === true && hasChoice && Boolean(data.tcString) && data.vendor?.consents?.[755] === true
    && [1, 3, 4].every((purpose) => data.purpose?.consents?.[purpose] === true);
}

export function isGppReady(data: GppStatus | undefined, success: boolean) {
  if (!success || data?.cmpStatus !== "loaded" || data.signalStatus !== "ready") return false;
  const sections = data.applicableSections;
  if (!sections?.length) return false;
  if (sections.length === 1 && sections[0] === -1) return true;
  return Boolean(data.gppString) && sections.every((section) => Number.isInteger(section) && section > 0);
}

const listeners = new Set<() => void>();
let started = false;
let scriptReady = false;
let europeAllowed = false;
let gppReady = false;
let awaitingChoice = false;
let gdprApplies: boolean | undefined;

export function canRequestAds() { return scriptReady && europeAllowed && gppReady && !awaitingChoice; }
export function subscribeToAds(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function notify() { listeners.forEach((listener) => listener()); }

export function startAdSense() {
  if (started) return;
  started = true;
  const privacy = window.googlefc ??= {};
  const queue = privacy.callbackQueue ??= [] as PrivacyCallback[];
  queue.push({
    CONSENT_API_READY: () => {
      window.__tcfapi?.("addEventListener", 2, (data, success) => {
        if (success) gdprApplies = data?.gdprApplies;
        if (success && data?.eventStatus === "useractioncomplete") awaitingChoice = false;
        europeAllowed = allowsEuropeanAds(data, success);
        notify();
      });
    },
  });
  queue.push({
    CONSENT_DATA_READY: () => {
      window.__gpp?.("addEventListener", (data, success) => {
        // Google consumes the GPP string and applies applicable opt-out and GPC signals.
        gppReady = isGppReady(data?.pingData, success);
        notify();
      });
    },
  });

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adPublisher}`;
  script.addEventListener("load", () => { scriptReady = true; notify(); }, { once: true });
  document.head.append(script);
}

export function openPrivacySettings() {
  const privacy = window.googlefc;
  if (!privacy?.callbackQueue || !privacy.showRevocationMessage) return false;
  awaitingChoice = gdprApplies !== false;
  notify();
  privacy.callbackQueue.push(() => privacy.showRevocationMessage?.());
  return true;
}
