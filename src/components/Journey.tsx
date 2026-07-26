import { JOURNEY } from '../data/content';
import { Reveal, Section, SectionHeader } from './primitives';

export function Journey() {
  return (
    <Section id="journey" labelledBy="journey-title">
      <div className="shell">
        <SectionHeader
          index="07"
          title="My Journey"
          meta="Robotics → software → AI → founding"
          titleId="journey-title"
        />

        <div className="relative">
          {/* spine: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute left-[3px] top-2 h-[calc(100%-2rem)] w-px bg-line lg:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-px w-full bg-line lg:block"
          />

          <ol className="grid grid-cols-1 gap-y-10 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
            {JOURNEY.map((step, i) => {
              const isCurrent = i === JOURNEY.length - 1;
              return (
                <li key={step.label} className="group relative pl-8 lg:pl-0 lg:pt-10">
                  {/* the marker sits outside Reveal so it anchors to the <li>,
                      not to a transformed wrapper */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1.5 block h-[7px] w-[7px] rounded-full ring-4 ring-paper transition-colors duration-500 lg:-top-[3px] ${
                      isCurrent ? 'bg-accent' : 'bg-line group-hover:bg-ink'
                    }`}
                  />
                  <Reveal delay={i * 100}>
                    <p className="label">
                      {isCurrent ? 'Now' : `Phase ${String(i + 1).padStart(2, '0')}`}
                    </p>
                    <p
                      className={`display mt-4 text-2xl md:text-3xl ${
                        isCurrent ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {step.span}
                    </p>
                    <p className="mt-3 max-w-[18ch] text-[0.95rem] leading-snug tracking-tight text-ink-soft">
                      {step.label}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
