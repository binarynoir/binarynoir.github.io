// Generates the standard release-post cover for every product in products.json, at
// docs/public/covers/<product id>.png. Each product's `cover` sets its title and line; the kicker
// comes from its category unless the cover sets one. Pass product ids to regenerate only those.
//
// Usage: npm run covers [-- <product id> ...]
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { checkCopy, renderCover } from './lib/cover.mjs';

const root = path.resolve(import.meta.dirname, '..');
const data = JSON.parse(readFileSync(path.join(root, 'products.json'), 'utf8'));

const kickers = {
  vitepress: 'VITEPRESS PLUGIN',
  vite: 'VITE PLUGIN',
  editor: 'EDITOR EXTENSION',
  cli: 'COMMAND-LINE APP',
};

const only = process.argv.slice(2);
const products = data.products.filter((p) => !only.length || only.includes(p.id));
const unknown = only.filter((id) => !data.products.some((p) => p.id === id));
if (unknown.length) {
  console.error(`Unknown product id: ${unknown.join(', ')}`);
  process.exit(1);
}

let failed = false;
for (const product of products) {
  if (!product.cover?.title) {
    console.error(`${product.id}: no "cover" in products.json; add { "title", "line" }.`);
    failed = true;
    continue;
  }
  const copy = {
    title: product.cover.title,
    kicker: product.cover.kicker ?? kickers[product.category] ?? '',
    line: product.cover.line ?? '',
  };
  for (const warning of checkCopy(copy)) console.warn(`${product.id}: ${warning}.`);
  const out = path.join(root, 'docs/public/covers', `${product.id}.png`);
  const info = await renderCover({ ...copy, out });
  console.log(
    `${product.id}: docs/public/covers/${product.id}.png (${Math.round(info.size / 1024)} KB)`,
  );
}
process.exit(failed ? 1 : 0);
