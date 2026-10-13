---
title: As Code Demo
htmlEscape:
  asCode: true
---

# As Code Demo

A live example of [showing escapes as code](/plugins/html-escape/#showing-escapes-as-code) for HTML Escape. This page turns `asCode` on in its frontmatter, so everything the plugin escapes below is shown as inline code, as if the backticks had been written.

```md
---
htmlEscape:
  asCode: true
---
```

## Generics, placeholders and stray tags

None of these were written in backticks:

```md
Returns Array<string> or Promise<T>. Replace <your-name> with yours, then run it against <host>:<port>.

Paste <?php echo $version; ?> into the template. Someone pasted this from a template</div> by mistake.

Template syntax: {{ user.name }} is shown as written.
```

::: info On the page
Returns Array<string> or Promise<T>. Replace <your-name> with yours, then run it against <host>:<port>.

Paste <?php echo $version; ?> into the template. Someone pasted this from a template</div> by mistake.

Template syntax: {{ user.name }} is shown as written.
:::

## The whole word, and nothing more

The code covers the word the construct belongs to. Wrapping brackets, quotes and sentence punctuation stay outside, and brackets that are part of the code stay inside.

```md
Use (Array<T>), "Promise<void>", fn(Set<T>) or Array<string>[].
```

::: info On the page
Use (Array<T>), "Promise<void>", fn(Set<T>) or Array<string>[].
:::

## A placeholder on its own line

```md
<your-api-key>
**Keep it secret.** It goes in `.env`, never in git.
```

::: info On the page
<your-api-key>
**Keep it secret.** It goes in `.env`, never in git.
:::

## Not changed

Real HTML and components, void end tags, and code already in backticks are left as they are: <kbd>Ctrl</kbd> + <kbd>K</kbd>, a <Badge type="tip" text="badge" />, a line</br>break, and `Array<T>`.

Compare the same Markdown on the [plugin page](/plugins/html-escape/#generics-and-placeholders), where `asCode` is off and these show as plain text.
