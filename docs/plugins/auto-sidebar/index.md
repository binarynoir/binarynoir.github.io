---
title: Auto Sidebar
---

# Auto Sidebar ((tag|VitePress plugin|blue))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvitepress--auto--sidebar-181717?logo=github)](https://github.com/binarynoir/vitepress-auto-sidebar) [![npm version](https://img.shields.io/npm/v/@binarynoir/vitepress-auto-sidebar)](https://www.npmjs.com/package/@binarynoir/vitepress-auto-sidebar) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vitepress-auto-sidebar/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vitepress-auto-sidebar/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vitepress-auto-sidebar)](https://github.com/binarynoir/vitepress-auto-sidebar/blob/main/LICENSE)

`@binarynoir/vitepress-auto-sidebar` builds your sidebar by scanning your docs folder, so you stop hand-maintaining `themeConfig.sidebar`. Add a Markdown file and it appears in the sidebar, titled from its heading.

## See it live

The sidebar on the left is generated. The order and titles for this section come from one plain-text file, `plugins/.sidebar`:

<<< @/plugins/.sidebar{txt}

Reorder those lines, rebuild, and the sidebar follows. No config code changes.

## Install

```sh
npm install --save-dev @binarynoir/vitepress-auto-sidebar
```

## Use

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress';
import { generateSidebar } from '@binarynoir/vitepress-auto-sidebar';
import path from 'node:path';

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar(path.resolve(import.meta.dirname, '..'), {
      maxDepth: 3,
      maxTitleLength: 50,
    }),
  },
});
```

Use `import.meta.dirname`, not `__dirname`: VitePress configs are ESM.

Each top-level folder becomes its own sidebar, keyed by its URL prefix. A folder's landing page is its `index.md`, or its `README.md`. VitePress serves a `README.md` at `README.html`, so add [README Index](/plugins/readme-index/) to serve it at the folder's URL. A page title comes from, in order: the `.sidebar` file, the `title` frontmatter, the first `# Heading`, then the formatted filename.

## `.sidebar` syntax

