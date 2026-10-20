---
title: Glossary Tooltips
---

# Glossary Tooltips ((tag|VitePress plugin|blue)) ((tag|markdown-it|orange))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fmarkdown--it--glossary-181717?logo=github)](https://github.com/binarynoir/markdown-it-glossary) [![npm version](https://img.shields.io/npm/v/markdown-it-glossary)](https://www.npmjs.com/package/markdown-it-glossary) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/markdown-it-glossary/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/markdown-it-glossary/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/markdown-it-glossary)](https://github.com/binarynoir/markdown-it-glossary/blob/main/LICENSE)

`markdown-it-glossary` lets you define a term once, in a plain Markdown file, and wraps every plain-text mention of it across your site in a hover tooltip. No linking each mention by hand, no repeating the definition on every page.

## See it live

Hover over the dotted-underlined words in this paragraph. Every push to `main` runs CI, and the CLI apps in this hub install through Homebrew. Pushover is one of the notification channels they support. None of those words were marked up by hand: they are defined in [the glossary](/reference/glossary) and tooltipped automatically.

## Install

```sh
npm install --save-dev markdown-it-glossary
```

Needs Node 22 or later and markdown-it 15. VitePress 1 and 2 are both supported, and VitePress is optional: the plugin works with any markdown-it setup.

## Use

```ts
// .vitepress/config.mts
import { glossaryAbbr } from 'markdown-it-glossary';
import path from 'node:path';

export default defineConfig({
  markdown: {
    config(md) {
      md.use(glossaryAbbr, {
        file: path.resolve(import.meta.dirname, '../glossary.md'),
      });
    },
  },
});
```

Every page now tooltips every term in `glossary.md`. Ship that file as a normal page (add it to your nav) and it doubles as a browsable reference; it isn't a special page type.

### `withGlossary` shortcut

If you'd rather wrap your config than touch `markdown.config`, use `withGlossary`, the same idea as `withMermaid`:

```ts
// .vitepress/config.mts
import { withGlossary } from 'markdown-it-glossary/vitepress';

export default withGlossary(
  defineConfig({
    // ...your normal config
  }),
  { file: path.resolve(import.meta.dirname, '../glossary.md') },
);
```

It won't overwrite a `markdown.config` you already have, including one set by another `withX()` wrapper: it installs the glossary plugin, then calls whatever was already there.

It also works with plain markdown-it: `new MarkdownIt().use(glossaryAbbr, { file: 'glossary.md' })`.

### Hover, click and tap

`<abbr title>` tooltips need a mouse hover, so they never show on a phone or tablet. Call `enableGlossaryTooltips()` once in the browser and every term gets a small popover that works with any input: hover a term with a mouse (click to pin it open), or tap it on a touch screen. Tap the term again, tap elsewhere, scroll, or press Escape to dismiss it. While the popover is open the term's `title` is lifted so the browser's own tooltip doesn't show on top of it, then restored.

In VitePress, call it from your theme's `enhanceApp`:

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import { enableGlossaryTooltips } from 'markdown-it-glossary/client';

export default {
  extends: DefaultTheme,
  enhanceApp() {
    enableGlossaryTooltips();
  },
};
```

| Option         | Default         | Description                                                                           |
| -------------- | --------------- | ------------------------------------------------------------------------------------- |
| `selector`     | `'abbr[title]'` | Which elements carry a definition in their `title`.                                   |
| `hover`        | `true`          | Show on mouse hover too. `false` for click and tap only.                              |
| `hoverDelay`   | `500`           | Milliseconds the mouse must rest on a term before the popover shows. `0` for instant. |
| `touchOnly`    | `false`         | Respond to touch input only, leaving mouse users the native tooltip.                  |
| `injectStyles` | `true`          | Inject the default popover styles. `false` lets you style `.glossary-popover`.        |

Terms get a help (question mark) cursor for mouse users, which you can override in your own CSS. On touch screens they get a pointer cursor instead, which iOS Safari needs before it will deliver taps. The default look follows VitePress theme colors and can be overridden with the `--glossary-popover-bg`, `--glossary-popover-fg`, and `--glossary-popover-border` CSS variables. `enableGlossaryTooltips()` returns a function that removes its listeners.

## Writing the glossary file

Each term is a `###` heading followed by its definition as the next paragraph. This site's own [glossary file](/reference/glossary) is written like this:

```md
### CI

Continuous Integration: automatically building and testing every change before it is merged.

### frontmatter, front matter

The block of YAML at the very top of a Markdown file that holds page settings.
```

