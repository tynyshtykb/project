/**
 * Renders the built site to public/bektay-tynyshtyk-cv.pdf using the print stylesheet.
 * Run with `npm run cv` (which builds first).
 *
 * Uses the Chrome/Edge already installed on the machine via `--print-to-pdf`,
 * so no headless-browser dependency is added to the project. Page size and
 * margins come from `@page` in src/index.css; `.no-print` elements drop out.
 *
 * Override the browser with CHROME_PATH if neither is in a standard location.
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, copyFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, normalize } from 'node:path';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const out = join(root, 'public', 'bektay-tynyshtyk-cv.pdf');

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

/** Static file server over dist/ — the SPA needs real requests for its assets. */
const server = createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
  let file = normalize(join(dist, url === '/' ? 'index.html' : url));

  // Never serve outside dist/, and fall back to index.html for unknown routes.
  if (!file.startsWith(dist) || !existsSync(file) || statSync(file).isDirectory()) {
    file = join(dist, 'index.html');
  }

  res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    // Windows
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  return candidates.find((p) => p && existsSync(p));
}

const browser = findBrowser();
if (!browser) {
  server.close();
  console.error('No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.');
  process.exit(1);
}

const profile = mkdtempSync(join(tmpdir(), 'cv-pdf-'));

const exit = await new Promise((resolve, reject) => {
  const child = spawn(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      // Fonts, images and the reveal-on-scroll script need a moment to settle.
      '--virtual-time-budget=15000',
      '--no-pdf-header-footer',
      `--print-to-pdf=${out}`,
      `http://127.0.0.1:${port}/`,
    ],
    { stdio: 'inherit' },
  );
  child.on('error', reject);
  child.on('exit', resolve);
});

server.close();
rmSync(profile, { recursive: true, force: true });

if (exit !== 0 || !existsSync(out)) {
  console.error(`Browser exited with code ${exit} and produced no PDF.`);
  process.exit(1);
}

// Keep the freshly built dist/ in sync so `npm run preview` serves the new PDF.
copyFileSync(out, join(dist, 'bektay-tynyshtyk-cv.pdf'));

console.log(`wrote public/bektay-tynyshtyk-cv.pdf (${(statSync(out).size / 1024).toFixed(0)} KB)`);
