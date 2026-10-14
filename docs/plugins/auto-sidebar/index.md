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

| Line                 | Meaning                                           |
| -------------------- | ------------------------------------------------- |
| `name`               | Order this file or folder.                        |
| `name:Custom Title`  | Order it and override its title.                  |
| `"https://…":Title`  | Insert an external link in place.                 |
| `...`                | Everything not listed goes here, alphabetically.  |
| `-name`              | Hide this entry.                                  |
| `.hide` / `.hideall` | Hide this folder's own link, or the whole folder. |

Titles can be quoted, with single or double quotes, and may have a space after the colon: `name.md: "Title"` and `https://example.com: 'Title'` both work. A line that can't be parsed, such as a link with no title, logs a warning with its file and line number.

Files need their `.md` extension in these lines. A `.exclude` file removes drafts by pattern, and a `sidebar.json` next to a folder is used verbatim when you want to hand-author one section.

## Options

| Option                | Default        | Description                                                           |
| --------------------- | -------------- | --------------------------------------------------------------------- |
| `maxDepth`            | `3`            | How many folder levels deep to recurse.                               |
| `maxTitleLength`      | `50`           | Truncate generated titles beyond this length.                         |
| `configFilenames`     | `['.sidebar']` | Per-folder ordering file names.                                       |
| `excludeFilenames`    | `['.exclude']` | Per-folder exclusion file names.                                      |
| `collapsed`           | `false`        | Initial collapsed state for section headers.                          |
| `flattenSinglePage`   | `true`         | A folder with one page becomes a plain link instead of its own group. |
| `titleReplacements`   | `{}`           | Words to replace in titles made from file and folder names.           |
| `stripTags`           | `true`         | Remove Markdown Tags syntax (`((tag\|draft))`) from titles.           |
| `transformTitle`      | none           | A function that gets every title before truncation.                   |
| `groupTitleFromIndex` | `false`        | Label a folder's group with its landing page's title.                 |
| `verbose`             | `false`        | Log each folder as it is processed.                                   |

## Titles

::: tip See it live
The [Sidebar Titles Demo](./titles-demo/) folder, in the sidebar under **Auto Sidebar**, uses each option below on this site's real sidebar.
:::

A title made from a file or folder name is formatted: `getting-started.md` becomes "Getting Started". Only first letters are capitalised, so use `titleReplacements` for words with other casing. Keys match whole words, ignoring case:

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

Pairs with [Auto Navbar](/plugins/auto-navbar): one folder structure drives both menus.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-auto-sidebar)