- The definition becomes the tooltip text. Markdown formatting (bold, code, links) is stripped to plain text, so keep it to a sentence or two.
- Matching ignores case by default (`CI` also matches `ci`), matches whole words only, and only applies to plain prose, never inline code. To match exact case only, see [Case sensitivity](#case-sensitivity).
- A comma-separated heading defines aliases: `### frontmatter, front matter` tooltips both spellings. Try it: frontmatter, front matter.
- A heading with a parenthetical qualifier is parsed but never tooltipped, for words that mean something else elsewhere. The last term in [the glossary](/reference/glossary) does this with the word Pages. `{.off}` at the end of the heading does the same without a qualifier: `### sharp {.off}`.
- Headings inside fenced code blocks are ignored, so a glossary page can show example syntax without it becoming terms.

## Case sensitivity

Terms match regardless of case by default. Turn exact-case matching on or off at five levels. The closest setting to the term wins:

| Where                        | Setting                         | Applies to                            |
| ---------------------------- | ------------------------------- | ------------------------------------- |
| Plugin options               | `caseSensitive: true`           | the whole site (the base default)     |
| Master glossary frontmatter  | `glossary-case-sensitive: true` | the whole site, overriding the option |
| Section glossary frontmatter | `glossary-case-sensitive: true` | that folder and every folder below it |
| Any page's frontmatter       | `glossary-case-sensitive: true` | that page only                        |
| The term's heading           | `### IT {.exact}`               | that term, on every page              |

Use `false` at any level to turn it back off from that point down. For example, a case-sensitive site with one section that ignores case again:

```md
---
# glossary.md (the master)
glossary-case-sensitive: true
---
```

```md
---
# team-a/glossary.md: team-a/ and below ignore case
glossary-case-sensitive: false
---
```

- **It follows folders, not terms.** The setting controls how every term on a page is matched, whichever glossary the term came from. A section glossary marked `glossary-scope: site` still only sets case sensitivity for its own folder.
- **Short acronyms can collide with ordinary words** when case is ignored: `IT` matches "it", `US` matches "us". Flag those terms `{.exact}`.

### Per-term flags

End a heading with `{.exact}` to match that term in exact case only, or `{.anycase}` to match any case, whatever the site, section or page says:

```md
### IT, Information Technology {.exact}

The team that runs our laptops and servers.
```

The flag covers the whole heading, aliases included. It combines with a custom anchor (`{#it .exact}`), and VitePress hides the block on the rendered glossary page. With `entries`, set `caseSensitive` on the entry instead.

## First mention only

To tooltip only the first mention of each term on a page, set `firstOnly: true` in the options. Like case sensitivity, `glossary-first-only: true | false` in the master glossary, a section glossary or a page overrides it there. A term and its aliases count as one term.

## Section glossaries

Parts of a site, like a team's docs, can have their own vocabulary. Set `root` to your docs folder and drop a `glossary.md` into any subfolder. It applies to that folder and everything below it, and nowhere else.

```ts
md.use(glossaryAbbr, {
  file: path.resolve(import.meta.dirname, '../glossary.md'), // master glossary
  root: path.resolve(import.meta.dirname, '..'), // docs folder
});
```

```text
docs/
├─ glossary.md             master: applies everywhere
├─ team-a/
│  ├─ glossary.md          team-a/ and below
│  └─ guides/
│     ├─ glossary.md       team-a/guides/ and below
│     └─ deploy.md
└─ team-b/index.md
```

To use a different file name, set the `scopedFile` option, or list section glossaries explicitly with `scopes` (see the [README](https://github.com/binarynoir/markdown-it-glossary#readme)). This site sets `scopedFile: 'section-glossary.md'` so that its own [Glossary](/reference/glossary) page, `reference/glossary.md`, is never mistaken for a section glossary. See it working on the [live section glossary demo](/plugins/glossary/section-demo/).

To apply a section glossary to the whole site instead, set `glossary-scope: site` in that file's frontmatter (`section` is the default). Section glossaries are found when the config loads, skipping `node_modules`, `dist` and folders that start with a dot like `.vitepress`, so adding or editing one needs a dev-server restart. The master glossary file is never mistaken for a section glossary.

### Which definition wins

When a term is defined in more than one glossary, **the closest glossary wins**. Closest means nearest to the page, measured in folders: a glossary in the page's own folder beats one a level up, and the master glossary is last. Only the conflicting term is replaced, so a section glossary adds to the master rather than replacing it.

| Rank | Source                     | Applies when                                                                 |
| ---- | -------------------------- | ---------------------------------------------------------------------------- |
| 1    | Page-local `*[Term]: …`    | the page defines the term itself (see [Opt a page out](#opt-a-page-out))     |
| 2    | Section glossary           | its folder contains the page; the deepest folder ranks highest               |
| 3    | Site-wide section glossary | it is marked `glossary-scope: site` and its folder does not contain the page |
| 4    | Master glossary            | always, unless the page opts out                                             |

For example, if `CI` is defined in the master, in `team-a/glossary.md`, and in `team-a/guides/glossary.md`, then `team-a/guides/deploy.md` uses the `guides` definition, `team-a/index.md` uses the `team-a` one, and `team-b/index.md` uses the master's.

A term marked as not tooltipped (the parenthetical heading) in a closer glossary hides that term from farther ones, so a section can say a word means something else there. If two site-wide glossaries define the same term, the folder that sorts first alphabetically wins and a warning is logged at startup.

### Choose which layers a page gets

```md
---
glossary:
  master: false # keep section glossaries, skip the master
---
```

Use `local: false` to skip all section glossaries, including site-wide ones from other folders, and keep the master. `glossary: false` still turns everything off. Page-local `*[Term]: …` definitions work in every case.

### Drop single terms from a page

```md
---
glossary:
  exclude: [sharp, Homebrew]
---
```

Spellings match ignoring case, a term's aliases are dropped with it, and no farther glossary fills the gap. To turn a term off for a whole section instead, mark it `{.off}` in that section's glossary.

## Opt a page out

```md
---
glossary: false
---
```

The glossary page itself uses this so its headings don't tooltip themselves.

Opting out only turns off the site-wide glossary for that page. The page still supports [markdown-it-abbr](https://github.com/markdown-it/markdown-it-abbr), so you can add tooltips by hand. Write a definition line anywhere in the page's Markdown, in the form `*[Term]: definition`:

```md
---
glossary: false
---

# Release notes

We cut a release every sprint, and each one is gated on CI passing.

*[CI]: Continuous Integration, only this page's definition applies.
```

Every occurrence of `CI` on that page (in any case, unless the page is [case-sensitive](#case-sensitivity)) becomes an `<abbr title>`, and nothing else from the glossary does. The definition line itself isn't rendered. Use this to keep a few terms on an otherwise opted-out page, or to define terms that aren't in the glossary at all.

### Override one term on one page

The same syntax works on a page that has _not_ opted out. A page-local definition always wins over the site-wide one for that term, on that page:

```md
*[CI]: something else, on this page only
```

## Options

The same options work for `glossaryAbbr(md, options)` and `withGlossary(config, options)`.

| Option           | Default         | Description                                                                                             |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| `file`           | none            | Path to a glossary Markdown file. Give this or `entries`.                                               |
| `entries`        | none            | Pre-parsed entries, for sourcing terms from somewhere else.                                             |
| `headingLevel`   | `3`             | Heading level that marks a term.                                                                        |
| `frontmatterKey` | `'glossary'`    | Frontmatter key for the opt-out. `false` disables it.                                                   |
| `caseSensitive`  | `false`         | Match terms only in their exact case. The site-wide default; see [Case sensitivity](#case-sensitivity). |
| `firstOnly`      | `false`         | Tooltip only the first mention of each term on a page; see [First mention only](#first-mention-only).   |
| `root`           | none            | Docs folder. Enables section glossaries found below it.                                                 |
| `scopedFile`     | `'glossary.md'` | File name that marks a section glossary.                                                                |
| `scopes`         | `[]`            | Section glossaries declared explicitly (`dir`, `file` or `entries`, `site`, `caseSensitive`).           |

### Frontmatter keys

| Key                       | Where                     | Values                                                                      |
| ------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| `glossary`                | any page                  | `false`, or `{ master: false }` / `{ local: false }` / `{ exclude: [...] }` |
| `glossary-scope`          | a section glossary        | `section` (default) or `site`                                               |
| `glossary-case-sensitive` | any glossary file or page | `true` or `false`                                                           |
| `glossary-first-only`     | any glossary file or page | `true` or `false`                                                           |

On a term heading, `{.exact}` and `{.anycase}` set that term's case rule, and `{.off}` turns it off.

## Styling

The plugin itself emits plain `<abbr title>` tags and injects no CSS. This site adds a dotted underline in its theme so the terms are discoverable, and `enableGlossaryTooltips()` adds the popover and a help (question mark) cursor.

The full README also covers the exported parser API, for sourcing terms from somewhere other than one Markdown file.

[Source and full README on GitHub](https://github.com/binarynoir/markdown-it-glossary)
