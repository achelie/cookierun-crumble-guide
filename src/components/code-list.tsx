"use client";

import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import { useState } from "react";
import { AppIcon } from "@/components/ui/icon";
import type { RedeemCode } from "@/data/codes";
import { copyText } from "@/lib/copy-text";

export function CodeList({ items }: { items: RedeemCode[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const active = items.filter((item) => item.status === "active");
  const expired = items.filter((item) => item.status === "expired");

  async function copy(code: string) {
    if (!(await copyText(code))) return;
    setCopied(code);
    window.setTimeout(() => setCopied((current) => current === code ? null : current), 1800);
  }

  return (
    <I18nElement as="div" className="codes-layout">
      <I18nElement as="section">
        <I18nElement as="div" className="section-heading"><I18nElement as="span">Active</I18nElement><I18nElement as="h2">Available codes</I18nElement></I18nElement>
        <I18nElement as="div" className="code-stack">
          {active.length ? active.map((item) => (
            <I18nElement as="article" className="code-card" key={item.code}>
              <I18nElement as="div" className="code-card__top">
                <I18nElement as="div"><I18nElement as="span">Coupon code</I18nElement><I18nElement as="h3">{item.code}</I18nElement></I18nElement>
                <I18nElement as="button" type="button" onClick={() => copy(item.code)} aria-label={`Copy ${item.code}`}>
                  <AppIcon name={copied === item.code ? "check" : "copy"} size={19} />
                  {copied === item.code ? "Copied" : "Copy"}
                </I18nElement>
              </I18nElement>
              <I18nElement as="ul" className="code-card__rewards">
                {item.rewards.map((reward) => (
                  <I18nElement as="li" key={reward.label}>
                    <I18nElement as="span" className="code-card__reward-icon"><Image src={reward.image} alt="" width={52} height={52} /></I18nElement>
                    <I18nElement as="span"><I18nElement as="small">{reward.label}</I18nElement><I18nElement as="strong">{reward.amount}</I18nElement></I18nElement>
                  </I18nElement>
                ))}
              </I18nElement>
              <I18nElement as="p">Expires {item.expires}</I18nElement>
            </I18nElement>
          )) : (
            <I18nElement as="div" className="empty-state empty-state--small codes-empty-state">
              <AppIcon name="ticket" size={28} />
              <I18nElement as="strong">No active codes right now.</I18nElement>
              <I18nElement as="p">We will move the next working code here after it is confirmed.</I18nElement>
            </I18nElement>
          )}
        </I18nElement>
      </I18nElement>
      <I18nElement as="aside">
        <I18nElement as="div" className="section-heading"><I18nElement as="span">Expired</I18nElement><I18nElement as="h2">Too late for these</I18nElement></I18nElement>
        {expired.length ? (
          <I18nElement as="div" className="expired-code-list">
            {expired.map((item) => (
              <I18nElement as="article" className="expired-code" key={item.code}>
                <I18nElement as="span">Expired coupon</I18nElement>
                <I18nElement as="strong">{item.code}</I18nElement>
                <I18nElement as="small">Expired {item.expires}</I18nElement>
              </I18nElement>
            ))}
          </I18nElement>
        ) : (
          <I18nElement as="div" className="empty-state empty-state--small">
            <AppIcon name="sparkles" size={26} />
            <I18nElement as="strong">Nothing expired yet.</I18nElement>
            <I18nElement as="p">Expired codes will stay here for reference.</I18nElement>
          </I18nElement>
        )}
      </I18nElement>
    </I18nElement>
  );
}
