// Writes the site's icon set to docs/public/icons/, one light and one dark file per icon.
// Run with `npm run icons`. Edit the shapes below, never the generated SVGs.
//
// Design rules, taken from the logo: 24px grid, 2px stroke, square caps and
// mitered joins (the logo is all hard edges), and one small solid square per
// icon as the accent, like the puzzle pin on the detective's lapel.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const out = path.resolve(import.meta.dirname, '../docs/public/icons');

const ICONS = {
  // Panel with a navigation column.
  layout: `<rect x="3" y="4" width="18" height="16"/><path d="M9 4v16M13 9h5M13 13h5"/><rect x="5" y="7" width="2" height="2" fill="C" stroke="none"/>`,
  // The arrow-style tag, pointing left like ((<tag|...)).
  tag: `<path d="M2 12l6-7h13v14H8z"/><path d="M14 12h4"/><rect x="9" y="11" width="2" height="2" fill="C" stroke="none"/>`,
  // Open book with ruled lines.
  book: `<path d="M12 6L3 4v14l9 2 9-2V4z"/><path d="M12 6v14M6 9h3M6 12h3M15 9h3"/><rect x="15" y="11" width="3" height="2" fill="C" stroke="none"/>`,
  // Clock face.
  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5h4"/><rect x="11" y="3.5" width="2" height="2" fill="C" stroke="none"/>`,
  // Picture frame with a ridge line and a square sun.
  image: `<rect x="3" y="4" width="18" height="16"/><path d="M4 17l4-4 4 4 3-3 5 5"/><rect x="15" y="7" width="3" height="3" fill="C" stroke="none"/>`,
  // Terminal window with a prompt.
  terminal: `<rect x="3" y="4" width="18" height="16"/><path d="M7 9l3 3-3 3M12 16h5"/><rect x="5" y="5.5" width="2" height="1" fill="C" stroke="none"/>`,
  // Jigsaw piece, after the pin on the lapel. Used for the plugins section.
  puzzle: `<path d="M4 8h5.5a2.5 2.5 0 1 1 5 0H20v4.5a2.5 2.5 0 1 1 0 5V20H4z"/><rect x="6" y="11" width="2" height="2" fill="C" stroke="none"/>`,
  // Compass for the guide.
  compass: `<circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/><rect x="11" y="11" width="2" height="2" fill="C" stroke="none"/>`,
};

const COLORS = { light: '#111111', dark: '#f0f0f0' };

mkdirSync(out, { recursive: true });
for (const [name, body] of Object.entries(ICONS)) {
  for (const [mode, color] of Object.entries(COLORS)) {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" ` +
      `fill="none" stroke="${color}" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">` +
      body.replaceAll('"C"', `"${color}"`) +
      `</svg>\n`;
    writeFileSync(path.join(out, `${name}-${mode}.svg`), svg);
  }
}
console.log(`Wrote ${Object.keys(ICONS).length * 2} icons to ${out}`);
