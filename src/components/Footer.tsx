import { SITE } from '../data/content';
import { Reveal } from './primitives';

export function Footer() {
  return (
    // pb clears the fixed status bar at the bottom of the window
    <footer className="relative z-10 border-t border-line bg-paper-2">
      <div className="shell pb-24 pt-14 md:pb-28 md:pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="display text-4xl leading-[0.95] md:text-5xl">
                {SITE.name}
                <br />
                {SITE.surname}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-7">
            <Reveal delay={80}>
              <ul className="space-y-1.5">
                {SITE.roles.map((role) => (
                  <li key={role} className="text-[0.95rem] tracking-tight text-ink-soft">
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="md:col-span-2 md:col-start-11">
            <Reveal delay={140}>
              <a
                href="#top"
                className="group inline-flex items-center gap-2 text-[0.95rem] tracking-tight text-ink transition-colors duration-300 hover:text-accent"
              >
                <span className="link-underline">Back to top</span>
                <span className="inline-block transition-transform duration-400 ease-[var(--ease-out-quint)] group-hover:-translate-y-1">
                  ↑
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">© 2026 {SITE.fullName}</p>
          <p className="label">Aktobe, Kazakhstan</p>
          <p className="label no-print">React · TypeScript · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
