This page has no `title` frontmatter and no `# Heading`, so [Auto Sidebar](/plugins/auto-sidebar/) titles it from its file name, `github-actions-setup.md`.

## Without `titleReplacements`

The file name is formatted word by word, capitalising only the first letter of each: "Github Actions Setup".

## With `titleReplacements`

This site passes `titleReplacements: { github: 'GitHub' }`, so the word `github` is written as "GitHub" and the sidebar shows **GitHub Actions Setup**. Keys match whole words, ignoring case, so `githubs` would be left alone.

Titles an author wrote are never changed by `titleReplacements`. A page titled "Using github" would keep its lowercase "github".

[Back to the demo](./)
