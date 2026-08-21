import type { ReactNode } from "react";

export function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="guide-section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function GuideTip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="guide-tip">
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}
