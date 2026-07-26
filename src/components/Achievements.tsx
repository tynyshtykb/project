import { ACHIEVEMENTS } from '../data/content';
import { Reveal, Section, SectionHeader } from './primitives';

export function Achievements() {
  return (
    <Section id="achievements" labelledBy="achievements-title">
      <div className="shell">
        <SectionHeader
          index="04"
          title="Achievements"
          meta={`${ACHIEVEMENTS.length} entries`}
          titleId="achievements-title"
        />

        <ol className="border-t border-line">
          {ACHIEVEMENTS.map((item, i) => (
            <li key={item.title + item.place} className="border-b border-line-soft">
              <Reveal delay={i * 60}>
                <div className="group relative grid grid-cols-1 items-baseline gap-y-2 py-6 transition-[padding] duration-500 ease-[var(--ease-out-quint)] md:grid-cols-12 md:gap-6 md:py-7 md:hover:pl-4">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:scale-y-100"
                  />

                  <span className="label md:col-span-1">{String(i + 1).padStart(2, '0')}</span>

                  <span className="text-lg font-medium tracking-tight text-ink transition-colors duration-400 group-hover:text-accent md:col-span-3 md:text-xl">
                    {item.place}
                  </span>

                  <span className="text-[1.02rem] leading-snug tracking-tight text-ink-soft md:col-span-5">
                    {item.title}
                  </span>

                  {item.meta ? (
                    <span className="label md:col-span-3 md:text-right">{item.meta}</span>
                  ) : (
                    <span className="hidden md:col-span-3 md:block" />
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
