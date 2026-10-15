---
title: Text Style
---

# Text Style ((tag|VitePress plugin|blue)) ((tag|markdown-it|orange))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvitepress--text--style-181717?logo=github)](https://github.com/binarynoir/vitepress-text-style) [![npm version](https://img.shields.io/npm/v/@binarynoir/vitepress-text-style)](https://www.npmjs.com/package/@binarynoir/vitepress-text-style) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vitepress-text-style/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vitepress-text-style/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vitepress-text-style)](https://github.com/binarynoir/vitepress-text-style/blob/main/LICENSE)

`@binarynoir/vitepress-text-style` colors and sizes text inline, without writing HTML. Write `[t:red]warning[/t]` or `[t::1.2em]larger[/t]` and get a styled `<span>`. Values are checked before they reach the page, code is left alone, and the text inside is still Markdown.

It uses the same `[t:color:size]` syntax as the text-style plugin many VuePress sites carry, so pages can move to VitePress without being rewritten. Every example below is live: each one shows the Markdown as written, then the same Markdown rendered by this site.

## See it live

```md
A [t:red]red[/t] word, a [t:blue:1.4em]big blue[/t] one, and a [t::small]small[/t] one.
```

::: info On the page
A [t:red]red[/t] word, a [t:blue:1.4em]big blue[/t] one, and a [t::small]small[/t] one.
:::

## Install

```sh
npm install --save-dev @binarynoir/vitepress-text-style
```

## Use

Register it in VitePress's `markdown.config` hook, the same place as any other markdown-it plugin:

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress';
import { markdownTextStyle } from '@binarynoir/vitepress-text-style';

export default defineConfig({
  markdown: {
    config(md) {
      md.use(markdownTextStyle);
    },
  },
});
```

Or wrap the config with `withTextStyle` from `@binarynoir/vitepress-text-style/vitepress`. It keeps any `markdown.config` you already have, including one set by another `withX()` wrapper.

```ts
import { withTextStyle } from '@binarynoir/vitepress-text-style/vitepress';

export default withTextStyle(
  defineConfig({
    // ...your config
  }),
);
```

## Syntax

```md
[t:color]text[/t]
[t:color:size]text[/t]
[t::size]text[/t]
```

Either value can be left out, but not both. Whitespace around the values and the text is ignored, so `[t: red ] text [/t]` is the same as `[t:red]text[/t]`.

### Markdown inside

The text in a span is parsed as Markdown, so emphasis, code, links and badges all work inside it:

```md
[t:green]**Done:** see [the overview](/plugins/) and run `npm test`. ((tag|Shipped|green))[/t]
```

::: info On the page
[t:green]**Done:** see [the overview](/plugins/) and run `npm test`. ((tag|Shipped|green))[/t]
:::

### Nesting

Spans nest, and each `[/t]` closes its own opener:

```md
[t:var(--vp-c-brand-1)]The brand color, with [t::1.5em]a larger word[/t] in the middle.[/t]
```

::: info On the page
[t:var(--vp-c-brand-1)]The brand color, with [t::1.5em]a larger word[/t] in the middle.[/t]
:::

### Headings, lists and tables

A span stays within one paragraph, heading, list item or table cell.

```md
- [t:var(--vp-c-tip-1)]Ready[/t] for review
- [t:var(--vp-c-danger-1)]Blocked[/t] on a dependency

| Status                               | Count |
| ------------------------------------ | ----- |
| [t:var(--vp-c-warning-1)]Pending[/t] | 3     |
```

::: info On the page

- [t:var(--vp-c-tip-1)]Ready[/t] for review
- [t:var(--vp-c-danger-1)]Blocked[/t] on a dependency

| Status                               | Count |
| ------------------------------------ | ----- |
| [t:var(--vp-c-warning-1)]Pending[/t] | 3     |

:::

### Code is left alone

Inline code, fenced code and indented code blocks are never styled, so you can show the syntax itself in backticks, as this page does. To show it as text outside code, escape the opener with a backslash:

```md
In code: `[t:red]not styled[/t]`. Escaped: \[t:red]not styled[/t].
```

::: info On the page
In code: `[t:red]not styled[/t]`. Escaped: \[t:red]not styled[/t].
:::

## Values

### Colors

| Form            | Examples                                                                        |
| --------------- | ------------------------------------------------------------------------------- |
| Named colors    | `red`, `rebeccapurple`, `currentColor`, `transparent`                           |
| Hex             | `#f00`, `#f008`, `#ff0000`, `#ff000080`                                         |
| Color functions | `rgb(255 0 0)`, `rgba(255,0,0,.5)`, `hsl(120deg 50% 50%)`, `oklch(70% 0.1 200)` |
| CSS variables   | `var(--vp-c-brand-1)`                                                           |

