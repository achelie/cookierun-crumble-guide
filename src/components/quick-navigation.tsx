import { type GuideTocItem } from "@/data/guides";

export function QuickNavigation({ items }: { items: GuideTocItem[] }) {
  return (
    <aside className="quick-nav">
      <details open>
        <summary>Quick Navigation</summary>
        <ol>
          {items.map((item, index) => (
            <li key={item.id}>
              <a href={`#${item.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</a>
            </li>
          ))}
        </ol>
      </details>
    </aside>
  );
}
