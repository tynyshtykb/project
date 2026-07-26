import { SITE } from '../data/content';
import { Reveal, Rule, WordReveal } from './primitives';

function Portrait() {
  return (
    // The empty placeholder frame is noise on a printed CV; a real photo is not.
    <figure className={`group ${SITE.portraitSrc ? '' : 'no-print'}`}>
      <div className="relative">
        {/* corner ticks — a small nod to a lab plate / contact sheet */}
        <Corner className="-left-px -top-px" />
        <Corner className="-right-px -top-px rotate-90" />
        <Corner className="-bottom-px -right-px rotate-180" />
        <Corner className="-bottom-px -left-px -rotate-90" />

        {/* 3:4 matches the source photo exactly, so object-cover crops nothing */}
        <div className="relative aspect-3/4 w-full overflow-hidden border border-line bg-paper-2">
        {SITE.portraitSrc ? (
          <img
            src={SITE.portraitSrc}
            alt="Portrait of Bektay"
            width={960}
            height={1280}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-quint)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid-paper flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="label label-ink">[ Your portrait here ]</span>
            <span className="max-w-[22ch] font-mono text-[0.625rem] leading-relaxed text-ink-mute">
              Add the photo to <span className="text-ink-soft">/public/portrait.jpg</span> and set{' '}
              <span className="text-ink-soft">SITE.portraitSrc</span> in{' '}
              <span className="text-ink-soft">src/data/content.ts</span>
            </span>
          </div>
        )}
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-between">
        <span className="label">Aktobe, KZ</span>
        <span className="label">2026</span>
      </figcaption>
    </figure>
  );
}

function Corner({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`absolute z-10 h-2.5 w-2.5 ${className}`}>
      <span className="absolute left-0 top-0 h-px w-full bg-ink" />
      <span className="absolute left-0 top-0 h-full w-px bg-ink" />
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-28 lg:pt-44">
      <div className="shell">
        <Reveal>
          {/* items-start keeps the dot on the first line when the label wraps */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="label label-ink leading-[1.5]">
                Personal Portfolio — Engineering Notebook
              </span>
            </div>
            <span className="label hidden shrink-0 md:block">Est. Aktobe</span>
          </div>
        </Reveal>

        {/* The masthead: sized to fill the container edge to edge. The small
            negative inset optically aligns the B's stem with the rules. */}
        <h1 className="display mt-6 -ml-[0.03em] text-display md:mt-8">
          <WordReveal text={SITE.name} stagger={0} />
        </h1>

        <Rule className="mt-4 md:mt-6" />

        {/* One grid, so the tall portrait sits beside the whole left column
            instead of leaving a void under the short roles list. */}
        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {/* Roles, numbered like a spec sheet */}
            <ul className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
              {SITE.roles.map((role, i) => (
                <li key={role} className="border-b border-line-soft">
                  <Reveal delay={120 + i * 70}>
                    <div className="flex items-baseline gap-4 py-3">
                      <span className="label w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-lg font-medium tracking-tight md:text-xl">{role}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal>
              <p className="mt-12 text-2xl font-medium leading-[1.3] tracking-tight text-ink sm:text-3xl md:mt-16 md:text-[2.4rem] md:leading-[1.25]">
                {SITE.intro}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="no-print mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-sm font-medium tracking-tight text-paper transition-colors duration-300 hover:bg-accent"
                >
                  View Projects
                  <span className="inline-block transition-transform duration-400 ease-[var(--ease-out-quint)] group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 border border-ink/25 px-6 py-3.5 text-sm font-medium tracking-tight text-ink transition-colors duration-300 hover:border-ink"
                >
                  Get in Touch
                  <span className="inline-block transition-transform duration-400 ease-[var(--ease-out-quint)] group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={180}>
              <Portrait />
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-[0.95rem] leading-relaxed text-ink-soft">{SITE.secondary}</p>
            </Reveal>
          </div>
        </div>

        {/* Metadata strip */}
        <div className="mt-16 md:mt-24">
          <Rule />
          <dl className="grid grid-cols-1 divide-y divide-line-soft sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {SITE.meta.map((item, i) => (
              <div key={item.label} className={`py-5 ${i > 0 ? 'sm:pl-8' : ''} sm:pr-8`}>
                <Reveal delay={i * 80}>
                  <dt className="label">{item.label}</dt>
                  <dd className="mt-2 text-[0.95rem] tracking-tight text-ink">{item.value}</dd>
                </Reveal>
              </div>
            ))}
          </dl>
          <Rule delay={120} />
        </div>
      </div>
    </section>
  );
}
