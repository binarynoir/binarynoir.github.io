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

The **Blog** entry is a plain link, not a dropdown of every post, because the blog's `.sidebar` has a `.link` line. Auto Sidebar reads the same file and leaves that setting to the navbar:

<<< @/blog/.sidebar{txt}

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

| Option              | Default        | Description                                                                                |
| ------------------- | -------------- | ------------------------------------------------------------------------------------------ |
| `maxDepth`          | `2`            | Navbar levels, 1 to 3.                                                                     |
| `maxTitleLength`    | `50`           | Truncate generated titles beyond this length.                                              |
| `configFilenames`   | `['.nav']`     | Per-folder config file names, checked in order.                                            |
| `excludeFilenames`  | `['.exclude']` | Per-folder exclusion file names.                                                           |
| `indexTitle`        | `'Overview'`   | Label for the dropdown entry that links to the folder's landing page.                      |
| `flattenSinglePage` | `true`         | A folder with one entry becomes a plain link.                                              |
| `activeMatch`       | `true`         | Keep items highlighted on every page beneath them.                                         |
| `titleReplacements` | `{}`           | Words to replace in titles made from file and folder names.                                |
| `titleCase`         | `true`         | Title-case titles made from file and folder names.                                         |
| `stripTags`         | `true`         | Remove Markdown Tags syntax (`((tag\|draft))`) from titles.                                |
| `transformTitle`    | none           | A function that gets every title before truncation.                                        |
| `sort`              | `'name'`       | Order for unlisted entries in every folder, e.g. `'date desc'`. See [Settings](#settings). |
| `limit`             | `0`            | Most unlisted entries every dropdown shows, after sorting.                                 |
| `more`              | none           | Link text for the landing page when a limit left entries out.                              |
| `verbose`           | `false`        | Log each folder as it is processed.                                                        |

Titles can be single- or double-quoted, with a space after the colon if you like, and a line that can't be parsed logs a warning with its file and line number.

## Settings

A line in a `.nav` or `.sidebar` file that starts with a dot is a setting for the folder, not an entry. Every setting is written the same way: `.name` turns it on, and `.name: value` gives it a value. An unknown setting, or a value it can't use, logs a warning with its file and line number. [Auto Sidebar](/plugins/auto-sidebar/#settings) reads settings the same way, so one `.sidebar` file can serve both menus.

| Setting                     | What it does                                                                                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.sort: key [asc\|desc], …` | Order the entries this file doesn't list. The keys are the same as [Auto Sidebar's](/plugins/auto-sidebar/#sorting): `name`, `title`, `date`, or any frontmatter field. |
| `.limit: n`                 | Show at most `n` of the entries this file doesn't list, after sorting. [Same as Auto Sidebar](/plugins/auto-sidebar/#limiting).                                         |
| `.more: Text`               | When `.limit` left entries out, end the dropdown with a link to the landing page titled `Text`.                                                                         |
| `.link`                     | **Navbar only.** Render this folder as one plain link instead of a dropdown.                                                                                            |
| `.inherit`                  | Borrow `name:Title` overrides from the other config files.                                                                                                              |
| `.hide` / `.hideall`        | Hide this folder's own link, or the whole folder.                                                                                                                       |

A `.sort` line in a `.sidebar` file orders the sidebar and the navbar dropdown alike. The `sort` option sets an order for every folder; a folder's own `.sort` still wins.

A folder's landing page is its `index.md`, or its `README.md`. VitePress serves a `README.md` at `README.html`, so add [README Index](/plugins/readme-index/) to serve it at the folder's URL.

## Titles

This site passes the same title options to both menus. See them working in the [Sidebar Titles Demo](/plugins/auto-sidebar/titles-demo/), and in this site's [config](https://github.com/binarynoir/binarynoir.github.io/blob/main/docs/.vitepress/config.mts).

A title made from a file or folder name is formatted: `getting-started.md` becomes "Getting Started". It is title-cased, so articles, short conjunctions and prepositions (`a`, `the`, `and`, `of`, `to`, …) stay lowercase unless they are the first or last word: `guide-to-the-cli.md` becomes "Guide to the Cli". Set `titleCase: false` to capitalise every word instead.

Only first letters change case, so use `titleReplacements` for words with other casing. Keys match whole words, ignoring case:

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

<!--@include: ./shared/title-helpers.md-->

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-auto-navbar)
