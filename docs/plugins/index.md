---
title: Plugins
---

# Plugins

[[readingTime]]

Seven small packages that make a documentation site easier to build and nicer to read. Each one does a single job, they share conventions, and they are all running on the site you are looking at.

| Plugin                                        | Works with                   | What it does                                              |
| --------------------------------------------- | ---------------------------- | --------------------------------------------------------- |
| [Auto Sidebar](/plugins/auto-sidebar)         | VitePress 2                  | Builds `themeConfig.sidebar` from your folders.           |
| [Auto Navbar](/plugins/auto-navbar)           | VitePress 2                  | Builds `themeConfig.nav` from your folders.               |
| [Markdown Tags](/plugins/markdown-tags/)      | VitePress, VS Code, Obsidian | Inline status badges and tagged-pages lists.              |
| [Reading Time Tag](/plugins/reading-time-tag) | VitePress 2                  | `[[readingTime]]` becomes a reading-time tip block.       |
| [Glossary Tooltips](/plugins/glossary)        | VitePress, markdown-it       | Hover definitions from one glossary file.                 |
| [Optimize Images](/plugins/optimize-images)   | Vite                         | Re-compresses images in the build output.                 |
| [Image Fallback](/plugins/image-fallback)     | Vite                         | Placeholder for missing images instead of a failed build. |

## Install them all

```sh
npm install --save-dev \
  @binarynoir/vitepress-auto-sidebar \
  @binarynoir/vitepress-auto-navbar \
  @binarynoir/vitepress-markdown-tags \
  @binarynoir/vitepress-reading-time-tag \
  @binarynoir/vite-plugin-optimize-images \
  @binarynoir/vite-plugin-image-fallback \
  markdown-it-glossary
```

The VitePress plugins target VitePress 2 (currently an alpha release line). Node 22 or newer is required.

## One config, all seven

This is this site's real `config.mts`, included straight from the repository, so it can't drift from what is deployed. [How this site works](/guide/how-this-site-works) walks through it.

<<< @/.vitepress/config.mts{ts}

## Source and issues

Each plugin lives in its own repository under [github.com/binarynoir](https://github.com/binarynoir). Open an issue on the plugin's repository for bugs and requests.
