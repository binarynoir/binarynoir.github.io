---
title: HTML Escape
---

# HTML Escape ((tag|VitePress plugin|blue)) ((tag|markdown-it|orange))

[[readingTime]]

`@binarynoir/vitepress-html-escape` keeps stray angle brackets and `{{ }}` in Markdown from breaking your build. VitePress compiles every page as a Vue template, so a sentence like "returns Array<string>" normally stops the build with `Element is missing end tag`. With this plugin it shows up as text. Real HTML and Vue components work exactly as before.

It is built for docs sites with many contributors, where you can't count on everyone to remember the backticks. This site runs it on every page, and every example below is live: each one shows the Markdown as written, then the same Markdown rendered by this site.

## See it live

```md
Returns Array<string> or Promise<T>. Replace <your-name> with yours.

Press <kbd>Ctrl</kbd><br>, see <Badge text="beta" /> and {{ value }}.
```

::: info On the page
Returns Array<string> or Promise<T>. Replace <your-name> with yours.

Press <kbd>Ctrl</kbd><br>, see <Badge text="beta" /> and {{ value }}.
:::

Without the plugin, the first line fails the build and the second shows Vue's value of `value`, which is empty.

## Install

```sh
npm install --save-dev @binarynoir/vitepress-html-escape
```

## Use

Register it in VitePress's `markdown.config` hook, the same place as any other markdown-it plugin:

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress';
import { markdownHtmlEscape } from '@binarynoir/vitepress-html-escape';

export default defineConfig({
  markdown: {
    config(md) {
      md.use(markdownHtmlEscape);
    },
  },
});
```

It runs after every other markdown-it rule, so its position among your `md.use()` calls doesn't matter. This site registers it last, after five other plugins.

Or wrap the config with `withHtmlEscape` from `@binarynoir/vitepress-html-escape/vitepress`. It keeps any `markdown.config` you already have, including one set by another `withX()` wrapper.

```ts
import { withHtmlEscape } from '@binarynoir/vitepress-html-escape/vitepress';

export default withHtmlEscape(
  defineConfig({
    // ...your config
  }),
);
```

## What gets escaped

The rule is the one Vue applies: **a tag must have a matching end tag**. Any start tag that is never closed, and any end tag with nothing to close, is escaped.

### Generics and placeholders

```md
`parse()` returns Map<string, number> and takes a Record<K, V>.
Clone it into <your-folder>, then run it against <host>:<port>.
```

::: info On the page
`parse()` returns Map<string, number> and takes a Record<K, V>.
Clone it into <your-folder>, then run it against <host>:<port>.
:::

### Names that are also real elements

`object`, `select` and `table` are real HTML elements, so a list of known components or elements can't tell these apart from markup. Matching end tags can.

```md
Returns Array<object>, or Promise<select> when the user picks one.
```

::: info On the page
Returns Array<object>, or Promise<select> when the user picks one.
:::

### Stray end tags

```md
Someone pasted this from a template</div> and left a </span> behind.
```

::: info On the page
Someone pasted this from a template</div> and left a </span> behind.
:::

### Unclosed comments

An opening `<!--` with no `-->` would hide the rest of the page. It is escaped, so everything after it still renders.

```md
<!-- TODO: finish this section

This paragraph is still on the page.
```

::: info On the page
<!-- TODO: finish this section

This paragraph is still on the page.
:::

### Processing instructions and CDATA

Vue rejects `<?…?>` and `<![CDATA[…]]>` in HTML, so they are escaped too.

```md
Paste <?php echo $version; ?> into the template, or wrap it in <![CDATA[ raw text ]]>.
```

::: info On the page
Paste <?php echo $version; ?> into the template, or wrap it in <![CDATA[ raw text ]]>.
:::

Inside `<svg>` or `<math>`, where Vue allows them, they are left alone. The CDATA section below is passed through and rendered by the SVG as text:

```md
<svg width="260" height="32" role="img" aria-label="CDATA kept inside SVG">
  <text x="0" y="22" fill="currentColor"><![CDATA[Array<string> & friends]]></text>
