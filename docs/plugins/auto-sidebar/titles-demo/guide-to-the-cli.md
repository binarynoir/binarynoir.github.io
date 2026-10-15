This page has no `title` frontmatter and no `# Heading`, so [Auto Sidebar](/plugins/auto-sidebar/) titles it from its file name, `guide-to-the-cli.md`.

## With `titleCase`

`titleCase` is on by default. Articles, short conjunctions and prepositions such as `a`, `the`, `and`, `of` and `to` stay lowercase unless they are the first or last word, so the sidebar shows **Guide to the Cli**.

## Without `titleCase`

With `titleCase: false`, every word is capitalised: "Guide To The Cli".

Only first letters change case, so "Cli" stays "Cli". Add `{ cli: 'CLI' }` to `titleReplacements` to write it as "CLI". Titles an author wrote are never re-cased.

[Back to the demo](./)
