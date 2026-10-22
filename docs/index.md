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
    title: Navigation from your folders
    details: Auto Sidebar and Auto Navbar build the menus from your folder tree, ordered and titled by small plain-text files. Sidebar Accordion keeps one group open at a time.
    link: /plugins/#navigation
    linkText: Navigation plugins
  - icon:
      light: /icons/tag-light.svg
      dark: /icons/tag-dark.svg
      width: 28
      height: 28
    title: Richer pages
    details: Markdown Tags, Glossary Tooltips, Reading Time and Text Style add status badges, hover definitions, reading-time estimates and colored text.
    link: /plugins/#pages
    linkText: Page plugins
  - icon:
      light: /icons/folder-light.svg
      dark: /icons/folder-dark.svg
      width: 28
      height: 28
    title: Content where it lives
    details: Downloads next to the page that links them, drafts left out with a .exclude file, README.md index pages for VuePress migrations, and blog posts in any folder.
    link: /plugins/#content
    linkText: Content plugins
  - icon:
      light: /icons/escape-light.svg
      dark: /icons/escape-dark.svg
      width: 28
      height: 28
    title: Builds that don't break
    details: HTML Escape and Broken Links turn a stray Array&lt;string&gt; or a dead link into a fix-it hint instead of a failed build.
    link: /plugins/#builds
    linkText: Build plugins
  - icon:
      light: /icons/image-light.svg
      dark: /icons/image-dark.svg
      width: 28
      height: 28
    title: Images handled
    details: Optimize Images shrinks every image in the build output, and Image Fallback stands in for one that goes missing.
    link: /plugins/#images
    linkText: Image plugins
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

## Latest from the blog

::: blog-posts
limit: 4
pinLimit: 2
layout: grid
more: Read the blog →
:::

## Start here

- **Improving a docs site?** Start with the [plugins overview](/plugins/). Every plugin has a live demo on its page.
- **Want a tool for your terminal?** Pick one on the [apps page](/apps/). Each installs with one Homebrew command.
- **Building a site like this one?** Read [how this site works](/guide/how-this-site-works) and copy what is useful.

## Install the VitePress toolkit

Every plugin is optional and independent: take one, or take them all. The [plugins overview](/plugins/#install-them-all) has the one-line install for the whole set, and each plugin's page shows how to register it. The VitePress plugins need Node 22 or newer.

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
