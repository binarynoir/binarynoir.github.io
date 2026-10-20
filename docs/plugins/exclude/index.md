---
title: Exclude
---

# Exclude ((tag|VitePress plugin|blue))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvitepress--exclude-181717?logo=github)](https://github.com/binarynoir/vitepress-exclude) [![npm version](https://img.shields.io/npm/v/@binarynoir/vitepress-exclude)](https://www.npmjs.com/package/@binarynoir/vitepress-exclude) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vitepress-exclude/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vitepress-exclude/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vitepress-exclude)](https://github.com/binarynoir/vitepress-exclude/blob/main/LICENSE)

`@binarynoir/vitepress-exclude` keeps pages out of the build with a `.exclude` file in the folder that holds them. VitePress's own `srcExclude` is one list of globs in `config.mts`, far from the pages it hides. With this plugin, each folder says what to leave out, next to the files themselves.

```txt
docs/guide/
  .exclude
  index.md
  draft.md
  internal-notes.md
  drafts/
```

```txt
# docs/guide/.exclude
draft.md
internal-*.md
drafts/
```

Those pages are not built, not in search and not in the sitemap. The files stay where they are.

## See it live

This page's folder has a [`draft.md`](https://github.com/binarynoir/binarynoir.github.io/blob/main/docs/plugins/exclude/draft.md) next to it, and an [`.exclude`](https://github.com/binarynoir/binarynoir.github.io/blob/main/docs/plugins/exclude/.exclude) file that lists it. The draft is in the repository, but it is not on this site: it is missing from the sidebar, from search and from the build.

[Auto Sidebar](/plugins/auto-sidebar/) and [Auto Navbar](/plugins/auto-navbar) read the same `.exclude` files, so one line hides a page from the menus and keeps it out of the build.

A second page, [`frontmatter-draft.md`](https://github.com/binarynoir/binarynoir.github.io/blob/main/docs/plugins/exclude/frontmatter-draft.md), is left out a different way: its own frontmatter says `draft: true`. See [Drafts in frontmatter](#drafts-in-frontmatter).

## Install

```sh
npm install --save-dev @binarynoir/vitepress-exclude
```

## Use

Wrap the config with `withExclude` and pass it the docs source directory:

```ts
// .vitepress/config.mts
import path from 'node:path';
import { defineConfig } from 'vitepress';
import { withExclude } from '@binarynoir/vitepress-exclude/vitepress';

export default withExclude(
  defineConfig({
    // ...your config
  }),
  path.resolve(import.meta.dirname, '..'),
);
```

`withExclude` keeps your existing `srcExclude` and `vite.plugins`, so it composes with other wrappers in any order.

Or wire the two pieces by hand, as this site does to combine them with [Downloads](/plugins/downloads):

```ts
import { excludeSrc, excludeVitePlugin } from '@binarynoir/vitepress-exclude';

const docsRoot = path.resolve(import.meta.dirname, '..');

export default defineConfig({
  srcExclude: [...excludeSrc(docsRoot), '**/_snippets/**'],
  vite: {
    plugins: [excludeVitePlugin()],
  },
});
```

## `.exclude` files

One rule per line. Blank lines and lines starting with `#` are ignored. Rules are relative to the folder the `.exclude` file is in, and a `.exclude` file in the docs root works too.

| Rule             | Excludes                                                      |
| ---------------- | ------------------------------------------------------------- |
| `draft.md`       | That file. A name without a `/` also matches a folder.        |
| `drafts/`        | That folder and everything in it.                             |
| `internal-*.md`  | Matching files in this folder. `*` and `?` stay in one level. |
| `**/internal.md` | Matching files in this folder or any folder below it.         |
| `.`              | The whole folder the `.exclude` file is in.                   |

Two kinds of rule are skipped, with a warning in the log:

- `!keep.md`: VitePress cannot re-include a file that another rule excluded.
- `../other.md`: a rule cannot reach outside its own folder. Put a `.exclude` file in that folder instead.

## Drafts in frontmatter

A `.exclude` file lists what to leave out from the folder. A page can also say it for itself, in its frontmatter. List the keys with `excludeFrontmatter`, and any page that sets one of them to `true` is left out of the build:

```md
---
title: Pricing changes
draft: true
---
```

```ts
const isBuild = process.env.NODE_ENV === 'production';
const excludeFrontmatter = isBuild ? ['draft', 'blog.draft'] : [];

export default defineConfig({
  srcExclude: excludeSrc(docsRoot, { excludeFrontmatter }),
  themeConfig: {
    sidebar: generateSidebar(docsRoot, { excludeFrontmatter }),
    nav: generateNav(docsRoot, { excludeFrontmatter }),
  },
  vite: { plugins: [excludeVitePlugin({ excludeFrontmatter })] },
});
```

That is this site's setup:

- **Only `true` counts.** `draft: false`, `draft: "yes"` or no `draft` at all leave the page in.
- **Dotted keys read nested values.** `blog.draft` covers [Blog](/plugins/blog/) posts marked `blog: { draft: true }`. The blog only lists pages that are built, so a draft is never in a blog list or feed either.
- **The menus follow.** [Auto Sidebar](/plugins/auto-sidebar/) and [Auto Navbar](/plugins/auto-navbar) take the same option and hide the same pages, so they never link to a page that isn't there.
- **Drafts can be previewed.** `vitepress build` sets `NODE_ENV` to `production` before it loads the config, so with the line above, `vitepress dev` still builds drafts.
- **Live in `vitepress dev`.** With the option on, a page that gains or loses `draft: true` restarts the dev server, as an edited `.exclude` file does.

## Options

| Option               | Default        | Description                                                                            |
| -------------------- | -------------- | -------------------------------------------------------------------------------------- |
| `excludeFilenames`   | `[".exclude"]` | Filenames read in each folder.                                                         |
| `excludeFrontmatter` | `[]`           | Frontmatter keys that leave a page out when `true`, such as `['draft', 'blog.draft']`. |
| `verbose`            | `false`        | Log each `.exclude` file, its rules and the globs it made.                             |

`withExclude(config, srcDir, options)` and `excludeSrc(srcDir, options)` take all three. `excludeVitePlugin(options)` takes `excludeFilenames` and `excludeFrontmatter`; pass it the same lists.

## Good to know

- **Live in `vitepress dev`.** Add, change or delete a `.exclude` file and the dev server restarts with the new rules. The rules are read when the config loads, so the plugin registers each `.exclude` file as part of the config.
- **Hidden folders are skipped.** `.vitepress`, `node_modules` and other folders whose names start with `.` are not searched. VitePress never builds pages from them.
- **Excluded is not secret.** An excluded file is not published, but it is still in your repository.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-exclude)
