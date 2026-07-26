import { STATS } from '../data/content';
import { Reveal, Rule } from './primitives';

/**
 * The experience counters — large numerals sitting on hairlines, no cards.
 */
export function Stats() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
      {STATS.map((stat, i) => (
        <div key={stat.label} className="group">
          <Rule delay={i * 90} />
          <Reveal delay={i * 90}>
            <div className="pt-5">
              <div className="flex items-baseline gap-1.5">
                <span className="display text-5xl transition-colors duration-500 group-hover:text-accent sm:text-6xl lg:text-7xl">
                  {stat.value}
                </span>
                <span className="label pb-1.5">{stat.unit}</span>
              </div>
              <p className="mt-4 text-[0.95rem] tracking-tight text-ink-soft">{stat.label}</p>
            </div>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
