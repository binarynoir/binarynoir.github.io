---
title: Downloads
---

# Downloads ((tag|VitePress plugin|blue))

[[readingTime]]

`@binarynoir/vitepress-downloads` turns a folder named `downloads` into downloadable files, linked with a plain relative path. VitePress is built for pages, so a `.sql`, `.zip` or `.xlsx` normally has to be copied into `public/` and linked by an absolute URL. With this plugin the file stays next to the page that uses it.

```txt
docs/tools/ai/
  index.md
  downloads/
    check-access.sql
    template.xlsx
```

```md
[Access check script](./downloads/check-access.sql)
```

The file is published at `/tools/ai/downloads/check-access.sql`, and the link downloads it instead of opening a page. It works in `vitepress dev` and `vitepress build`.

## Try it

This page has its own `downloads` folder: `sample.sql` and `sample.md`.

## Install

```sh
npm install --save-dev @binarynoir/vitepress-downloads
```

## Use

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress';
import { withDownloads } from '@binarynoir/vitepress-downloads/vitepress';

export default withDownloads(
  defineConfig({
    // ...your config
  }),
);
```

`withDownloads` keeps your existing `srcExclude`, `markdown.config` and `vite.plugins`, so it composes with other wrappers in any order.

## How links work

Links resolve the way any Markdown link does: from the page's own folder, or from the docs root when they start with `/`. A link counts as a download when its target is inside a download folder. Every other link is left to VitePress.

| You write                     | Result                                                    |
| ----------------------------- | --------------------------------------------------------- |
| `[x](./downloads/a.sql)`      | Download of `a.sql` in the page's own `downloads` folder. |
| `[x](downloads/a.xlsx)`       | The same, without the `./`.                               |
| `[x](/guide/downloads/z.zip)` | A file from another section, by path from the docs root.  |
| `[x](./other-page.md)`        | Not a download. VitePress handles it as a page link.      |

Files of any type work, including `.md`, `.js` and `.json`. Markdown files inside a download folder are never built as pages.

## Options

| Option      | Default         | Description                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------- |
| `folders`   | `["downloads"]` | Folder name or names to publish. Names, not paths, matched at any depth. `files` is a common second.       |
| `onMissing` | `"warn"`        | A link into a download folder with no file behind it: `"warn"`, `"error"` (fails the build) or `"ignore"`. |

```ts
withDownloads(config, { folders: ['downloads', 'files'], onMissing: 'error' });
```

## Keep downloads out of the sidebar

If the sidebar is generated from the folder tree, a downloadable `notes.md` would show up as a dead sidebar page. With [Auto Sidebar](/plugins/auto-sidebar) and [Auto Navbar](/plugins/auto-navbar), list the folder in an `.exclude` file in the directory that contains it:

```txt
# docs/tools/ai/.exclude
downloads/
```

## Good to know

- **Everything in a download folder is public.** Files are copied into the built site as they are.
- Hidden files such as `.DS_Store`, and `node_modules`, are never published.
- In dev, downloads are served from disk as attachments, so a `.js` or `.ts` file is not turned into a module.
- Folder names are case-sensitive: `Downloads` is not `downloads`.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-downloads)
