import { EDUCATION } from '../data/content';
import { Languages } from './Languages';
import { Reveal, Section, SectionHeader } from './primitives';

export function Education() {
  return (
    <Section id="education" labelledBy="education-title">
      <div className="shell">
        <SectionHeader
          index="06"
          title="Education"
          meta="Aktobe, Kazakhstan"
          titleId="education-title"
        />

        <div className="grid grid-cols-1 gap-12 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="hed text-3xl md:text-4xl">{EDUCATION.school}</h3>
              <p className="mt-3 text-[1.02rem] text-ink-soft">{EDUCATION.location}</p>
              <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-ink-mute">
                {EDUCATION.note}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="grid grid-cols-2 gap-8">
              {EDUCATION.facts.map((fact, i) => (
                <div key={fact.label}>
                  <Reveal delay={i * 90}>
                    <dt className="label">{fact.label}</dt>
                    <dd className="display mt-4 text-4xl md:text-5xl">{fact.value}</dd>
                  </Reveal>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <Languages />
        </div>
      </div>
    </Section>
  );
}
