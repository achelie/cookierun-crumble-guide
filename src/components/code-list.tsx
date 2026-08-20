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
        <div className="section-heading"><span>Active</span><h2>Grab these before Aug 25</h2></div>
        <div className="code-stack">
          {active.map((item) => (
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
          ))}
        </div>
      </section>
      <aside>
        <div className="section-heading"><span>Expired</span><h2>Too late for these</h2></div>
        {expired.length ? expired.map((item) => <p key={item.code}>{item.code}</p>) : (
          <div className="empty-state empty-state--small">
            <AppIcon name="sparkles" size={26} />
            <strong>Nothing expired yet.</strong>
            <p>A rare win. Both launch codes are still active.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
