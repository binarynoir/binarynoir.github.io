---
title: Blog for Vite
---

# Blog for Vite ((tag|Vite plugin|purple))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvite--plugin--blog-181717?logo=github)](https://github.com/binarynoir/vite-plugin-blog) [![npm version](https://img.shields.io/npm/v/@binarynoir/vite-plugin-blog)](https://www.npmjs.com/package/@binarynoir/vite-plugin-blog) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vite-plugin-blog/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vite-plugin-blog/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vite-plugin-blog)](https://github.com/binarynoir/vite-plugin-blog/blob/main/LICENSE)

`@binarynoir/vite-plugin-blog` adds a Markdown blog to a site that is already built with plain [Vite](https://vite.dev). You keep your own pages, header and styles. Each post becomes a plain HTML page made from a page shell you write, so it looks like the rest of your site and reads without JavaScript.

## Which blog plugin?

We make two blog plugins. They solve the same problem for different kinds of site.

| Your site is…                                     | Use                                  |
| ------------------------------------------------- | ------------------------------------ |
| A VitePress docs site, like this one              | [Blog](/plugins/blog/) for VitePress |
| Your own pages built with Vite, without VitePress | Blog for Vite, on this page          |

This site runs on VitePress, so it uses the VitePress plugin. That also means there is no live demo of Blog for Vite here. The [README](https://github.com/binarynoir/vite-plugin-blog#readme) has a full example to copy.

## Why this plugin

Adding a blog to a Vite site usually means bringing in a second framework, or a Markdown plugin that renders posts outside Vite's pipeline. This plugin keeps everything inside the site you already have.

- **Your page shell.** Posts and lists fill two markers in an HTML page you write, so your header, scripts and Vite plugins apply to posts too.
- **Works under a strict Content Security Policy.** Nothing it writes needs an inline script or style. Code is highlighted at build time with [Shiki](https://shiki.style).
- **Bad posts fail the build.** A missing title, a bad date, an unknown tag, an image without alt text or a dead link stops the build and names the file and line.
- **Search without a server.** A small index is built with the site and searched in the browser, only once someone starts typing.
- **The usual blog parts are built in:** topic pages, pagination, RSS, Atom and JSON feeds, a sitemap, social cards, share links, related posts, series and a site-wide announcement banner.
- **Drafts and scheduled posts** stay out of the build until they are ready.
- **Vue is optional.** Ready-made Vue components are there if you want them, with the same markup as the static pages.

## Install

```sh
npm install --save-dev @binarynoir/vite-plugin-blog
```

Needs Node 22 or later and Vite 6, 7 or 8.

## Use

Put posts in a folder, one Markdown file or folder per post:

```text
content/
  posts/
    vpn-leaks/
      index.md        # served at /blog/vpn-leaks/
      diagram.svg     # images sit next to the post
    short-post.md     # served at /blog/short-post/
  tags.yml            # optional: the only tags allowed
templates/
  post.html           # your page shell
```

Register the plugin:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { blogPlugin } from '@binarynoir/vite-plugin-blog';

export default defineConfig({
  plugins: [
    blogPlugin({
      dir: 'content',
      template: 'templates/post.html',
      site: 'https://example.com',
    }),
  ],
});
```

The page shell is any HTML page with two markers. The plugin writes the title and meta tags into the first and the post or list into the second:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!--blog:head-->
  </head>
  <body>
    <main><!--blog:content--></main>
  </body>
</html>
```

Each post starts with front matter:

```yaml
title: Is your VPN actually working?
description: The four leaks to test.
date: 2026-12-02
tags: [vpn-privacy, homelab]
```

Options, labels, custom markup, directives and the Vue components are covered in the README.

[Source and full README on GitHub](https://github.com/binarynoir/vite-plugin-blog)
