// Writes the "More from BinaryNoir" footer into each product's README from products.json.
// Run with `npm run readmes:sync`, or `npm run readmes:check` to list stale footers
// without writing (exits 1 if any). Edit products.json, never the generated footers.
//
// Repos are looked up as siblings of this one (../<repo>/README.md); pass --root <dir>
// to look elsewhere. The footer sits between the START and END markers. A README
// without markers yet has its old "## More from BinaryNoir" section replaced, up to
// the next "## " heading.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const START = '<!-- binarynoir:more:start (generated from binarynoir.github.io/products.json) -->';
const END = '<!-- binarynoir:more:end -->';
const HEADING = '## More from BinaryNoir';

const args = process.argv.slice(2);
const check = args.includes('--check');
const rootArg = args.indexOf('--root');
const root = path.resolve(
  rootArg >= 0 ? args[rootArg + 1] : path.resolve(import.meta.dirname, '../..'),
);

const data = JSON.parse(
  readFileSync(path.resolve(import.meta.dirname, '../products.json'), 'utf8'),
);
const byId = new Map(data.products.map((p) => [p.id, p]));

const item = (p) => `- [${p.name}](${p.url}): ${p.pitch}`;

function footer(product) {
  const related = product.related.map((id) => byId.get(id));
  const newest = byId.get(data.new);
  const showNew = newest.id !== product.id && !product.related.includes(newest.id);
  const names = data.categories.map((c) => c.name);
  const families = `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`;

  return [
    START,
    '',
    HEADING,
    '',
    '<p align="center">',
    '  <a href="https://binarynoir.tech">',
    '    <img alt="BinaryNoir" src="https://binarynoir.tech/logo-horizontal.svg" width="320">',
    '  </a>',
    '</p>',
    '',
    `${product.name} is one of a family of open-source tools from BinaryNoir.`,
    '',
    `**Pairs well with ${product.name}**`,
    '',
    ...related.map(item),
    '',
    ...(showNew ? [`**New:** [${newest.name}](${newest.url}): ${newest.pitch}`, ''] : []),
    `**See them all:** ${families}, with documentation and live demos, at **[binarynoir.tech](https://binarynoir.tech)**.`,
    '',
    END,
  ].join('\n');
}

function replaceFooter(readme, block) {
  const start = readme.indexOf('<!-- binarynoir:more:start');
  if (start >= 0) {
    const end = readme.indexOf(END, start);
    if (end < 0) throw new Error('start marker without an end marker');
    return readme.slice(0, start) + block + readme.slice(end + END.length);
  }
  const old = readme.indexOf(`${HEADING}\n`);
  if (old < 0) throw new Error(`no markers and no "${HEADING}" section`);
  const next = readme.indexOf('\n## ', old + HEADING.length);
  return readme.slice(0, old) + block + '\n' + (next < 0 ? '' : readme.slice(next));
}

for (const p of data.products) {
  for (const id of p.related ?? []) {
    if (!byId.has(id)) throw new Error(`${p.id}: unknown related id "${id}"`);
  }
}
if (!byId.has(data.new)) throw new Error(`unknown "new" id "${data.new}"`);

let stale = 0;
for (const product of data.products.filter((p) => p.repo)) {
  const file = path.join(root, product.repo, 'README.md');
  if (!existsSync(file)) {
    console.warn(`skip  ${product.repo} (no ${file})`);
    continue;
  }
  const readme = readFileSync(file, 'utf8');
  const updated = replaceFooter(readme, footer(product));
  if (updated === readme) {
    console.log(`ok    ${product.repo}`);
    continue;
  }
  stale++;
  if (check) {
    console.log(`stale ${product.repo}`);
  } else {
    writeFileSync(file, updated);
    console.log(`wrote ${product.repo}`);
  }
}

if (check && stale) {
  console.error(`\n${stale} README footer(s) out of date. Run \`npm run readmes:sync\`.`);
  process.exit(1);
}
