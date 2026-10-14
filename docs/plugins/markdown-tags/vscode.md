---
title: Visual Studio Code
---

# Markdown Tags for VS Code ((tag|VS Code extension|blue))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvscode--markdown--tags-181717?logo=github)](https://github.com/binarynoir/vscode-markdown-tags) [![VS Marketplace version](https://vsmarketplacebadges.dev/version/BinaryNoir.vscode-markdown-tags.svg)](https://marketplace.visualstudio.com/items?itemName=BinaryNoir.vscode-markdown-tags) [![CI](https://github.com/binarynoir/vscode-markdown-tags/actions/workflows/ci.yml/badge.svg)](https://github.com/binarynoir/vscode-markdown-tags/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vscode-markdown-tags)](https://github.com/binarynoir/vscode-markdown-tags/blob/main/LICENSE)

`vscode-markdown-tags` (published as **Tags for Markdown**) styles tags in the built-in Markdown preview. It needs VS Code 1.95 or newer and adds no settings of its own.

## Install

1. Open the Extensions view (`Cmd+Shift+X` on macOS, `Ctrl+Shift+X` on Windows and Linux).
2. Search for `Tags for Markdown` (publisher BinaryNoir) and click **Install**.

Or install it from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=BinaryNoir.vscode-markdown-tags).

## Use

Write tags in any Markdown file, then open the preview with `Cmd+Shift+V` (`Ctrl+Shift+V` on Windows and Linux) or right-click the file and choose **Open Preview**.

```md
((tag|todo)) ((tag/in-progress/#ffcc00)) ((tag|done|#28a745|#ffffff)) ((<tag|planned))
```

Tags show in the preview only, not in the editor. Labels containing Markdown emphasis characters such as `*` are split by the parser and won't render as a tag. An invalid color falls back to grey.

[Source and full README on GitHub](https://github.com/binarynoir/vscode-markdown-tags)

See the [syntax reference](/plugins/markdown-tags/#syntax) for every tag form.
