---
layout: home
title: BinaryNoir

hero:
  text: Quiet, sharp tools for developers
  tagline: Open-source VitePress plugins, Vite plugins and command-line apps. This site is the hub for all of them, and it is built with the plugins it documents.
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

## Install the whole toolkit

```sh
npm install --save-dev \
  @binarynoir/vitepress-auto-sidebar \
  @binarynoir/vitepress-auto-navbar \
  @binarynoir/vitepress-markdown-tags \
  @binarynoir/vitepress-reading-time-tag \
  markdown-it-glossary
```

Every plugin is optional and independent. Take one, or take them all.
