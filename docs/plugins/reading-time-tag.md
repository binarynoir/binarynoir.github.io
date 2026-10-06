---
title: Reading Time Tag
---

# Reading Time Tag ((tag|VitePress plugin|blue))

`@binarynoir/vitepress-reading-time-tag` turns `[[readingTime]]` into a tip block showing how long the page takes to read. The figure is calculated at build time from the page's own Markdown, so there is no component to register, no stylesheet, and nothing extra shipped to the browser.

## See it live

The tip block just below this paragraph is the plugin's output for this page. The source line is the one tag.

[[readingTime]]

## Install

```sh
npm install --save-dev @binarynoir/vitepress-reading-time-tag
```

## Use

```ts
// .vitepress/config.mts
import { readingTimeTag } from '@binarynoir/vitepress-reading-time-tag';

export default defineConfig({
  markdown: {
    config(md) {
      md.use(readingTimeTag);
    },
  },
});
```

Then put the tag on its own line in any page. Case doesn't matter, and spaces inside the brackets are fine.

```md
# Deploying the API

[[readingTime]]

Start by ...
```

Prefer to wrap your config? `withReadingTimeTag` from `@binarynoir/vitepress-reading-time-tag/vitepress` is equivalent.

## How the time is worked out

Words are counted from the page's Markdown, divided by `wordsPerMinute`, and rounded up, so a page never reads "0 minutes". Frontmatter, fenced code blocks, HTML tags and comments, link targets and bare URLs are left out of the count. Link text is still counted.

## Options

| Option           | Default               | Description                                                            |
| ---------------- | --------------------- | ---------------------------------------------------------------------- |
| `wordsPerMinute` | `300`                 | Reading speed. Must be a positive number.                              |
| `render`         | a `::: tip` container | `({ minutes, words }) => string`: the Markdown that replaces each tag. |

```ts
md.use(readingTimeTag, {
  wordsPerMinute: 238,
  render: ({ minutes }) => `::: info\n${minutes} min read\n:::`,
});
```

The count is also available on its own: `calculateReadingTime(source, wordsPerMinute?)` returns `{ words, minutes }`.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-reading-time-tag)
