import { useEffect, useState } from 'react';
import { NAV } from '../data/content';
import { useScrollSpy } from '../hooks/useScrollSpy';

const NAV_IDS = NAV.map((n) => n.id);

/**
 * A thin instrument readout pinned to the bottom of the window: where you are
 * in the document and how far through it you have read.
 */
export function StatusBar() {
  const [progress, setProgress] = useState(0);
  const active = useScrollSpy(NAV_IDS);
  const label = NAV.find((n) => n.id === active)?.label ?? 'Intro';

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="no-print pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/85 backdrop-blur-md"
    >
      {/* read-progress hairline */}
      <div
        className="h-px origin-left bg-accent transition-transform duration-150 ease-linear"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <div className="shell flex h-8 items-center justify-between gap-4">
        <span className="label flex items-center gap-2.5 truncate">
          <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span className="text-ink">{label}</span>
        </span>

        <span className="label hidden sm:block">Aktobe, KZ</span>

        <span className="label tabular-nums text-ink">
          {String(Math.round(progress)).padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
}
