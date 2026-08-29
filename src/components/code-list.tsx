"use client";

import Image from "next/image";
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
    <div className="codes-layout">
      <section>
        <div className="section-heading"><span>Active</span><h2>Available codes</h2></div>
        <div className="code-stack">
          {active.length ? active.map((item) => (
            <article className="code-card" key={item.code}>
              <div className="code-card__top">
                <div><span>Coupon code</span><h3>{item.code}</h3></div>
                <button type="button" onClick={() => copy(item.code)} aria-label={`Copy ${item.code}`}>
                  <AppIcon name={copied === item.code ? "check" : "copy"} size={19} />
                  {copied === item.code ? "Copied" : "Copy"}
                </button>
              </div>
              <ul className="code-card__rewards">
                {item.rewards.map((reward) => (
                  <li key={reward.label}>
                    <span className="code-card__reward-icon"><Image src={reward.image} alt="" width={52} height={52} /></span>
                    <span><small>{reward.label}</small><strong>{reward.amount}</strong></span>
                  </li>
                ))}
              </ul>
              <p>Expires {item.expires}</p>
            </article>
          )) : (
            <div className="empty-state empty-state--small codes-empty-state">
              <AppIcon name="ticket" size={28} />
              <strong>No active codes right now.</strong>
              <p>We will move the next working code here after it is confirmed.</p>
            </div>
          )}
        </div>
      </section>
      <aside>
        <div className="section-heading"><span>Expired</span><h2>Too late for these</h2></div>
        {expired.length ? (
          <div className="expired-code-list">
            {expired.map((item) => (
              <article className="expired-code" key={item.code}>
                <span>Expired coupon</span>
                <strong>{item.code}</strong>
                <small>Expired {item.expires}</small>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state empty-state--small">
            <AppIcon name="sparkles" size={26} />
            <strong>Nothing expired yet.</strong>
            <p>Expired codes will stay here for reference.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