</svg>
```

::: info On the page
<svg width="260" height="32" role="img" aria-label="CDATA kept inside SVG">
  <text x="0" y="22" fill="currentColor"><![CDATA[Array<string> & friends]]></text>
</svg>
:::

## What is left alone

Everything that already compiles keeps working. There is no list of components to maintain.

### Balanced HTML, void elements and self-closing components

```md
Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to search.<br>
A <mark>highlight</mark>, a <Badge type="tip" text="self-closing" /> component, and a rule:

<hr>
```

::: info On the page
Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to search.<br>
A <mark>highlight</mark>, a <Badge type="tip" text="self-closing" /> component, and a rule:

<hr>
:::

### Components wrapped around Markdown

A paired tag can wrap Markdown across blank lines, so components that take slot content keep working.

```md
<details>
<summary>Click to expand</summary>

Some **Markdown** inside, with a list:

- one
- two

</details>
```

::: info On the page

<details>
<summary>Click to expand</summary>

Some **Markdown** inside, with a list:

- one
- two

</details>

:::

### HTML from other plugins

The badges in this page's heading come from [Markdown Tags](/plugins/markdown-tags/), the reading-time box from [Reading Time Tag](/plugins/reading-time-tag), and hover terms such as CLI and CI from [Glossary Tooltips](/plugins/glossary/). All of them emit HTML that passes through untouched, because it is balanced.

```md
Status: ((tag|Shipped|green)). Every push runs CI.
```

::: info On the page
Status: ((tag|Shipped|green)). Every push runs CI.
:::

### Code, comments and autolinks

<!-- prettier-ignore -->

```md
Inline code stays as written: `Array<T>` and `{{ value }}`.
An autolink: <https://github.com/binarynoir>. A balanced comment: <!-- you can't see me -->done.
```

::: info On the page
Inline code stays as written: `Array<T>` and `{{ value }}`.
An autolink: <https://github.com/binarynoir>. A balanced comment: <!-- you can't see me -->done.
:::

### `<script setup>` and interactive components

This page has a `<script setup>` block at the bottom. Its state drives the button below, and the `{{ count }}` inside the raw HTML block is still interpolated by Vue.

<!-- prettier-ignore -->
```md
<div class="html-escape-demo-counter">
  <button type="button" v-on:click="count++">Clicked {{ count }} times</button>
</div>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
```

::: info On the page

<div class="html-escape-demo-counter">
  <button type="button" v-on:click="count++">Clicked {{ count }} times</button>
</div>

:::

## How tags are matched

Tags pair up only where they would nest in the rendered page.

### Within a paragraph, heading or table cell

A `<T>` in one table cell and a `</T>` in the next can't close each other, so both are escaped. In the second row, each cell holds its own pair.

```md
| Opens     | Closes    |
| --------- | --------- |
| <T>       | </T>      |
| <b>ok</b> | <i>ok</i> |
```

::: info On the page

| Opens     | Closes    |
| --------- | --------- |
| <T>       | </T>      |
| <b>ok</b> | <i>ok</i> |

:::

### Case-insensitive names

As in Vue, `<Badge>` and `</badge>` are a pair, so the component renders with its slot.

```md
Status: <Badge type="warning">mixed case</badge>
```

::: info On the page
Status: <Badge type="warning">mixed case</badge>
:::

### Void end tags

End tags for void elements are written the way browsers read them. `</br>` becomes a line break in any case, and others such as `</img>` are dropped, as browsers ignore them. Left to Vue, `</br>` would lose its line break and `</BR>` would fail the build.

```md
First line</br>Second line</BR>Third line, and a stray</img> image end tag.
```

::: info On the page
First line</br>Second line</BR>Third line, and a stray</img> image end tag.
:::

### Only the unbalanced tag inside a pair

In `<b>…<T>…</b>`, only `<T>` is escaped. The bold stays bold.

```md
<b>Bold text with a stray <T> inside</b>
```

::: info On the page
<b>Bold text with a stray <T> inside</b>
:::

### Inside an HTML block

The `<div>` below is a raw HTML block. Only the unbalanced tag inside it is escaped; the rest is left as written.

```md
<div class="html-escape-demo-box">
  Returns Array<string>, with <strong>real</strong> markup next to it.
