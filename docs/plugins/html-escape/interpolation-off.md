---
title: Interpolation Off Demo
# Glossary tooltips would wrap "frontmatter" inside the {{ }} expressions below.
glossary: false
htmlEscape:
  interpolation: false
---

# Interpolation Off Demo

A live example of [per-page settings](/plugins/html-escape/#per-page-settings) for HTML Escape. This page turns interpolation escaping off in its frontmatter, so Vue evaluates <code>&#123;&#123; }}</code> in prose again. Tag escaping is still on.

```md
---
title: Interpolation Off Demo
htmlEscape:
  interpolation: false
---

This page is called "{{ $frontmatter.title }}", and one plus one is {{ 1 + 1 }}.

Tags are still escaped: Array<string> and <your-name> render as text.
```

::: info On the page
This page is called "{{ $frontmatter.title }}", and one plus one is {{ 1 + 1 }}.

Tags are still escaped: Array<string> and <your-name> render as text.
:::

On the [plugin page](/plugins/html-escape/#interpolation), the same <code>&#123;&#123; 1 + 1 }}</code> shows as written.
