import Image from "next/image";
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
    <div className={`guide-cover${compact ? " guide-cover--compact" : ""}`} aria-label={`${coverCookies.map((cookie) => cookie.name).join(", ")} cover art`}>
      <span className="guide-cover__stamp">FIELD NOTES</span>
      {coverCookies.map((cookie, index) => (
        <figure key={cookie.id} className={`guide-cover__cookie guide-cover__cookie--${index + 1}`}>
          <Image src={cookie.image} alt={cookie.name} width={360} height={360} priority={priority && index === 0} />
          {!compact && <figcaption>{cookie.name}</figcaption>}
        </figure>
      ))}
      <span className="guide-cover__rule" aria-hidden="true" />
    </div>
  );
}
