import { adPublisher } from "./config";

type TcData = {
  cmpStatus?: string;
  eventStatus?: string;
  gdprApplies?: boolean;
  tcString?: string;
  purpose?: { consents?: Record<number, boolean> };
  vendor?: { consents?: Record<number, boolean> };
};

type PrivacyCallbacks = {
  CONSENT_API_READY?: () => void;
  INITIAL_US_STATES_OPT_OUT_DATA_READY?: () => void;
};

type PrivacyCallback = PrivacyCallbacks | (() => void);

type GooglePrivacy = {
  callbackQueue?: { push(callback: PrivacyCallback): unknown };
  showRevocationMessage?: () => void;
  usstatesoptout?: {
    getInitialUsStatesOptOutStatus(): number;
    InitialUsStatesOptOutStatusEnum: Record<"DOES_NOT_APPLY" | "NOT_OPTED_OUT" | "OPTED_OUT", number>;
  };
};

declare global {
  interface Window {
    adsbygoogle?: { push(request: Record<string, never>): unknown };
    googlefc?: GooglePrivacy;
    __tcfapi?: (command: "addEventListener", version: number, callback: (data: TcData, success: boolean) => void) => void;
  }
}

export function allowsEuropeanAds(data: TcData, success: boolean) {
  if (!success || data?.cmpStatus !== "loaded" || !["tcloaded", "useractioncomplete"].includes(data.eventStatus ?? "")) return false;
  if (data.gdprApplies === false) return true;
  return data.gdprApplies === true && Boolean(data.tcString) && data.vendor?.consents?.[755] === true
    && [1, 3, 4].every((purpose) => data.purpose?.consents?.[purpose] === true);
}

const listeners = new Set<() => void>();
let started = false;
let scriptReady = false;
let europeAllowed = false;
let usReady = false;
let awaitingChoice = false;
let gdprApplies: boolean | undefined;

export function canRequestAds() { return scriptReady && europeAllowed && usReady && !awaitingChoice; }
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
    INITIAL_US_STATES_OPT_OUT_DATA_READY: () => {
      const us = window.googlefc?.usstatesoptout;
      const status = us?.getInitialUsStatesOptOutStatus?.();
      const states = us?.InitialUsStatesOptOutStatusEnum;
      // Google consumes the opt-out and applicable GPC signals and applies RDP.
      usReady = states !== undefined && status !== undefined
        && [states.DOES_NOT_APPLY, states.NOT_OPTED_OUT, states.OPTED_OUT].includes(status);
      notify();
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
