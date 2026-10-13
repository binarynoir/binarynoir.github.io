---
title: Tags Off Demo
htmlEscape:
  tags: false
---

# Tags Off Demo

A live example of [per-page settings](/plugins/html-escape/#per-page-settings) for HTML Escape. This page turns tag escaping off in its frontmatter. `{{ }}` in prose is still escaped.

```md
---
title: Tags Off Demo
htmlEscape:
  tags: false
---

Real markup works as usual: <kbd>Ctrl</kbd> + <kbd>C</kbd>.

Interpolation is still escaped: {{ 1 + 1 }} shows as written.
```

::: info On the page
Real markup works as usual: <kbd>Ctrl</kbd> + <kbd>C</kbd>.

Interpolation is still escaped: {{ 1 + 1 }} shows as written.
:::

What this page can't show is a stray tag. With tag escaping off, a single `Array<string>` written outside backticks would fail this site's build with `Element is missing end tag`, as it would without the plugin. Use this setting for a page whose HTML you want Vue to check strictly.
