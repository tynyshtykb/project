import type { ElementType, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

/* ------------------------------------------------------------------
   Reveal — fades + lifts its children into place once scrolled to.
   ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      data-shown={inView}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   WordReveal — masks each word and slides it up, staggered.
   Used sparingly: hero and section titles only.
   ------------------------------------------------------------------ */
export function WordReveal({
  text,
  className = '',
  stagger = 55,
  delay = 0,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.25 });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span
            className="word"
            data-shown={inView}
            style={{ '--word-delay': `${delay + i * stagger}ms` } as React.CSSProperties}
          >
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Rule — hairline that wipes in from the left.
   ------------------------------------------------------------------ */
export function Rule({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0 });
  return (
    <div
      ref={ref}
      data-shown={inView}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={`rule-wipe h-px w-full bg-line ${className}`}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------
   SectionHeader — the repeating editorial masthead for each section.
   ------------------------------------------------------------------ */
export function SectionHeader({
  index,
  title,
  meta,
  tone = 'light',
  titleId,
}: {
  index: string;
  title: string;
  meta?: string;
  tone?: 'light' | 'dark';
  titleId?: string;
}) {
  const isDark = tone === 'dark';
  return (
    <header className="relative mb-14 md:mb-20">
      <Rule className={isDark ? 'bg-white/20' : ''} />
      <div className="flex items-baseline justify-between gap-6 pt-4">
        <Reveal>
          <span className={`label ${isDark ? 'text-white/50' : ''}`}>
            <span className={isDark ? 'text-white/80' : 'text-ink'}>{index}</span>
            <span className="mx-2 opacity-40">/</span>
            {title}
          </span>
        </Reveal>
        {meta ? (
          <Reveal delay={80}>
            <span className={`label hidden sm:block ${isDark ? 'text-white/45' : ''}`}>{meta}</span>
          </Reveal>
        ) : null}
      </div>

      <div className="relative mt-8 md:mt-10">
        {/* outlined section number, sitting behind the title on the right */}
        <span
          aria-hidden="true"
          className="ghost-numeral pointer-events-none absolute -top-2 right-0 hidden text-[7rem] md:block lg:text-[10rem]"
        >
          {index}
        </span>
        <h2 id={titleId} className={`hed relative text-hed ${isDark ? 'text-paper' : 'text-ink'}`}>
          <WordReveal text={title} />
        </h2>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
   Section — semantic wrapper with consistent vertical rhythm.
   ------------------------------------------------------------------ */
export function Section({
  id,
  children,
  className = '',
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`print-tight scroll-mt-24 py-24 md:py-32 lg:py-40 ${className}`}
    >
      {children}
    </section>
  );
}
