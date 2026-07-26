import { ABOUT_PARAGRAPHS } from '../data/content';
import { Reveal, Section, SectionHeader } from './primitives';
import { Stats } from './Stats';

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="shell">
        <SectionHeader index="01" title="About" meta="Aktobe, Kazakhstan" titleId="about-title" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="label">The short version</p>
              <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-ink-mute">
                Robotics first, then software, then machine learning — each one built on the last.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            {ABOUT_PARAGRAPHS.map((paragraph, i) => (
              <Reveal key={i} delay={i * 110}>
                <p
                  className={`text-lg leading-[1.6] tracking-tight text-ink-soft md:text-xl md:leading-[1.6] ${
                    i === 0 ? 'text-ink' : 'mt-7'
                  }`}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <Stats />
        </div>
      </div>
    </Section>
  );
}
