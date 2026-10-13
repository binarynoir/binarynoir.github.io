---
title: Rules Demo
htmlEscape:
  tags:
    voidEndTags: false
  interpolation:
    code: false
---

# Rules Demo

A live example of [rules](/plugins/html-escape/#choosing-what-it-handles) for HTML Escape. This page turns two rules off in its frontmatter and leaves every other rule as the site configures it.

```md
---
htmlEscape:
  tags:
    voidEndTags: false
  interpolation:
    code: false
---
```

## Rules that are off

`voidEndTags` is off, so `</br>` reaches Vue as written. Vue drops it, so there is no line break. With `interpolation.code` off, Vue evaluates the braces in the inline code below.

```md
First line</br>second line, on the same line.

The code `{{ 1 + 1 }}` is evaluated.
```

::: info On the page
First line</br>second line, on the same line.

The code `{{ 1 + 1 }}` is evaluated.
:::

## Rules that stay on

Every rule the page doesn't name keeps the site's setting, so stray tags and double braces in prose are still escaped.

```md
Returns Array<string>, a stray </div>, and {{ 1 + 1 }} in prose.
```

::: info On the page
Returns Array<string>, a stray </div>, and {{ 1 + 1 }} in prose.
:::

On the [plugin page](/plugins/html-escape/#void-end-tags), the same `</br>` makes a line break.
