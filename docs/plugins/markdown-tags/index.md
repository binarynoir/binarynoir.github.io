---
title: Markdown Tags
---

# Markdown Tags ((tag|VitePress plugin|blue)) ((tag|VS Code|blue)) ((tag|Obsidian|purple))

[[readingTime]]

Inline syntax like `((tag|Done|green))` turns into a styled badge. Code blocks and inline code are left exactly as written, so you can document the syntax itself. The same syntax works in three places, each with its own package and its own page:

| Where                                  | Package                                                                          | Docs                                          |
| -------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------- |
| VitePress 2 sites                      | [vitepress-markdown-tags](https://github.com/binarynoir/vitepress-markdown-tags) | [VitePress](/plugins/markdown-tags/vitepress) |
| Visual Studio Code Markdown preview    | [vscode-markdown-tags](https://github.com/binarynoir/vscode-markdown-tags)       | [VS Code](/plugins/markdown-tags/vscode)      |
| Obsidian reading view and live preview | [obsidian-markdown-tags](https://github.com/binarynoir/obsidian-markdown-tags)   | [Obsidian](/plugins/markdown-tags/obsidian)   |

## Syntax

```txt
((tag|label))
((tag|label|background))
((tag|label|background|foreground))
((<tag|label|background|foreground))     arrow style
```

Use `|` or `/` as the separator (`((tag/Done/green))`), but not both in one tag. Because both are separators, a label can't contain `|` or `/`, and a tag must fit on one line.

- **background** is a hex code such as `#0f766e`, or one of the preset colors: `grey`, `green`, `yellow`, `orange`, `blue`, `purple`, `red`. Leave it out and a [preset label](#see-it-live) picks its own color; any other label is grey.
- **foreground** is the text color, as a hex code.
- **arrow style** (`((<tag|…))`) draws the badge as a pointed price tag.

## See it live

Preset labels pick their own color:

- ((tag|todo)) ((tag|planned)) grey
- ((tag|doing)) ((tag|in-progress)) orange
- ((tag|done)) ((tag|tip)) green
- ((tag|on-hold)) ((tag|tbd)) ((tag|proposed)) ((tag|draft)) ((tag|wip)) blue
- ((tag|mvp)) purple
- ((tag|warn)) yellow
- ((tag|blocked)) ((tag|canceled)) ((tag|error)) red

Or choose the colors yourself: ((tag|Custom|orange)) ((tag|Hex color|#0f766e|#fff)) and the arrow style ((<tag|v2|#3d3d3d|#fff)).

Tags work in tables too. Use the `/` separator there, because a `|` would end the table cell:

| Feature                 | Status                   |
| ----------------------- | ------------------------ |
| Inline badges           | ((tag/Done))             |
| Arrow tags              | ((<tag/Done))            |
| Per-folder tagged pages | ((tag/In review/orange)) |
