---
title: README Index
---

# README Index ((tag|VitePress plugin|blue)) ((tag|markdown-it|orange))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvitepress--readme--index-181717?logo=github)](https://github.com/binarynoir/vitepress-readme-index) [![npm version](https://img.shields.io/npm/v/@binarynoir/vitepress-readme-index)](https://www.npmjs.com/package/@binarynoir/vitepress-readme-index) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vitepress-readme-index/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vitepress-readme-index/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vitepress-readme-index)](https://github.com/binarynoir/vitepress-readme-index/blob/main/LICENSE)

`@binarynoir/vitepress-readme-index` makes it easier to move a large site from [VuePress](https://vuepress.vuejs.org) to VitePress. VuePress uses `README.md` as a folder's index page. VitePress uses `index.md`. Move a VuePress site over as it is, and every `docs/guide/README.md` is served at `/guide/README`, every `/guide/` URL is a 404, and every link to a `README.md` fails VitePress's dead-link check.

Fixing that by hand means renaming every `README.md` and editing every link that points to one. With this plugin you can skip that step and migrate the content as it is:

```txt
docs/
  README.md        -> /
  guide/
    README.md      -> /guide/
    setup.md       -> /guide/setup
```

## See it live

This page is a `README.md`, served as the index of its folder: look at the address bar, it ends in `/plugins/readme-index/`. Next to it is a folder whose only page is also a `README.md`, and the links below point at those files by name, the way a VuePress site would:

```md
[The example page](./example/README.md) and
[a heading on it](./example/README.md#linking-back).
```

::: info On the page
[The example page](./example/README.md) and
[a heading on it](./example/README.md#linking-back).
:::

Both go to `/plugins/readme-index/example/`, and VitePress's dead-link check passes.

## Install

```sh
npm install --save-dev @binarynoir/vitepress-readme-index
```

## Use

Wrap the config with `withReadmeIndex` and pass it the docs source directory:

```ts
// .vitepress/config.mts
import path from 'node:path';
import { defineConfig } from 'vitepress';
import { withReadmeIndex } from '@binarynoir/vitepress-readme-index/vitepress';

export default withReadmeIndex(
  defineConfig({
    // ...your config
  }),
  path.resolve(import.meta.dirname, '..'),
);
```

`withReadmeIndex` sets `rewrites` and adds the link plugin to `markdown.config`, keeping any `markdown.config` you already have. Or wire the two pieces by hand, as this site does:

```ts
import { readmeLinks, readmeRewrites } from '@binarynoir/vitepress-readme-index';

const docsRoot = path.resolve(import.meta.dirname, '..');

export default defineConfig({
  // Serves each README.md as its folder's index.md.
  rewrites: readmeRewrites(docsRoot),
  markdown: {
    config(md) {
      // Points links at README.md to the page it is served as.
      md.use(readmeLinks);
    },
  },
});
```

Use both pieces together. Without `readmeLinks`, a link to `README.md` points at a page that no longer exists under that name. Without `readmeRewrites`, the links point at `index.md` pages that don't exist.

## Already using `rewrites`?

If your config has a `rewrites` function, `withReadmeIndex` runs it first, then renames any `README.md` still left. `rewrites` written as an object cannot be combined: `withReadmeIndex` leaves the config unchanged and logs a warning. Call `readmeRewrites` from a function of your own instead:

```ts
const toIndex = readmeRewrites(docsRoot);

export default defineConfig({
  rewrites: (id) => toIndex(id.replace(/^packages\/(.*)\/docs\//, '$1/')),
});
```

`rewrites` as a function needs VitePress 1.4 or later.

## Good to know

- **No renames.** Pages keep their file names, so their history and any open branches stay easy to merge.
- **Rename at your own pace.** Folders you have already moved to `index.md` work as normal. A folder with both keeps `index.md` as its index, and its `README.md` stays a page of its own, with a warning in the log.
- **Any case.** `README.md`, `Readme.md` and `readme.md` all count.
- **Query strings and `#anchors` are kept.** External links, such as a `README.md` on GitHub, are left alone.
- **Menus work as they are.** [Auto Sidebar](/plugins/auto-sidebar) and [Auto Navbar](/plugins/auto-navbar) already use a folder's `README.md` as its landing page and link to the folder URL.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-readme-index)