### Sizes

| Form            | Examples                                        |
| --------------- | ----------------------------------------------- |
| Number and unit | `16px`, `24pt`, `1.2em`, `.8rem`, `150%`, `5vw` |
| Keywords        | `xx-small` to `xxx-large`, `smaller`, `larger`  |
| CSS variables   | `var(--my-size)`                                |

```md
[t:#e67e22]Hex[/t], [t:rgb(46 134 222)]rgb()[/t], [t:hsl(280deg 60% 55%)]hsl()[/t], [t:oklch(65% 0.2 145)]oklch()[/t], and [t::x-large]x-large[/t].
```

::: info On the page
[t:#e67e22]Hex[/t], [t:rgb(46 134 222)]rgb()[/t], [t:hsl(280deg 60% 55%)]hsl()[/t], [t:oklch(65% 0.2 145)]oklch()[/t], and [t::x-large]x-large[/t].
:::

### Light and dark mode

A fixed color such as `darkblue` can be hard to read on a dark background. VitePress's theme variables change with the mode, so text colored with them stays readable in both. Switch this site's appearance and compare:

```md
[t:darkblue]darkblue[/t] against [t:var(--vp-c-brand-1)]var(--vp-c-brand-1)[/t] and [t:var(--vp-c-danger-1)]var(--vp-c-danger-1)[/t].
```

::: info On the page
[t:darkblue]darkblue[/t] against [t:var(--vp-c-brand-1)]var(--vp-c-brand-1)[/t] and [t:var(--vp-c-danger-1)]var(--vp-c-danger-1)[/t].
:::

### Invalid values

Anything the plugin doesn't recognise is dropped. If one value is invalid the other is still applied. If neither is, the whole span is shown as written, so a typo is visible on the page instead of silently doing nothing:

```md
[t:red:huge]Red at the normal size[/t]. [t:#ff00000]A seven-digit hex, shown as written[/t].
```

::: info On the page
[t:red:huge]Red at the normal size[/t]. [t:#ff00000]A seven-digit hex, shown as written[/t].
:::

Named colors are accepted as any single word, so a misspelled name such as `redd` still becomes a span, and the browser ignores the color. No value can contain `;`, quotes or `<`, so a marker can't add other CSS or break out of the `style` attribute.

## Options

`markdownTextStyle(md, options)` and `withTextStyle(config, options)` take:

| Option      | Default | Description                                                                             |
| ----------- | ------- | --------------------------------------------------------------------------------------- |
| `className` | none    | A class added to every styled `<span>`, for theme CSS that should apply to all of them. |

## Per-page settings

A page turns the plugin off with `textStyle: false` in its frontmatter. On that page `[t:…]` is shown as written.

```md
---
textStyle: false
---
```

## Migrating from VuePress

The syntax and output match the VuePress text-style plugin, with a few differences:

- **Code is detected by markdown-it, not by splitting on backticks.** Indented code blocks and multi-backtick code spans are now left alone too.
- **The text is Markdown.** `**bold**` inside a span is bold, and text containing `[`, such as `array[0]`, now works.
- **Spans nest.**
- **More values are accepted:** 4- and 8-digit hex, modern color functions, CSS variables, and `vmin`, `vmax` and `q` sizes.

[README Index](/plugins/readme-index/) helps with the other half of a VuePress move: it serves `README.md` as a folder's index page.

## Limits

- **A span can't go inside a link's text.** `[[t:red]docs[/t]](/docs)` isn't a link, because markdown-it doesn't allow brackets another rule consumed inside a link label. Put the span around the link instead: `[t:red][docs](/docs)[/t]`.
- **Inline styles only.** For styling you reuse, a class in your theme CSS is easier to change later; `className` adds one to every span.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-text-style)
