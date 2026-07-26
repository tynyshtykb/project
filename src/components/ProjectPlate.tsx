import { useMemo } from 'react';
import type { Project } from '../data/content';

/**
 * Generated technical "plates" that stand in for project imagery.
 *
 * They are deliberately abstract — line drawings in the spirit of an
 * engineering notebook, not depictions of the projects' internals. Swap any
 * of them for a real screenshot by rendering an <img> in ProjectShowcase.
 */

/** Deterministic PRNG so every render draws exactly the same plate. */
function seeded(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 800;
const H = 600;

/**
 * The canvas matches the frame it is displayed in, so nothing is ever cropped:
 * standard cases are 4:3, the flagship banner is 21:9.
 */
function Frame({
  children,
  fig,
  w = W,
  h = H,
}: {
  children: React.ReactNode;
  fig: string;
  w?: number;
  h?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-full w-full"
      role="img"
      aria-label={`Abstract technical illustration, figure ${fig}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* corner ticks */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none">
        <path
          d={`M40 24v-8h32M${w - 40} 24v-8h-32M40 ${h - 24}v8h32M${w - 40} ${h - 24}v8h-32`}
        />
      </g>
      <text
        x="40"
        y={h - 26}
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="2"
        fill="currentColor"
        opacity="0.4"
      >
        FIG. {fig}
      </text>
      {children}
    </svg>
  );
}

function NetworkPlate({ w = W, h = H }: { w?: number; h?: number }) {
  const { nodes, edges } = useMemo(() => {
    const rand = seeded(7);
    const count = 21;
    const nodes = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + rand() * 0.5;
      const radius = 0.22 + rand() * 0.55;
      return {
        x: w / 2 + Math.cos(angle) * radius * (w / 2) * 0.86,
        y: h / 2 + Math.sin(angle) * radius * (h / 2) * 0.82,
        r: 2.5 + rand() * 5,
      };
    });
    const edges: [number, number][] = [];
    nodes.forEach((_, i) => {
      edges.push([i, (i + 1) % nodes.length]);
      if (i % 2 === 0) edges.push([i, (i + 7) % nodes.length]);
    });
    return { nodes, edges };
  }, [w, h]);

  return (
    <Frame fig="01" w={w} h={h}>
      <g className="origin-center transition-transform duration-[1.4s] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]">
        <g stroke="currentColor" strokeWidth="0.9" opacity="0.32">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
          ))}
        </g>
        <g fill="currentColor">
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} opacity={i % 3 === 0 ? 0.95 : 0.5} />
          ))}
        </g>
        <circle cx={w / 2} cy={h / 2} r="26" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx={w / 2} cy={h / 2} r="7" fill="var(--color-accent)" />
      </g>
    </Frame>
  );
}

function RegressionPlate() {
  const points = useMemo(() => {
    const rand = seeded(21);
    return Array.from({ length: 46 }, () => {
      const t = rand();
      const x = 90 + t * 620;
      const base = 470 - t * 300;
      return { x, y: base + (rand() - 0.5) * 130 };
    });
  }, []);

  return (
    <Frame fig="02">
      {/* axes */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.3">
        <line x1="90" y1="500" x2="720" y2="500" />
        <line x1="90" y1="100" x2="90" y2="500" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="86" y1={500 - i * 100} x2="90" y2={500 - i * 100} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={90 + i * 105} y1="500" x2={90 + i * 105} y2="504" />
        ))}
      </g>
      <g className="transition-opacity duration-700 group-hover:opacity-100" opacity="0.85">
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="currentColor" opacity="0.55" />
        ))}
      </g>
      {/* fitted trend */}
      <line
        x1="90"
        y1="472"
        x2="712"
        y2="168"
        stroke="var(--color-accent)"
        strokeWidth="2"
        className="origin-left transition-transform duration-[1.2s] ease-[var(--ease-out-quint)] group-hover:scale-x-[1.02]"
      />
      <g stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4 5" opacity="0.6">
        <line x1="90" y1="432" x2="712" y2="128" />
        <line x1="90" y1="512" x2="712" y2="208" />
      </g>
    </Frame>
  );
}

function FieldPlate() {
  const cells = useMemo(() => {
    const rand = seeded(43);
    const out: { x: number; y: number; on: boolean; flag: boolean }[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        const v = rand();
        out.push({
          x: 80 + col * 55,
          y: 90 + row * 52,
          on: v > 0.55,
          flag: v > 0.955,
        });
      }
    }
    return out;
  }, []);

  return (
    <Frame fig="03">
      <g className="origin-center transition-transform duration-[1.4s] ease-[var(--ease-out-quint)] group-hover:scale-[1.03]">
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width="30"
            height="30"
            fill={c.on ? 'currentColor' : 'none'}
            fillOpacity={c.on ? 0.14 : 0}
            stroke="currentColor"
            strokeOpacity={c.on ? 0.4 : 0.16}
            strokeWidth="1"
          />
        ))}
        {cells.map((c, i) =>
          c.flag ? (
            <g key={`f-${i}`} stroke="var(--color-accent)" strokeWidth="1.6" fill="none">
              <rect x={c.x - 7} y={c.y - 7} width="44" height="44" />
              <circle cx={c.x + 15} cy={c.y + 15} r="4" fill="var(--color-accent)" stroke="none" />
            </g>
          ) : null,
        )}
      </g>
    </Frame>
  );
}

function SignalPlate() {
  const { path, spike } = useMemo(() => {
    const rand = seeded(99);
    const pts: [number, number][] = [];
    let y = 320;
    for (let i = 0; i <= 60; i++) {
      y += (rand() - 0.5) * 46;
      y = Math.max(180, Math.min(430, y));
      pts.push([70 + i * 11, y]);
    }
    // deterministic failure event near the end of the series
    const spikeIndex = 47;
    pts[spikeIndex] = [pts[spikeIndex][0], 130];
    pts[spikeIndex + 1] = [pts[spikeIndex + 1][0], 470];
    return {
      path: pts.map(([x, py], i) => `${i === 0 ? 'M' : 'L'}${x} ${py.toFixed(1)}`).join(' '),
      spike: pts[spikeIndex],
    };
  }, []);

  return (
    <Frame fig="04">
      <g stroke="currentColor" strokeWidth="1" opacity="0.18">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="70" y1={140 + i * 80} x2="730" y2={140 + i * 80} />
        ))}
      </g>
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <g className="transition-opacity duration-700 group-hover:opacity-100" opacity="0.9">
        <line
          x1={spike[0]}
          y1="90"
          x2={spike[0]}
          y2="510"
          stroke="var(--color-accent)"
          strokeWidth="1"
          strokeDasharray="5 5"
        />
        <circle cx={spike[0]} cy={spike[1]} r="7" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
        <circle cx={spike[0]} cy={spike[1]} r="2.5" fill="var(--color-accent)" />
      </g>
    </Frame>
  );
}

function AperturePlate() {
  const blades = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const next = ((i + 1) / 6) * Math.PI * 2;
        const R = 210;
        const r = 92;
        const cx = W / 2;
        const cy = H / 2;
        return `M${cx + Math.cos(angle) * r} ${cy + Math.sin(angle) * r} L${cx + Math.cos(angle) * R} ${
          cy + Math.sin(angle) * R
        } L${cx + Math.cos(next) * R} ${cy + Math.sin(next) * R} Z`;
      }),
    [],
  );

  return (
    <Frame fig="05">
      <g className="origin-center transition-transform duration-[1.6s] ease-[var(--ease-out-quint)] group-hover:rotate-[14deg]">
        <g stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.06" opacity="0.55">
          {blades.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <circle cx={W / 2} cy={H / 2} r="92" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle
          cx={W / 2}
          cy={H / 2}
          r="210"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
      </g>
      <g stroke="var(--color-accent)" strokeWidth="1.4" fill="none">
        <path d="M300 210h-40v-40M500 210h40v-40M300 390h-40v40M500 390h40v40" />
      </g>
    </Frame>
  );
}

const PLATES: Record<Project['plate'], React.ComponentType> = {
  network: NetworkPlate,
  regression: RegressionPlate,
  field: FieldPlate,
  signal: SignalPlate,
  aperture: AperturePlate,
};

export function ProjectPlate({
  plate,
  variant = 'standard',
}: {
  plate: Project['plate'];
  /** 'banner' redraws on a 21:9 canvas for the full-width flagship frame. */
  variant?: 'standard' | 'banner';
}) {
  if (variant === 'banner') return <NetworkPlate w={1400} h={600} />;
  const Plate = PLATES[plate];
  return <Plate />;
}
