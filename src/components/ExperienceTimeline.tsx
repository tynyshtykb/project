import { EXPERIENCE } from '../data/content';
import { Reveal, Section, SectionHeader } from './primitives';

export function ExperienceTimeline() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <div className="shell">
        <SectionHeader
          index="03"
          title="Experience"
          meta="Entrepreneurial & freelance"
          titleId="experience-title"
        />

        <ol className="relative">
          {/* the spine */}
          <span
            aria-hidden="true"
            className="absolute left-[3px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block"
          />

          {EXPERIENCE.map((item, i) => (
            <li key={item.role} className="group relative border-t border-line-soft first:border-t-0">
              <Reveal delay={i * 80}>
                <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-12">
                  {/* marker + index */}
                  <div className="flex items-center gap-4 md:col-span-3 md:block">
                    <span
                      aria-hidden="true"
                      className="relative z-10 block h-[7px] w-[7px] shrink-0 rounded-full bg-line ring-4 ring-paper transition-colors duration-500 group-hover:bg-accent md:-ml-0.5"
                    />
                    {/* inline on phones, stacked under the marker on desktop */}
                    <div className="flex items-baseline gap-3 md:mt-5 md:block md:pl-6">
                      <span className="label">{String(i + 1).padStart(2, '0')}</span>
                      {item.meta ? (
                        <span className="label leading-[1.6] md:mt-2.5 md:block">{item.meta}</span>
                      ) : null}
                    </div>
                  </div>

                  <div className="md:col-span-9 md:pl-6 lg:pl-0">
                    <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                      {item.role}
                      {item.org ? (
                        <>
                          <span className="mx-2.5 text-ink-mute">—</span>
                          <span className="text-ink-soft transition-colors duration-500 group-hover:text-accent">
                            {item.org}
                          </span>
                        </>
                      ) : null}
                    </h3>

                    <div className="mt-5 max-w-2xl space-y-3">
                      {item.body.map((line) => (
                        <p key={line} className="text-[1.02rem] leading-relaxed text-ink-soft">
                          {line}
                        </p>
                      ))}
                    </div>

                    {item.facts ? (
                      <dl className="mt-7 flex flex-wrap gap-x-12 gap-y-4">
                        {item.facts.map((fact) => (
                          <div key={fact.label}>
                            <dt className="label">{fact.label}</dt>
                            <dd className="mt-1.5 font-mono text-sm tracking-tight text-ink">
                              {fact.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
