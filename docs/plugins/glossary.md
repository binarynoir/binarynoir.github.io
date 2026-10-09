---
title: Glossary Tooltips
---

# Glossary Tooltips ((tag|VitePress plugin|blue)) ((tag|markdown-it|orange))

[[readingTime]]

`markdown-it-glossary` lets you define a term once, in a plain Markdown file, and wraps every plain-text mention of it across your site in a hover tooltip. No linking each mention by hand, no repeating the definition on every page.

## See it live

Hover over the dotted-underlined words in this paragraph. Every push to `main` runs CI, and the CLI apps in this hub install through Homebrew. Pushover is one of the notification channels they support. None of those words were marked up by hand: they are defined in [the glossary](/reference/glossary) and tooltipped automatically.

## Install

```sh
npm install --save-dev markdown-it-glossary
```

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

Or wrap the config with `withGlossary` from `markdown-it-glossary/vitepress`. It plays nicely with other `withX()` wrappers.

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

The default look follows VitePress theme colors and can be overridden with the `--glossary-popover-bg`, `--glossary-popover-fg`, and `--glossary-popover-border` CSS variables. `enableGlossaryTooltips()` returns a function that removes its listeners.

## Writing the glossary file

Each term is a `###` heading followed by its definition as the next paragraph. This site's own [glossary file](/reference/glossary) is written like this:

```md
### CI

Continuous Integration: automatically building and testing every change before it is merged.

### frontmatter, front matter

The block of YAML at the very top of a Markdown file that holds page settings.
```

- Matching is exact-text and case-sensitive, and only applies to plain prose, never inline code.
- A comma-separated heading defines aliases: `### frontmatter, front matter` tooltips both spellings. Try it: frontmatter, front matter.
- A heading with a parenthetical qualifier is parsed but never tooltipped, for words that mean something else elsewhere. The last term in [the glossary](/reference/glossary) does this with the word Pages.

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

See it working on the [live section glossary demo](/plugins/glossary-demo/).

To apply a section glossary to the whole site instead, set `glossary-scope: site` in that file's frontmatter. Section glossaries are found when the config loads, so adding or editing one needs a dev-server restart.

### Which definition wins

When a term is defined in more than one glossary, **the closest glossary wins**. Closest means nearest to the page, measured in folders: a glossary in the page's own folder beats one a level up, and the master glossary is last. Only the conflicting term is replaced, so a section glossary adds to the master rather than replacing it.

| Rank | Source                     | Applies when                                                                 |
| ---- | -------------------------- | ---------------------------------------------------------------------------- |
| 1    | Page-local `*[Term]: …`    | the page defines the term itself                                             |
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

Use `local: false` to skip all section glossaries and keep the master. `glossary: false` still turns everything off.

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

Every exact, case-sensitive occurrence of `CI` on that page becomes an `<abbr title>`, and nothing else from the glossary does. The definition line itself isn't rendered. Use this to keep a few terms on an otherwise opted-out page, or to define terms that aren't in the glossary at all.

### Override one term on one page

The same syntax works on a page that has _not_ opted out. A page-local definition always wins over the site-wide one for that term, on that page:

```md
*[CI]: something else, on this page only
```

## Options

| Option           | Default         | Description                                                                  |
| ---------------- | --------------- | ---------------------------------------------------------------------------- |
| `file`           | none            | Path to a glossary Markdown file. Give this or `entries`.                    |
| `entries`        | none            | Pre-parsed entries, for sourcing terms from somewhere else.                  |
| `headingLevel`   | `3`             | Heading level that marks a term.                                             |
| `frontmatterKey` | `'glossary'`    | Frontmatter key for the opt-out. `false` disables it.                        |
| `root`           | none            | Docs folder. Enables section glossaries found below it.                      |
| `scopedFile`     | `'glossary.md'` | File name that marks a section glossary.                                     |
| `scopes`         | `[]`            | Section glossaries declared explicitly (`dir`, `file` or `entries`, `site`). |

The plugin itself emits plain `<abbr title>` tags and injects no CSS. This site adds a dotted underline in its theme so the terms are discoverable, and `enableGlossaryTooltips()` adds the popover and a help (question mark) cursor.

[Source and full README on GitHub](https://github.com/binarynoir/markdown-it-glossary)
