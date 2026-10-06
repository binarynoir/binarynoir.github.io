---
title: Auto Navbar
---

# Auto Navbar ((tag|VitePress plugin|blue))

[[readingTime]]

`@binarynoir/vitepress-auto-navbar` is the companion to [Auto Sidebar](/plugins/auto-sidebar). It builds `themeConfig.nav` from the same folder scan, with the same ordering and exclusion syntax, in `.nav` files.

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

## See it live

The top navbar is generated. Its order comes from `docs/.nav`:

<<< @/.nav{txt}

Notice what is missing: titles. With `configFilenames: ['.nav', '.sidebar']`, a folder that has only a `.sidebar` file (like `plugins/`) lends its titles to the navbar. Open the **Plugins** dropdown and compare it to the sidebar. Same titles, written once.

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

In `.nav` files, `.link` renders a folder as one plain link, and `.inherit` borrows `name:Title` overrides from the other config files.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-auto-navbar)
