// Generates one on-brand blog cover. See scripts/lib/cover.mjs for the design.
// For a product release post, use the product's standard cover instead (`npm run covers`).
//
// Usage:
//   npm run cover -- --title SERVICES --kicker "NOW OFFERING" --line "Set up for your team." \
//     --out docs/public/services-cover.png
// A `|` in the title splits it over two lines: --title "SIDEBAR|ACCORDION".
import path from 'node:path';
import { parseArgs } from 'node:util';
import { checkCopy, renderCover } from './lib/cover.mjs';

const { values } = parseArgs({
  options: {
    title: { type: 'string' },
    kicker: { type: 'string', default: '' },
    line: { type: 'string', default: '' },
    out: { type: 'string' },
  },
});

if (!values.title || !values.out) {
  console.error(
    'Usage: npm run cover -- --title TEXT [--kicker TEXT] [--line TEXT] --out FILE.png',
  );
  process.exit(1);
}

for (const warning of checkCopy(values)) console.warn(`Warning: ${warning}.`);

const info = await renderCover(values);
console.log(
  `Wrote ${path.relative(process.cwd(), path.resolve(values.out))} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`,
);
