// Renders an on-brand 1200×675 blog cover: the detective in a white frame on black, faint
// binary digits behind, and up to three blocks of text: a small grey kicker, a big Film Noir title
// and one short Rockwell line. The layout is tuned to stay legible as a ~190px card thumbnail.
//
// A `|` in the title splits it over two lines ("SIDEBAR|ACCORDION"), for names too long to read
// on one. Chrome renders the page so the site's own .woff2 fonts are used; sharp compresses the
// PNG. Set CHROME_PATH if Chrome or Chromium isn't found.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '../..');
const fileUrl = (p) => pathToFileURL(path.join(root, p)).href;
const escapeHtml = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Longest each piece of copy can be and still read well as a thumbnail. */
export const LIMITS = { titleLine: 12, kicker: 20, line: 28 };

/** Warnings for copy that is too long to stay legible. */
export function checkCopy({ title, kicker = '', line = '' }) {
  const warnings = [];
  for (const part of title.split('|')) {
    if (part.length > LIMITS.titleLine)
      warnings.push(
        `title "${part}" is ${part.length} characters; keep each title line to ${LIMITS.titleLine}`,
      );
  }
  if (title.split('|').length > 2) warnings.push('title has more than two lines');
  if (kicker.length > LIMITS.kicker)
    warnings.push(`kicker is ${kicker.length} characters; keep it to ${LIMITS.kicker}`);
  if (line.length > LIMITS.line)
    warnings.push(`line is ${line.length} characters; keep it to ${LIMITS.line}`);
  return warnings;
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const chrome = candidates.find((p) => existsSync(p));
  if (!chrome)
    throw new Error('Chrome not found. Set CHROME_PATH to your Chrome or Chromium binary.');
  return chrome;
}

function coverHtml({ title, kicker, line }) {
  const titleLines = title.split('|').map((t) => escapeHtml(t.trim()));
  const twoLines = titleLines.length > 1;

  // Digits seeded from the title, so regenerating the same cover gives the same image.
  let seed = [...title].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32;
  const digits = Array.from({ length: 30 }, () =>
    Array.from({ length: 100 }, () => (random() < 0.5 ? '0' : '1')).join(''),
  ).join('\n');

  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Film Noir';src:url('${fileUrl('docs/public/fonts/film-noir.woff2')}')}
@font-face{font-family:'Rockwell';src:url('${fileUrl('docs/public/fonts/rockwell.woff2')}')}
html,body{margin:0;width:1200px;height:675px;background:#000;overflow:hidden}
.frame{position:absolute;inset:36px;border:8px solid #fff;overflow:hidden;background:#000}
.bin{position:absolute;inset:0;margin:0;padding:10px 14px;font:22px/30px 'Courier New',monospace;color:#161616;white-space:pre;letter-spacing:2px}
.det{position:absolute;left:44px;top:50%;transform:translateY(-50%);width:420px;height:420px;border-radius:50%;background:#000;box-shadow:0 0 0 30px #000}
.det img{width:100%;height:100%}
.txt{position:absolute;left:520px;right:30px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center}
.kick{font:40px 'Rockwell',serif;letter-spacing:9px;color:#9a9a9a;white-space:nowrap}
.big{font:162px/1.05 'Film Noir',Impact,sans-serif;color:#fff;letter-spacing:3px;margin:4px 0 28px -4px;white-space:nowrap}
.big.two{font-size:116px;line-height:1.14;margin:8px 0 38px -3px}
.sub{font:44px 'Rockwell',serif;color:#fff;white-space:nowrap}
</style></head><body><div class="frame"><pre class="bin">${digits}</pre>
<div class="det"><img src="${fileUrl('assets/detective-only.svg')}"></div>
<div class="txt">${kicker ? `<div class="kick">${escapeHtml(kicker)}</div>` : ''}<div class="big${twoLines ? ' two' : ''}">${titleLines.join('<br>')}</div>${line ? `<div class="sub">${escapeHtml(line)}</div>` : ''}</div></div>
<script>
// Shrink any block that is wider than the text column, once the fonts have loaded.
document.fonts.ready.then(() => {
  for (const el of document.querySelectorAll('.txt > div')) {
    let size = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > el.clientWidth && size > 10) el.style.fontSize = (size -= 2) + 'px';
  }
});
</script></body></html>`;
}

/** Renders one cover to `out` (a PNG path) and returns sharp's output info. */
export async function renderCover({ title, kicker = '', line = '', out }) {
  const chrome = findChrome();
  const work = mkdtempSync(path.join(tmpdir(), 'bn-cover-'));
  try {
    const page = path.join(work, 'cover.html');
    const shot = path.join(work, 'cover.png');
    writeFileSync(page, coverHtml({ title, kicker, line }));
    execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--allow-file-access-from-files',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--window-size=1200,675',
        '--virtual-time-budget=3000',
        `--screenshot=${shot}`,
        pathToFileURL(page).href,
      ],
      { stdio: 'ignore' },
    );
    mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
    return await sharp(shot)
      .png({ palette: true, colors: 64, compressionLevel: 9 })
      .toFile(path.resolve(out));
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}
