/**
 * Compresses the project photos into web-sized WebP files.
 *
 * Full-resolution originals live in /assets-src and are NOT deployed —
 * anything inside /public is copied verbatim into the build, and the raw
 * photos are ~3.7 MB. Output goes to /public/media, which is what the site
 * references. Re-run with `npm run images` after adding or replacing a photo.
 *
 * Originals are also looked up in /public, so a photo dropped there still
 * works; move it to /assets-src afterwards to keep the deploy small.
 */
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'media');
mkdirSync(outDir, { recursive: true });

/** Prefer the source folder, but accept a file still sitting in /public. */
const resolveSource = (name) => {
  for (const dir of ['assets-src', 'public']) {
    const path = join(root, dir, name);
    if (existsSync(path)) return path;
  }
  throw new Error(`Source image not found in assets-src/ or public/: ${name}`);
};

/** [source file, output name, max width] */
const JOBS = [
  ['oqubot.png', 'oqubot', 1800],
  ['lipidai.png', 'lipidai', 1400],
  ['ecopolice.jpg', 'ecopolice-hardware', 1400],
  ['ecopolice.png', 'ecopolice-dashboard', 1400],
  ['qubyrflow.png', 'qubyrflow-dashboard', 1400],
  ['qubyrflow.jpg', 'qubyrflow-sensor', 1100],
  ['rakursproduction.png', 'rakurs', 1400],
];

const kb = (p) => (statSync(p).size / 1024).toFixed(0);

for (const [source, name, maxWidth] of JOBS) {
  const from = resolveSource(source);
  const to = join(outDir, `${name}.webp`);

  const meta = await sharp(from).metadata();
  const info = await sharp(from)
    .resize({ width: Math.min(maxWidth, meta.width), withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(to);

  console.log(
    `${source.padEnd(20)} ${kb(from).padStart(5)} KB  ->  media/${name}.webp  ` +
      `${kb(to).padStart(5)} KB  (${info.width}x${info.height})`,
  );
}
