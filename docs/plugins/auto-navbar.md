---
title: Auto Navbar
---

# Auto Navbar ((tag|VitePress plugin|blue))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvitepress--auto--navbar-181717?logo=github)](https://github.com/binarynoir/vitepress-auto-navbar) [![npm version](https://img.shields.io/npm/v/@binarynoir/vitepress-auto-navbar)](https://www.npmjs.com/package/@binarynoir/vitepress-auto-navbar) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vitepress-auto-navbar/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vitepress-auto-navbar/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vitepress-auto-navbar)](https://github.com/binarynoir/vitepress-auto-navbar/blob/main/LICENSE)

`@binarynoir/vitepress-auto-navbar` is the companion to [Auto Sidebar](/plugins/auto-sidebar/). It builds `themeConfig.nav` from the same folder scan, with the same ordering and exclusion syntax, in `.nav` files.

## See it live

The top navbar is generated. Its order comes from `docs/.nav`:

<<< @/.nav{txt}

Notice what is missing: titles. With `configFilenames: ['.nav', '.sidebar']`, a folder that has only a `.sidebar` file (like `plugins/`) lends its titles to the navbar. Open the **Plugins** dropdown and compare it to the sidebar. Same titles, written once.

## Install

```sh
npm install --save-dev @binarynoir/vitepress-auto-navbar
```

## Use

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress';
import { generateNav } from '@binarynoir/vitepress-auto-navbar';
import path from 'node:path';

export default defineConfig({
  themeConfig: {
    nav: generateNav(path.resolve(import.meta.dirname, '..'), {
      maxDepth: 2,
      configFilenames: ['.nav', '.sidebar'],
    }),
  },
});
```

Each top-level folder becomes a navbar entry: a dropdown if it has several pages, a plain link if it has one. Top-level `.md` files become plain links.

## Options

| Option              | Default        | Description                                                           |
| ------------------- | -------------- | --------------------------------------------------------------------- |
| `maxDepth`          | `2`            | Navbar levels, 1 to 3.                                                |
| `maxTitleLength`    | `50`           | Truncate generated titles beyond this length.                         |
| `configFilenames`   | `['.nav']`     | Per-folder config file names, checked in order.                       |
| `excludeFilenames`  | `['.exclude']` | Per-folder exclusion file names.                                      |
| `indexTitle`        | `'Overview'`   | Label for the dropdown entry that links to the folder's landing page. |
| `flattenSinglePage` | `true`         | A folder with one entry becomes a plain link.                         |
| `activeMatch`       | `true`         | Keep items highlighted on every page beneath them.                    |
| `titleReplacements` | `{}`           | Words to replace in titles made from file and folder names.           |
| `stripTags`         | `true`         | Remove Markdown Tags syntax (`((tag\|draft))`) from titles.           |
| `transformTitle`    | none           | A function that gets every title before truncation.                   |
| `verbose`           | `false`        | Log each folder as it is processed.                                   |

In `.nav` files, `.link` renders a folder as one plain link, and `.inherit` borrows `name:Title` overrides from the other config files. Titles can be single- or double-quoted, with a space after the colon if you like, and a line that can't be parsed logs a warning with its file and line number.

A folder's landing page is its `index.md`, or its `README.md`. VitePress serves a `README.md` at `README.html`, so add [README Index](/plugins/readme-index/) to serve it at the folder's URL.

## Titles

This site passes the same title options to both menus. See them working in the [Sidebar Titles Demo](/plugins/auto-sidebar/titles-demo/), and in this site's [config](https://github.com/binarynoir/binarynoir.github.io/blob/main/docs/.vitepress/config.mts).

A title made from a file or folder name is formatted: `getting-started.md` becomes "Getting Started". Only first letters are capitalised, so use `titleReplacements` for words with other casing. Keys match whole words, ignoring case:

```ts
generateNav(docsRoot, {
  titleReplacements: { github: 'GitHub', api: 'API', cicd: 'CI/CD' },
});
// github-actions/ → "GitHub Actions", cicd-setup.md → "CI/CD Setup"
```

Titles an author wrote (a heading, `title` frontmatter, a `.nav` line) are never changed by `titleReplacements`.

[Markdown Tags](/plugins/markdown-tags/) syntax is removed from every title, so `# Design ((tag|draft))` is listed as "Design". Set `stripTags: false` to keep it.

For anything else, `transformTitle` gets every title before it is truncated, with where it came from: `'name'` (a file or folder name), `'page'` (frontmatter or the first heading) or `'config'` (a `.nav` line). Return the title to use, or `undefined` to keep it:

```ts
generateNav(docsRoot, {
  transformTitle: (title, { source }) =>
    source === 'page' ? title.replace(/^Guide: /, '') : undefined,
});
```

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-auto-navbar)
