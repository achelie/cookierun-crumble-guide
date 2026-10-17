import { I18nElement } from "@/i18n/elements";
import { type GuideTocItem } from "@/data/guides";

export function QuickNavigation({ items }: { items: GuideTocItem[] }) {
  return (
    <I18nElement as="aside" className="quick-nav">
      <I18nElement as="details" open>
        <I18nElement as="summary">Quick Navigation</I18nElement>
        <I18nElement as="ol">
          {items.map((item, index) => (
            <I18nElement as="li" key={item.id}>
              <I18nElement as="a" href={`#${item.id}`}><I18nElement as="span">{String(index + 1).padStart(2, "0")}</I18nElement>{item.label}</I18nElement>
            </I18nElement>
          ))}
        </I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
