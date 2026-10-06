---
title: Markdown Tags
---

# Markdown Tags ((tag|VitePress plugin|blue))

[[readingTime]]

`@binarynoir/vitepress-markdown-tags` turns inline syntax like `((tag|Done|green))` into styled badges. Code blocks and inline code are left exactly as written, so you can document the syntax itself. The same syntax works in [VS Code](https://github.com/binarynoir/vscode-markdown-tags) and [Obsidian](https://github.com/binarynoir/obsidian-markdown-tags).

## Install

```sh
npm install --save-dev @binarynoir/vitepress-markdown-tags
```

## Use

Three small pieces: config, theme and Markdown.

```ts
// .vitepress/config.mts
import { markdownTags, stripTags } from '@binarynoir/vitepress-markdown-tags';

export default defineConfig({
  markdown: {
    config(md) {
      md.use(markdownTags);
    },
  },
  // Keep tag syntax out of page titles.
  transformPageData(pageData) {
    if (typeof pageData.title === 'string') pageData.title = stripTags(pageData.title);
  },
});
```

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import { registerMarkdownTags } from '@binarynoir/vitepress-markdown-tags/theme';
import '@binarynoir/vitepress-markdown-tags/style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    registerMarkdownTags(app);
  },
};
```

Prefer one call? `withMarkdownTags(config)` from `@binarynoir/vitepress-markdown-tags/vitepress` does the config part for you.

## Syntax

```txt
((tag|label))
((tag|label|background))
((tag|label|background|foreground))
((<tag|label|background|foreground))     arrow style
```

## See it live

Preset labels pick their own color:

- ((tag|todo)) ((tag|planned)) grey
- ((tag|doing)) ((tag|in-progress)) orange
- ((tag|done)) ((tag|tip)) green
- ((tag|on-hold)) ((tag|tbd)) ((tag|proposed)) ((tag|draft)) ((tag|wip)) blue
- ((tag|mvp)) purple
- ((tag|warn)) yellow
- ((tag|blocked)) ((tag|canceled)) ((tag|error)) red

Or choose the colors yourself: ((tag|Custom|orange)) ((tag|Hex color|#0f766e|#fff)) and the arrow style ((<tag|v2|#7a5add|#fff)).

Tags work in tables too:

| Feature                 | Status |
| ----------------------- | ------ |
| Inline badges           | ((tag  | Done))    |
| Arrow tags              | ((tag  | Done))    |
| Per-folder tagged pages | ((tag  | In review | orange)) |

## Tagged pages

Add `tagged: true` to any page's frontmatter and it lists every tag used across the site, grouped by label, each with a link to the section that uses it. Nothing to add to `config.mts` beyond `taggedPagesVitePlugin()` in `vite.plugins`, which keeps these pages current in `vitepress dev`.

See the site-wide list on [Tagged pages](/tagged-pages), and a scoped one on the [apps roadmap](/apps/roadmap), which only looks inside `apps/` and only lists some labels:

```md
---
tagged:
  include: [done, planned]
  folders: [apps]
---
```

## Options

| Option            | Default         | Description                                                  |
| ----------------- | --------------- | ------------------------------------------------------------ |
| `componentName`   | `'MarkdownTag'` | Component the syntax compiles to.                            |
| `stripFromTitles` | `true`          | `withMarkdownTags` only: remove tag syntax from page titles. |

Style any color with one custom property: `.md-tag--green { --md-tag-color: #2e8555; }`.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-markdown-tags)
