export function TeamBuilderSkeleton() {
  return (
    <section className="team-builder" aria-busy="true" aria-label="Loading team builder">
      <div className="skeleton-line skeleton-line--wide" />
      <div className="builder-slots">
        {Array.from({ length: 12 }, (_, index) => <div className="builder-slot skeleton-box" key={index} />)}
      </div>
      <div className="pet-slots">
        {Array.from({ length: 3 }, (_, index) => <div className="pet-slot skeleton-box" key={index} />)}
      </div>
      <div className="synergy-summary">
        <div className="synergy-summary__panel skeleton-box" />
        <div className="synergy-summary__panel skeleton-box" />
      </div>
    </section>
  );
}
