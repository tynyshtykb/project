import { useState } from 'react';
import { TECH_STACK } from '../data/content';
import { Reveal, Section, SectionHeader } from './primitives';

const TOTAL = TECH_STACK.reduce((n, group) => n + group.items.length, 0);

export function TechStack() {
  const [hovered, setHovered] = useState<{ tech: string; category: string } | null>(null);

  return (
    <Section id="stack" labelledBy="stack-title">
      <div className="shell">
        <SectionHeader
          index="05"
          title="Tech Stack"
          meta={`${TOTAL} technologies`}
          titleId="stack-title"
        />

        {/* live readout — updates as you move across the list */}
        <Reveal>
          <div className="mb-12 flex h-8 items-center gap-4 border-b border-line pb-3 md:mb-16">
            <span className="label shrink-0">Selected</span>
            {/* Decorative: every category is already labelled on its own row,
                so this is hidden from assistive tech rather than announced. */}
            <span
              aria-hidden="true"
              className={`truncate font-mono text-sm tracking-tight transition-opacity duration-300 ${
                hovered ? 'text-ink opacity-100' : 'text-ink-mute opacity-70'
              }`}
            >
              {hovered ? (
                <>
                  {hovered.tech}
                  <span className="mx-2.5 text-ink-mute">/</span>
                  <span className="text-accent">{hovered.category}</span>
                </>
              ) : (
                'Hover a technology to see its category'
              )}
            </span>
          </div>
        </Reveal>

        <div
          className="border-t border-line"
          onMouseLeave={() => setHovered(null)}
        >
          {TECH_STACK.map((group, i) => (
            <div key={group.category} className="border-b border-line-soft">
              <Reveal delay={i * 60}>
                <div className="grid grid-cols-1 gap-y-4 py-7 md:grid-cols-12 md:gap-8 md:py-8">
                  <div className="md:col-span-3">
                    <span className="label">{group.category}</span>
                  </div>

                  <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-3 md:col-span-9">
                    {group.items.map((tech) => {
                      const isDimmed = hovered !== null && hovered.tech !== tech;
                      return (
                        <li key={tech}>
                          <span
                            onMouseEnter={() => setHovered({ tech, category: group.category })}
                            className={`inline-block cursor-default text-xl font-medium tracking-tight transition-all duration-400 ease-[var(--ease-out-quint)] hover:text-accent md:text-2xl ${
                              isDimmed ? 'text-ink-mute opacity-45' : 'text-ink opacity-100'
                            }`}
                          >
                            {tech}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
