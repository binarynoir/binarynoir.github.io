---
title: Broken Links
---

# Broken Links ((tag|VitePress plugin|blue)) ((tag|markdown-it|orange))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvitepress--broken--links-181717?logo=github)](https://github.com/binarynoir/vitepress-broken-links) [![npm version](https://img.shields.io/npm/v/@binarynoir/vitepress-broken-links)](https://www.npmjs.com/package/@binarynoir/vitepress-broken-links) [![CI](https://github.com/binarynoir/vitepress-broken-links/actions/workflows/ci.yml/badge.svg)](https://github.com/binarynoir/vitepress-broken-links/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vitepress-broken-links)](https://github.com/binarynoir/vitepress-broken-links/blob/main/LICENSE)

`@binarynoir/vitepress-broken-links` stops one dead link from taking down your whole build. VitePress checks every internal link against your pages, and a link to a page that doesn't exist normally stops the build with `1 dead link(s) found`. With this plugin the link is shown as text instead, with a wavy underline and a popover that says what is wrong and which line of which file it is on. Links that work are left exactly as they are.

It is built for docs sites with many contributors, where a mistyped or outdated link on one page shouldn't block deploying all the others.

## See it live

The second and third links below point at pages that don't exist, on purpose. Without the plugin this page would fail the whole site build. With it, the build finishes and logs a warning for each one, and the links render like this. Hover one, or click or tap it, to see the popover:

```md
Start with [the overview](/plugins/), then read [the setup guide](/guide/setup)
and [part two of this page](./broken-links-part-2.md).
```

::: info On the page
Start with [the overview](/plugins/), then read [the setup guide](/guide/setup)
and [part two of this page](./broken-links-part-2.md).
:::

The build log names each one, with its file and line:

```txt
(!) Broken link /guide/setup in plugins/broken-links.md:25 is shown as text instead of a link.
```

That warning is the plugin working as designed.

## Install

```sh
npm install --save-dev @binarynoir/vitepress-broken-links
```

## Use

Register it in VitePress's `markdown.config` hook, the same place as any other markdown-it plugin:

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress';
import { markdownBrokenLinks } from '@binarynoir/vitepress-broken-links';

export default defineConfig({
  markdown: {
    config(md) {
      md.use(markdownBrokenLinks);
    },
  },
});
```

Or wrap the config with `withBrokenLinks` from `@binarynoir/vitepress-broken-links/vitepress`. It keeps any `markdown.config` you already have, including one set by another `withX()` wrapper.

```ts
import { withBrokenLinks } from '@binarynoir/vitepress-broken-links/vitepress';

export default withBrokenLinks(
  defineConfig({
    // ...your config
  }),
);
```

Then turn on the underline and popovers in your theme:

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import { enableBrokenLinkHints } from '@binarynoir/vitepress-broken-links/client';

export default {
  extends: DefaultTheme,
  enhanceApp() {
    enableBrokenLinkHints();
  },
};
```

The popovers work the same way as [HTML Escape's hints](/plugins/html-escape/#hints), and the two run side by side on this site.

## What counts as dead

Exactly what VitePress itself would report. The plugin reads your running VitePress config, so it uses the same page list, `rewrites`, HTML files in `public/`, and `ignoreDeadLinks` entries. Left alone are:

- links to pages that exist, relative or absolute, with or without `.md`
- external links such as `https://…`, and `#anchors` on the same page
- links to files such as `.pdf` or `.zip`
- anything matched by your `ignoreDeadLinks` setting

Links to `localhost` are dead to VitePress too, since they only work on your own machine. They get their own message, which points to `ignoreDeadLinks: 'localhostLinks'` if you mean to keep them.

## Why not `ignoreDeadLinks`?

VitePress's built-in [`ignoreDeadLinks`](https://vitepress.dev/reference/site-config#ignoredeadlinks) option also keeps dead links from failing the build, but it does that by skipping the check, not by handling the link:

- **Readers still get a 404.** An ignored link is published as a normal link. It looks like it works until someone clicks it. This plugin removes the link, so it can't send anyone to a missing page, and the popover tells them why.
- **Authors aren't told.** `ignoreDeadLinks: true` turns the check off for the whole site, so dead links no longer show up anywhere in the build output. This plugin still logs each one with its file and line, and marks it on the page.
- **You'd have to know the links in advance.** The string, RegExp and function forms only skip links you have already listed. They suit known exceptions, but not a typo someone adds next week.
- **It's all or nothing per site.** With this plugin, a page that must never ship a dead link can opt out in its frontmatter, and VitePress's check applies to that page again.

The two work together. Links matched by `ignoreDeadLinks` stay links, so use it for the exceptions you mean to keep, and let this plugin handle the mistakes. If you want a dead link to block a release, for example as a CI gate on pull requests, leave this plugin out of that build.

## Options

`markdownBrokenLinks(md, options)` and `withBrokenLinks(config, options)` take:

| Option  | Default | Description                                                                                   |
| ------- | ------- | --------------------------------------------------------------------------------------------- |
| `hints` | `true`  | Attach the explanation, file and line to each broken link. `false` shows the text plainly.    |
| `warn`  | `true`  | Log a warning for each broken link while rendering, in the same place VitePress reports them. |

`enableBrokenLinkHints(options)` takes:

| Option         | Default | Description                                                                     |
| -------------- | ------- | ------------------------------------------------------------------------------- |
| `hover`        | `true`  | Show the popover on mouse hover. `false` for click and tap only.                |
| `hoverDelay`   | `300`   | Milliseconds the mouse rests on a hint before the popover shows.                |
| `injectStyles` | `true`  | Inject the default styles. `false` lets you style `.broken-link-hint` yourself. |

The colors follow the VitePress theme and can be changed with the `--broken-link-hint-error` CSS variable.

## Per-page settings

The `brokenLinks` frontmatter key overrides the options for one page:

| Frontmatter                     | What it does                                                                |
| ------------------------------- | --------------------------------------------------------------------------- |
| `brokenLinks: { hints: false }` | Shows broken links on the page as plain text, with no underline or popover. |
| `brokenLinks: { warn: false }`  | Stops logging warnings for the page.                                        |
| `brokenLinks: false`            | Hands the page back to VitePress, so a dead link on it fails the build.     |

There is no live page for `brokenLinks: false`: a dead link on it would stop this site from building, which is the point.

## Limits

- **Only Markdown links are checked.** A raw `<a href>` in HTML isn't checked by VitePress either, so it is left alone.
- **A missing heading isn't a dead link.** `./page#nope` on a page that exists stays a link, as it does in VitePress.
- **It needs VitePress.** The page list comes from the running VitePress process, so under plain markdown-it the plugin does nothing.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-broken-links)
