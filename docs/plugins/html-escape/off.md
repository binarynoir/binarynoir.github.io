---
title: Everything Off Demo
# Glossary tooltips would wrap "frontmatter" inside the {{ }} expressions below.
glossary: false
htmlEscape: false
---

# Everything Off Demo

A live example of [per-page settings](/plugins/html-escape/#per-page-settings) for HTML Escape. This page turns the plugin off entirely in its frontmatter, so it renders as plain VitePress would.

```md
---
title: Everything Off Demo
htmlEscape: false
---

Vue evaluates this again: one plus one is {{ 1 + 1 }}, and this page is "{{ $frontmatter.title }}".

Real markup works as usual: <kbd>Ctrl</kbd> + <kbd>V</kbd>.
```

::: info On the page
Vue evaluates this again: one plus one is {{ 1 + 1 }}, and this page is "{{ $frontmatter.title }}".

Real markup works as usual: <kbd>Ctrl</kbd> + <kbd>V</kbd>.
:::

As on the [Tags off](/plugins/html-escape/tags-off) page, a stray `Array<string>` here would fail the build, so this page keeps every tag balanced.
