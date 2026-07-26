import { CONTACT } from '../data/content';
import { Reveal, Rule, Section, WordReveal } from './primitives';

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" className="pb-20 md:pb-28">
      <div className="shell">
        <Rule />
        <div className="flex items-baseline justify-between gap-6 pt-4">
          <Reveal>
            <span className="label">
              <span className="text-ink">08</span>
              <span className="mx-2 opacity-40">/</span>
              Contact
            </span>
          </Reveal>
          <Reveal delay={80}>
            <span className="label hidden sm:block">Open to collaboration</span>
          </Reveal>
        </div>

        <h2 id="contact-title" className="display mt-12 text-[length:clamp(2.75rem,9vw,8rem)] md:mt-16">
          <WordReveal text="Let’s build" stagger={70} />
          <br />
          <WordReveal text="something." stagger={70} delay={140} />
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 md:mt-20">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="max-w-sm whitespace-pre-line text-lg leading-relaxed tracking-tight text-ink-soft">
                {CONTACT.sub}
              </p>
            </Reveal>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {CONTACT.links.map((link, i) => (
              <li key={link.label} className="border-b border-line first:border-t first:border-line">
                <Reveal delay={i * 90}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="group flex items-baseline justify-between gap-6 py-6 transition-[padding] duration-500 ease-[var(--ease-out-quint)] md:hover:pl-3"
                  >
                    <span className="label shrink-0 pt-1">{link.label}</span>
                    <span className="flex flex-1 items-baseline justify-end gap-4 md:gap-6">
                      <span className="break-all text-right text-xl font-medium tracking-tight transition-colors duration-400 group-hover:text-accent md:text-2xl">
                        {link.value}
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-lg text-ink-mute transition-all duration-400 ease-[var(--ease-out-quint)] group-hover:translate-x-1 group-hover:text-accent"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
