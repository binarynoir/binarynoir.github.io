---
title: Hints Demo
htmlEscape:
  hints: true
---

# Hints Demo

A live example of [hints](/plugins/html-escape/#hints) for HTML Escape. This page turns them on in its frontmatter, so every spot the plugin escaped or corrected below has a wavy underline. Hover one, or click or tap it, to see what is wrong, how to fix it, and which line of this page's source it is on.

```md
---
htmlEscape:
  hints: true
---
```

## Errors

These would have failed the build or hidden part of the page. They are shown as text, underlined in red.

```md
Returns Array<string> and takes a <your-name> placeholder.

A stray end tag</div> and an unclosed <span>tag.

Paste <?php echo $version; ?> into the template.

<!-- TODO: finish this section
```

::: info On the page
Returns Array<string> and takes a <your-name> placeholder.

A stray end tag</div> and an unclosed <span>tag.

Paste <?php echo $version; ?> into the template.

<!-- TODO: finish this section
:::

## Warnings

The page renders as intended, but the source may still need a look. These are underlined in amber.

```md
First line</br>Second line, and a stray</img> image end tag.

Template syntax: {{ user.name }} is shown as written.
```

::: info On the page
First line</br>Second line, and a stray</img> image end tag.

Template syntax: {{ user.name }} is shown as written.
:::

With hints on, a void end tag is also shown as text, so there is something to underline. `</br>` still makes its line break, right after the hint.

## Not marked

Anything that compiles is left alone, with no hint: balanced HTML such as <kbd>Ctrl</kbd>, components such as <Badge type="tip" text="ok" />, and code such as `Array<T>` and `{{ value }}`.
