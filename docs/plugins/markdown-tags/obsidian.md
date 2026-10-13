---
title: Obsidian
---

# Markdown Tags for Obsidian ((tag|Obsidian plugin|purple))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fobsidian--markdown--tags-181717?logo=github)](https://github.com/binarynoir/obsidian-markdown-tags) [![Latest release](https://img.shields.io/github/v/release/binarynoir/obsidian-markdown-tags)](https://github.com/binarynoir/obsidian-markdown-tags/releases/latest) [![License](https://img.shields.io/github/license/binarynoir/obsidian-markdown-tags)](https://github.com/binarynoir/obsidian-markdown-tags/blob/main/LICENSE)

`obsidian-markdown-tags` (listed in Obsidian as **Tags for Markdown**) renders tags in Reading view and in Live Preview, including inside tables.

## Install

1. In Obsidian, open **Settings → Community plugins** and search for `Tags for Markdown`.
2. Select **Install**, then **Enable**.

To install by hand, download the [latest release](https://github.com/binarynoir/obsidian-markdown-tags/releases/latest) and copy `main.js`, `styles.css` and `manifest.json` into `<vault>/.obsidian/plugins/obsidian-markdown-tags/`.

## Use

Write tags in any note, the same as everywhere else:

```md
((tag|todo)) ((tag|in-progress|#ffcc00)) ((tag|done|#28a745|#ffffff)) ((<tag|planned))
```

In a table, prefer the `/` separator so the `|` doesn't split the cell: `((tag/Done/green))`. To change how tags look, edit the plugin's `styles.css`. An invalid color falls back to grey.

[Source and full README on GitHub](https://github.com/binarynoir/obsidian-markdown-tags)

See the [syntax reference](/plugins/markdown-tags/#syntax) for every tag form.
