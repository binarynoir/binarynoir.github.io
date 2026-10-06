---
title: VitePress
---

# Markdown Tags for VitePress ((tag|VitePress plugin|blue))

[[readingTime]]

`@binarynoir/vitepress-markdown-tags` turns `((tag|Done|green))` into styled badges on a VitePress 2 site. See the [syntax and a live demo](/plugins/markdown-tags/) first if you haven't.

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

## Tagged pages

Add `tagged: true` to any page's frontmatter and it lists every tag used across the site, grouped by label, each with a link to the section that uses it. Nothing to add to `config.mts` beyond `taggedPagesVitePlugin()` in `vite.plugins`, which keeps these pages current in `vitepress dev`.

See the site-wide list on [Tagged pages](/reference/tagged-pages), and a scoped one on the [apps roadmap](/apps/roadmap), which only looks inside `apps/` and only lists some labels:

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
