import { SITE } from '../data/content';

/**
 * A slow ticker of the four roles, set between the hero and the first section.
 * Motion is decorative only — the same words are already in the hero, so the
 * strip is hidden from assistive tech and frozen under reduced motion.
 */
export function Marquee() {
  const items = [...SITE.roles, ...SITE.roles, ...SITE.roles];

  return (
    <div
      aria-hidden="true"
      className="no-print relative overflow-hidden border-y border-line bg-paper-2 py-5"
    >
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap md:gap-16">
        {items.map((role, i) => (
          <span key={i} className="flex items-center gap-10 md:gap-16">
            <span className="text-xl font-medium tracking-tight text-ink md:text-3xl">{role}</span>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
          </span>
        ))}
      </div>

      {/* fade the strip into the page at both ends */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper-2 to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper-2 to-transparent md:w-32" />
    </div>
  );
}
