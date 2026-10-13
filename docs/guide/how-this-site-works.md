---
title: How this site works
---

# How this site works ((tag|Guide|blue))

[[readingTime]]

This site is plain VitePress 2 plus nine plugins. There is no hand-written navigation anywhere: add a Markdown file in the right folder and it shows up in the sidebar, the navbar, search and the sitemap.

## Folder layout

```txt
docs/
  .nav                  top navbar order
  index.md              home page
  legal.md, privacy.md, terms.md
                        footer pages, hidden from the navbar by .nav
  plugins/              developer docs for each plugin
    .sidebar            order and titles for this section
    downloads/          files the Downloads demo publishes as-is
  apps/                 user docs for the CLI apps
  guide/                this section
  reference/            glossary terms and the generated list of every tag
  assets/               images imported by pages
  public/               files served as-is (logos, favicon, icons)
  .vitepress/
    config.mts          the one config file
    theme/              registers tag badges, brand colors
```

## Which plugin does what

| You see                         | Plugin                                        | Where it is wired                     |
| ------------------------------- | --------------------------------------------- | ------------------------------------- |
| Top navbar                      | [Auto Navbar](/plugins/auto-navbar)           | `themeConfig.nav` in `config.mts`     |
| Left sidebar                    | [Auto Sidebar](/plugins/auto-sidebar)         | `themeConfig.sidebar` in `config.mts` |
| Status badges                   | [Markdown Tags](/plugins/markdown-tags/)      | `markdown.config`, plus the theme     |
| "Reading time" box              | [Reading Time Tag](/plugins/reading-time-tag) | `markdown.config`                     |
| Dotted-underline hovers         | [Glossary Tooltips](/plugins/glossary/)       | `markdown.config`                     |
| File download links             | [Downloads](/plugins/downloads)               | `markdown.config` and `vite.plugins`  |
| Stray `<tags>` shown as text    | [HTML Escape](/plugins/html-escape/)          | `markdown.config`, plus the theme     |
| Smaller images                  | [Optimize Images](/plugins/optimize-images)   | `vite.plugins`                        |
| Placeholder for a missing image | [Image Fallback](/plugins/image-fallback)     | `vite.plugins`                        |

## The config

<<< @/.vitepress/config.mts{ts}

## The theme

The theme registers the badge component and loads its stylesheet, and turns on the two popovers: glossary definitions, and the HTML Escape hints that explain broken markup:

<<< @/.vitepress/theme/index.ts{ts}

## Adding a page

1. Create `docs/<section>/my-page.md` with a `# Heading`.
2. Optionally, add a line for it to that section's `.sidebar` file to choose its position and title. Pages without a line are listed alphabetically where the `...` line is, or at the end if there is none.
3. Run `npm run docs:dev`. The page is already in the sidebar. Anything [HTML Escape](/plugins/html-escape/) had to fix, such as an `Array<T>` outside backticks, has a wavy underline there: hover it to see what is wrong and how to fix it. The deployed site leaves the underlines out.

To add a whole new section, create a folder with an `index.md`. It becomes a navbar entry and its own sidebar automatically.
