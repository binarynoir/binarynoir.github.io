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

## Opt a page out

```md
---
glossary: false
---
```

The glossary page itself uses this so its headings don't tooltip themselves. To override one term on one page, write a real markdown-it-abbr definition anywhere on that page: `*[CI]: something else`.

## Options

| Option           | Default      | Description                                                 |
| ---------------- | ------------ | ----------------------------------------------------------- |
| `file`           | none         | Path to a glossary Markdown file. Give this or `entries`.   |
| `entries`        | none         | Pre-parsed entries, for sourcing terms from somewhere else. |
| `headingLevel`   | `3`          | Heading level that marks a term.                            |
| `frontmatterKey` | `'glossary'` | Frontmatter key for the opt-out. `false` disables it.       |

The plugin emits plain `<abbr title>` tags and injects no CSS. This site adds a dotted underline and a help cursor in its theme so the tooltips are discoverable.

[Source and full README on GitHub](https://github.com/binarynoir/markdown-it-glossary)
