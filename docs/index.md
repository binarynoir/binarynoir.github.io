---
layout: home
title: BinaryNoir

hero:
  text: Open-source tools for developers, homelabbers and tinkerers
  tagline: VitePress and Vite plugins, plus command-line apps for homelabs and ham radio. This site is the hub for all of them, and it is built with the plugins it documents.
  image:
    src: /full-logo.svg
    alt: BinaryNoir Studios logo
  actions:
    - theme: brand
      text: Explore the plugins
      link: /plugins/
    - theme: alt
      text: Browse the apps
      link: /apps/
    - theme: alt
      text: How this site is built
      link: /guide/how-this-site-works

features:
  - icon:
      light: /icons/layout-light.svg
      dark: /icons/layout-dark.svg
      width: 28
      height: 28
    title: Auto Sidebar & Navbar
    details: Menus built from your folder structure, ordered and titled by tiny plain-text files.
    link: /plugins/auto-sidebar
    linkText: See the sidebar plugin
  - icon:
      light: /icons/tag-light.svg
      dark: /icons/tag-dark.svg
      width: 28
      height: 28
    title: Markdown Tags
    details: Inline status badges for VitePress, VS Code and Obsidian, plus site-wide pages that list every tag.
    link: /plugins/markdown-tags/
    linkText: See the tags plugin
  - icon:
      light: /icons/book-light.svg
      dark: /icons/book-dark.svg
      width: 28
      height: 28
    title: Glossary Tooltips
    details: Define a term once and every mention in your docs gets a hover definition.
    link: /plugins/glossary
    linkText: See the glossary plugin
  - icon:
      light: /icons/clock-light.svg
      dark: /icons/clock-dark.svg
      width: 28
      height: 28
    title: Reading Time
    details: One line in a page gets an estimated reading time, computed at build time.
    link: /plugins/reading-time-tag
    linkText: See the reading-time plugin
  - icon:
      light: /icons/download-light.svg
      dark: /icons/download-dark.svg
      width: 28
      height: 28
    title: Downloads
    details: Keep a .sql, .zip or .xlsx next to the page that links to it, and the link downloads the file.
    link: /plugins/downloads
    linkText: See the downloads plugin
  - icon:
      light: /icons/escape-light.svg
      dark: /icons/escape-dark.svg
      width: 28
      height: 28
    title: HTML Escape
    details: A stray Array&lt;string&gt; or {{ }} in your Markdown shows up as text instead of breaking the build.
    link: /plugins/html-escape/
    linkText: See the HTML Escape plugin
  - icon:
      light: /icons/image-light.svg
      dark: /icons/image-dark.svg
      width: 28
      height: 28
    title: Image Optimization & Fallback
    details: Smaller images in the build output, and a placeholder instead of a failed build when one goes missing.
    link: /plugins/optimize-images
    linkText: See the image plugins
  - icon:
      light: /icons/terminal-light.svg
      dark: /icons/terminal-dark.svg
      width: 28
      height: 28
    title: Command-line apps
    details: Website and host monitors with desktop and push notifications, and a callsign lookup for the terminal.
    link: /apps/
    linkText: Meet the apps
---

## Start here

- **Improving a docs site?** Start with the [plugins overview](/plugins/). Every plugin has a live demo on its page.
- **Want a tool for your terminal?** Pick one on the [apps page](/apps/). Each installs with one Homebrew command.
- **Building a site like this one?** Read [how this site works](/guide/how-this-site-works) and copy what is useful.

## Install the whole VitePress toolkit

```sh
npm install --save-dev \
  @binarynoir/vitepress-auto-sidebar \
  @binarynoir/vitepress-auto-navbar \
  @binarynoir/vitepress-markdown-tags \
  @binarynoir/vitepress-reading-time-tag \
  @binarynoir/vitepress-downloads \
  @binarynoir/vitepress-html-escape \
  @binarynoir/vite-plugin-optimize-images \
  @binarynoir/vite-plugin-image-fallback \
  markdown-it-glossary
```

Every plugin is optional and independent. Take one, or take them all. Each plugin's page shows how to register it, and the VitePress plugins need Node 22 or newer.

## Support the work

Every plugin and app here is free and MIT-licensed. There are no paid tiers and nothing held back. If one of them saved you time, a contribution helps keep them maintained, documented and moving along the [roadmap](/apps/roadmap).

<div class="bn-support">
  <a class="bn-support-link" href="https://buymeacoffee.com/binarynoir" target="_blank" rel="noopener">Buy Me a Coffee<span class="bn-support-ext" aria-hidden="true">↗</span><span class="bn-sr-only"> (opens in a new tab)</span></a>
  <a class="bn-support-link" href="https://ko-fi.com/binarynoir" target="_blank" rel="noopener">Ko-fi<span class="bn-support-ext" aria-hidden="true">↗</span><span class="bn-sr-only"> (opens in a new tab)</span></a>
</div>

Both open on the service's own site, which handles the payment, so this site never sees your details. Contributing is optional, and everything stays free either way.

Not in a position to give? These help too:

- Star the repos you use on [GitHub](https://github.com/binarynoir).
- Report a bug or suggest a feature in a repo's issues.
- Tell a teammate or friend about a tool that would help them.
