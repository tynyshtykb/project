/**
 * Rasterizes the Open Graph card to public/og.png (1200x630).
 * Run with `npm run og` after editing the markup below.
 *
 * Uses a system UI font rather than Geist, since the rasterizer only sees
 * fonts installed on the machine — not the webfont the site loads.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const PAPER = '#f7f5f1';
const INK = '#14130f';
const MUTE = '#8a857c';
const LINE = '#dcd7cd';
const ACCENT = '#b24626';
const FONT = "Courier New, Courier, monospace";
const MONO = "Courier New, Courier, monospace";

const roles = [
  'Robotics Engineer',
  'Full-Stack Developer',
  'AI/ML Engineer',
  'Aspiring Startup Founder',
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>

  <!-- hairline frame -->
  <rect x="64" y="56" width="1072" height="518" fill="none" stroke="${LINE}" stroke-width="1"/>

  <!-- eyebrow -->
  <circle cx="104" cy="112" r="5" fill="${ACCENT}"/>
  <text x="122" y="118" font-family="${MONO}" font-size="17" letter-spacing="3" fill="${INK}">PERSONAL PORTFOLIO — ENGINEERING NOTEBOOK</text>

  <!-- name -->
  <text x="100" y="330" font-family="${FONT}" font-size="168" font-weight="700" letter-spacing="-3" fill="${INK}">BEKTAY</text>

  <line x1="100" y1="382" x2="1100" y2="382" stroke="${LINE}" stroke-width="1"/>

  <!-- roles -->
  ${roles
    .map(
      (role, i) =>
        `<text x="${100 + (i % 2) * 500}" y="${432 + Math.floor(i / 2) * 46}" font-family="${FONT}" font-size="26" font-weight="700" letter-spacing="-0.5" fill="${INK}">${role}</text>`,
    )
    .join('\n  ')}

  <line x1="100" y1="510" x2="1100" y2="510" stroke="${LINE}" stroke-width="1"/>

  <!-- metadata -->
  <text x="100" y="546" font-family="${MONO}" font-size="17" letter-spacing="2" fill="${MUTE}">AKTOBE, KAZAKHSTAN</text>
  <text x="470" y="546" font-family="${MONO}" font-size="17" letter-spacing="2" fill="${MUTE}">NIS AKTOBE — GRADE 11</text>
  <text x="880" y="546" font-family="${MONO}" font-size="17" letter-spacing="2" fill="${MUTE}">GPA 4.8 / 5.0</text>
</svg>`;

const out = join(root, 'public', 'og.png');
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
writeFileSync(join(root, 'public', 'og.svg'), svg);
console.log('wrote public/og.png and public/og.svg');