</div>
```

::: info On the page

<div class="html-escape-demo-box">
  Returns Array<string>, with <strong>real</strong> markup next to it.
</div>

:::

### A placeholder on its own line

In CommonMark a line holding only `<your-api-key>` starts an HTML block, which swallows the following lines as raw HTML. Once the placeholder is escaped, those lines are parsed again as Markdown, so the bold and code below still render.

```md
<your-api-key>
**Keep it secret.** It goes in `.env`, never in git.
```

::: info On the page
<your-api-key>
**Keep it secret.** It goes in `.env`, never in git.
:::

The same works inside a list item, and a tight list stays tight:

```md
- <your-fork>
  **then** run `npm install`
- Start the dev server
```

::: info On the page

- <your-fork>
  **then** run `npm install`
- Start the dev server

:::

## Interpolation

`{` in Markdown text is written as `&#123;`, which looks the same but stops Vue from reading `{{ }}` as an expression. That covers prose, inline code and indented code blocks. VitePress already protects fenced code blocks itself.

```md
Template syntax: {{ user.name }} and {{ 1 + 1 }}, also in code: `{{ user.name }}`.

    // An indented code block: {{ 1 + 1 }}
```

::: info On the page
Template syntax: {{ user.name }} and {{ 1 + 1 }}, also in code: `{{ user.name }}`.

    // An indented code block: {{ 1 + 1 }}

:::

Braces inside raw HTML are still interpolated, like the counter above:

```md
<div class="html-escape-demo-box">One plus one is {{ 1 + 1 }}.</div>
```

::: info On the page

<div class="html-escape-demo-box">One plus one is {{ 1 + 1 }}.</div>

:::

### Custom anchors and attributes still work {#custom-anchors}

VitePress's `{#custom-id}` heading anchors and `{.class}` attributes are handled before the plugin runs. The heading of this section has a custom anchor, so this link works: [jump to custom anchors](#custom-anchors). The next paragraph gets a class from `{.html-escape-demo-box}`:

```md
### Custom anchors and attributes still work {#custom-anchors}

This paragraph is styled by an attribute. {.html-escape-demo-box}
```

::: info On the page
This paragraph is styled by an attribute. {.html-escape-demo-box}
:::

## Per-page settings

The `htmlEscape` frontmatter key overrides the plugin options for one page. Each setting below has its own live page, because frontmatter applies to a whole page:

| Frontmatter                            | What it does                                                                                   | Live page                                                   |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `htmlEscape: { interpolation: false }` | Keeps tag escaping, lets `{{ $frontmatter.title }}` interpolate. Use it on pages that need it. | [Interpolation off](/plugins/html-escape/interpolation-off) |
| `htmlEscape: { tags: false }`          | Keeps `{{ }}` escaping, leaves tags as written.                                                | [Tags off](/plugins/html-escape/tags-off)                   |
| `htmlEscape: false`                    | Turns everything off for the page.                                                             | [Everything off](/plugins/html-escape/off)                  |

```md
---
htmlEscape:
  interpolation: false
---
```

## Options

`markdownHtmlEscape(md, options)` and `withHtmlEscape(config, options)` take:

| Option          | Default | Description                                                              |
| --------------- | ------- | ------------------------------------------------------------------------ |
| `tags`          | `true`  | Escape unbalanced tags, unclosed comments, and stray `<?…?>` and CDATA.  |
| `interpolation` | `true`  | Escape `{` in Markdown text so Vue doesn't evaluate `{{ }}` expressions. |

The same keys work under `htmlEscape` in a page's frontmatter, where they win over the options. Values that aren't `true` or `false` are ignored.

With plain markdown-it and `html: false`, every tag is already escaped, so the plugin only affects `{{ }}`.

## Limits

- **Malformed HTML is escaped, not fixed.** A `<div>` someone forgot to close shows up as text instead of failing the build, so the mistake is visible on the page.
- **Attribute names markdown-it doesn't accept**, such as `@click` written inline in a paragraph, are escaped by markdown-it before this plugin runs. Put the component on its own lines as an HTML block, or use `v-on:click` as the counter above does.
- **Mistakes inside real HTML tags still fail the build.** A duplicate attribute or a directive with no value is a Vue error in markup someone wrote on purpose.
- Interpolation escaping applies to Markdown text only, not to raw HTML or attributes.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-html-escape)

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