| Line                        | Meaning                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `name`                      | Order this file or folder.                                                                                 |
| `name:Custom Title`         | Order it and override its title.                                                                           |
| `"https://…":Title`         | Insert an external link in place.                                                                          |
| `...`                       | Everything not listed goes here, alphabetically or by `.sort`.                                             |
| `-name`                     | Hide this entry.                                                                                           |
| `.sort: key [asc\|desc], …` | A setting: how unlisted entries are ordered. See [Settings](#settings).                                    |
| `.limit: n` / `.more: Text` | Settings: show at most `n` unlisted entries, with an optional link to the rest. See [Limiting](#limiting). |
| `.hide` / `.hideall`        | A setting: hide this folder's own link, or the whole folder.                                               |

Titles can be quoted, with single or double quotes, and may have a space after the colon: `name.md: "Title"` and `https://example.com: 'Title'` both work. A line that can't be parsed, such as a link with no title, logs a warning with its file and line number.

Files need their `.md` extension in these lines. A `.exclude` file removes drafts by pattern, and a `sidebar.json` next to a folder is used verbatim when you want to hand-author one section.

## Settings

A line that starts with a dot is a setting for the folder, not an entry. Every setting is written the same way: `.name` turns it on, and `.name: value` gives it a value. An unknown setting, or a value it can't use, logs a warning with its file and line number. [Auto Navbar](/plugins/auto-navbar#settings) reads the same settings, so a `.sort` line orders both menus, and Auto Navbar's own `.link` and `.inherit` are left to it.

| Setting                     | What it does                                                                             |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| `.sort: key [asc\|desc], …` | Order the entries this file doesn't list by `key`. Default: `name`.                      |
| `.limit: n`                 | Show at most `n` of the entries this file doesn't list, after sorting. `0` for no limit. |
| `.more: Text`               | When `.limit` left entries out, end with a link to the landing page titled `Text`.       |
| `.hide`                     | Hide this folder's own link, but keep showing its children.                              |
| `.hideall` or `.hide-all`   | Leave this folder and everything under it out of the sidebar.                            |

### Sorting

This site's [blog](/blog/) sidebar lists sticky posts first, then the rest newest first. Its whole `.sidebar` file (the `.link` line is for [Auto Navbar](/plugins/auto-navbar#settings)):

<<< @/blog/.sidebar{txt}

| Key           | Sorts by                                                                        |
| ------------- | ------------------------------------------------------------------------------- |
| `name`        | The file or folder name. This is the default.                                   |
| `title`       | The title shown in the sidebar, wherever it came from.                          |
| `date`        | The page's `date` frontmatter, or `blog.date` for [Blog](/plugins/blog/) posts. |
| anything else | That frontmatter field. Use dots for nested fields: `.sort: meta.order`.        |

- The direction is `asc` (A to Z, oldest first, smallest first) unless you write `desc`.
- Dates and numbers compare as dates and numbers, so `2` sorts before `10`.
- Several keys, separated by commas, sort by the first and break ties with the
  next: `.sort: blog.sticky desc, date desc` puts sticky blog posts on top,
  each group newest first.
- Pages without a value go last for that key, in either direction, and are
  ordered by the next key. A `false` value counts as no value, so pages with
  `sticky: false` sort with those that don't say. Final ties go by name.
- A subfolder sorts by its landing page's frontmatter.
- Only entries the file doesn't list are sorted. Listed entries keep their place, so the overview above stays first.
- A setting covers its own folder, not the folders below it. The `sort` option sets an order for every folder; a folder's own `.sort` still wins.

### Limiting

A folder with hundreds of pages makes a sidebar too long to use, and VitePress sends the whole sidebar to every page. `.limit: 10` keeps the first 10 entries after sorting; this site's blog uses it (see its `.sidebar` above).

- Only entries the file doesn't list count toward the limit, and listed entries always show, so "All posts" stays on top.
- `.more: Older posts` ends the list with a link to the folder's landing page, but only when entries were left out. The blog doesn't need one: its landing page is already listed as "All posts".
- `.limit: 0` means no limit. The `limit` and `more` options set both for every folder; a folder's own lines win.

## Options

| Option                | Default        | Description                                                                              |
| --------------------- | -------------- | ---------------------------------------------------------------------------------------- |
| `maxDepth`            | `3`            | How many folder levels deep to recurse.                                                  |
| `maxTitleLength`      | `50`           | Truncate generated titles beyond this length.                                            |
| `configFilenames`     | `['.sidebar']` | Per-folder ordering file names.                                                          |
| `excludeFilenames`    | `['.exclude']` | Per-folder exclusion file names.                                                         |
| `collapsed`           | `false`        | Initial collapsed state for section headers.                                             |
| `flattenSinglePage`   | `true`         | A folder with one page becomes a plain link instead of its own group.                    |
| `titleReplacements`   | `{}`           | Words to replace in titles made from file and folder names.                              |
| `titleCase`           | `true`         | Title-case titles made from file and folder names.                                       |
| `stripTags`           | `true`         | Remove Markdown Tags syntax (`((tag\|draft))`) from titles.                              |
| `transformTitle`      | none           | A function that gets every title before truncation.                                      |
| `sort`                | `'name'`       | Order for unlisted entries in every folder, e.g. `'date desc'`. See [Sorting](#sorting). |
| `limit`               | `0`            | Most unlisted entries every folder shows, after sorting. See [Limiting](#limiting).      |
| `more`                | none           | Link text for the landing page when a limit left entries out.                            |
| `groupTitleFromIndex` | `false`        | Label a folder's group with its landing page's title.                                    |
| `verbose`             | `false`        | Log each folder as it is processed.                                                      |

## Titles

::: tip See it live
The [Sidebar Titles Demo](./titles-demo/) folder, in the sidebar under **Auto Sidebar**, uses each option below on this site's real sidebar.
:::

A title made from a file or folder name is formatted: `getting-started.md` becomes "Getting Started". It is title-cased, so articles, short conjunctions and prepositions (`a`, `the`, `and`, `of`, `to`, …) stay lowercase unless they are the first or last word: `guide-to-the-cli.md` becomes "Guide to the Cli". Set `titleCase: false` to capitalise every word instead.

Only first letters change case, so use `titleReplacements` for words with other casing. Keys match whole words, ignoring case:

```ts
generateSidebar(docsRoot, {
  titleReplacements: { github: 'GitHub', api: 'API', cicd: 'CI/CD' },
});
// github-actions/ → "GitHub Actions", cicd-setup.md → "CI/CD Setup"
```

Titles an author wrote (a heading, `title` frontmatter, a `.sidebar` line) are never changed by `titleReplacements`.

[Markdown Tags](/plugins/markdown-tags/) syntax is removed from every title, so `# Design ((tag|draft))` is listed as "Design". Set `stripTags: false` to keep it.

For anything else, `transformTitle` gets every title before it is truncated, with where it came from: `'name'` (a file or folder name), `'page'` (frontmatter or the first heading) or `'config'` (a `.sidebar` line). Return the title to use, or `undefined` to keep it:

```ts
generateSidebar(docsRoot, {
  transformTitle: (title, { source }) =>
    source === 'page' ? title.replace(/^Guide: /, '') : undefined,
});
```

A folder's group label comes from, in order: its line in the parent's `.sidebar`, a `section-title` in its landing page's frontmatter, then the formatted folder name. With `groupTitleFromIndex: true`, the landing page's `title` or first `# Heading` is tried before the folder name.

<!--@include: ../shared/title-helpers.md-->

Pairs with [Auto Navbar](/plugins/auto-navbar): one folder structure drives both menus.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-auto-sidebar)
