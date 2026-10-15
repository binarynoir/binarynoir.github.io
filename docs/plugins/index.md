---
title: Plugins
---

# Plugins

[[readingTime]]

Fourteen small packages that make a documentation site easier to build and nicer to read. Each one does a single job and they share conventions. All fourteen are running on the site you are looking at.

Pick by the job you need done. Each plugin's page has a live demo.

## Navigation from your folders {#navigation}

Menus that follow your folder tree, so adding a page never means editing the config.

| Plugin                                          | Works with  | What it does                                      |
| ----------------------------------------------- | ----------- | ------------------------------------------------- |
| [Auto Sidebar](/plugins/auto-sidebar/)          | VitePress 2 | Builds `themeConfig.sidebar` from your folders.   |
| [Auto Navbar](/plugins/auto-navbar)             | VitePress 2 | Builds `themeConfig.nav` from your folders.       |
| [Sidebar Accordion](/plugins/sidebar-accordion) | VitePress   | One open sidebar group per level, as in VuePress. |

## Richer pages {#pages}

Small additions that help a reader scan and understand a page.

| Plugin                                        | Works with                   | What it does                                        |
| --------------------------------------------- | ---------------------------- | --------------------------------------------------- |
| [Markdown Tags](/plugins/markdown-tags/)      | VitePress, VS Code, Obsidian | Inline status badges and tagged-pages lists.        |
| [Glossary Tooltips](/plugins/glossary/)       | VitePress, markdown-it       | Hover definitions from one glossary file.           |
| [Reading Time Tag](/plugins/reading-time-tag) | VitePress 2                  | `[[readingTime]]` becomes a reading-time tip block. |
| [Text Style](/plugins/text-style)             | VitePress, markdown-it       | `[t:red]text[/t]` colors and sizes text inline.     |

## Content where it lives {#content}

Keep files where they make sense, and let the build work out what to publish.

| Plugin                                 | Works with             | What it does                                                   |
| -------------------------------------- | ---------------------- | -------------------------------------------------------------- |
| [Downloads](/plugins/downloads)        | VitePress              | Files in a `downloads` folder become linkable downloads.       |
| [Exclude](/plugins/exclude/)           | VitePress              | A `.exclude` file in a folder keeps pages out of the build.    |
| [README Index](/plugins/readme-index/) | VitePress, markdown-it | `README.md` as a folder's index page, for VuePress migrations. |

## Builds that don't break {#builds}

One mistake on one page shouldn't stop the whole site from deploying.

| Plugin                                | Works with               | What it does                                                 |
| ------------------------------------- | ------------------------ | ------------------------------------------------------------ |
| [HTML Escape](/plugins/html-escape/)  | VitePress 2, markdown-it | Stray `<tags>` and braces render as text, with fix-it hints. |
| [Broken Links](/plugins/broken-links) | VitePress 2              | Dead links render as text, with fix-it hints.                |

## Images handled {#images}

Smaller images in the output, and no failed build over a missing one.

| Plugin                                      | Works with | What it does                                              |
| ------------------------------------------- | ---------- | --------------------------------------------------------- |
| [Optimize Images](/plugins/optimize-images) | Vite       | Re-compresses images in the build output.                 |
| [Image Fallback](/plugins/image-fallback)   | Vite       | Placeholder for missing images instead of a failed build. |

## Install them all

```sh
npm install --save-dev \
  @binarynoir/vitepress-auto-sidebar \
  @binarynoir/vitepress-auto-navbar \
  @binarynoir/vitepress-sidebar-accordion \
  @binarynoir/vitepress-markdown-tags \
  @binarynoir/vitepress-reading-time-tag \
  @binarynoir/vitepress-downloads \
  @binarynoir/vitepress-html-escape \
  @binarynoir/vitepress-broken-links \
  @binarynoir/vitepress-exclude \
  @binarynoir/vitepress-readme-index \
  @binarynoir/vitepress-text-style \
  @binarynoir/vite-plugin-optimize-images \
  @binarynoir/vite-plugin-image-fallback \
  markdown-it-glossary
```

The VitePress plugins target VitePress 2 (currently an alpha release line). Node 22 or newer is required.

## One config, all fourteen

This is this site's real `config.mts`, included straight from the repository, so it can't drift from what is deployed. [How this site works](/guide/how-this-site-works) walks through it.

<<< @/.vitepress/config.mts{ts}

## Source and issues

Each plugin lives in its own repository under [github.com/binarynoir](https://github.com/binarynoir). Open an issue on the plugin's repository for bugs and requests.
