import { I18nElement } from "@/i18n/elements";
import { LocaleImage as Image } from "@/i18n/elements";
import { cookieById } from "@/data/cookies";

export function GuideCover({
  cookieIds,
  compact = false,
  priority = false,
}: {
  cookieIds: [string, string, string];
  compact?: boolean;
  priority?: boolean;
}) {
  const coverCookies = cookieIds.map((id) => cookieById.get(id)).filter((cookie) => cookie !== undefined);

  return (
    <I18nElement as="div" className={`guide-cover${compact ? " guide-cover--compact" : ""}`} aria-label={`${coverCookies.map((cookie) => cookie.name).join(", ")} cover art`}>
      <I18nElement as="span" className="guide-cover__stamp">FIELD NOTES</I18nElement>
      {coverCookies.map((cookie, index) => (
        <I18nElement as="figure" key={cookie.id} className={`guide-cover__cookie guide-cover__cookie--${index + 1}`}>
          <Image src={cookie.image} alt={cookie.name} width={360} height={360} priority={priority && index === 0} />
          {!compact && <I18nElement as="figcaption">{cookie.name}</I18nElement>}
        </I18nElement>
      ))}
      <I18nElement as="span" className="guide-cover__rule" aria-hidden="true" />
    </I18nElement>
  );
}
