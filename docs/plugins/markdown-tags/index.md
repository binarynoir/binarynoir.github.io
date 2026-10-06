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

Use `|` or `/` as the separator (`((tag/Done/green))`), but not both in one tag. Background is a preset color name or a hex code; foreground is a hex code. A label can't contain the separator.

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

Tags work in tables too:

| Feature                 | Status |
| ----------------------- | ------ |
| Inline badges           | ((tag  | Done))    |
| Arrow tags              | ((tag  | Done))    |
| Per-folder tagged pages | ((tag  | In review | orange)) |
