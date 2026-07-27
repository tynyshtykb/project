import { useEffect, useState } from 'react';
import { NAV, SITE } from '../data/content';
import { useScrollSpy } from '../hooks/useScrollSpy';

const NAV_IDS = NAV.map((n) => n.id);

function DownloadCV({ className = '' }: { className?: string }) {
  // No PDF asset yet — the print stylesheet turns this page into a clean A4 CV.
  // Set SITE.cvPdfPath once a real PDF is dropped into /public.
  if (SITE.cvPdfPath) {
    return (
      <a
        href={SITE.cvPdfPath}
        download
        className={`group inline-flex items-center gap-2 border border-ink/25 px-3.5 py-2 text-[0.8rem] font-medium tracking-tight transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper ${className}`}
      >
        Download CV
        <Arrow />
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`group inline-flex items-center gap-2 border border-ink/25 px-3.5 py-2 text-[0.8rem] font-medium tracking-tight transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper ${className}`}
    >
      Download CV
      <Arrow />
    </button>
  );
}

function Arrow() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="translate-y-px transition-transform duration-300 group-hover:translate-y-0.5"
    >
      <path
        d="M6 1v9M2.5 6.5L6 10l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile menu, and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={`no-print fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-line bg-paper/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between md:h-[4.5rem]" aria-label="Main">
          <a
            href="#top"
            className="group relative text-[0.8rem] font-semibold tracking-[0.16em] text-ink sm:text-[0.95rem] sm:tracking-[0.2em]"
          >
            {SITE.name} {SITE.surname}
            <span className="absolute -right-2.5 top-1 h-1 w-1 rounded-full bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-7 lg:flex">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className="group relative block py-1 text-[0.82rem] tracking-tight text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      <span className={isActive ? 'text-ink' : undefined}>{item.label}</span>
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-[var(--ease-out-quint)] ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <DownloadCV />
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-all duration-400 ease-[var(--ease-out-quint)] ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-all duration-400 ease-[var(--ease-out-quint)] ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {/* `inert` (not `hidden`) so the fade can actually play while still
          keeping the closed menu out of the focus order and a11y tree. */}
      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={`no-print fixed inset-0 z-40 bg-paper transition-opacity duration-400 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col justify-between pb-10 pt-24">
          <ul className="flex flex-col">
            {NAV.map((item, i) => (
              <li key={item.id} className="border-b border-line-soft">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${100 + i * 45}ms` : '0ms' }}
                  className={`flex items-baseline justify-between py-5 text-3xl font-medium tracking-tight transition-all duration-500 ease-[var(--ease-out-quint)] ${
                    open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  }`}
                >
                  {item.label}
                  <span className="label">{String(i + 1).padStart(2, '0')}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-6">
            <DownloadCV className="w-full justify-center py-3.5 text-sm" />
            <p className="label leading-relaxed">
              Aktobe, Kazakhstan
              <br />
              bektailegenda@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
