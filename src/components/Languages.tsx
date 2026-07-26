import { LANGUAGES } from '../data/content';
import { Reveal, Rule } from './primitives';

export function Languages() {
  return (
    <div>
      <Reveal>
        <p className="label mb-6">Languages</p>
      </Reveal>
      <Rule />
      <ul className="grid grid-cols-1 sm:grid-cols-3">
        {LANGUAGES.map((lang, i) => (
          <li
            key={lang.name}
            className="border-b border-line-soft py-5 sm:border-b-0 sm:py-6 sm:pr-8"
          >
            <Reveal delay={i * 80}>
              <div className="flex items-baseline justify-between gap-4 sm:block">
                <span className="text-2xl font-medium tracking-tight md:text-3xl">{lang.name}</span>
                <span className="label sm:mt-3 sm:block">{lang.level}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
