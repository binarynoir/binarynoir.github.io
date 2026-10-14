---
title: VitePress
---

# Markdown Tags for VitePress ((tag|VitePress plugin|blue))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvitepress--markdown--tags-181717?logo=github)](https://github.com/binarynoir/vitepress-markdown-tags) [![npm version](https://img.shields.io/npm/v/@binarynoir/vitepress-markdown-tags)](https://www.npmjs.com/package/@binarynoir/vitepress-markdown-tags) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vitepress-markdown-tags/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vitepress-markdown-tags/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vitepress-markdown-tags)](https://github.com/binarynoir/vitepress-markdown-tags/blob/main/LICENSE)

`@binarynoir/vitepress-markdown-tags` turns `((tag|Done|green))` into styled badges on a VitePress 2 site. See the [syntax and a live demo](/plugins/markdown-tags/) first if you haven't.

## Install

```sh
npm install --save-dev @binarynoir/vitepress-markdown-tags
```

## Use

Three small pieces: config, theme and Markdown.

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress';
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

Add `tagged: true` to any page's frontmatter and it lists every tag used across the site, grouped by label, each with a link to the section that uses it. The list goes at the end of the page, or wherever you put a `<!-- tagged-pages -->` comment on its own line.

Builds need nothing else. To keep these pages current while you edit in `vitepress dev`, also add the Vite plugin (`withMarkdownTags` adds it for you):

```ts
// .vitepress/config.mts
import { taggedPagesVitePlugin } from '@binarynoir/vitepress-markdown-tags/vitepress';

export default defineConfig({
  vite: { plugins: [taggedPagesVitePlugin()] },
});
```

See the site-wide list on [Tagged pages](/reference/tagged-pages). To narrow a list, give `tagged` settings instead of `true`. The [apps roadmap](/apps/roadmap) only looks inside `apps/` and only lists two labels:

```md
---
tagged:
  include: [done, planned]
  folders: [apps]
---
```

| Setting   | Default    | Description                                                  |
| --------- | ---------- | ------------------------------------------------------------ |
| `include` | all labels | Only list these labels.                                      |
| `exclude` | none       | Never list these labels. Wins over `include`.                |
| `folders` | whole site | Only scan pages in these folders, relative to the docs root. |

Labels match case-insensitively, and tags inside code are ignored.

## Options

| Option            | Default         | Description                                                  |
| ----------------- | --------------- | ------------------------------------------------------------ |
| `componentName`   | `'MarkdownTag'` | Component the syntax compiles to.                            |
| `stripFromTitles` | `true`          | `withMarkdownTags` only: remove tag syntax from page titles. |

Style any color with one custom property: `.md-tag--green { --md-tag-color: #2e8555; }`.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-markdown-tags)
