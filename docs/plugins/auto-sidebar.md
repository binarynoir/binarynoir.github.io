---
title: Auto Sidebar
---

# Auto Sidebar ((tag|VitePress plugin|blue))

[[readingTime]]

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

Each top-level folder becomes its own sidebar, keyed by its URL prefix. A folder's landing page is its `index.md` (or `README.md`). A page title comes from, in order: the `.sidebar` file, the `title` frontmatter, the first `# Heading`, then the formatted filename.

## `.sidebar` syntax

| Line                 | Meaning                                           |
| -------------------- | ------------------------------------------------- |
| `name`               | Order this file or folder.                        |
| `name:Custom Title`  | Order it and override its title.                  |
| `"https://…":Title`  | Insert an external link in place.                 |
| `...`                | Everything not listed goes here, alphabetically.  |
| `-name`              | Hide this entry.                                  |
| `.hide` / `.hideall` | Hide this folder's own link, or the whole folder. |

Files need their `.md` extension in these lines. A `.exclude` file removes drafts by pattern, and a `sidebar.json` next to a folder is used verbatim when you want to hand-author one section.

## Options

| Option              | Default        | Description                                                           |
| ------------------- | -------------- | --------------------------------------------------------------------- |
| `maxDepth`          | `3`            | How many folder levels deep to recurse.                               |
| `maxTitleLength`    | `50`           | Truncate generated titles beyond this length.                         |
| `configFilenames`   | `['.sidebar']` | Per-folder ordering file names.                                       |
| `excludeFilenames`  | `['.exclude']` | Per-folder exclusion file names.                                      |
| `collapsed`         | `false`        | Initial collapsed state for section headers.                          |
| `flattenSinglePage` | `true`         | A folder with one page becomes a plain link instead of its own group. |
| `verbose`           | `false`        | Log each folder as it is processed.                                   |

Pairs with [Auto Navbar](/plugins/auto-navbar): one folder structure drives both menus.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-auto-sidebar)
