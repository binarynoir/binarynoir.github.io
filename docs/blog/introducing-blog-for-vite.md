---
title: Introducing Blog for Vite
blog:
  date: 2026-11-19T12:00:00-05:00
  summary: Add a Markdown blog to a plain Vite site, in your own page shell, with search, feeds and checks that catch broken posts.
  image: /covers/vite-blog.png
  imageAlt: 'The BinaryNoir detective beside the words "Vite plugin: Blog for Vite"'
  tags: [vite-blog]
  category: Releases
---

# Introducing Blog for Vite

[`@binarynoir/vite-plugin-blog`](/plugins/vite-blog) adds a Markdown blog to a site built with plain Vite. If your site runs on VitePress, our [Blog](/plugins/blog/) plugin is still the one to use. This one is for everyone else.

## What you get

- **Posts in your own page shell.** Each post is a plain HTML page made from a template you write, so it matches the rest of your site.
- **Safe under a strict Content Security Policy.** No inline scripts or styles, and code is highlighted at build time.
- **Broken posts fail the build**, with the file and line: a bad date, a missing alt text, a dead link.
- **Search with no server**, plus topic pages, pagination, feeds, a sitemap and an announcement banner.

## Get started

```sh
npm install --save-dev @binarynoir/vite-plugin-blog
```

The [plugin page](/plugins/vite-blog) shows the setup, and the [README](https://github.com/binarynoir/vite-plugin-blog#readme) covers every option.
