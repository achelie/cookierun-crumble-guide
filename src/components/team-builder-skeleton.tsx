import { I18nElement } from "@/i18n/elements";
export function TeamBuilderSkeleton() {
  return (
    <I18nElement as="section" className="team-builder" aria-busy="true" aria-label="Loading team builder">
      <I18nElement as="div" className="skeleton-line skeleton-line--wide" />
      <I18nElement as="div" className="builder-slots">
        {Array.from({ length: 12 }, (_, index) => <I18nElement as="div" className="builder-slot skeleton-box" key={index} />)}
      </I18nElement>
      <I18nElement as="div" className="pet-slots">
        {Array.from({ length: 3 }, (_, index) => <I18nElement as="div" className="pet-slot skeleton-box" key={index} />)}
      </I18nElement>
      <I18nElement as="div" className="synergy-summary">
        <I18nElement as="div" className="synergy-summary__panel skeleton-box" />
        <I18nElement as="div" className="synergy-summary__panel skeleton-box" />
      </I18nElement>
    </I18nElement>
  );
}
